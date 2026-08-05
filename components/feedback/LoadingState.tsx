import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[200px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary opacity-50 mb-4" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
