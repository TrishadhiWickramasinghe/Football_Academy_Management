import { RegistrationState } from "../types/organisation-registration.types";

/**
 * API Service for Organisation Registration & Tenant Provisioning.
 * This establishes the expected API contract with the backend.
 */
export class OrganisationRegistrationService {
  /**
   * Initializes a new organisation registration record on the server.
   * This is used to persist progress before checkout.
   */
  static async registerOrganisation(state: RegistrationState): Promise<{ id: string }> {
    // Contract: POST /api/register/organisation
    // The backend should validate the state, create a pending tenant, and return an ID.
    throw new Error("API not implemented: POST /api/register/organisation");
  }

  /**
   * Validates if a proposed subdomain is available and complies with rules.
   */
  static async validateSubdomain(subdomain: string): Promise<{ available: boolean }> {
    // Contract: POST /api/register/validate-domain
    throw new Error("API not implemented: POST /api/register/validate-domain");
  }

  /**
   * Initiates the Stripe checkout session for the selected plan.
   */
  static async createCheckoutSession(registrationId: string, planId: string): Promise<{ url: string }> {
    // Contract: POST /api/register/checkout
    // Backend creates a Stripe session linked to the pending registration and returns the URL to redirect to.
    throw new Error("API not implemented: POST /api/register/checkout");
  }

  /**
   * Polls the backend for the tenant provisioning status.
   * Used on the loading screen after a successful checkout.
   */
  static async getProvisionStatus(registrationId: string): Promise<{ status: 'Pending' | 'Provisioning' | 'Completed' | 'Failed' }> {
    // Contract: GET /api/register/provision-status
    throw new Error("API not implemented: GET /api/register/provision-status");
  }
}
