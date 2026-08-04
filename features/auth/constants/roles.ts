import { RoleDefinition } from "../types";

export const ROLE_DEFINITIONS: Record<string, RoleDefinition> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Admin",
    description: "AcademySphere platform operator.",
    scope: "PLATFORM",
  },
  ORG_ADMIN: {
    role: "ORG_ADMIN",
    label: "Org Admin",
    description: "Organisation administrator.",
    scope: "TENANT",
  },
  CLUB_MANAGER: {
    role: "CLUB_MANAGER",
    label: "Club Manager",
    description: "Manages teams, schedules, and operations.",
    scope: "TENANT",
  },
  HEAD_COACH: {
    role: "HEAD_COACH",
    label: "Head Coach",
    description: "Senior coaching staff overseeing curriculum and coaches.",
    scope: "TENANT",
  },
  COACH: {
    role: "COACH",
    label: "Coach",
    description: "Delivers training sessions and manages assigned players.",
    scope: "TEAM",
  },
  REFEREE: {
    role: "REFEREE",
    label: "Referee",
    description: "Assigned to tournament matches.",
    scope: "MATCH",
  },
  PARENT_GUARDIAN: {
    role: "PARENT_GUARDIAN",
    label: "Parent / Guardian",
    description: "Accesses their child's profile and schedule.",
    scope: "FAMILY",
  },
  PLAYER: {
    role: "PLAYER",
    label: "Player",
    description: "Limited access to their own information.",
    scope: "SELF",
  },
  ANALYST: {
    role: "ANALYST",
    label: "Analyst",
    description: "Accesses video analysis and performance reporting.",
    scope: "ANALYTICS",
  },
};

export const getRoleLabel = (role: string): string => {
  return ROLE_DEFINITIONS[role]?.label || role;
};
