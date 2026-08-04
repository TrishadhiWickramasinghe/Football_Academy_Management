"use client"

import React, { useEffect } from "react";
import { useTenant } from "./TenantContext";

export const TenantBrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenant, isLoading } = useTenant();

  useEffect(() => {
    if (isLoading || !tenant) return;

    // Apply CSS variables to root based on tenant theme
    const root = document.documentElement;
    
    if (tenant.theme.primary) {
      root.style.setProperty("--tenant-primary", tenant.theme.primary);
    }
    
    if (tenant.theme.secondary) {
      root.style.setProperty("--tenant-secondary", tenant.theme.secondary);
    }

    // Also update document title for white label
    if (tenant.whiteLabelEnabled && tenant.name) {
      document.title = `${tenant.name} | Academy Management`;
    }

    // Cleanup on unmount or tenant change
    return () => {
      root.style.removeProperty("--tenant-primary");
      root.style.removeProperty("--tenant-secondary");
      document.title = "AcademySphere"; // fallback
    };
  }, [tenant, isLoading]);

  return <>{children}</>;
};
