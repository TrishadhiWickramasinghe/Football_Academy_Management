"use client";

import React, { useState } from 'react';
import { IntegrationConfig, IntegrationAdapter } from '@/lib/integrations/types';
import { TestConnectionButton } from './TestConnectionButton';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface IntegrationCardProps {
  config: IntegrationConfig;
  adapter: IntegrationAdapter<any>;
}

export function IntegrationCard({ config, adapter }: IntegrationCardProps) {
  const [status, setStatus] = useState(config.status);

  return (
    <div className="flex flex-col bg-card border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{config.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
          </div>
          
          {/* Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
            ${status === 'Connected' ? 'bg-success/10 text-success border-success/20' : 
              status === 'Connecting' ? 'bg-info/10 text-info border-info/20 animate-pulse' : 
              status === 'Mock Mode' ? 'bg-warning/10 text-warning border-warning/20' : 
              'bg-muted text-muted-foreground border-border'}`}
          >
            {status === 'Connected' ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
             status === 'Mock Mode' ? <AlertCircle className="w-3.5 h-3.5" /> : null}
            {status}
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Environment</span>
            <span className="font-medium">{config.environment}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capabilities</span>
            <span className="font-medium text-right">{config.capabilities.join(', ')}</span>
          </div>

          {config.lastSyncAt && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4"/> Last Sync</span>
              <span className="font-medium">{config.lastSyncAt}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 border-t flex justify-between items-center">
        <TestConnectionButton adapter={adapter} onStatusChange={(newStatus) => setStatus(newStatus as any)} />
        <button className="text-sm text-primary font-medium hover:underline">
          Manage
        </button>
      </div>
    </div>
  );
}
