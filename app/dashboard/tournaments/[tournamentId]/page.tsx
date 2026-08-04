import { Metadata } from "next"
import { TournamentDashboard } from "@/features/tournaments/components/TournamentDashboard"

export const metadata: Metadata = {
  title: "Tournament Command Centre | AcademySphere",
  description: "Live operational view for the tournament.",
}

export default function TournamentDetailPage({ params }: { params: { tournamentId: string } }) {
  return (
    <div className="flex-1 p-6">
      <TournamentDashboard tournamentId={params.tournamentId} />
    </div>
  )
}
