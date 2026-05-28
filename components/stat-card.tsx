"use client";

import NumberFlow from "@number-flow/react";
import { useState } from "react";
import {
  Area,
  AreaChart as RechartsArea,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  label?: string;
  trend?: number;
  data: { date: string; value: number }[];
  formatOptions?: {
    notation?: "standard" | "compact";
    compactDisplay?: "short" | "long";
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumIntegerDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
    style?: "decimal" | "percent" | "currency";
    currency?: string;
    currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
    unit?: string;
    unitDisplay?: "short" | "long" | "narrow";
  };
  prefix?: string;
  suffix?: string;
  className?: string;
  chartColor?: string;
}

const GRADIENT_ID = "stat-card-gradient";

export function StatCard({
  title,
  value,
  label = "Avg",
  trend,
  data,
  formatOptions = {
    notation: "standard",
    maximumFractionDigits: 0,
  },
  prefix,
  suffix,
  className,
  chartColor = "var(--color-accent)",
}: StatCardProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value;

  return (
    <Card className={cn("w-full gap-0 py-0", className)}>
      <CardHeader className="px-4 py-3">
        <CardTitle className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          {title}
        </CardTitle>
        {trend != null && (
          <TrendBadge value={trend} />
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-4 pt-2 pb-3">
        {/* Animated value */}
        <div className="flex flex-col">
          <span className="text-3xl font-semibold leading-none tracking-tight tabular-nums">
            <NumberFlow
              format={formatOptions}
              prefix={prefix}
              suffix={suffix}
              value={displayValue}
              willChange
            />
          </span>
          <span className="mt-0.5 text-xs text-muted-foreground">
            {label}
          </span>
        </div>

        {/* Sparkline */}
        <div className="relative -mx-4 -mb-3 h-[var(--stat-card-chart-h,96px)] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsArea
              data={data}
              margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
              onMouseMove={(e) => {
                if (e.activePayload?.[0]) {
                  setHoverValue(e.activePayload[0].payload.value);
                }
              }}
              onMouseLeave={() => setHoverValue(null)}
            >
              <defs>
                <linearGradient
                  id={GRADIENT_ID}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={<span />}
                cursor={{
                  stroke: chartColor,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                  strokeOpacity: 0.5,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#${GRADIENT_ID})`}
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: chartColor,
                  stroke: "var(--color-paper)",
                  strokeWidth: 2,
                }}
              />
            </RechartsArea>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;
  const Icon = positive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        positive
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400"
      )}
    >
      <Icon className="size-3" />
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7" />
    </svg>
  );
}
