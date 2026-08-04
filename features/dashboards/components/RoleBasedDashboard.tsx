"use client"

import { useAuth } from "@/features/auth/hooks/useAuth"
import { Loader2 } from "lucide-react"

// Import widgets (these will be created in step 6)
import { SuperAdminDashboard } from "./widgets/SuperAdminDashboard"
import { OrgAdminDashboard } from "./widgets/OrgAdminDashboard"
import { CoachDashboard } from "./widgets/CoachDashboard"
import { ParentDashboard } from "./widgets/ParentDashboard"
import { PlayerDashboard } from "./widgets/PlayerDashboard"
import { RefereeDashboard } from "./widgets/RefereeDashboard"
import { AnalystDashboard } from "./widgets/AnalystDashboard"

export function RoleBasedDashboard() {
  const { role, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Render specific dashboard based on role
  switch (role) {
    case "SUPER_ADMIN":
      return <SuperAdminDashboard />
    case "ORG_ADMIN":
    case "CLUB_MANAGER":
      return <OrgAdminDashboard />
    case "HEAD_COACH":
    case "COACH":
      return <CoachDashboard />
    case "PARENT_GUARDIAN":
      return <ParentDashboard />
    case "PLAYER":
      return <PlayerDashboard />
    case "REFEREE":
      return <RefereeDashboard />
    case "ANALYST":
      return <AnalystDashboard />
    default:
      return (
        <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-2xl font-bold">Welcome to AcademySphere</h2>
          <p className="text-muted-foreground max-w-md">
            Please contact your administrator to assign a role to your account.
          </p>
        </div>
      )
  }
}
