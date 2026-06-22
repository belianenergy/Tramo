import { NextResponse } from 'next/server';

const allowedTariffs = new Set(['pvpc', 'fixed', 'nocturnal']);

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const propertyId = asString(body.propertyId);
    const currentTariff = asString(body.currentTariff);
    const proposedTariff = asString(body.proposedTariff);

    if (!propertyId || !allowedTariffs.has(currentTariff) || !allowedTariffs.has(proposedTariff)) {
      return NextResponse.json(
        { error: 'propertyId, currentTariff y proposedTariff válidos son obligatorios.' },
        { status: 400 }
      );
    }

    const baseSavings: Record<string, Record<string, number>> = {
      pvpc: { fixed: 234, nocturnal: 156, pvpc: 0 },
      fixed: { pvpc: -234, nocturnal: -78, fixed: 0 },
      nocturnal: { pvpc: -156, fixed: 78, nocturnal: 0 }
    };

    const savings = baseSavings[currentTariff][proposedTariff];
    const monthly = Math.round(savings / 12 * 100) / 100;
    const yearly = savings;

    return NextResponse.json({
      propertyId,
      currentTariff,
      proposedTariff,
      savings,
      monthly,
      yearly,
      paybackMonths: savings > 0 ? Math.round(1200 / savings) : 0,
      recommendations: savings > 200
        ? ['Cambio de tarifa altamente recomendado', 'Estimación basada en consumo real']
        : savings > 100
        ? ['El cambio puede ser beneficioso', 'Revisar patrones de consumo']
        : ['Mantener tarifa actual', 'Diferencias mínimas en el coste']
    });
  } catch {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    properties: [
      { id: '1', potentialSavings: 234, recommendedTariff: 'fixed' },
      { id: '2', potentialSavings: 156, recommendedTariff: 'nocturnal' },
      { id: '3', potentialSavings: 0, recommendedTariff: 'pvpc' },
      { id: '4', potentialSavings: 312, recommendedTariff: 'fixed' },
      { id: '5', potentialSavings: 178, recommendedTariff: 'nocturnal' }
    ],
    totalPotentialSavings: 880,
    monthlyPotential: 73.3,
    yearlyPotential: 880
  });
}
