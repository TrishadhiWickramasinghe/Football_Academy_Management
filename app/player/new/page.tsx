"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { playersService } from "@/features/players/services/players.service"
import { PLAYER_POSITIONS, AGE_GROUPS, METHODOLOGIES } from "@/features/players/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ChevronRight, ArrowLeft, UploadCloud, AlertCircle, Plus, Loader2 } from "lucide-react"

const STEPS = [
  "Player",
  "Football",
  "Guardian",
  "Medical",
  "Consent",
  "Review",
  "Complete"
]

export default function RegisterPlayerPage() {
  const router = useRouter()
  const { tenant } = useTenant()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registeredPlayerId, setRegisteredPlayerId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState<any>({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    preferredLanguage: "",
    primaryPosition: "",
    secondaryPosition: "",
    jerseyNumber: "",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianRelationship: "Parent",
    medicalConditions: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    consentRegistration: false,
    consentMedical: false,
    consentMedia: false,
    signature: ""
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }))
  }

  const handleSubmit = async () => {
    if (!tenant) return
    setIsSubmitting(true)
    try {
      const newPlayer = await playersService.createPlayer({
        tenantId: tenant.id,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        primaryPosition: formData.primaryPosition as any,
        jerseyNumber: formData.jerseyNumber ? parseInt(formData.jerseyNumber) : undefined,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        guardian1: {
          id: "g-new",
          name: formData.guardianName,
          email: formData.guardianEmail,
          phone: formData.guardianPhone,
          relationship: formData.guardianRelationship,
          isPrimary: true
        },
        status: "Active",
        ageGroup: "U13-U14" // Mock auto assignment
      })
      
      setRegisteredPlayerId(newPlayer.id)
      setCurrentStep(6) // Complete step
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate age purely for display
  const calculateAge = (dob: string) => {
    if (!dob) return "-"
    const birthDate = new Date(dob)
    const difference = Date.now() - birthDate.getTime()
    const ageDate = new Date(difference)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      
      {/* Header */}
      {currentStep < 6 && (
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 -ml-4" asChild>
            <Link href="/dashboard/players"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Players</Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Register New Player</h1>
          <p className="text-muted-foreground mt-1">Add a new player to your academy roster.</p>
        </div>
      )}

      {/* Progress Bar */}
      {currentStep < 6 && (
        <div className="mb-8 overflow-hidden hide-scrollbar">
          <div className="flex items-center justify-between relative min-w-[600px]">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 2)) * 100}%` }}
            ></div>
            
            {STEPS.slice(0, 6).map((step, index) => (
              <div key={index} className="flex flex-col items-center gap-2 bg-background px-1 z-10">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                    index < currentStep 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : index === currentStep
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground hidden sm:block">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wizard Cards */}
      <Card className="shadow-lg border-primary/10 relative overflow-hidden">
        
        {/* Step 1: Player */}
        {currentStep === 0 && (
          <>
            <CardHeader>
              <CardTitle>Player Information</CardTitle>
              <CardDescription>Basic details about the player.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0 flex flex-col gap-2">
                  <Label>Profile Photo</Label>
                  <div className="w-32 h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs text-center px-2">Upload Photo<br/>(Max 5MB)</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Diego Cruz" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                      <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                      <select 
                        id="gender" 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="e.g. Spanish" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Input id="preferredLanguage" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} placeholder="e.g. English" />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: Football */}
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Football Details</CardTitle>
              <CardDescription>Position, methodology, and sporting information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-primary">Automatic Age Group Assignment</p>
                  <p className="text-xs text-primary/80 mt-1">
                    Based on the Date of Birth ({formData.dateOfBirth || "Not provided"}), the player will be automatically assigned to the correct age group upon registration.
                  </p>
                  {formData.dateOfBirth && <p className="text-xs font-bold text-primary mt-2">Calculated Age: {calculateAge(formData.dateOfBirth)} years old</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryPosition">Primary Position <span className="text-red-500">*</span></Label>
                  <select 
                    id="primaryPosition" 
                    name="primaryPosition" 
                    value={formData.primaryPosition} 
                    onChange={handleChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="" disabled>Select Position</option>
                    {PLAYER_POSITIONS.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.value} — {pos.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryPosition">Secondary Position</Label>
                  <select 
                    id="secondaryPosition" 
                    name="secondaryPosition" 
                    value={formData.secondaryPosition} 
                    onChange={handleChange}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">None</option>
                    {PLAYER_POSITIONS.map(pos => (
                      <option key={pos.value} value={pos.value}>{pos.value} — {pos.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jerseyNumber">Preferred Jersey Number</Label>
                  <Input id="jerseyNumber" name="jerseyNumber" type="number" min="1" max="99" value={formData.jerseyNumber} onChange={handleChange} placeholder="e.g. 10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="methodology">Development Methodology</Label>
                  <select 
                    id="methodology" 
                    name="methodology" 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {METHODOLOGIES.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 3: Guardian */}
        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle>Family & Guardian</CardTitle>
              <CardDescription>Primary contact for the player.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-xl space-y-4">
                <h4 className="font-semibold text-sm">Primary Guardian</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="guardianName" name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="e.g. Maria Cruz" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianRelationship">Relationship <span className="text-red-500">*</span></Label>
                    <select 
                      id="guardianRelationship" 
                      name="guardianRelationship" 
                      value={formData.guardianRelationship} 
                      onChange={handleChange}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="Parent">Parent</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Other Family Member">Other Family Member</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianEmail">Email Address <span className="text-red-500">*</span></Label>
                    <Input id="guardianEmail" name="guardianEmail" type="email" value={formData.guardianEmail} onChange={handleChange} placeholder="e.g. maria@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Phone Number</Label>
                    <Input id="guardianPhone" name="guardianPhone" type="tel" value={formData.guardianPhone} onChange={handleChange} placeholder="+44 7700 900000" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Secondary Guardian</Button>
            </CardContent>
          </>
        )}

        {/* Step 4: Medical */}
        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription className="text-amber-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" /> Sensitive Information: Restricted access only.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <textarea 
                  id="medicalConditions" 
                  name="medicalConditions" 
                  value={formData.medicalConditions} 
                  onChange={handleChange} 
                  placeholder="List any known medical conditions (e.g. Asthma)"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <textarea 
                  id="allergies" 
                  name="allergies" 
                  value={formData.allergies} 
                  onChange={handleChange} 
                  placeholder="List any known allergies"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm mb-4">Emergency Contact <span className="text-red-500">*</span></h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Contact Name <span className="text-red-500">*</span></Label>
                    <Input id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} placeholder="e.g. Maria Cruz" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Contact Phone <span className="text-red-500">*</span></Label>
                    <Input id="emergencyContactPhone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleChange} placeholder="+44 7700 900000" />
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 5: Consent */}
        {currentStep === 4 && (
          <>
            <CardHeader>
              <CardTitle>Guardian Consent</CardTitle>
              <CardDescription>Review and agree to the required academy policies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 bg-muted/30 p-4 rounded-xl border">
                <div className="flex items-start space-x-3">
                  <input type="checkbox" id="consentRegistration" name="consentRegistration" checked={formData.consentRegistration} onChange={handleChange} className="mt-1 w-4 h-4 text-primary" />
                  <div className="space-y-1 leading-none">
                    <label htmlFor="consentRegistration" className="text-sm font-medium leading-none cursor-pointer">Registration Consent <span className="text-red-500">*</span></label>
                    <p className="text-xs text-muted-foreground mt-1">I agree to the AcademySphere terms of service and registration policies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mt-4">
                  <input type="checkbox" id="consentMedical" name="consentMedical" checked={formData.consentMedical} onChange={handleChange} className="mt-1 w-4 h-4 text-primary" />
                  <div className="space-y-1 leading-none">
                    <label htmlFor="consentMedical" className="text-sm font-medium leading-none cursor-pointer">Medical Treatment Consent <span className="text-red-500">*</span></label>
                    <p className="text-xs text-muted-foreground mt-1">I authorize emergency medical treatment for the player if required during academy activities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mt-4">
                  <input type="checkbox" id="consentMedia" name="consentMedia" checked={formData.consentMedia} onChange={handleChange} className="mt-1 w-4 h-4 text-primary" />
                  <div className="space-y-1 leading-none">
                    <label htmlFor="consentMedia" className="text-sm font-medium leading-none cursor-pointer">Photography / Media Consent</label>
                    <p className="text-xs text-muted-foreground mt-1">I consent to the use of photos/videos of the player for academy promotional purposes.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>E-Signature <span className="text-red-500">*</span></Label>
                <div className="border rounded-lg bg-white h-32 relative shadow-inner overflow-hidden">
                  <p className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 pointer-events-none select-none text-2xl font-serif italic">
                    Sign Here
                  </p>
                  <Input 
                    name="signature" 
                    value={formData.signature} 
                    onChange={handleChange} 
                    className="absolute inset-0 bg-transparent border-0 h-full font-serif text-3xl px-6 focus-visible:ring-0 z-10 placeholder:text-transparent" 
                    placeholder="Signature"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Type your full legal name to sign digitally.</p>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 6: Review */}
        {currentStep === 5 && (
          <>
            <CardHeader>
              <CardTitle>Review Registration</CardTitle>
              <CardDescription>Confirm the details before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-3 bg-muted/20 p-4 rounded-xl border">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-foreground">Player</h4>
                    <button onClick={() => setCurrentStep(0)} className="text-primary text-xs font-medium hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Name</span><span className="font-medium">{formData.fullName || "-"}</span>
                    <span className="text-muted-foreground">DOB</span><span className="font-medium">{formData.dateOfBirth || "-"}</span>
                    <span className="text-muted-foreground">Gender</span><span className="font-medium">{formData.gender || "-"}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-muted/20 p-4 rounded-xl border">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-foreground">Football</h4>
                    <button onClick={() => setCurrentStep(1)} className="text-primary text-xs font-medium hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Position</span><span className="font-medium">{formData.primaryPosition || "-"}</span>
                    <span className="text-muted-foreground">Jersey</span><span className="font-medium">{formData.jerseyNumber || "-"}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-muted/20 p-4 rounded-xl border">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-foreground">Guardian</h4>
                    <button onClick={() => setCurrentStep(2)} className="text-primary text-xs font-medium hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Name</span><span className="font-medium">{formData.guardianName || "-"}</span>
                    <span className="text-muted-foreground">Email</span><span className="font-medium truncate">{formData.guardianEmail || "-"}</span>
                  </div>
                </div>

                <div className="space-y-3 bg-muted/20 p-4 rounded-xl border">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-semibold text-foreground">Consent</h4>
                    <button onClick={() => setCurrentStep(4)} className="text-primary text-xs font-medium hover:underline">Edit</button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <span className="text-muted-foreground">Registration</span><span className="font-medium text-green-600">{formData.consentRegistration ? "✓ Agreed" : "Missing"}</span>
                    <span className="text-muted-foreground">Medical</span><span className="font-medium text-green-600">{formData.consentMedical ? "✓ Agreed" : "Missing"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 7: Complete */}
        {currentStep === 6 && (
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Player Registered Successfully</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {formData.fullName} has been added to the academy roster and is now active.
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-xl max-w-sm mx-auto my-6 text-left space-y-2 border">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Player ID</span>
                <span className="font-medium font-mono text-sm">{registeredPlayerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Age Group</span>
                <span className="font-medium text-sm">U13-U14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Status</span>
                <span className="font-medium text-green-600 text-sm flex items-center gap-1">● Active</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" onClick={() => {
                setFormData({
                  fullName: "", dateOfBirth: "", gender: "", nationality: "", preferredLanguage: "",
                  primaryPosition: "", secondaryPosition: "", jerseyNumber: "",
                  guardianName: "", guardianEmail: "", guardianPhone: "", guardianRelationship: "Parent",
                  medicalConditions: "", allergies: "", emergencyContactName: "", emergencyContactPhone: "",
                  consentRegistration: false, consentMedical: false, consentMedia: false, signature: ""
                })
                setCurrentStep(0)
                setRegisteredPlayerId(null)
              }}>Register Another Player</Button>
              <Button asChild>
                <Link href={`/dashboard/players/${registeredPlayerId}`}>View Profile</Link>
              </Button>
            </div>
          </CardContent>
        )}

        {/* Footer Navigation */}
        {currentStep < 6 && (
          <CardFooter className="flex justify-between border-t pt-6 bg-muted/10">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === 0 || isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
