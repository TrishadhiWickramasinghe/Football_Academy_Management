import { Metadata } from "next"
import { EnterpriseHierarchyUI } from "@/features/organisation/components/EnterpriseHierarchyUI"

export const metadata: Metadata = {
  title: "Organisation | AcademySphere",
  description: "Manage your regions, academies, and teams in one place.",
}

export default function OrganisationPage() {
  return (
    <div className="flex-1 space-y-4">
      <EnterpriseHierarchyUI />
    </div>
  )
}
