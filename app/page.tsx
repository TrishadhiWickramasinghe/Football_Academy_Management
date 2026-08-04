"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Trophy, Users, Activity, Play, Shield, Globe, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">AcademySphere</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Platform</Link>
            <Link href="#solutions" className="text-sm font-medium text-muted-foreground hover:text-foreground">Solutions</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4 hidden sm:block">
              Sign In
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/register/organisation">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div 
              className="flex flex-col items-center text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                The Operating System for Modern Football Academies
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl">
                Build Better Players.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Run Smarter Academies.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                AcademySphere brings player development, tournaments, coaching, parents, payments and performance intelligence into one powerful football academy platform.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/20" asChild>
                  <Link href="/register/organisation">
                    Start Your Academy <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base">
                  Explore Platform
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Showcase */}
        <section id="features" className="py-24 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Everything your academy needs</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A complete suite of tools designed specifically for the daily operations of elite sports organisations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: "Player Development", desc: "Track player growth, evaluations, goals and development plans." },
                { icon: Trophy, title: "Tournament Management", desc: "Create tournaments, manage fixtures, brackets, scores and standings." },
                { icon: Shield, title: "Coach Tools", desc: "Training plans, attendance, evaluations and player development." },
                { icon: Activity, title: "Parent Portal", desc: "Give parents access to schedules, communication, attendance and payments." },
                { icon: Play, title: "Video Analysis", desc: "Integrate football video analysis and performance footage." },
                { icon: Globe, title: "Multi-Tenant", desc: "White-label support with custom domains and separate branding." },
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Intelligence Section */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  AI-Powered Insights
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Turn Football Data Into Better Decisions</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our intelligence engine analyses attendance, performance evaluations, and match statistics to provide actionable recommendations for every player in your academy.
                </p>
                <ul className="space-y-4">
                  {['Automated development alerts', 'Tactical & physical trend analysis', 'Smart highlight tagging ready'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck className="h-6 w-6 text-secondary" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 blur-2xl opacity-50 rounded-full"></div>
                <div className="relative rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Player Development Insight</h4>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center border-b pb-4">
                      <span className="font-medium">Speed development</span>
                      <span className="text-secondary font-bold flex items-center">↑ 12%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-4">
                      <span className="font-medium">Passing accuracy</span>
                      <span className="text-secondary font-bold flex items-center">↑ 8%</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="font-medium">Attendance consistency</span>
                      <span className="font-bold">94%</span>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                    <h5 className="font-bold flex items-center gap-2 mb-2">
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">AI Recommendation</span>
                    </h5>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Increase ball-control training for the next 2 sessions to capitalize on current development momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">AcademySphere</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AcademySphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
