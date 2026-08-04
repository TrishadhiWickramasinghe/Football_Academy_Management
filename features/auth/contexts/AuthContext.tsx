"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { MockUser, UserRole, Permission } from "../types";
import { ROLE_PERMISSIONS } from "../constants/permissions";

interface AuthContextType {
  user: MockUser | null;
  isLoading: boolean;
  switchRole: (role: UserRole) => void;
  hasRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial development user (Head Coach)
const DEFAULT_USER: MockUser = {
  id: "user-dev-001",
  name: "Maria Hernandez",
  email: "maria@academysphere.com",
  role: "HEAD_COACH",
  tenantId: "tenant-001",
  permissions: ROLE_PERMISSIONS["HEAD_COACH"],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from session
    const timer = setTimeout(() => {
      setUser(DEFAULT_USER);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    
    // In a real app, this would make an API call to switch context
    // Here we just update the mock user's role and permissions
    setUser({
      ...user,
      role: newRole,
      permissions: ROLE_PERMISSIONS[newRole],
    });
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const hasPermission = (permission: Permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, switchRole, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
