import { IntegrationAdapter, IntegrationStatus } from '../types';

export class MuxAdapter implements IntegrationAdapter<any> {
  id = 'mux';
  private status: IntegrationStatus = 'Connected'; // Platform level integration

  async connect() {
    return { success: true, message: 'Platform level video processing connected.' };
  }

  async disconnect() {
    return false;
  }

  getStatus() { return this.status; }
  getClient() { return null; }
}
