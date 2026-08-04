"use client"

import React from "react";
import { UserRole } from "../types";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ roles, children, fallback = null }) => {
  const { user, isLoading, hasAnyRole } = useAuth();

  if (isLoading) {
    // Optionally return a skeleton or just null
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || !hasAnyRole(roles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
