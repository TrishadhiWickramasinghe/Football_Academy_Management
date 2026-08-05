import { OrgAdminDashboardData, SuperAdminDashboardData, DashboardFilters } from "../types/dashboard.types";

/**
 * Service to define the API contracts for the Dashboard & Analytics module.
 * In a real scenario, this would use a fetch/axios client configured with authentication and tenant context.
 */
export class AnalyticsService {
  /**
   * Fetch Super Admin platform-wide dashboard data
   */
  static async getSuperAdminDashboard(filters?: DashboardFilters): Promise<SuperAdminDashboardData> {
    // Contract: GET /api/dashboard/super-admin
    // The backend should return the aggregated data based on the requested filters
    // Currently throwing an error because the backend endpoint does not exist yet.
    throw new Error("API not implemented: GET /api/dashboard/super-admin");
  }

  /**
   * Fetch Organisation Admin tenant-scoped dashboard data
   */
  static async getOrgAdminDashboard(filters?: DashboardFilters): Promise<OrgAdminDashboardData> {
    // Contract: GET /api/dashboard/org-admin
    // The backend should respect the tenantId from the auth token and apply location/date filters
    throw new Error("API not implemented: GET /api/dashboard/org-admin");
  }
}
