import { IntegrationAdapter, IntegrationStatus } from '../types';

/**
 * Stripe Adapter
 * 
 * Ensures the UI never interacts directly with the Stripe SDK.
 * This class handles tenant-scoped payment configuration.
 */
export class StripeAdapter implements IntegrationAdapter<any> {
  id = 'stripe';
  private status: IntegrationStatus = 'Not Configured';

  async connect() {
    this.status = 'Connecting';
    // In a real implementation, this would trigger an OAuth flow or verify API keys
    // For now, we simulate a successful connection for the UI demo.
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.status = 'Connected';
    return { success: true, message: 'Stripe connected successfully.' };
  }

  async disconnect() {
    this.status = 'Disconnected';
    return true;
  }

  getStatus() {
    return this.status;
  }

  getClient() {
    // In production, returns the initialized Stripe instance
    return null;
  }
}
