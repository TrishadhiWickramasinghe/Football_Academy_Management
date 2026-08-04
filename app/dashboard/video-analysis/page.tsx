import { Metadata } from "next"
import { VideoAnalysisDashboard } from "@/features/video-analysis/components/VideoAnalysisDashboard"

export const metadata: Metadata = {
  title: "Video Analysis | AcademySphere",
  description: "Manage match footage, training videos, and AI highlights.",
}

export default function VideoAnalysisPage() {
  return (
    <div className="flex-1 space-y-4">
      <VideoAnalysisDashboard />
    </div>
  )
}
