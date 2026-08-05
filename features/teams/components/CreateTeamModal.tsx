import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTeamStore } from '../store/useTeamStore';
import { useForm } from 'react-hook-form';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  ageGroup: string;
  division: string;
  season: string;
  homeVenue: string;
  status: 'Active' | 'Inactive';
}

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { addTeam } = useTeamStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      season: '2025/2026',
      status: 'Active'
    }
  });

  const onSubmit = (data: FormValues) => {
    addTeam({
      name: data.name,
      ageGroup: data.ageGroup,
      division: data.division,
      season: data.season,
      homeVenue: data.homeVenue,
      status: data.status,
      foundedDate: new Date().getFullYear().toString()
    });
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-background rounded-xl shadow-xl w-full max-w-lg border overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold">Create New Team</h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded-md"><X className="w-5 h-5" /></button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Team Name</label>
              <input 
                {...register('name', { required: 'Team name is required' })} 
                className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary" 
                placeholder="e.g. Manchester Utd U16"
              />
              {errors.name && <span className="text-xs text-destructive mt-1">{errors.name.message}</span>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age Group</label>
                <select 
                  {...register('ageGroup')} 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="U12">U12</option>
                  <option value="U14">U14</option>
                  <option value="U16">U16</option>
                  <option value="Senior">Senior</option>
                  <option value="Women's">Women's</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Division</label>
                <input 
                  {...register('division')} 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="League Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Season</label>
                <input 
                  {...register('season')} 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  {...register('status')} 
                  className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Home Venue</label>
              <input 
                {...register('homeVenue')} 
                className="w-full px-3 py-2 bg-background border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary" 
                placeholder="e.g. Pitch 1"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Create Team
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
