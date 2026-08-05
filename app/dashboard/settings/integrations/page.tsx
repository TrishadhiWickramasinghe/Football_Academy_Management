import React from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { IntegrationCard } from '@/components/integrations/IntegrationCard';
import { INTEGRATION_REGISTRY } from '@/lib/integrations/config';
import { StripeAdapter } from '@/lib/integrations/stripe/adapter';
import { VeoAdapter } from '@/lib/integrations/veo/adapter';

// Initialize tenant-scoped adapters
const adapters = {
  stripe: new StripeAdapter(),
  veo: new VeoAdapter(),
};

export default function OrganisationIntegrationsPage() {
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
          Connect third-party services to your academy for payments, video analysis, and more.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-xl font-semibold">Payments & Billing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard config={INTEGRATION_REGISTRY.stripe} adapter={adapters.stripe} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-6 pt-6 border-t">
        <h2 className="text-xl font-semibold">Video Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <IntegrationCard config={INTEGRATION_REGISTRY.veo} adapter={adapters.veo} />
        </div>
      </motion.div>
      
      <motion.div variants={fadeUp} className="space-y-6 pt-6 border-t opacity-60">
        <h2 className="text-xl font-semibold">School Integrations</h2>
        <p className="text-sm text-muted-foreground mb-4">Coming in Phase 3. Connect Google Classroom or Microsoft Teams to sync academic calendars.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Placeholders for upcoming integrations */}
           <div className="p-6 bg-muted border border-dashed rounded-xl flex items-center justify-center">
              <span className="font-medium text-muted-foreground">Google Classroom (Coming Soon)</span>
           </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
