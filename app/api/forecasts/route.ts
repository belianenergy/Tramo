import { NextResponse } from 'next/server';

export async function GET() {
  const history = [
    { month: 'Ene', kwh: 3820, cost: 650 },
    { month: 'Feb', kwh: 3580, cost: 608 },
    { month: 'Mar', kwh: 3910, cost: 665 },
    { month: 'Abr', kwh: 4150, cost: 706 },
    { month: 'May', kwh: 4520, cost: 768 }
  ];

  const prediction = [
    { month: 'Jun', kwh: 4870, cost: 828 },
    { month: 'Jul', kwh: 5210, cost: 886 },
    { month: 'Ago', kwh: 5030, cost: 855 },
    { month: 'Sep', kwh: 4680, cost: 796 },
    { month: 'Oct', kwh: 4290, cost: 729 }
  ];

  const averageDaily = history.reduce((acc, h) => acc + h.kwh, 0) / history.length / 30;

  return NextResponse.json({
    history,
    prediction,
    averageDaily: Math.round(averageDaily * 100) / 100,
    trend: 'stable',
    nextBillingCycle: {
      estimatedKwh: 4650,
      estimatedCost: 790,
      daysRemaining: 18
    },
    seasonalAdjustment: {
      summer: 1.15,
      winter: 1.25,
      spring: 1.0,
      autumn: 0.95
    }
  });
}