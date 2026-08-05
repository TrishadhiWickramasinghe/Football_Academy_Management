import { IntegrationConfig } from './types';

/**
 * Global Registry of Integrations for AcademySphere
 * This defines the capabilities and default states for both Platform (Super Admin)
 * and Tenant (Org Admin) scoped integrations.
 */
export const INTEGRATION_REGISTRY: Record<string, IntegrationConfig> = {
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    provider: 'stripe',
    category: 'Payments',
    description: 'Process payments, subscriptions, and payouts.',
    isPlatformLevel: false, // Tenants configure their own Stripe Connect accounts
    status: 'Not Configured',
    capabilities: ['Payments', 'Subscriptions', 'Connect', 'Refunds'],
    environment: 'Sandbox'
  },
  clerk: {
    id: 'clerk',
    name: 'Clerk Auth',
    provider: 'clerk',
    category: 'Authentication',
    description: 'User identity, sessions, and MFA.',
    isPlatformLevel: true, 
    status: 'Connected',
    capabilities: ['Auth', 'MFA', 'B2B Orgs', 'SSO'],
    environment: 'Development'
  },
  mux: {
    id: 'mux',
    name: 'Mux Video',
    provider: 'mux',
    category: 'Video',
    description: 'Video encoding and streaming infrastructure.',
    isPlatformLevel: true,
    status: 'Connected',
    capabilities: ['Encoding', 'Streaming', 'Thumbnails'],
    environment: 'Development'
  },
  veo: {
    id: 'veo',
    name: 'Veo',
    provider: 'veo',
    category: 'Video',
    description: 'Automated sports camera integration.',
    isPlatformLevel: false, // Tenants connect their own Veo accounts
    status: 'Not Configured',
    capabilities: ['Match Sync', 'Highlights'],
    environment: 'Production'
  },
  datadog: {
    id: 'datadog',
    name: 'Datadog',
    provider: 'datadog',
    category: 'Monitoring',
    description: 'Infrastructure and API monitoring.',
    isPlatformLevel: true,
    status: 'Mock Mode', // Currently mocked until backend configuration is applied
    capabilities: ['Logs', 'APM', 'RUM'],
    environment: 'Development'
  }
};
