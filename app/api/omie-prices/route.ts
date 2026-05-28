import { NextResponse } from 'next/server'

export async function GET() {
  // Simulated OMIE market prices (24h profile in €/kWh)
  const prices = [
    0.085, 0.078, 0.072, 0.068, 0.075, 0.089,
    0.118, 0.142, 0.165, 0.178, 0.172, 0.158,
    0.145, 0.138, 0.142, 0.155, 0.168, 0.195,
    0.225, 0.248, 0.235, 0.210, 0.175, 0.128,
  ]

  return NextResponse.json({
    prices,
    timestamp: new Date().toISOString(),
    trend: 'stable',
  })
}
