import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, Shield, Palette, Settings, Image as ImageIcon } from 'lucide-react';
import { useTeamStore } from '../store/useTeamStore';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981', 
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e', '#1e293b'
];

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { addTeam } = useTeamStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    ageGroup: 'U16',
    division: '',
    season: '2025/2026',
    homeVenue: '',
    primaryColor: '#3b82f6',
    crestUrl: ''
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    addTeam({
      name: formData.name || 'New Team',
      ageGroup: formData.ageGroup,
      division: formData.division || 'Unassigned',
      season: formData.season,
      homeVenue: formData.homeVenue || 'Main Facility',
      status: 'Active',
      foundedDate: new Date().getFullYear().toString(),
      kits: [{ type: 'Home', primaryColor: formData.primaryColor, secondaryColor: '#ffffff' }],
      crestUrl: formData.crestUrl
    });
    
    // Reset state
    setStep(1);
    setFormData({
      name: '', ageGroup: 'U16', division: '', season: '2025/2026', homeVenue: '', primaryColor: '#3b82f6', crestUrl: ''
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl max-h-[90vh] bg-white shadow-2xl flex flex-col rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200" style={{ borderTop: `4px solid ${formData.primaryColor}` }}>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Team</h2>
              <p className="text-sm text-gray-500 mt-1">Step {step} of 4</p>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-100 flex">
             <motion.div 
                className="h-full"
                style={{ backgroundColor: formData.primaryColor }}
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
             />
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* STEP 1: Identity */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Team Identity</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Team Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Manchester Utd U16" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age Group</label>
                    <select 
                      value={formData.ageGroup}
                      onChange={e => setFormData({...formData, ageGroup: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow cursor-pointer"
                    >
                      <option value="U12">U12</option>
                      <option value="U14">U14</option>
                      <option value="U16">U16</option>
                      <option value="Senior">Senior</option>
                      <option value="Women's">Women's</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Division / League</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Premier League North"
                      value={formData.division}
                      onChange={e => setFormData({...formData, division: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Operations */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Settings className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Operations</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Season</label>
                    <select 
                      value={formData.season}
                      onChange={e => setFormData({...formData, season: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    >
                      <option value="2025/2026">2025/2026</option>
                      <option value="2024/2025">2024/2025</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Home Venue</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Training Pitch 1"
                      value={formData.homeVenue}
                      onChange={e => setFormData({...formData, homeVenue: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Appearance */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Palette className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Appearance</h3>
                    <p className="text-sm text-gray-500">This color will theme the team's dashboard and profile.</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Team Color</label>
                  <div className="flex flex-wrap gap-3">
                    {PRESET_COLORS.map(color => (
                      <div 
                        key={color}
                        onClick={() => setFormData({...formData, primaryColor: color})}
                        className={`w-10 h-10 rounded-full cursor-pointer transition-all ${formData.primaryColor === color ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Crest URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/logo.png"
                    value={formData.crestUrl}
                    onChange={e => setFormData({...formData, crestUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Summary */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Review & Create</h3>
                </div>
                
                {/* Preview Card */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-24 relative flex items-center px-6" style={{ background: `linear-gradient(135deg, ${formData.primaryColor} 0%, #1e1b4b 100%)` }}>
                    <div className="absolute -bottom-6 left-6 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                      {formData.crestUrl ? (
                        <img src={formData.crestUrl} alt="crest" className="w-14 h-14 object-contain" />
                      ) : (
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400">
                          <Shield className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pt-10 pb-6 px-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900">{formData.name || 'Untitled Team'}</h3>
                    <p className="text-gray-500 mt-1">{formData.ageGroup} • {formData.division || 'No Division'}</p>
                    <p className="text-sm text-gray-400 mt-3">{formData.homeVenue} • {formData.season}</p>
                  </div>
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
            
            {step < 4 ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: formData.primaryColor }}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: formData.primaryColor }}
              >
                <CheckCircle2 className="w-4 h-4" /> Finalize Team
              </button>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
