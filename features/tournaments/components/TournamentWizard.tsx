"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { tournamentsService } from "../services/tournaments.service"
import { TournamentFormat } from "../types/tournament.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, ArrowLeft, ArrowRight, Save, CheckCircle2, Loader2, Calendar as CalendarIcon, MapPin } from "lucide-react"

const STEPS = [
  "Basic Info",
  "Format",
  "Age Groups",
  "Venues",
  "Review & Publish"
]

export function TournamentWizard() {
  const router = useRouter()
  const { tenant } = useTenant()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    format: "round_robin" as TournamentFormat,
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(curr => curr + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1)
    }
  }

  const handlePublish = async () => {
    if (!tenant) return;
    setIsSubmitting(true);
    try {
      const created = await tournamentsService.createTournament({
        tenantId: tenant.id,
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        format: formData.format,
        timezone: "America/New_York", // Defaulting for demo
        ageGroups: [],
        venues: [],
        rules: { pointsForWin: 3, pointsForDraw: 1, pointsForLoss: 0, tiebreakers: [] }
      })
      router.push(`/dashboard/tournaments/${created.id}`);
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Tournament</h1>
          <p className="text-muted-foreground mt-1">Configure your new tournament.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b overflow-x-auto hide-scrollbar bg-muted/30">
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div 
                key={step} 
                className={`flex-1 min-w-[120px] py-4 px-4 text-center text-sm font-medium border-b-2 transition-colors ${
                  isActive ? "border-primary text-primary bg-background" : 
                  isCompleted ? "border-success/50 text-success bg-background" : 
                  "border-transparent text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">{index + 1}</span>}
                  {step}
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-8">
          {currentStep === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tournament Name <span className="text-destructive">*</span></label>
                  <Input 
                    placeholder="e.g. Academy Summer Cup 2026" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type="date"
                        className="pl-9"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date <span className="text-destructive">*</span></label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type="date"
                        className="pl-9"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="e.g. Mexico City" 
                      className="pl-9"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold mb-4">Tournament Format</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "round_robin", name: "Round Robin", desc: "Every team plays every other team." },
                  { id: "group_knockout", name: "Group Stage + Knockout", desc: "Teams are split into groups, followed by elimination rounds." },
                  { id: "single_elimination", name: "Single Elimination", desc: "Knockout format. One loss and you are out." }
                ].map(f => (
                  <div 
                    key={f.id} 
                    onClick={() => setFormData(prev => ({...prev, format: f.id as TournamentFormat}))}
                    className={`border rounded-xl p-6 cursor-pointer transition-all ${formData.format === f.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">{f.name}</h4>
                      {formData.format === f.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center py-12">
              <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Age Groups Configuration</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Age groups will be configurable after the tournament is drafted.</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">Venue Management</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Venues and fields will be assignable after the tournament is drafted.</p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-semibold mb-6">Review & Publish</h2>
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Tournament Name</span>
                  <span className="font-medium">{formData.name || "Not specified"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Dates</span>
                  <span className="font-medium">{formData.startDate} to {formData.endDate}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium uppercase text-xs bg-primary/10 text-primary px-2 py-1 rounded">{formData.format.replace("_", " ")}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-muted/20 border-t flex items-center justify-between">
          <Button variant="outline" onClick={currentStep === 0 ? () => router.push("/dashboard/tournaments") : handleBack}>
            {currentStep === 0 ? "Cancel" : <><ArrowLeft className="w-4 h-4 mr-2" /> Back</>}
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext} disabled={currentStep === 0 && (!formData.name || !formData.startDate || !formData.endDate)}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handlePublish} disabled={isSubmitting} className="bg-success hover:bg-success/90 text-success-foreground">
              {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publishing...</> : <><Save className="w-4 h-4 mr-2" /> Publish Draft</>}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
