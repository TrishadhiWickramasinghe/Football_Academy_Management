import React from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { Users, UserCheck, Calendar, DollarSign, Activity, Trophy } from 'lucide-react';

export default function OrganisationDashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-8"
    >
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organisation Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your academy's performance and activities.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Action buttons could go here */}
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity">
            + New Player
          </button>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Active Players</h3>
            <Users className="w-4 h-4 text-info" />
          </div>
          <p className="text-3xl font-bold mt-2">248</p>
          <p className="text-xs text-success mt-1 flex items-center">
            <span className="font-medium">+12</span> this month
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Attendance Rate</h3>
            <UserCheck className="w-4 h-4 text-success" />
          </div>
          <p className="text-3xl font-bold mt-2">92%</p>
          <p className="text-xs text-success mt-1 flex items-center">
            <span className="font-medium">+2%</span> vs last week
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Active Teams</h3>
            <Trophy className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-bold mt-2">14</p>
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            Across 5 age groups
          </p>
        </div>

        <div className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
            <DollarSign className="w-4 h-4 text-success" />
          </div>
          <p className="text-3xl font-bold mt-2 text-success">$12,450</p>
          <p className="text-xs text-warning mt-1 flex items-center">
            <span className="font-medium">3 invoices</span> outstanding
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Charts and Data */}
        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-card border rounded-xl shadow-sm h-[350px] flex flex-col items-center justify-center text-muted-foreground">
             <Activity className="w-8 h-8 mb-2 opacity-50" />
             <p>Player Growth & Revenue Chart (Placeholder)</p>
             <p className="text-xs mt-2 max-w-sm text-center">In a full implementation, Recharts or Chart.js would be used here to display interactive visualisations.</p>
          </div>
          
          <div className="p-6 bg-card border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Registrations</h2>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-tl-lg">Player Name</th>
                    <th className="px-4 py-3 font-medium">Age Group</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium rounded-tr-lg">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Marcus Rashford', age: 'U14', status: 'Active', date: 'Today' },
                    { name: 'Jude Bellingham', age: 'U16', status: 'Trial', date: 'Yesterday' },
                    { name: 'Phil Foden', age: 'U12', status: 'Pending', date: 'Oct 12' },
                  ].map((player, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{player.name}</td>
                      <td className="px-4 py-3">{player.age}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full 
                          ${player.status === 'Active' ? 'bg-success/10 text-success' : 
                            player.status === 'Trial' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'}`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{player.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Upcoming Events & Activity */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="p-6 bg-card border rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="flex flex-col items-center justify-center bg-muted rounded-md p-2 min-w-[50px]">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">16:00</span>
                </div>
                <div>
                  <p className="text-sm font-medium">U14 Tactical Session</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pitch 1 • Coach Smith</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="flex flex-col items-center justify-center bg-muted rounded-md p-2 min-w-[50px]">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">17:30</span>
                </div>
                <div>
                  <p className="text-sm font-medium">U16 High Performance</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pitch 2 • Coach Davis</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors font-medium">
              View Full Schedule
            </button>
          </div>
          
          <div className="p-6 bg-card border rounded-xl shadow-sm">
             <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
             <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-muted">
                   <div className="absolute w-2 h-2 bg-success rounded-full -left-[5px] top-1.5 ring-4 ring-card"></div>
                   <p className="text-sm">Payment of $150 received from <span className="font-medium">Sarah Jenkins</span>.</p>
                   <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                </div>
                <div className="relative pl-4 border-l-2 border-muted">
                   <div className="absolute w-2 h-2 bg-info rounded-full -left-[5px] top-1.5 ring-4 ring-card"></div>
                   <p className="text-sm">Coach Davis submitted evaluation for <span className="font-medium">U16 Team</span>.</p>
                   <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
