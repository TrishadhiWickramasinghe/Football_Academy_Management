import { Metadata } from "next"
import { TournamentWizard } from "@/features/tournaments/components/TournamentWizard"

export const metadata: Metadata = {
  title: "Create Tournament | AcademySphere",
  description: "Create a new tournament.",
}

export default function NewTournamentPage() {
  return (
    <div className="flex-1 p-6">
      <TournamentWizard />
    </div>
  )
}
