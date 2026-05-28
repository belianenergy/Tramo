import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { OperationItem } from '@/lib/types'

export const dynamic = 'force-dynamic'

const operationsFile = path.join(process.cwd(), 'data', 'operations.json')
const allowedTypes: OperationItem['type'][] = [
  'precheckin_climate',
  'postcheckout_saving',
  'anomaly_alert',
  'owner_report',
]
const allowedStatuses: OperationItem['status'][] = ['scheduled', 'needs_review', 'done', 'sent']

async function readOperations(): Promise<OperationItem[]> {
  try {
    const raw = await fs.readFile(operationsFile, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as OperationItem[]) : []
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return []
    throw error
  }
}

async function writeOperations(operations: OperationItem[]) {
  await fs.mkdir(path.dirname(operationsFile), { recursive: true })
  const tempFile = `${operationsFile}.${process.pid}.tmp`
  await fs.writeFile(tempFile, `${JSON.stringify(operations, null, 2)}\n`, 'utf8')
  await fs.rename(tempFile, operationsFile)
}

function clampText(value: unknown, max = 500) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed
}

function parseOperation(payload: Record<string, unknown>): OperationItem | null {
  const type = payload.type as OperationItem['type']
  const status = (payload.status as OperationItem['status']) || 'scheduled'
  const propertyName = clampText(payload.propertyName, 160)
  const summary = clampText(payload.summary, 500)
  const atRaw = clampText(payload.at, 80)
  const at = atRaw ? new Date(atRaw) : new Date()

  if (!allowedTypes.includes(type) || !allowedStatuses.includes(status)) return null
  if (!propertyName || !summary || Number.isNaN(at.getTime())) return null

  return {
    id: `op_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    at: at.toISOString(),
    propertyId: clampText(payload.propertyId, 120) || 'manual',
    propertyName,
    type,
    status,
    summary,
  }
}

export async function GET() {
  try {
    const operations = await readOperations()
    operations.sort((a, b) => (a.at < b.at ? 1 : -1))
    return NextResponse.json(operations)
  } catch (error) {
    console.error('Operations read failed', error)
    return NextResponse.json({ error: 'No se pudieron cargar las operaciones.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as Record<string, unknown>
    const operation = parseOperation(payload)

    if (!operation) {
      return NextResponse.json(
        { error: 'Operación no válida. Revisa tipo, estado, apartamento y resumen.' },
        { status: 400 }
      )
    }

    const operations = await readOperations()
    operations.unshift(operation)
    await writeOperations(operations)

    return NextResponse.json({ ok: true, operation }, { status: 201 })
  } catch (error) {
    console.error('Operation write failed', error)
    return NextResponse.json({ error: 'No se pudo guardar la operación.' }, { status: 500 })
  }
}
