import React from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { Building2, Users, DollarSign, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-8"
    >
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Platform</h1>
          <p className="text-muted-foreground mt-1">Platform overview and tenant management.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Action buttons could go here */}
        </div>
      </motion.div>

      {/* KPI Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Organisations</h3>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">124</p>
          <p className="text-xs text-success mt-1 flex items-center">
            <span className="font-medium">+12</span> since last month
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Active Players</h3>
            <Users className="w-4 h-4 text-info" />
          </div>
          <p className="text-3xl font-bold mt-2">14,203</p>
          <p className="text-xs text-success mt-1 flex items-center">
            <span className="font-medium">+8%</span> since last month
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">MRR</h3>
            <DollarSign className="w-4 h-4 text-success" />
          </div>
          <p className="text-3xl font-bold mt-2 text-success">$42,500</p>
          <p className="text-xs text-success mt-1 flex items-center">
            <span className="font-medium">+$2,400</span> since last month
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">System Health</h3>
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-bold mt-2 text-info">99.9%</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            All services operational
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tenant Management Placeholder */}
        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-card border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Organisations</h2>
            <div className="space-y-4">
              {/* Dummy data mapping */}
              {[
                { name: 'Real Madrid Academy NYC', type: 'Academy', status: 'Active' },
                { name: 'TechCorp Sports Program', type: 'Company', status: 'Trial' },
                { name: 'St. John High School', type: 'School', status: 'Active' },
              ].map((org, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{org.name}</p>
                    <p className="text-sm text-muted-foreground">{org.type}</p>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${org.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {org.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-primary font-medium hover:underline">View all organisations &rarr;</button>
          </div>
          
          <div className="p-6 bg-card border rounded-xl shadow-sm h-[300px] flex flex-col items-center justify-center text-muted-foreground">
             <Activity className="w-8 h-8 mb-2 opacity-50" />
             <p>MRR Growth Chart (Placeholder)</p>
          </div>
        </motion.div>

        {/* Right Column: System Health & Alerts */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="p-6 bg-card border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" />
              Security & Alerts
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-destructive/5 text-destructive border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Failed Payment Spike</p>
                  <p className="text-xs opacity-90 mt-0.5">3 tenants experienced payment failures in the last hour.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Domain Verified</p>
                  <p className="text-xs text-muted-foreground mt-0.5">academy.techcorp.com SSL provisioned.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-card border rounded-xl shadow-sm">
             <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
             <div className="space-y-2 flex flex-col">
                <button className="text-left px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors">Onboard New Tenant</button>
                <button className="text-left px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors">Manage Subscriptions</button>
                <button className="text-left px-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors">View Audit Logs</button>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
