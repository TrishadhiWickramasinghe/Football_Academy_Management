import { useAuthContext } from "../contexts/AuthContext";
import { UserRole, Permission } from "../types";

export const useAuth = () => {
  const { user, isLoading, switchRole, hasRole, hasPermission } = useAuthContext();

  // Helper for scope checks - in a real app, these would verify against
  // the user's assignedTeamIds, linkedPlayerIds, etc.
  const canAccessTeam = (teamId: string) => {
    if (!user) return false;
    if (["SUPER_ADMIN", "ORG_ADMIN", "CLUB_MANAGER", "HEAD_COACH"].includes(user.role)) return true;
    return user.assignedTeamIds?.includes(teamId) || false;
  };

  const canAccessPlayer = (playerId: string) => {
    if (!user) return false;
    if (["SUPER_ADMIN", "ORG_ADMIN", "CLUB_MANAGER", "HEAD_COACH"].includes(user.role)) return true;
    if (user.role === "PARENT_GUARDIAN") return user.linkedPlayerIds?.includes(playerId) || false;
    if (user.role === "PLAYER") return user.id === playerId;
    // For COACH, we would check if the player belongs to an assigned team.
    // For now, assuming coach can see players in their teams.
    return true; 
  };

  return {
    user,
    isLoading,
    role: user?.role || null,
    
    // Actions
    switchRole,
    
    // Auth Guards
    hasRole,
    hasAnyRole: (roles: UserRole[]) => roles.some(r => hasRole([r])),
    hasPermission,
    
    // Scope Guards
    canAccessTeam,
    canAccessPlayer,
  };
};
