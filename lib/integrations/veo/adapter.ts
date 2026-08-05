import { IntegrationAdapter, IntegrationStatus } from '../types';

export class VeoAdapter implements IntegrationAdapter<any> {
  id = 'veo';
  private status: IntegrationStatus = 'Not Configured'; // Tenant level integration

  async connect() {
    this.status = 'Connecting';
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.status = 'Connected';
    return { success: true, message: 'Veo cameras synced successfully.' };
  }

  async disconnect() {
    this.status = 'Disconnected';
    return true;
  }

  getStatus() { return this.status; }
  getClient() { return null; }
}
