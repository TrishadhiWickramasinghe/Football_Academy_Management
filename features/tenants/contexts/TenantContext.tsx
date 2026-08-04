"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { Tenant } from "../types";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";

interface TenantContextType {
  tenant: Tenant | null;
  isLoading: boolean;
  switchTenant: (tenantId: string) => void;
  availableTenants: Tenant[];
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Mock tenants for development
const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-001",
    name: "One Premier Academy",
    slug: "opaacademy",
    status: "active",
    subdomain: "opaacademy.academysphere.com",
    theme: {
      primary: "#1e3a8a",
      secondary: "#0ea5e9",
    },
    plan: "ENTERPRISE",
    whiteLabelEnabled: true,
  },
  {
    id: "tenant-002",
    name: "Elite Football School",
    slug: "elite-football",
    status: "active",
    subdomain: "elite.academysphere.com",
    theme: {
      primary: "#dc2626",
      secondary: "#fca5a5",
    },
    plan: "PROFESSIONAL",
    whiteLabelEnabled: false,
  }
];

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTenants, setAvailableTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    // Simulate loading tenant context based on user session
    const timer = setTimeout(() => {
      if (user) {
        setAvailableTenants(MOCK_TENANTS);
        // Find user's current tenant or default to the first one
        const currentTenant = MOCK_TENANTS.find(t => t.id === user.tenantId) || MOCK_TENANTS[0];
        setTenant(currentTenant);
      } else {
        setTenant(null);
        setAvailableTenants([]);
      }
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [user]);

  const switchTenant = (tenantId: string) => {
    const selected = availableTenants.find(t => t.id === tenantId);
    if (selected) {
      setTenant(selected);
    }
  };

  return (
    <TenantContext.Provider value={{ tenant, isLoading, switchTenant, availableTenants }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
