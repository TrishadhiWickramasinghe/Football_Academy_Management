import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Activity, ChevronRight, CheckCircle2, Play, Users, Clock } from 'lucide-react';
import { TrainingSession } from '../../types/coaching.types';

interface CreatePlanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (session: TrainingSession) => void;
}

const MOCK_DRILLS = [
  { id: '1', title: '7v7 Half-pitch Game', category: 'Tactical', time: '30m' },
  { id: '2', title: 'Agility Ladder & Finish', category: 'Physical', time: '15m' },
  { id: '3', title: 'Y-Passing Drill', category: 'Technical', time: '20m' },
  { id: '4', title: 'Defensive Shape Walkthrough', category: 'Tactical', time: '25m' },
];

export function CreatePlanDrawer({ isOpen, onClose, onSubmit }: CreatePlanDrawerProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    ageGroup: 'U16',
    theme: '',
    drills: [] as string[],
    intensity: 'Medium'
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  
  const handleToggleDrill = (drillId: string) => {
    setFormData(prev => ({
      ...prev,
      drills: prev.drills.includes(drillId) 
        ? prev.drills.filter(id => id !== drillId)
        : [...prev.drills, drillId]
    }));
  };

  const handleSubmit = () => {
    // Generate a new training session object based on formData
    const newSession: TrainingSession = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'New Training Session',
      teamId: 't-new',
      teamName: formData.ageGroup + ' Academy',
      ageGroup: formData.ageGroup,
      date: formData.date || new Date().toISOString(),
      startTime: formData.startTime || '16:00',
      endTime: formData.endTime || '17:30',
      location: 'Main Pitch',
      coachId: 'c1',
      theme: formData.theme || 'General Training',
      objectives: ['Improve overall team performance', 'Tactical cohesion'],
      methodology: 'Tactical Periodization',
      status: 'SCHEDULED',
      attendanceTaken: false,
      drills: [] // In a real app, map the drill IDs to actual SessionDrill objects
    };
    
    onSubmit(newSession);
    
    // Reset state for next time
    setStep(1);
    setFormData({
      title: '', date: '', startTime: '', endTime: '', ageGroup: 'U16', theme: '', drills: [], intensity: 'Medium'
    });
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-3xl max-h-[90vh] bg-white shadow-2xl flex flex-col rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create Training Plan</h2>
              <p className="text-sm text-gray-500 mt-1">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-gray-100 flex">
             <motion.div 
                className="h-full bg-purple-600"
                initial={{ width: '33%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
             />
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* STEP 1: Details */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Session Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Attacking Transitions" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age Group</label>
                    <select 
                      value={formData.ageGroup}
                      onChange={e => setFormData({...formData, ageGroup: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>U12</option>
                      <option>U14</option>
                      <option>U16</option>
                      <option>Senior</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Time</label>
                    <input 
                      type="time" 
                      value={formData.startTime}
                      onChange={e => setFormData({...formData, startTime: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Time</label>
                    <input 
                      type="time" 
                      value={formData.endTime}
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Theme</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Build-up play under pressure" 
                    value={formData.theme}
                    onChange={e => setFormData({...formData, theme: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Drills */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Select Drills</h3>
                  <p className="text-sm text-gray-500 mb-4">Choose exercises from the club library to add to this session.</p>
                </div>
                
                <div className="space-y-3">
                  {MOCK_DRILLS.map(drill => {
                    const isSelected = formData.drills.includes(drill.id);
                    return (
                      <div 
                        key={drill.id} 
                        onClick={() => handleToggleDrill(drill.id)}
                        className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer
                          ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-100 bg-white hover:border-purple-200'}`}
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors
                          ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                           {isSelected ? <CheckCircle2 className="w-6 h-6" /> : <Play className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold truncate ${isSelected ? 'text-purple-900' : 'text-gray-900'}`}>{drill.title}</h4>
                          <div className="flex items-center gap-2 text-xs font-medium mt-1">
                            <span className={`px-2 py-0.5 rounded-md ${isSelected ? 'bg-purple-200/50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{drill.category}</span>
                            <span className={isSelected ? 'text-purple-600' : 'text-gray-500'}>• {drill.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Intensity & Load */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Session Intensity</h3>
                  <p className="text-sm text-gray-500 mb-4">Set the expected physical load for periodization tracking.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { level: 'Low', desc: 'Recovery, tactical walk-throughs', color: 'bg-green-100 border-green-200 text-green-800' },
                    { level: 'Medium', desc: 'Technical repetition, moderate SSGs', color: 'bg-orange-100 border-orange-200 text-orange-800' },
                    { level: 'High', desc: 'Match intensity, large areas', color: 'bg-red-100 border-red-200 text-red-800' }
                  ].map(intensity => {
                    const isSelected = formData.intensity === intensity.level;
                    return (
                      <div 
                        key={intensity.level}
                        onClick={() => setFormData({...formData, intensity: intensity.level})}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col gap-1
                          ${isSelected ? intensity.color : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                      >
                         <h4 className="font-bold">{intensity.level} Intensity</h4>
                         <p className="text-sm opacity-80">{intensity.desc}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
                   <h4 className="font-bold text-gray-900 mb-2">Summary</h4>
                   <ul className="text-sm text-gray-600 space-y-2">
                     <li className="flex justify-between"><span>Title:</span> <span className="font-medium text-gray-900">{formData.title || 'Untitled'}</span></li>
                     <li className="flex justify-between"><span>Drills Selected:</span> <span className="font-medium text-gray-900">{formData.drills.length} drills</span></li>
                     <li className="flex justify-between"><span>Intensity:</span> <span className="font-medium text-gray-900">{formData.intensity}</span></li>
                   </ul>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            ) : <div />}
            
            {step < 3 ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Create Plan
              </button>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
