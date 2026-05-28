"use client";

import { StatCard } from "@/components/stat-card";

const CONSUMO_MENSUAL = [
  { date: "2024-01", value: 520 },
  { date: "2024-02", value: 610 },
  { date: "2024-03", value: 540 },
  { date: "2024-04", value: 470 },
  { date: "2024-05", value: 510 },
  { date: "2024-06", value: 680 },
  { date: "2024-07", value: 640 },
  { date: "2024-08", value: 720 },
  { date: "2024-09", value: 690 },
  { date: "2024-10", value: 810 },
  { date: "2024-11", value: 760 },
  { date: "2024-12", value: 880 },
];

const CONSUMO_MAYO = [
  { date: "May 1", value: 56 },
  { date: "May 5", value: 62 },
  { date: "May 10", value: 48 },
  { date: "May 15", value: 72 },
  { date: "May 20", value: 59 },
  { date: "May 24", value: 44 },
];

const AHORRO_MENSUAL = [
  { date: "2024-01", value: 48 },
  { date: "2024-02", value: 72 },
  { date: "2024-03", value: 55 },
  { date: "2024-04", value: 38 },
  { date: "2024-05", value: 65 },
  { date: "2024-06", value: 91 },
  { date: "2024-07", value: 83 },
  { date: "2024-08", value: 105 },
  { date: "2024-09", value: 94 },
  { date: "2024-10", value: 128 },
  { date: "2024-11", value: 112 },
  { date: "2024-12", value: 145 },
];

export default function BklitTestPage() {
  const avgConsumo =
    CONSUMO_MENSUAL.reduce((s, p) => s + p.value, 0) / CONSUMO_MENSUAL.length;
  const avgAhorro =
    AHORRO_MENSUAL.reduce((s, p) => s + p.value, 0) / AHORRO_MENSUAL.length;

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--color-paper, #EDEDE1)" }}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bklit-inspired Stat Cards
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tarxetas KPI con NumberFlow animado + Recharts sparkline
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Consumo Total"
            value={avgConsumo}
            label="Avg mensual"
            trend={12.4}
            data={CONSUMO_MENSUAL}
            formatOptions={{
              style: "decimal",
              maximumFractionDigits: 0,
            }}
            suffix=" kWh"
            chartColor="#09CF58"
          />

          <StatCard
            title="Aforro Estimado"
            value={avgAhorro}
            label="Avg mensual"
            trend={8.3}
            data={AHORRO_MENSUAL}
            formatOptions={{
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }}
            chartColor="#5266eb"
          />

          <StatCard
            title="Consumo Maio"
            value={44}
            label="Hoxe"
            trend={-3.1}
            data={CONSUMO_MAYO}
            formatOptions={{
              style: "decimal",
              maximumFractionDigits: 1,
            }}
            suffix=" kWh"
            chartColor="#f59e0b"
          />
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
          <p>
            📦 Dependencias: <code>@number-flow/react</code> +{" "}
            <code>motion</code> (instaladas)
          </p>
          <p>
            📊 Charts: <code>recharts</code> (xa no proxecto)
          </p>
          <p>
            🎨 Estilo: Tramo tokens — accent #09CF58, paper #EDEDE1, ink
            #061F00
          </p>
          <p>
            ⚡ Componente: <code>components/stat-card.tsx</code> (autocontido,
            sen dependencias de Bklit)
          </p>
        </div>
      </div>
    </div>
  );
}
