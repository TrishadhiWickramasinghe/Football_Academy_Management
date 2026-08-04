"use client"

import { useState } from "react"
import Link from "next/link"
import { Trophy, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const STEPS = [
  "Organisation Type",
  "Information",
  "Branding",
  "Domain",
  "Admin Account"
]

export default function RegisterOrganisationPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">AcademySphere</span>
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Register your organisation
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Set up your academy workspace in minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
              style={{ width: \`\${(currentStep / (STEPS.length - 1)) * 100}%\` }}
            ></div>
            
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center gap-2 bg-muted/30">
                <div 
                  className={\`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors \${
                    index < currentStep 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : index === currentStep
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-muted text-muted-foreground"
                  }\`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground hidden sm:block bg-muted/30 px-1">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>{STEPS[currentStep]}</CardTitle>
            <CardDescription>
              {currentStep === 0 && "What type of organisation are you?"}
              {currentStep === 1 && "Basic details about your organisation"}
              {currentStep === 2 && "Configure your brand colors and logo"}
              {currentStep === 3 && "Set up your workspace URL"}
              {currentStep === 4 && "Create your administrator account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {/* Step 0: Type */}
            {currentStep === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {['Football Academy', 'Football Club', 'School', 'Corporate Sports Programme'].map((type) => (
                  <div key={type} className="flex cursor-pointer items-center space-x-2 rounded-lg border p-4 hover:border-primary hover:bg-primary/5 transition-colors">
                    <input type="radio" id={type} name="orgType" className="h-4 w-4 text-primary focus:ring-primary" />
                    <Label htmlFor={type} className="flex-1 cursor-pointer font-medium">{type}</Label>
                  </div>
                ))}
              </div>
            )}

            {/* Step 1: Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organisation Name</Label>
                  <Input id="orgName" placeholder="e.g. Elite Youth Academy" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="e.g. United Kingdom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="e.g. London" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
              </div>
            )}

            {/* Step 2: Branding */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed">
                    <p className="text-sm text-muted-foreground">Click or drag logo here</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <input type="color" id="primaryColor" defaultValue="#0f172a" className="h-10 w-10 cursor-pointer rounded border p-1" />
                      <Input type="text" defaultValue="#0f172a" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <input type="color" id="secondaryColor" defaultValue="#10b981" className="h-10 w-10 cursor-pointer rounded border p-1" />
                      <Input type="text" defaultValue="#10b981" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Domain */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subdomain">AcademySphere Subdomain</Label>
                  <div className="flex items-center">
                    <Input id="subdomain" placeholder="eliteyouth" className="rounded-r-none text-right" />
                    <div className="flex h-10 items-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
                      .academysphere.com
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">You can configure a custom domain later in settings.</p>
                </div>
              </div>
            )}

            {/* Step 4: Admin */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Full Name</Label>
                  <Input id="adminName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email Address</Label>
                  <Input id="adminEmail" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input id="adminPassword" type="password" />
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {currentStep < STEPS.length - 1 ? (
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard">
                  Create Workspace
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
