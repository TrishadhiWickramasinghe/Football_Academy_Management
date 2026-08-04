import { SuperAdminDashboardData } from "../types/dashboard.types"

const mockData: SuperAdminDashboardData = {
  kpis: {
    totalOrganisations: { value: 248, trend: "up", percentageChange: 12.4, previousValue: 220 },
    activeOrganisations: { value: 231, trend: "up", percentageChange: 8.2, previousValue: 213 },
    totalPlayers: { value: 12450, trend: "up", percentageChange: 5.2, previousValue: 11800 },
    activeCoaches: { value: 1840, trend: "up", percentageChange: 3.1, previousValue: 1780 },
    mrr: { value: "$42,500", trend: "up", percentageChange: 18.1, previousValue: "$36,000" },
    arr: { value: "$510,000", trend: "up", percentageChange: 18.1, previousValue: "$432,000" },
    monthlyRevenue: { value: "$48,200", trend: "up", percentageChange: 15.4, previousValue: "$41,750" },
    outstandingInvoices: { value: "$3,450", trend: "down", percentageChange: -12.5, previousValue: "$3,940" },
    newOrganisations: { value: 28, trend: "up", percentageChange: 40.0, previousValue: 20 },
    newPlayers: { value: 650, trend: "neutral", percentageChange: 0, previousValue: 650 },
    activeUsers: { value: 14200, trend: "up", percentageChange: 7.8, previousValue: 13100 },
    churnRate: { value: "1.2%", trend: "down", percentageChange: -0.3, previousValue: "1.5%" },
  },
  organisationGrowth: [
    { date: "Jan", newOrganisations: 12, totalOrganisations: 150, activeOrganisations: 142 },
    { date: "Feb", newOrganisations: 18, totalOrganisations: 168, activeOrganisations: 155 },
    { date: "Mar", newOrganisations: 22, totalOrganisations: 190, activeOrganisations: 178 },
    { date: "Apr", newOrganisations: 15, totalOrganisations: 205, activeOrganisations: 195 },
    { date: "May", newOrganisations: 25, totalOrganisations: 230, activeOrganisations: 215 },
    { date: "Jun", newOrganisations: 18, totalOrganisations: 248, activeOrganisations: 231 },
  ],
  revenueTrend: [
    { month: "Jan", revenue: 28000, mrr: 25000, payments: 30000, refunds: 500, outstanding: 2000 },
    { month: "Feb", revenue: 32000, mrr: 28000, payments: 31000, refunds: 800, outstanding: 2500 },
    { month: "Mar", revenue: 38000, mrr: 32000, payments: 37000, refunds: 400, outstanding: 1800 },
    { month: "Apr", revenue: 41000, mrr: 36000, payments: 40500, refunds: 600, outstanding: 2200 },
    { month: "May", revenue: 46000, mrr: 40000, payments: 45000, refunds: 700, outstanding: 1900 },
    { month: "Jun", revenue: 48200, mrr: 42500, payments: 48000, refunds: 300, outstanding: 1500 },
  ],
  subscriptions: {
    active: 220,
    trial: 18,
    pastDue: 6,
    suspended: 2,
    cancelled: 2,
    expiringSoon: 14,
  },
  planDistribution: [
    { plan: "Starter", count: 112, revenueContribution: 11200 },
    { plan: "Professional", count: 89, revenueContribution: 17800 },
    { plan: "Enterprise", count: 31, revenueContribution: 9300 },
    { plan: "White-label", count: 16, revenueContribution: 4200 },
  ],
  tenantTypes: [
    { type: "Academy", total: 120, active: 115, newThisMonth: 15, growthPercentage: 14 },
    { type: "School", total: 65, active: 60, newThisMonth: 8, growthPercentage: 12 },
    { type: "Company", total: 40, active: 38, newThisMonth: 4, growthPercentage: 10 },
    { type: "Club", total: 23, active: 18, newThisMonth: 1, growthPercentage: 4 },
  ],
  systemHealth: [
    { service: "API", status: "Operational" },
    { service: "Database", status: "Operational" },
    { service: "Authentication", status: "Operational" },
    { service: "Payments", status: "Operational" },
    { service: "Email", status: "Operational" },
    { service: "Video Processing", status: "Degraded" },
  ],
  recentActivity: [
    { id: "1", organisation: "One Premier Academy", event: "Professional plan activated", timestamp: "10 mins ago", status: "success" },
    { id: "2", organisation: "London Football School", event: "New custom domain verified", timestamp: "45 mins ago", status: "success" },
    { id: "3", organisation: "Global Sports Tech", event: "Payment failed", timestamp: "2 hours ago", status: "error" },
    { id: "4", organisation: "Youth Skills Club", event: "New organisation registered", timestamp: "3 hours ago", status: "info" },
    { id: "5", organisation: "Pro Training Co", event: "Subscription suspended", timestamp: "5 hours ago", status: "warning" },
  ],
  alerts: [
    { id: "1", category: "Warning", message: "3 SSL certificates expiring soon" },
    { id: "2", category: "Critical", message: "2 failed payment processes in the last hour" },
    { id: "3", category: "Information", message: "Database backup completed successfully" },
  ]
}

export class SuperAdminDashboardService {
  async getDashboardData(): Promise<SuperAdminDashboardData> {
    // Simulate network delay for realistic loading states
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData)
      }, 800)
    })
  }
}

export const superAdminDashboardService = new SuperAdminDashboardService()
