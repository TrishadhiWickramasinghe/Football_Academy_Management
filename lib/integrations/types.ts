export type IntegrationStatus = 
  | 'Connected'
  | 'Connecting'
  | 'Disconnected'
  | 'Error'
  | 'Not Configured'
  | 'Unavailable'
  | 'Mock Mode';

export type IntegrationCategory = 
  | 'Payments'
  | 'Authentication'
  | 'Video'
  | 'Communication'
  | 'Storage'
  | 'Search'
  | 'Analytics'
  | 'Monitoring'
  | 'Maps'
  | 'Education'
  | 'CI/CD';

export interface IntegrationConfig {
  id: string;
  name: string;
  provider: string;
  category: IntegrationCategory;
  description: string;
  isPlatformLevel: boolean; // True if it's a global infrastructure service (Datadog) vs tenant-level (Stripe)
  status: IntegrationStatus;
  capabilities: string[];
  environment: 'Production' | 'Sandbox' | 'Development';
  lastSyncAt?: string;
  lastError?: string;
}

export interface IntegrationAdapter<T> {
  id: string;
  connect(): Promise<{ success: boolean; message?: string }>;
  disconnect(): Promise<boolean>;
  getStatus(): IntegrationStatus;
  getClient(): T | null;
}
