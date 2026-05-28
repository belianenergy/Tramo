// ============================================================
// EnergyOS - TypeScript Interfaces
// ============================================================

export interface Community {
  id: string
  name: string
  address: string
  city: string
  units: number
  totalKwh: number
  totalCost: number
  status: 'optimized' | 'warning' | 'alert'
  administrator: string
  postalCode: string
}

export interface Listing {
  id: string
  name: string
  location: string
  monthlyKwh: number
  monthlyCost: number
  status: 'optimized' | 'warning' | 'alert'
  tenant: string | null
  units: number
  cups: string
  contractStatus: 'active' | 'inactive' | 'pending'
}

export interface Alert {
  id: string
  type: 'warning' | 'danger' | 'success' | 'info'
  message: string
  property: string
  timestamp: string
  read: boolean
}

export interface DashboardData {
  totalCommunities: number
  totalKwh: number
  totalCost: number
  activeAlerts: number
  monthlySavings: number
  arbitrageStatus: string
  consumptionHistory: ConsumptionPoint[]
}

export interface ConsumptionPoint {
  label: string
  value: number
}

export interface OmiePrices {
  prices: number[]
  timestamp: string
  trend: 'up' | 'down' | 'stable'
}

export interface Tariff {
  id: string
  name: string
  type: string
  pricePerKwh: number
  powerCostPerDay: number
  offPeakRate?: number
  peakRate?: number
  description: string
}

export interface ArbitrageConfig {
  batteryCapacity: number // kWh
  maxPower: number // kW
  efficiency: number // percentage
  cycles: number
}

export interface AdvisorResult {
  currentTariff: string
  recommendedTariff: string
  currentCost: number
  recommendedCost: number
  monthlySavings: number
  annualSavings: number
  recommendation: string
}

export interface OperationItem {
  id: string
  at: string
  propertyId: string
  propertyName: string
  type: 'precheckin_climate' | 'postcheckout_saving' | 'anomaly_alert' | 'owner_report'
  status: 'scheduled' | 'needs_review' | 'done' | 'sent'
  summary: string
}
