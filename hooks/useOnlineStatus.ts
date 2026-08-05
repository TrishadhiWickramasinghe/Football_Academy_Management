import { useState, useEffect } from 'react';

/**
 * Custom hook to track whether the browser is currently online or offline.
 * Defaults to true if window is undefined (e.g. during SSR).
 */
export function useOnlineStatus(): boolean {
  const getInitialStatus = () => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  };

  const [isOnline, setIsOnline] = useState<boolean>(getInitialStatus);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
