"use client";

import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { ClipboardList, TrendingUp, Star, Clock } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import { useEvaluationStore } from '@/features/evaluations/store/useEvaluationStore';
import { CreateEvaluationModal } from '@/features/evaluations/components/CreateEvaluationModal';

export default function EvaluationsPage() {
  const { evaluations } = useEvaluationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnDef<Evaluation>[] = [
    { 
      header: 'Player', 
      accessorKey: 'playerName',
      cell: (evalItem) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
            {evalItem.playerName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-gray-900">{evalItem.playerName}</p>
            <p className="text-xs text-gray-500 font-medium">{evalItem.date}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Evaluator', 
      accessorKey: 'evaluatorName',
      cell: (item) => <span className="font-medium text-gray-700">{item.evaluatorName}</span>
    },
    { 
      header: 'Type', 
      accessorKey: 'type',
      cell: (item) => (
        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-gray-100 text-gray-700">
          {item.type}
        </span>
      )
    },
    { 
      header: 'Score', 
      accessorKey: 'overallScore',
      cell: (item) => {
        let badgeStyle = 'bg-gray-100 text-gray-700';
        if (item.overallScore >= 85) badgeStyle = 'bg-green-100 text-green-700';
        else if (item.overallScore >= 70) badgeStyle = 'bg-blue-100 text-blue-700';
        else if (item.overallScore >= 50) badgeStyle = 'bg-orange-100 text-orange-700';
        else badgeStyle = 'bg-red-100 text-red-700';

        return (
          <span className={`px-3 py-1.5 rounded-xl font-black text-sm ${badgeStyle}`}>
            {item.overallScore}
          </span>
        );
      }
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (item) => (
        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${item.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
          {item.status}
        </span>
      )
    }
  ];

  const avgScore = evaluations.length > 0 
    ? Math.round(evaluations.reduce((sum, e) => sum + e.overallScore, 0) / evaluations.length) 
    : 0;
  
  const pendingCount = evaluations.filter(e => e.status === 'Draft').length;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-6 bg-white min-h-[calc(100vh-4rem)] m-2 lg:m-4 rounded-3xl text-gray-900 shadow-lg border border-gray-100"
    >
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 drop-shadow-sm">Performance Hub</h1>
          <p className="text-gray-500 mt-1 font-medium">Track player development and coaching assessments.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            + New Evaluation
          </button>
        </div>
      </motion.div>

      {/* KPI Overview */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold">Total Reviews</span>
          </div>
          <div className="text-3xl font-black text-gray-900">{evaluations.length}</div>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-bold">Pending</span>
          </div>
          <div className="text-3xl font-black text-gray-900">{pendingCount}</div>
        </div>
        
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold">Academy Avg</span>
          </div>
          <div className="text-3xl font-black text-gray-900">{avgScore}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-2xl p-5 shadow-sm text-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2 text-white/80">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-bold">Top Performer</span>
          </div>
          <div className="text-2xl font-black truncate">
            {evaluations.length > 0 ? [...evaluations].sort((a,b) => b.overallScore - a.overallScore)[0].playerName : 'N/A'}
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white rounded-2xl p-1">
        <DataTable 
          data={evaluations} 
          columns={columns} 
          searchPlaceholder="Search evaluations by player or coach..."
        />
      </motion.div>
      
      <CreateEvaluationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
