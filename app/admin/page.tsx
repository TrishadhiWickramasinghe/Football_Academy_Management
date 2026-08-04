import { Metadata } from "next"
import { SuperAdminDashboard } from "@/features/dashboards/components/widgets/SuperAdminDashboard"

export const metadata: Metadata = {
  title: "Admin Platform | AcademySphere",
  description: "AcademySphere Platform Administration",
}

export default function AdminPage() {
  return (
    <div className="flex-1 p-4 lg:p-6 lg:px-8">
      <SuperAdminDashboard />
    </div>
  )
}
