import { UserRole, Permission } from "../types";

// Matrix of default permissions by role.
// Note: In a real backend, this is dynamic. This is a frontend approximation.
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "tenant:create",
    "tenant:manage",
    "organisation:manage",
    "tournament:create",
    "tournament:manage",
    "match:score",
    "player:view",
    "player:evaluate",
    "payment:view",
    "payment:manage",
    "video:upload",
    "video:view",
    "development:view",
    "billing:manage",
  ],
  ORG_ADMIN: [
    "organisation:manage",
    "tournament:create",
    "tournament:manage",
    "match:score",
    "player:view",
    "player:evaluate",
    "payment:view",
    "payment:manage",
    "video:upload",
    "video:view",
    "development:view",
    "billing:manage",
  ],
  CLUB_MANAGER: [
    "organisation:manage", // Limited in reality
    "tournament:create",
    "tournament:manage",
    "match:score",
    "player:view",
    "payment:view", // Limited
    "video:upload",
    "video:view",
    "development:view",
  ],
  HEAD_COACH: [
    "player:view",
    "player:evaluate",
    "video:upload",
    "video:view",
    "development:view",
  ],
  COACH: [
    "player:view", // Assigned teams
    "player:evaluate", // Assigned teams
    "match:score", // Conditional
    "video:upload",
    "video:view",
    "development:view", // Assigned teams
  ],
  REFEREE: [
    "match:score", // Assigned matches
  ],
  PARENT_GUARDIAN: [
    "player:view", // Own child
    "payment:view", // Own
    "video:view",
    "development:view", // Own child
  ],
  PLAYER: [
    "player:view", // Own profile
    "video:view",
    "development:view", // Own profile
  ],
  ANALYST: [
    "player:view",
    "video:upload",
    "video:view",
    "development:view",
  ],
};
