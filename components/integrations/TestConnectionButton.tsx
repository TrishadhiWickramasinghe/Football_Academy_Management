"use client";

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { IntegrationAdapter } from '@/lib/integrations/types';

interface TestConnectionButtonProps {
  adapter: IntegrationAdapter<any>;
  onStatusChange?: (status: string) => void;
}

export function TestConnectionButton({ adapter, onStatusChange }: TestConnectionButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleTest = async () => {
    setLoading(true);
    setResult('idle');
    
    try {
      const response = await adapter.connect();
      setResult(response.success ? 'success' : 'error');
      setMessage(response.message || '');
      if (onStatusChange && response.success) {
        onStatusChange('Connected');
      }
    } catch (err) {
      setResult('error');
      setMessage('Failed to connect.');
    } finally {
      setLoading(false);
      // Reset visual state after a few seconds
      setTimeout(() => setResult('idle'), 3000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleTest}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium bg-muted hover:bg-muted/80 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
        {loading ? 'Connecting...' : 'Test Connection'}
      </button>

      {result === 'success' && (
        <span className="flex items-center gap-1 text-sm text-success animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4" /> Connected
        </span>
      )}
      
      {result === 'error' && (
        <span className="flex items-center gap-1 text-sm text-destructive animate-in fade-in duration-300">
          <XCircle className="w-4 h-4" /> {message}
        </span>
      )}
    </div>
  );
}
