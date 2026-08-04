export type UserRole =
  | "SUPER_ADMIN"
  | "ORG_ADMIN"
  | "CLUB_MANAGER"
  | "HEAD_COACH"
  | "COACH"
  | "REFEREE"
  | "PARENT_GUARDIAN"
  | "PLAYER"
  | "ANALYST";

export type RoleScope = "PLATFORM" | "TENANT" | "TEAM" | "MATCH" | "FAMILY" | "SELF" | "ANALYTICS";

export interface RoleDefinition {
  role: UserRole;
  label: string;
  description: string;
  scope: RoleScope;
}

export type Permission =
  | "tenant:create"
  | "tenant:manage"
  | "organisation:manage"
  | "tournament:create"
  | "tournament:manage"
  | "match:score"
  | "player:view"
  | "player:evaluate"
  | "payment:view"
  | "payment:manage"
  | "video:upload"
  | "video:view"
  | "development:view"
  | "billing:manage";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: UserRole;
  tenantId?: string; // Optional for SUPER_ADMIN
  permissions: Permission[];
  assignedTeamIds?: string[];
  assignedMatchIds?: string[];
  linkedPlayerIds?: string[]; // For parents
}
