import { Metadata } from "next"
import { CurriculumBuilder } from "@/features/coaching/components/CurriculumBuilder"

export const metadata: Metadata = {
  title: "Curriculum Builder | AcademySphere",
  description: "Build and manage coaching methodologies and training sessions.",
}

export default function CurriculumPage() {
  return (
    <div className="flex-1 space-y-4">
      <CurriculumBuilder />
    </div>
  )
}
