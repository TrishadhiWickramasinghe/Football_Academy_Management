"use client"

import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  ArrowRight, Trophy, Users, Activity, Play, Shield, Globe, 
  ShieldCheck, Smartphone, Settings, BarChart, CreditCard, Building2,
  FileSpreadsheet, MessageCircle, FileText, CheckCircle2, ChevronRight
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">AcademySphere</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#platform" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
            <Link href="#stakeholders" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Stakeholders</Link>
            <Link href="#scale" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Enterprise</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Sign In
            </Link>
            <Button asChild className="rounded-full shadow-sm hover:shadow-md transition-all">
              <Link href="/register/organisation">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 flex items-center justify-center min-h-[90vh]">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <motion.div 
              className="flex flex-col items-center text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ opacity, scale }}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                The Operating System for Modern Football Academies
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground max-w-5xl leading-[1.1]">
                Bring Everything <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/90 to-secondary">Together.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
                Players, coaches, parents, tournaments, payments and performance intelligence in one powerful platform.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all group" asChild>
                  <Link href="/register/organisation">
                    Start Your Academy 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base hover:bg-muted/50 transition-colors">
                  Explore the Platform
                </Button>
              </motion.div>

              {/* Ecosystem Visual */}
              <motion.div variants={itemVariants} className="mt-24 w-full max-w-4xl relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  {['Player Development', 'AI Insights', 'Coach Training', 'Tournaments', 'Live Scores', 'Parent Portal', 'Payments', 'Analytics'].map((item, i) => (
                    <motion.div 
                      key={item}
                      className="bg-card border shadow-sm rounded-xl p-4 flex items-center justify-center text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                {/* Connecting lines abstraction */}
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 border-t border-b border-primary/10 -z-10 h-16 w-full blur-[1px]"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Problem -> Solution Section */}
        <section id="platform" className="py-32 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Stop managing chaos.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Fragmented tools kill productivity. AcademySphere connects your entire organisation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Before */}
              <div className="relative">
                <div className="absolute -inset-4 bg-destructive/5 rounded-[2rem] blur-xl" />
                <div className="relative border border-destructive/20 bg-background rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-destructive mb-8 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-destructive"></span>
                    Before AcademySphere
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: FileSpreadsheet, text: "Spreadsheets" },
                      { icon: MessageCircle, text: "WhatsApp Groups" },
                      { icon: FileText, text: "Paper Registers" },
                      { icon: CreditCard, text: "Separate Payments" },
                      { icon: Trophy, text: "External Tournament Tools" },
                      { icon: Play, text: "Disconnected Video" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-muted/50 text-muted-foreground">
                        <item.icon className="h-5 w-5 opacity-50" />
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute -inset-4 bg-success/10 rounded-[2rem] blur-xl" />
                <div className="relative border-2 border-primary/20 bg-card rounded-3xl p-8 shadow-xl">
                  <h3 className="text-lg font-bold text-success mb-8 flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-success"></span>
                    With AcademySphere
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-2xl mb-8 shadow-lg shadow-primary/20 flex items-center gap-3 w-full justify-center text-xl">
                      <Trophy className="h-6 w-6" /> AcademySphere
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      {[
                        { icon: Users, text: "Players" },
                        { icon: Shield, text: "Coaches" },
                        { icon: Globe, text: "Parents" },
                        { icon: Activity, text: "Tournaments" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary/5 text-primary">
                          <item.icon className="h-6 w-6" />
                          <span className="text-xs font-bold uppercase tracking-wider">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stakeholder Experience */}
        <section id="stakeholders" className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">One Platform. Every Stakeholder.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Purpose-built interfaces tailored to the needs of everyone involved in your academy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  role: "Administrator", icon: Settings, color: "text-blue-500", bg: "bg-blue-500/10",
                  features: ["Manage organisation", "View analytics", "Manage staff", "Finance & tournaments"]
                },
                { 
                  role: "Coach", icon: Shield, color: "text-secondary", bg: "bg-secondary/10",
                  features: ["Training plans", "Attendance tracking", "Player evaluations", "Video analysis"]
                },
                { 
                  role: "Parent", icon: Globe, color: "text-orange-500", bg: "bg-orange-500/10",
                  features: ["Child schedule", "Direct messages", "Secure payments", "Development tracking"]
                },
                { 
                  role: "Player", icon: Users, color: "text-primary", bg: "bg-primary/10",
                  features: ["Development goals", "Training schedule", "Match highlights", "Performance stats"]
                }
              ].map((stakeholder, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8 }}
                  className="group rounded-3xl border bg-card p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${stakeholder.bg} ${stakeholder.color}`}>
                    <stakeholder.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold">{stakeholder.role}</h3>
                  <ul className="space-y-4">
                    {stakeholder.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${stakeholder.color} opacity-70`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Scale Visualization */}
        <section id="scale" className="py-32 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">From Local Academy to National Federation</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Built on enterprise-grade architecture designed to grow with your organisation.
              </p>
            </div>

            <div className="flex justify-between items-center max-w-4xl mx-auto relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-primary-foreground/20 -translate-y-1/2 hidden md:block rounded-full"></div>
              
              {[
                { size: "50+", label: "Players", desc: "Local Setup" },
                { size: "500+", label: "Players", desc: "Regional Academy" },
                { size: "5,000+", label: "Athletes", desc: "Multi-Location" },
                { size: "10,000+", label: "Athletes", desc: "National Federation" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center relative z-10 p-4">
                  <div className="h-4 w-4 rounded-full bg-primary-foreground mb-6 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                  <div className="text-2xl md:text-4xl font-black mb-2">{step.size}</div>
                  <div className="text-sm md:text-base font-semibold uppercase tracking-wider text-primary-foreground/80">{step.label}</div>
                  <div className="text-xs text-primary-foreground/60 mt-1">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Multi-Tenant Showcase */}
        <section className="py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Every Organisation Gets Its Own AcademySphere</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                True white-label capability. Your domain, your colours, your logo, your data. Isolated and secure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "One Premier Academy", type: "Elite Youth Setup", domain: "opaacademy.academysphere.com", color: "bg-slate-900" },
                { name: "Mexico City FC", type: "Professional Club Academy", domain: "academy.mcfc.mx", color: "bg-red-800" },
                { name: "National Federation", type: "Governing Body", domain: "youth.federation.org", color: "bg-blue-900" }
              ].map((tenant, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-3xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`h-24 w-full ${tenant.color}`}></div>
                  <div className="p-8 relative">
                    <div className={`absolute -top-10 left-8 h-16 w-16 rounded-xl ${tenant.color} border-4 border-card flex items-center justify-center shadow-sm`}>
                      <Building2 className="h-8 w-8 text-white opacity-80" />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-1">{tenant.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">{tenant.type}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success" /> Custom Branding Active
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-success" /> Secure Tenant Isolation
                        </div>
                        <div className="mt-4 p-3 rounded-lg bg-muted font-mono text-xs text-muted-foreground flex items-center justify-between">
                          {tenant.domain} <Globe className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AcademySphere</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy</Link>
              <Link href="#" className="hover:text-foreground">Terms</Link>
              <Link href="#" className="hover:text-foreground">Contact</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AcademySphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
