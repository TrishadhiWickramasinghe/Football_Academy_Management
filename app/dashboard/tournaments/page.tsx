import { Metadata } from "next"
import { TournamentDashboard } from "@/features/tournaments/components/TournamentDashboard"

export const metadata: Metadata = {
  title: "Tournaments | AcademySphere",
  description: "Manage tournaments, brackets, and live matches.",
}

export default function TournamentsPage() {
  return (
    <div className="flex-1 space-y-4">
      <TournamentDashboard />
    </div>
  )
}
