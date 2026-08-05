export interface PlatformOverview {
  totalOrganisations: number
  activeOrganisations: number
  totalPlayers: number
  activeCoaches: number
  mrr: number
  arr: number
  monthlyRevenue: number
  outstandingInvoices: number
  newOrganisations: number
  newPlayers: number
  activeUsers: number
  churnRate: number
}

export interface MetricComparison {
  value: number | string
  trend: "up" | "down" | "neutral"
  percentageChange: number
  previousValue?: number | string
}

export interface KpiMetrics {
  totalOrganisations: MetricComparison
  activeOrganisations: MetricComparison
  totalPlayers: MetricComparison
  activeCoaches: MetricComparison
  mrr: MetricComparison
  arr: MetricComparison
  monthlyRevenue: MetricComparison
  outstandingInvoices: MetricComparison
  newOrganisations: MetricComparison
  newPlayers: MetricComparison
  activeUsers: MetricComparison
  churnRate: MetricComparison
}

export interface OrganisationGrowthDataPoint {
  date: string
  newOrganisations: number
  totalOrganisations: number
  activeOrganisations: number
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  mrr: number
  payments: number
  refunds: number
  outstanding: number
}

export interface SubscriptionOverview {
  active: number
  trial: number
  pastDue: number
  suspended: number
  cancelled: number
  expiringSoon: number
}

export interface PlanDistribution {
  plan: string
  count: number
  revenueContribution: number
}

export interface TenantTypeDistribution {
  type: string
  total: number
  active: number
  newThisMonth: number
  growthPercentage: number
}

export interface SystemHealthStatus {
  service: string
  status: "Operational" | "Degraded" | "Unavailable"
}

export interface RecentActivity {
  id: string
  organisation: string
  event: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
}

export interface SystemAlert {
  id: string
  category: "Critical" | "Warning" | "Information"
  message: string
}

export interface SuperAdminDashboardData {
  kpis: KpiMetrics
  organisationGrowth: OrganisationGrowthDataPoint[]
  revenueTrend: RevenueDataPoint[]
  subscriptions: SubscriptionOverview
  planDistribution: PlanDistribution[]
  tenantTypes: TenantTypeDistribution[]
  systemHealth: SystemHealthStatus[]
  recentActivity: RecentActivity[]
  alerts: SystemAlert[]
}

export type TimeRange = 'today' | '7d' | '30d' | '3m' | '6m' | '12m' | 'custom';

export interface DashboardFilters {
  dateRange: TimeRange;
  locationId?: string;
  teamId?: string;
  programId?: string;
}

export interface OrgAdminMetrics {
  activePlayers: MetricComparison;
  monthlyRevenue: MetricComparison;
  activeTeams: MetricComparison;
  attendanceRate: MetricComparison;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  type: 'Training' | 'Match' | 'Tournament' | 'Camp' | 'Meeting';
  date: string; // ISO string
  location: string;
  isLive?: boolean;
}

export interface OrgAdminDashboardData {
  kpis: OrgAdminMetrics;
  upcomingEvents: UpcomingEvent[];
  recentActivity: RecentActivity[];
  alerts: SystemAlert[];
}
