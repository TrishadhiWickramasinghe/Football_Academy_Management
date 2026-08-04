"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Player } from "@/features/players/types/player.types"
import { playersService } from "@/features/players/services/players.service"
import { PLAYER_STATUS } from "@/features/players/constants"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowLeft, Edit, MoreHorizontal, User, Activity, Trophy, 
  ShieldAlert, FileText, Calendar, Heart, Shield, Loader2, CheckCircle2, AlertCircle
} from "lucide-react"

// A simple Badge component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className || "bg-gray-100 text-gray-800"}`}>
    {children}
  </span>
)

const TABS = [
  { id: "overview", label: "Overview", icon: User },
  { id: "development", label: "Development", icon: Activity },
  { id: "medical", label: "Medical & Family", icon: Heart, restricted: true },
  { id: "documents", label: "Documents", icon: FileText }
]

export default function PlayerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { tenant } = useTenant()
  const { role } = useAuth()
  
  const [player, setPlayer] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (tenant && params.playerId) {
      loadPlayer()
    }
  }, [tenant, params.playerId])

  const loadPlayer = async () => {
    setIsLoading(true)
    try {
      const data = await playersService.getPlayer(params.playerId as string, tenant!.id)
      setPlayer(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  if (!player) return (
    <div className="flex flex-col h-[60vh] items-center justify-center text-center p-6 animate-in fade-in">
      <User className="w-16 h-16 text-muted-foreground/30 mb-4" />
      <h2 className="text-2xl font-bold tracking-tight">Player Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-sm mb-6">The player profile you are looking for does not exist or you do not have permission to view it.</p>
      <Button asChild><Link href="/dashboard/players">Return to Directory</Link></Button>
    </div>
  )

  const statusColor = PLAYER_STATUS.find(s => s.value === player.status)?.color || ""

  // Calculate age
  const age = Math.abs(new Date(Date.now() - new Date(player.dateOfBirth).getTime()).getUTCFullYear() - 1970)

  // RBAC for Medical tab
  const canViewMedical = ["SUPER_ADMIN", "ORG_ADMIN", "CLUB_MANAGER", "HEAD_COACH", "PARENT_GUARDIAN"].includes(role || "")
  
  const visibleTabs = TABS.filter(tab => !tab.restricted || canViewMedical)

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/dashboard/players"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Edit className="w-4 h-4 mr-2" /> Edit Profile</Button>
          <Button variant="outline" size="sm" className="px-2"><MoreHorizontal className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Premium Header */}
      <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent w-full absolute top-0 left-0 pointer-events-none"></div>
        
        <div className="relative pt-12 sm:pt-20 px-6 sm:px-10 pb-6 flex flex-col sm:flex-row gap-6 sm:items-end">
          
          {/* Avatar with Ring */}
          <div className="relative shrink-0 group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-background p-1 border shadow-sm">
              <div className="w-full h-full rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl sm:text-4xl border border-primary/20 overflow-hidden relative">
                {player.fullName.split(' ').map(n => n[0]).join('').substring(0,2)}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Edit className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            {player.jerseyNumber && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-foreground text-background font-bold flex items-center justify-center shadow-lg border-2 border-background">
                #{player.jerseyNumber}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{player.fullName}</h1>
              <Badge className={statusColor}>{player.status}</Badge>
            </div>
            <p className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> {player.primaryPosition}</span>
              <span>•</span>
              <span>{player.ageGroup} ({age} yrs)</span>
              <span>•</span>
              <span className="text-foreground font-medium">{player.currentTeamName || "No Team Assigned"}</span>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 sm:ml-auto pt-4 sm:pt-0">
            <div className="text-center px-4 py-2 bg-muted/30 rounded-lg border">
              <p className="text-xs text-muted-foreground font-medium mb-1">Attendance</p>
              <p className="text-xl font-bold">{player.attendanceRate || 0}%</p>
            </div>
            <div className="text-center px-4 py-2 bg-muted/30 rounded-lg border">
              <p className="text-xs text-muted-foreground font-medium mb-1">Avg Score</p>
              <p className="text-xl font-bold text-primary">{player.latestEvaluationScore || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Tabs Navigation */}
      <div className="border-b">
        <div className="flex gap-6 overflow-x-auto hide-scrollbar">
          {visibleTabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  isActive ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content Areas */}
      <div className="min-h-[400px]">
        
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Full Name</p>
                    <p className="font-medium">{player.fullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium">{new Date(player.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Gender</p>
                    <p className="font-medium">{player.gender}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Nationality</p>
                    <p className="font-medium">{player.nationality || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Primary Guardian</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{player.guardian1.name}</p>
                      <Badge className="bg-primary/10 text-primary border-primary/20">{player.guardian1.relationship}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Football Profile</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Primary Position</p>
                    <p className="font-medium">{player.primaryPosition}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Secondary Position</p>
                    <p className="font-medium">{player.secondaryPosition || "-"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Preferred Foot</p>
                    <p className="font-medium">-</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Current Team</p>
                    <p className="font-medium text-primary hover:underline cursor-pointer">{player.currentTeamName || "-"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-muted-foreground mb-1">Development Phase</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <p className="font-medium">{player.developmentPhase || "Unassigned"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
                    Enrolment Info
                    <Calendar className="w-4 h-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold">{new Date(player.enrolmentDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                    <p className="text-xs text-muted-foreground">Joined Academy</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium">Player ID: <span className="font-mono text-muted-foreground">{player.id}</span></p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between text-muted-foreground">
                    Compliance Status
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {player.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{doc.type}</span>
                      {doc.status === "Valid" && <span className="flex items-center text-green-600 text-xs"><CheckCircle2 className="w-3 h-3 mr-1"/> Valid</span>}
                      {doc.status === "Expiring" && <span className="flex items-center text-amber-600 text-xs"><AlertCircle className="w-3 h-3 mr-1"/> Expiring</span>}
                      {doc.status === "Missing" && <span className="flex items-center text-red-600 text-xs"><AlertCircle className="w-3 h-3 mr-1"/> Missing</span>}
                    </div>
                  ))}
                  {player.documents.length === 0 && (
                    <p className="text-sm text-muted-foreground">No documents uploaded.</p>
                  )}
                  <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setActiveTab("documents")}>View All</Button>
                </CardContent>
              </Card>

            </div>
          </div>
        )}

        {/* MEDICAL & FAMILY TAB (Restricted) */}
        {activeTab === "medical" && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            {!canViewMedical ? (
              <div className="p-12 text-center bg-red-50 border border-red-100 rounded-xl">
                <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-red-900">Access Restricted</h3>
                <p className="text-red-700/80 max-w-md mx-auto mt-2">You do not have the required permissions to view sensitive medical and family contact information.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Medical Card */}
                <Card className="border-amber-200">
                  <CardHeader className="bg-amber-50/50 border-b border-amber-100 rounded-t-xl">
                    <CardTitle className="text-lg flex items-center text-amber-900 gap-2">
                      <Heart className="w-5 h-5 text-amber-600" /> Medical Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Known Conditions</p>
                      {player.medicalConditions ? (
                        <div className="bg-red-50 text-red-900 p-3 rounded-md text-sm border border-red-100 font-medium">
                          {player.medicalConditions}
                        </div>
                      ) : (
                        <p className="text-sm">None reported</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                      {player.allergies ? (
                        <div className="bg-red-50 text-red-900 p-3 rounded-md text-sm border border-red-100 font-medium">
                          {player.allergies}
                        </div>
                      ) : (
                        <p className="text-sm">None reported</p>
                      )}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-bold text-red-600 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> Emergency Contact</p>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-bold text-lg">{player.emergencyContactName}</p>
                        <p className="text-primary font-medium mt-1">{player.emergencyContactPhone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Family Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Guardians
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 border rounded-xl bg-card relative">
                      <Badge className="absolute top-4 right-4 bg-primary/10 text-primary border-primary/20">Primary</Badge>
                      <p className="font-bold text-lg">{player.guardian1.name}</p>
                      <p className="text-sm text-muted-foreground mb-3">{player.guardian1.relationship}</p>
                      
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2"><span className="text-muted-foreground w-12">Email:</span> <a href={`mailto:${player.guardian1.email}`} className="text-primary hover:underline font-medium">{player.guardian1.email}</a></p>
                        {player.guardian1.phone && <p className="flex items-center gap-2"><span className="text-muted-foreground w-12">Phone:</span> <span className="font-medium">{player.guardian1.phone}</span></p>}
                      </div>
                    </div>

                    {player.guardian2 && (
                      <div className="p-4 border rounded-xl bg-card">
                        <p className="font-bold text-lg">{player.guardian2.name}</p>
                        <p className="text-sm text-muted-foreground mb-3">{player.guardian2.relationship}</p>
                        
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2"><span className="text-muted-foreground w-12">Email:</span> <a href={`mailto:${player.guardian2.email}`} className="text-primary hover:underline font-medium">{player.guardian2.email}</a></p>
                          {player.guardian2.phone && <p className="flex items-center gap-2"><span className="text-muted-foreground w-12">Phone:</span> <span className="font-medium">{player.guardian2.phone}</span></p>}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Compliance Documents</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Manage waivers, IDs, and medical forms.</p>
                </div>
                <Button size="sm"><FileText className="w-4 h-4 mr-2" /> Upload Document</Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border divide-y overflow-hidden">
                  {["Registration Waiver", "Medical Clearance", "Media Consent Form", "Player ID Copy"].map((docName, i) => {
                    // Mock logic for status
                    const isUploaded = i < 2;
                    const isExpiring = i === 1;
                    return (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/10 transition-colors gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isUploaded ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{docName}</p>
                            {isUploaded ? (
                              <p className="text-xs text-muted-foreground">Uploaded Oct 12, 2025</p>
                            ) : (
                              <p className="text-xs text-red-500 font-medium">Missing Document</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {isUploaded ? (
                            <>
                              {isExpiring ? (
                                <Badge className="bg-amber-100 text-amber-800 border-amber-200">Expiring Soon</Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800 border-green-200">Valid</Badge>
                              )}
                              <Button variant="ghost" size="sm">View</Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">Request</Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty States for other tabs */}
        {["development", "evaluations"].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed rounded-xl animate-in slide-in-from-right-4 duration-300">
            <Activity className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold">Module Not Yet Integrated</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-1">This section will pull data from the forthcoming Coaching & Evaluation modules.</p>
          </div>
        )}

      </div>
    </div>
  )
}
