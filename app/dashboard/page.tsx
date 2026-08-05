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
      className="p-4 lg:p-8 space-y-8 bg-white min-h-[calc(100vh-4rem)] m-2 lg:m-4 rounded-3xl text-gray-900 shadow-lg border border-gray-100"
    >
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 drop-shadow-sm">Organisation Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your academy's performance and activities.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Action buttons could go here */}
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            + New Player
          </button>
        </div>
      </motion.div>

      {/* KPI Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-gradient-to-br from-cyan-400 to-blue-600 border-none rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/90">Active Players</h3>
            <Users className="w-5 h-5 text-white" />
          </div>
          <p className="text-4xl font-black mt-2 drop-shadow-sm">248</p>
          <p className="text-xs text-white/90 mt-1 flex items-center bg-white/20 w-fit px-2 py-1 rounded-full">
            <span className="font-bold mr-1">+12</span> this month
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-emerald-400 to-teal-600 border-none rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/90">Attendance Rate</h3>
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <p className="text-4xl font-black mt-2 drop-shadow-sm">92%</p>
          <p className="text-xs text-white/90 mt-1 flex items-center bg-white/20 w-fit px-2 py-1 rounded-full">
            <span className="font-bold mr-1">+2%</span> vs last week
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-amber-400 to-orange-500 border-none rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/90">Active Teams</h3>
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <p className="text-4xl font-black mt-2 drop-shadow-sm">14</p>
          <p className="text-xs text-white/90 mt-1 flex items-center bg-white/20 w-fit px-2 py-1 rounded-full">
            Across 5 age groups
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-rose-400 to-pink-600 border-none rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white/90">Monthly Revenue</h3>
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <p className="text-4xl font-black mt-2 drop-shadow-sm">$12,450</p>
          <p className="text-xs text-white/90 mt-1 flex items-center bg-white/20 w-fit px-2 py-1 rounded-full">
            <span className="font-bold mr-1">3 invoices</span> outstanding
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Charts and Data */}
        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm h-[350px] flex flex-col items-center justify-center text-gray-600">
             <Activity className="w-12 h-12 mb-4 text-gray-300" />
             <p className="text-lg font-medium text-gray-900">Player Growth & Revenue Chart</p>
             <p className="text-sm mt-2 max-w-sm text-center">In a full implementation, interactive colorful visualisations would be displayed here.</p>
          </div>
          
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Registrations</h2>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full transition-colors">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-lg">
                  <tr>
                    <th className="px-4 py-3 font-semibold rounded-tl-lg">Player Name</th>
                    <th className="px-4 py-3 font-semibold">Age Group</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold rounded-tr-lg">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Marcus Rashford', age: 'U14', status: 'Active', date: 'Today' },
                    { name: 'Jude Bellingham', age: 'U16', status: 'Trial', date: 'Yesterday' },
                    { name: 'Phil Foden', age: 'U12', status: 'Pending', date: 'Oct 12' },
                  ].map((player, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 font-medium">{player.name}</td>
                      <td className="px-4 py-4 text-gray-600">{player.age}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-3 py-1 font-bold rounded-full 
                          ${player.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                            player.status === 'Trial' ? 'bg-cyan-100 text-cyan-800' : 'bg-amber-100 text-amber-800'}`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">{player.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Upcoming Events & Activity */}
        <motion.div variants={fadeUp} className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-900">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-500" />
              Today's Schedule
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                <div className="flex flex-col items-center justify-center bg-pink-100 text-pink-600 rounded-lg p-2 min-w-[55px]">
                  <span className="text-xs font-bold uppercase">16:00</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">U14 Tactical Session</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pitch 1 • Coach Smith</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                <div className="flex flex-col items-center justify-center bg-cyan-100 text-cyan-600 rounded-lg p-2 min-w-[55px]">
                  <span className="text-xs font-bold uppercase">17:30</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">U16 High Performance</p>
                  <p className="text-xs text-gray-500 mt-0.5">Pitch 2 • Coach Davis</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 text-sm font-bold bg-gray-50 text-purple-600 hover:bg-gray-100 rounded-full transition-colors shadow-sm hover:shadow-md border border-gray-200">
              View Full Schedule
            </button>
          </div>
          
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-gray-900">
             <h2 className="text-xl font-bold mb-5">Activity Feed</h2>
             <div className="space-y-5">
                <div className="relative pl-5 border-l-2 border-gray-200">
                   <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                   <p className="text-sm text-gray-800">Payment of <span className="font-bold text-emerald-600">$150</span> received from <span className="font-bold text-gray-900">Sarah Jenkins</span>.</p>
                   <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                </div>
                <div className="relative pl-5 border-l-2 border-gray-200">
                   <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[7px] top-1 ring-4 ring-white"></div>
                   <p className="text-sm text-gray-800">Coach Davis submitted evaluation for <span className="font-bold text-cyan-600">U16 Team</span>.</p>
                   <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
