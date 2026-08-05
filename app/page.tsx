"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { 
  ArrowRight, Trophy, Users, Activity, Play, Shield, Globe, 
  ShieldCheck, Smartphone, Settings, BarChart, CreditCard, Building2,
  FileSpreadsheet, MessageCircle, FileText, CheckCircle2, ChevronRight, Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeUp, staggerContainer } from "@/lib/utils/animations"

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
    <div className="flex min-h-screen flex-col bg-white text-slate-900 selection:bg-purple-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-20 items-center justify-between px-4 md:px-8 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-md">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">AcademySphere</span>
          </div>
          <nav className="hidden md:flex gap-8 bg-gray-50/50 px-6 py-2.5 rounded-full border border-gray-100 shadow-sm">
            <Link href="#platform" className="text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors">Platform</Link>
            <Link href="#stakeholders" className="text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors">Stakeholders</Link>
            <Link href="#scale" className="text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors">Enterprise</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/register/organisation" className="bg-slate-900 text-white rounded-full px-6 py-2.5 font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 flex items-center justify-center min-h-[95vh] bg-white overflow-hidden">
          {/* Subtle Modern Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <motion.div 
              className="flex flex-col items-center text-center space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ opacity, scale }}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-6 py-2.5 text-sm font-bold text-purple-700 shadow-sm uppercase tracking-widest">
                <span className="flex h-2.5 w-2.5 rounded-full bg-purple-600 mr-3 shadow-[0_0_8px_rgba(147,51,234,0.6)]"></span>
                The Operating System for Modern Football Academies
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 max-w-5xl leading-[1.05]">
                Bring Everything <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Together.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium">
                Players, coaches, parents, tournaments, payments and performance intelligence in one powerful platform.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/register/organisation" className="group flex items-center justify-center bg-purple-600 text-white rounded-full h-16 px-10 text-lg font-bold shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 transition-all">
                  Start Your Academy 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#platform" className="flex items-center justify-center bg-white border-2 border-gray-200 text-slate-700 rounded-full h-16 px-10 text-lg font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                  Explore the Platform
                </Link>
              </motion.div>

              {/* Ecosystem Visual */}
              <motion.div variants={itemVariants} className="mt-20 w-full max-w-5xl relative">
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  {['Player Development', 'AI Insights', 'Coach Training', 'Tournaments', 'Live Scores', 'Parent Portal', 'Payments', 'Analytics'].map((item, i) => (
                    <motion.div 
                      key={item}
                      className="bg-white border border-gray-100 shadow-sm rounded-full px-6 py-3 flex items-center justify-center text-sm font-bold text-slate-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 hover:shadow-md transition-all cursor-pointer"
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2 text-purple-500" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. Problem -> Solution Section */}
        <section id="platform" className="py-32 bg-slate-50 border-y border-gray-100 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{once:true, margin:"-100px"}} variants={containerVariants}
              className="text-center mb-24"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Stop managing chaos.</motion.h2>
              <motion.p variants={itemVariants} className="text-xl font-medium text-slate-500 max-w-2xl mx-auto">
                Fragmented tools kill productivity. AcademySphere connects your entire organisation.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Before */}
              <motion.div initial={{opacity:0, x:-50}} whileInView={{opacity:1, x:0}} transition={{duration:0.6}} viewport={{once:true}}>
                <div className="relative border border-gray-200 bg-white rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-red-500/5">
                  <h3 className="text-xl font-black text-red-500 mb-8 flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-500">
                      <XIcon className="w-5 h-5" />
                    </span>
                    Before AcademySphere
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: FileSpreadsheet, text: "Spreadsheets" },
                      { icon: MessageCircle, text: "WhatsApp Groups" },
                      { icon: FileText, text: "Paper Registers" },
                      { icon: CreditCard, text: "Separate Payments" },
                      { icon: Trophy, text: "External Tournament Tools" },
                      { icon: Play, text: "Disconnected Video" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 text-slate-500 shadow-sm">
                        <item.icon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-bold">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* After */}
              <motion.div initial={{opacity:0, x:50}} whileInView={{opacity:1, x:0}} transition={{duration:0.6, delay:0.2}} viewport={{once:true}}>
                <div className="relative border border-purple-200 bg-white rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-purple-600/10">
                  <h3 className="text-xl font-black text-purple-600 mb-8 flex items-center gap-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                    With AcademySphere
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="bg-slate-900 text-white font-black px-8 py-5 rounded-2xl mb-8 shadow-xl flex items-center gap-4 w-full justify-center text-2xl">
                      <Trophy className="h-8 w-8 text-purple-500" /> AcademySphere
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                      {[
                        { icon: Users, text: "Players" },
                        { icon: Shield, text: "Coaches" },
                        { icon: Globe, text: "Parents" },
                        { icon: Activity, text: "Tournaments" }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 transition-all hover:scale-105">
                          <item.icon className="h-7 w-7" />
                          <span className="text-xs font-black uppercase tracking-wider">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Stakeholder Experience */}
        <section id="stakeholders" className="py-32 relative overflow-hidden bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-24 relative">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">One Platform. Every Stakeholder.</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Purpose-built interfaces tailored to the needs of everyone involved in your academy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  role: "Administrator", icon: Settings, color: "text-blue-600", bg: "bg-blue-50 border-blue-100",
                  features: ["Manage organisation", "View analytics", "Manage staff", "Finance & tournaments"]
                },
                { 
                  role: "Coach", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100",
                  features: ["Training plans", "Attendance tracking", "Player evaluations", "Video analysis"]
                },
                { 
                  role: "Parent", icon: Globe, color: "text-orange-600", bg: "bg-orange-50 border-orange-100",
                  features: ["Child schedule", "Direct messages", "Secure payments", "Development tracking"]
                },
                { 
                  role: "Player", icon: Users, color: "text-purple-600", bg: "bg-purple-50 border-purple-100",
                  features: ["Development goals", "Training schedule", "Match highlights", "Performance stats"]
                }
              ].map((stakeholder, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`mb-8 relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${stakeholder.bg} border ${stakeholder.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stakeholder.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-6 text-2xl font-black text-slate-900">{stakeholder.role}</h3>
                  <ul className="space-y-4">
                    {stakeholder.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${stakeholder.color}`} />
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
        <section id="scale" className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1551280857-2b9bbe52044e?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" alt="stadium" />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">From Local Academy to National Federation</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
                Built on enterprise-grade architecture designed to grow with your organisation.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto relative gap-12 md:gap-0">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block rounded-full"></div>
              
              {[
                { size: "50+", label: "Players", desc: "Local Setup" },
                { size: "500+", label: "Players", desc: "Regional Academy" },
                { size: "5,000+", label: "Athletes", desc: "Multi-Location" },
                { size: "10,000+", label: "Athletes", desc: "National Federation" }
              ].map((step, i) => (
                <motion.div 
                  initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} transition={{delay:i*0.2}} viewport={{once:true}}
                  key={i} className="flex flex-col items-center relative z-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl"
                >
                  <div className="text-4xl font-black mb-2 text-white">{step.size}</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-2">{step.label}</div>
                  <div className="text-xs font-medium text-slate-400">{step.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Multi-Tenant Showcase */}
        <section className="py-32 relative overflow-hidden bg-slate-50">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
            <div className="text-center mb-24 relative">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">Every Organisation Gets Its Own AcademySphere</h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium">
                True white-label capability. Your domain, your colours, your logo, your data. Isolated and secure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {[
                { name: "One Premier Academy", type: "Elite Youth Setup", domain: "opaacademy.academysphere.com", color: "from-purple-600 to-indigo-600", shadow: "hover:shadow-purple-500/20" },
                { name: "Mexico City FC", type: "Professional Club Academy", domain: "academy.mcfc.mx", color: "from-rose-500 to-orange-500", shadow: "hover:shadow-rose-500/20" },
                { name: "National Federation", type: "Governing Body", domain: "youth.federation.org", color: "from-emerald-500 to-teal-500", shadow: "hover:shadow-emerald-500/20" }
              ].map((tenant, i) => (
                <motion.div 
                  key={i}
                  initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{delay:i*0.15}} viewport={{once:true}}
                  whileHover={{ y: -8 }}
                  className={`rounded-[2rem] border border-gray-200 bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-2xl ${tenant.shadow}`}
                >
                  <div className={`h-32 w-full bg-gradient-to-br ${tenant.color} relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                  </div>
                  <div className="p-8 relative">
                    <div className={`absolute -top-12 left-8 h-20 w-20 rounded-2xl bg-gradient-to-br ${tenant.color} border-4 border-white flex items-center justify-center shadow-lg`}>
                      <Building2 className="h-10 w-10 text-white" />
                    </div>
                    <div className="mt-10">
                      <h3 className="text-2xl font-black mb-1 tracking-tight text-slate-900">{tenant.name}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">{tenant.type}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div> 
                          Custom Branding Active
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div> 
                          Secure Tenant Isolation
                        </div>
                        <div className="mt-8 p-4 rounded-xl bg-gray-50 border border-gray-100 font-mono text-xs font-bold text-slate-500 flex items-center justify-between">
                          {tenant.domain} <Globe className="h-4 w-4 text-slate-400" />
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

      <footer className="border-t border-gray-200 py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900">AcademySphere</span>
            </div>
            <div className="flex gap-8 text-sm font-bold text-slate-500">
              <Link href="#" className="hover:text-purple-600 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-purple-600 transition-colors">Contact</Link>
            </div>
            <p className="text-sm font-bold text-slate-400">
              © {new Date().getFullYear()} AcademySphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
