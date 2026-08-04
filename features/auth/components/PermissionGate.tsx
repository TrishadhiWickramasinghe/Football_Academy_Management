"use client"

import React from "react";
import { Permission } from "../types";
import { useAuth } from "../hooks/useAuth";

interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ permission, children, fallback = null }) => {
  const { user, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return null; // Avoid flashing permission-gated content
  }

  if (!user || !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
