import { IntegrationAdapter, IntegrationStatus } from '../types';

export class ClerkAdapter implements IntegrationAdapter<any> {
  id = 'clerk';
  private status: IntegrationStatus = 'Connected'; // Platform level integration

  async connect() {
    return { success: true, message: 'Platform level auth connected.' };
  }

  async disconnect() {
    return false; // Cannot disconnect core auth
  }

  getStatus() { return this.status; }
  getClient() { return null; }
}
