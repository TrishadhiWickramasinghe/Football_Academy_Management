"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
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
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/football-02.jpg"
              alt="Soccer background"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay for better text readability and blending into the next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <motion.div 
              className="flex flex-col items-center text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ opacity, scale }}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-bold text-primary shadow-lg shadow-primary/10 backdrop-blur-md uppercase tracking-wider">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-3 animate-pulse shadow-[0_0_8px_rgba(232,74,39,0.8)]"></span>
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
                <Button size="lg" className="rounded-full h-14 px-8 text-base font-bold shadow-[0_0_20px_rgba(232,74,39,0.3)] hover:shadow-[0_0_30px_rgba(232,74,39,0.5)] transition-all group border-b-4 border-black/20" asChild>
                  <Link href="/register/organisation">
                    Start Your Academy 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold border-border/50 hover:bg-muted/50 hover:text-foreground transition-colors backdrop-blur-sm">
                  Explore the Platform
                </Button>
              </motion.div>

              {/* Ecosystem Visual */}
              <motion.div variants={itemVariants} className="mt-24 w-full max-w-4xl relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  {['Player Development', 'AI Insights', 'Coach Training', 'Tournaments', 'Live Scores', 'Parent Portal', 'Payments', 'Analytics'].map((item, i) => (
                    <motion.div 
                      key={item}
                      className="bg-black/80 backdrop-blur-md border border-primary/40 shadow-[0_4px_20px_rgba(232,74,39,0.15)] rounded-xl p-4 flex items-center justify-center text-sm font-bold text-primary hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_30px_rgba(232,74,39,0.5)] transition-all cursor-pointer"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
                {/* Connecting lines abstraction */}
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 border-t border-b border-secondary/20 -z-10 h-16 w-full blur-[1px]"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Problem -> Solution Section */}
        <section id="platform" className="py-32 bg-slate-50 border-y border-border shadow-inner relative overflow-hidden">
          {/* Left-side background image */}
          <div className="absolute top-0 left-0 h-full w-1/2 md:w-[40%] z-0 pointer-events-none">
            <Image
              src="/images/football-04.avif"
              alt="Football background left"
              fill
              className="object-cover opacity-80"
            />
            {/* Gradient to fade out the image towards the center and bottom, blending into the light background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/70 to-slate-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">Stop managing chaos.</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Fragmented tools kill productivity. AcademySphere connects your entire organisation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Before */}
              <div className="relative">
                <div className="absolute -inset-4 bg-destructive/10 rounded-[2rem] blur-xl" />
                <div className="relative border border-destructive/20 bg-background text-foreground rounded-3xl p-8 shadow-sm">
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
                      <div key={i} className="group flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-200 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1 bg-red-100 group-hover:bg-red-400 transition-colors" />
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 group-hover:scale-110 transition-transform ml-1">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute -inset-4 bg-success/10 rounded-[2rem] blur-xl" />
                <div className="relative border-2 border-primary/20 bg-card text-foreground rounded-3xl p-8 shadow-xl">
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
                        <div key={i} className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 border-transparent bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 relative overflow-hidden">
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary/40 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                            <item.icon className="h-6 w-6" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 group-hover:text-primary transition-colors">{item.text}</span>
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
        <section id="stakeholders" className="py-32 relative overflow-hidden">
          {/* Highly Animated Background Elements using Framer Motion */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Primary Orange Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 100, 0],
                y: [0, -50, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px]" 
            />
            {/* Blue Admin Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -100, 0],
                y: [0, 80, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 right-1/4 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-[120px]" 
            />
            {/* Green Coach Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                x: [0, 50, -50, 0],
                y: [0, 50, -50, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] bg-success/15 rounded-full blur-[150px]" 
            />
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-20 relative">
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
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: i * 0.15 
                  }}
                  className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:border-primary/50 transition-colors duration-300 relative overflow-hidden"
                >
                  {/* Subtle background glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  
                  <div className={`mb-6 relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${stakeholder.bg} ${stakeholder.color} group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-300 ease-out shadow-sm`}>
                    <stakeholder.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-6 text-2xl font-bold relative z-10">{stakeholder.role}</h3>
                  <ul className="space-y-4 relative z-10">
                    {stakeholder.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${stakeholder.color} opacity-70 group-hover:scale-110 transition-transform`} />
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
        <section id="scale" className="py-32 text-primary-foreground overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/football-03.jpg"
              alt="Stadium background"
              fill
              className="object-cover opacity-30 mix-blend-luminosity"
            />
            {/* Gradient Overlay for a premium attractive look */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60" />
          </div>
          
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
        <section className="py-32 relative overflow-hidden bg-slate-50 border-y border-border/50">
          {/* Right-side background image */}
          <div className="absolute top-0 right-0 h-full w-1/2 md:w-[40%] z-0 pointer-events-none">
            <Image
              src="/images/football-05.jpg"
              alt="Football background right"
              fill
              className="object-cover opacity-80"
            />
            {/* Gradient to fade out the image towards the center and bottom */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-50/70 to-slate-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-20 relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">Every Organisation Gets Its Own AcademySphere</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                True white-label capability. Your domain, your colours, your logo, your data. Isolated and secure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                { name: "One Premier Academy", type: "Elite Youth Setup", domain: "opaacademy.academysphere.com", color: "bg-gradient-to-br from-indigo-500 to-purple-600", shadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]" },
                { name: "Mexico City FC", type: "Professional Club Academy", domain: "academy.mcfc.mx", color: "bg-gradient-to-br from-rose-500 to-orange-600", shadow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]" },
                { name: "National Federation", type: "Governing Body", domain: "youth.federation.org", color: "bg-gradient-to-br from-emerald-500 to-teal-600", shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]" }
              ].map((tenant, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8 }}
                  className={`rounded-3xl border border-gray-100 bg-white text-gray-900 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl ${tenant.shadow}`}
                >
                  <div className={`h-28 w-full ${tenant.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-[url('/images/football-02.jpg')] opacity-20 mix-blend-overlay bg-cover bg-center"></div>
                  </div>
                  <div className="p-8 relative">
                    <div className={`absolute -top-12 left-8 h-20 w-20 rounded-2xl ${tenant.color} border-4 border-card flex items-center justify-center shadow-lg`}>
                      <Building2 className="h-10 w-10 text-white drop-shadow-md" />
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-black mb-1 tracking-tight">{tenant.name}</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{tenant.type}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm font-medium">
                          <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          </div> 
                          Custom Branding Active
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium">
                          <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          </div> 
                          Secure Tenant Isolation
                        </div>
                        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs text-gray-700 flex items-center justify-between shadow-sm group-hover:bg-white group-hover:border-purple-200 transition-colors">
                          <span className="font-bold">{tenant.domain}</span> <Globe className="h-4 w-4 text-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Inquiry Section */}
        <section className="py-24 bg-white relative overflow-hidden" id="inquiry">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px] opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">Have an Inquiry?</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Ready to take your academy to the next level? Send us a message and our team will get back to you shortly.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12 relative overflow-hidden group">
              {/* Premium Gradient Top Border */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500"></div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input type="email" placeholder="john@academy.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Organisation Name</label>
                  <input type="text" placeholder="e.g. London Elite FC" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Your Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none bg-gray-50/50 hover:bg-white"></textarea>
                </div>
                <button type="button" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm mt-4">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-24 bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-20 text-center">
            {/* Column 1 */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-6">Partner With Us</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-[250px]">
                Get in touch for a custom enterprise solution that is as unique as your academy is both on and off the pitch.
              </p>
              <Link href="/contact" className="inline-block bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold uppercase tracking-widest py-4 px-8 transition-colors">
                Contact Sales
              </Link>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-6">Connect</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-[250px]">
                Connect and follow along for behind the scenes content and to learn more about AcademySphere.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 hover:scale-110 hover:bg-teal-500 hover:text-white transition-all">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 hover:scale-110 hover:bg-teal-500 hover:text-white transition-all">
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 hover:scale-110 hover:bg-teal-500 hover:text-white transition-all">
                  <Activity className="h-5 w-5" />
                </a>
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 hover:scale-110 hover:bg-teal-500 hover:text-white transition-all">
                  <Users className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-white uppercase tracking-[0.2em] mb-6">Get Started</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-[250px]">
                Become a registered organisation to get access to the platform and other exclusive resources and offerings.
              </p>
              <Link href="/register/organisation" className="inline-block bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold uppercase tracking-widest py-4 px-8 transition-colors">
                Register Academy
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 tracking-wide">
            <p>© {new Date().getFullYear()} ACADEMYSPHERE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-teal-400 transition-colors uppercase">Terms of Service</Link>
              <Link href="#" className="hover:text-teal-400 transition-colors uppercase">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
