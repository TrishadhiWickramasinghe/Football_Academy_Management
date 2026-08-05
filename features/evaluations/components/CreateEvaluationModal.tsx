import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, ClipboardList, TrendingUp, Activity } from 'lucide-react';
import { useEvaluationStore } from '../store/useEvaluationStore';
import { EvaluationType } from '../types/evaluation.types';

interface CreateEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEvaluationModal({ isOpen, onClose }: CreateEvaluationModalProps) {
  const { addEvaluation } = useEvaluationStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    playerName: '',
    evaluatorName: 'Head Coach',
    type: 'Comprehensive' as EvaluationType,
    date: new Date().toISOString().split('T')[0],
    scores: {
      technical: 50,
      tactical: 50,
      physical: 50
    },
    status: 'Completed' as const
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const overall = Math.round((formData.scores.technical + formData.scores.tactical + formData.scores.physical) / 3);
    
    addEvaluation({
      playerId: Math.random().toString(36).substr(2, 9),
      playerName: formData.playerName || 'Unknown Player',
      evaluatorName: formData.evaluatorName,
      date: formData.date,
      type: formData.type,
      scores: formData.scores,
      overallScore: overall,
      status: formData.status
    });
    
    setStep(1);
    setFormData({
      playerName: '', evaluatorName: 'Head Coach', type: 'Comprehensive', date: new Date().toISOString().split('T')[0],
      scores: { technical: 50, tactical: 50, physical: 50 }, status: 'Completed'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl bg-white shadow-2xl flex flex-col rounded-3xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">New Evaluation</h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-500 rounded-full transition-colors shadow-sm">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-1.5 w-full bg-gray-100 flex">
             <motion.div className="h-full bg-purple-600" initial={{ width: '33%' }} animate={{ width: `${(step / 3) * 100}%` }} />
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 md:p-8">
            
            {/* STEP 1: Setup */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><ClipboardList className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Evaluation Details</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Player Name</label>
                    <input 
                      type="text" placeholder="e.g. Lamine Yamal" value={formData.playerName}
                      onChange={e => setFormData({...formData, playerName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Evaluation Type</label>
                    <select 
                      value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as EvaluationType})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer shadow-sm transition-all"
                    >
                      <option value="Comprehensive">Comprehensive Review</option>
                      <option value="Technical">Technical Only</option>
                      <option value="Physical">Physical Only</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Grading */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl"><Activity className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Score Entry</h3>
                </div>
                
                <div className="space-y-6">
                  {['technical', 'tactical', 'physical'].map((metric) => (
                    <div key={metric} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-bold text-gray-800 capitalize">{metric} Score</label>
                        <span className="text-lg font-black text-purple-600">{(formData.scores as any)[metric]}</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" 
                        value={(formData.scores as any)[metric]}
                        onChange={e => setFormData({...formData, scores: {...formData.scores, [metric]: parseInt(e.target.value)}})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Confirm & Save</h3>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp className="w-32 h-32" /></div>
                  <div className="relative z-10">
                    <p className="text-gray-400 font-medium uppercase tracking-widest text-xs mb-1">Final Score</p>
                    <div className="text-6xl font-black mb-6">
                      {Math.round((formData.scores.technical + formData.scores.tactical + formData.scores.physical) / 3)}
                    </div>
                    <h4 className="text-2xl font-bold">{formData.playerName || 'Unknown Player'}</h4>
                    <p className="text-gray-300 font-medium mt-1">{formData.type} Evaluation</p>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={() => setFormData({...formData, status: 'Draft'})}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${formData.status === 'Draft' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'}`}
                  >
                    Save as Draft
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, status: 'Completed'})}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${formData.status === 'Completed' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500'}`}
                  >
                    Mark Completed
                  </button>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
            {step > 1 ? (
              <button onClick={handleBack} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Back</button>
            ) : <div />}
            
            {step < 3 ? (
              <button onClick={handleNext} className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Finalize Evaluation
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
