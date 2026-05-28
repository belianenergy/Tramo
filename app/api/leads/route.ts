import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 10_000;

type LeadPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  units?: string;
  segment?: string;
  mainPain?: string;
  interests?: string[];
  message?: string;
  website?: string;
};

type StoredLead = Omit<LeadPayload, 'website'> & {
  id: string;
  createdAt: string;
  source: 'landing-mvp';
  score: number;
  tags: string[];
};

const leadsFile = path.join(process.cwd(), 'data', 'leads.json');
const allowedSegments = new Set(['gestora-apartamentos', 'apartahotel', 'casas-rurales', 'otros']);
const allowedMainPains = new Set([
  'consumo-fuera-reserva',
  'aparatos',
  'propietarios',
  'tarifa',
  'bateria',
  'climatizacion',
  'consumos',
]);
const allowedInterests = new Set([
  'Control inteligente de aparatos',
  'Alertas de consumo fuera de reserva',
  'Informes mensuales para propietarios',
  'Optimización de tarifas y potencia',
  'Baterías y arbitraje',
  'Climatización automática por reservas',
  'Alertas de consumo anómalo',
  'Optimización de tarifa eléctrica',
  'Batería / arbitraje (premium)',
]);

async function readLeads(): Promise<StoredLead[]> {
  try {
    const raw = await fs.readFile(leadsFile, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') return [];
    throw error;
  }
}

async function writeLeads(leads: StoredLead[]) {
  await fs.mkdir(path.dirname(leadsFile), { recursive: true });
  const tempFile = `${leadsFile}.${process.pid}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(leads, null, 2)}\n`, 'utf8');
  await fs.rename(tempFile, leadsFile);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clampText(value: unknown, max = 800) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

function normalizeInterests(interests: unknown) {
  if (!Array.isArray(interests)) return [];
  return interests
    .filter((interest): interest is string => typeof interest === 'string')
    .map((interest) => clampText(interest, 120))
    .filter((interest) => allowedInterests.has(interest));
}

function parsePositiveInteger(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0 || parsed > 100_000) return null;
  return parsed;
}

function qualifyLead(payload: LeadPayload) {
  const units = parsePositiveInteger(clampText(payload.units, 20));
  const interests = normalizeInterests(payload.interests);
  const tags: string[] = [];
  let score = 0;

  if (units !== null) {
    if (units >= 10) score += 30;
    if (units >= 25) score += 20;
    if (units >= 50) score += 10;
    if (units < 10) tags.push('small-portfolio');
  }

  const mainPain = payload.mainPain || '';
  if (mainPain === 'aparatos' || mainPain === 'climatizacion') score += 25;
  if (mainPain === 'consumo-fuera-reserva' || mainPain === 'consumos') score += 20;
  if (mainPain === 'propietarios') score += 15;
  if (mainPain === 'tarifa') score += 8;
  if (mainPain === 'bateria') {
    score += 3;
    tags.push('premium-interest');
  }

  if (interests.some((i) => i.toLowerCase().includes('aparatos') || i.toLowerCase().includes('climat'))) score += 10;
  if (interests.some((i) => i.toLowerCase().includes('fuera de reserva') || i.toLowerCase().includes('anóm'))) score += 10;
  if (interests.some((i) => i.toLowerCase().includes('propietarios'))) score += 6;
  if (interests.some((i) => i.toLowerCase().includes('tarifa'))) score += 5;
  if (interests.some((i) => i.toLowerCase().includes('bater'))) {
    score += 3;
    tags.push('premium-interest');
  }

  if (payload.segment === 'gestora-apartamentos' || payload.segment === 'apartahotel') score += 5;
  if ((payload.company || '').trim()) score += 2;
  if ((payload.phone || '').trim()) score += 1;

  const normalizedScore = Math.max(0, Math.min(100, score));
  if (normalizedScore >= 70) tags.push('hot');
  else if (normalizedScore >= 45) tags.push('warm');
  else tags.push('cold');

  return { score: normalizedScore, tags };
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get('content-length') || '0');
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Solicitud demasiado grande.' }, { status: 413 });
    }

    const payload = (await request.json()) as LeadPayload;

    if (clampText(payload.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const name = clampText(payload.name, 120);
    const email = clampText(payload.email, 160).toLowerCase();
    const units = clampText(payload.units, 20);
    const segment = clampText(payload.segment, 80) || 'gestora-apartamentos';
    const mainPain = clampText(payload.mainPain, 80) || 'climatizacion';
    const unitsNumber = parsePositiveInteger(units);

    if (!name || !email || unitsNumber === null) {
      return NextResponse.json(
        { error: 'Nombre, email y número positivo de alojamientos son obligatorios.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email no válido.' }, { status: 400 });
    }

    if (!allowedSegments.has(segment) || !allowedMainPains.has(mainPain)) {
      return NextResponse.json({ error: 'Segmento o necesidad principal no válidos.' }, { status: 400 });
    }

    const interests = normalizeInterests(payload.interests);
    const { score, tags } = qualifyLead({ ...payload, units, segment, mainPain, interests });

    const lead: StoredLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      source: 'landing-mvp',
      score,
      tags,
      name,
      email,
      company: clampText(payload.company, 160),
      phone: clampText(payload.phone, 60),
      units,
      segment,
      mainPain,
      interests,
      message: clampText(payload.message, 1200),
    };

    const leads = await readLeads();
    leads.unshift(lead);
    await writeLeads(leads);

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (error) {
    console.error('Lead capture failed', error);
    return NextResponse.json(
      { error: 'No se pudo guardar la solicitud. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ count: leads.length });
}
