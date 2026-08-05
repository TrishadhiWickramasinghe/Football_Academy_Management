import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, User, Trophy, Stethoscope } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { PlayerStatus } from '../types/player.types';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPlayerModal({ isOpen, onClose }: AddPlayerModalProps) {
  const { addPlayer } = usePlayerStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    position: 'Forward',
    team: 'Unassigned',
    status: 'Active' as PlayerStatus,
    medicalClearance: true
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    // Calculate rough age from DOB
    const birthYear = formData.dateOfBirth ? new Date(formData.dateOfBirth).getFullYear() : new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - birthYear);

    addPlayer({
      firstName: formData.firstName || 'Unknown',
      lastName: formData.lastName || 'Player',
      age: age || 14,
      dateOfBirth: formData.dateOfBirth || '2010-01-01',
      position: formData.position,
      team: formData.team,
      status: formData.status,
      medicalClearance: formData.medicalClearance
    });
    
    // Reset state
    setStep(1);
    setFormData({
      firstName: '', lastName: '', dateOfBirth: '', position: 'Forward', team: 'Unassigned', status: 'Active', medicalClearance: true
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Player</h2>
              <p className="text-sm text-gray-500 mt-1">Step {step} of 4</p>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-100 flex">
             <motion.div 
                className="h-full bg-purple-600"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
             />
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><User className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Personal Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bukayo" 
                      value={formData.firstName}
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Saka" 
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label>
                  <input 
                    type="date" 
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Football Profile */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Trophy className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Football Profile</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Position</label>
                    <select 
                      value={formData.position}
                      onChange={e => setFormData({...formData, position: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    >
                      <option value="Forward">Forward</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Defender">Defender</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Team Assignment</label>
                    <select 
                      value={formData.team}
                      onChange={e => setFormData({...formData, team: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
                    >
                      <option value="Unassigned">Unassigned</option>
                      <option value="U12 Academy">U12 Academy</option>
                      <option value="U14 Elite">U14 Elite</option>
                      <option value="U16 Pro">U16 Pro</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Medical & Status */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Stethoscope className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Medical & Status</h3>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Player Status</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Active', 'Injured', 'Trial', 'Suspended'].map(status => (
                      <div 
                        key={status}
                        onClick={() => setFormData({...formData, status: status as PlayerStatus})}
                        className={`px-4 py-3 rounded-xl border text-center cursor-pointer font-medium transition-all ${formData.status === status ? 'bg-purple-50 border-purple-500 text-purple-700 ring-2 ring-purple-200' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <div>
                    <h4 className="font-semibold text-gray-900">Medical Clearance</h4>
                    <p className="text-sm text-gray-500">Is the player medically cleared to play?</p>
                  </div>
                  <button 
                    onClick={() => setFormData({...formData, medicalClearance: !formData.medicalClearance})}
                    className={`w-14 h-8 rounded-full p-1 transition-colors ${formData.medicalClearance ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${formData.medicalClearance ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Summary */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
                  <h3 className="font-bold text-lg text-gray-900">Review & Finalize</h3>
                </div>
                
                {/* Preview Card */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-800 relative flex items-center px-6">
                    <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white border-4 border-white rounded-full shadow-sm flex items-center justify-center font-bold text-xl text-gray-700">
                      {formData.firstName?.[0] || '?'}{formData.lastName?.[0] || '?'}
                    </div>
                  </div>
                  <div className="pt-10 pb-6 px-6 bg-white">
                    <h3 className="text-xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h3>
                    <p className="text-gray-500 mt-1">{formData.position} • {formData.team}</p>
                    <div className="mt-4 flex gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${formData.status === 'Active' ? 'bg-green-100 text-green-700' : formData.status === 'Injured' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                        {formData.status}
                      </span>
                      {formData.medicalClearance && (
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                          Medically Cleared
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-white">
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
                className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Add Player
              </button>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
