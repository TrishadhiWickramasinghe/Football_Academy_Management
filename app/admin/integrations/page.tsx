import React from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { IntegrationCard } from '@/components/integrations/IntegrationCard';
import { INTEGRATION_REGISTRY } from '@/lib/integrations/config';
import { StripeAdapter } from '@/lib/integrations/stripe/adapter';
import { ClerkAdapter } from '@/lib/integrations/clerk/adapter';
import { MuxAdapter } from '@/lib/integrations/mux/adapter';
import { VeoAdapter } from '@/lib/integrations/veo/adapter';

// Initialize adapters
const adapters = {
  stripe: new StripeAdapter(),
  clerk: new ClerkAdapter(),
  mux: new MuxAdapter(),
  veo: new VeoAdapter(),
  // For Datadog, we'd have a DatadogAdapter, but using a generic fallback for the demo
  datadog: { connect: async () => ({ success: true, message: 'Mock connected' }), getStatus: () => 'Mock Mode', id: 'datadog', disconnect: async () => true, getClient: () => null }
};

export default function SuperAdminIntegrationsPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto"
    >
      <motion.div variants={fadeUp} className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Connect and manage the services that power AcademySphere.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-xl font-semibold">Platform Infrastructure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard config={INTEGRATION_REGISTRY.clerk} adapter={adapters.clerk} />
          <IntegrationCard config={INTEGRATION_REGISTRY.mux} adapter={adapters.mux} />
          <IntegrationCard config={INTEGRATION_REGISTRY.datadog} adapter={adapters.datadog as any} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-6 pt-6 border-t">
        <h2 className="text-xl font-semibold">Tenant-Scoped Services</h2>
        <p className="text-sm text-muted-foreground mb-4">These services are configured individually by each Organisation Admin.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard config={INTEGRATION_REGISTRY.stripe} adapter={adapters.stripe} />
          <IntegrationCard config={INTEGRATION_REGISTRY.veo} adapter={adapters.veo} />
        </div>
      </motion.div>
    </motion.div>
  );
}
