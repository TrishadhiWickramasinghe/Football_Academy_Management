import { Metadata } from "next"
import { BrandingSettings } from "@/features/settings/components/BrandingSettings"

export const metadata: Metadata = {
  title: "Brand Settings | AcademySphere",
  description: "Customise your academy's brand identity, colours, and domain.",
}

export default function BrandingSettingsPage() {
  return (
    <div className="flex-1 space-y-4">
      <BrandingSettings />
    </div>
  )
}
