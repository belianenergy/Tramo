import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const dataDir = path.join(process.cwd(), 'data')

  const communities = JSON.parse(fs.readFileSync(path.join(dataDir, 'communities.json'), 'utf-8'))
  const listings = JSON.parse(fs.readFileSync(path.join(dataDir, 'listings.json'), 'utf-8'))
  const alerts = JSON.parse(fs.readFileSync(path.join(dataDir, 'alerts.json'), 'utf-8'))

  const totalCommunities = communities.length
  const totalKwh = communities.reduce((s: number, c: { totalKwh: number }) => s + c.totalKwh, 0) +
    listings.reduce((s: number, l: { monthlyKwh: number }) => s + l.monthlyKwh, 0)
  const totalCost = communities.reduce((s: number, c: { totalCost: number }) => s + c.totalCost, 0) +
    listings.reduce((s: number, l: { monthlyCost: number }) => s + l.monthlyCost, 0)
  const activeAlerts = alerts.filter((a: { read: boolean }) => !a.read).length

  const consumptionHistory = [
    { label: 'Ene', value: 38200 },
    { label: 'Feb', value: 35800 },
    { label: 'Mar', value: 39100 },
    { label: 'Abr', value: 41500 },
    { label: 'May', value: 45200 },
    { label: 'Jun', value: 48700 },
    { label: 'Jul', value: 52100 },
    { label: 'Ago', value: 50300 },
    { label: 'Sep', value: 46800 },
    { label: 'Oct', value: 42900 },
    { label: 'Nov', value: 40100 },
    { label: 'Dic', value: 37500 },
  ]

  return NextResponse.json({
    totalCommunities,
    totalKwh,
    totalCost: Math.round(totalCost * 100) / 100,
    activeAlerts,
    monthlySavings: 8500,
    arbitrageStatus: 'active',
    consumptionHistory,
  })
}
