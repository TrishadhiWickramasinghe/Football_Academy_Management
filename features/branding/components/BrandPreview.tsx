"use client"
import React from "react"
import { Users, Shield, Calendar } from "lucide-react"

interface BrandPreviewProps {
  primary: string
  secondary: string
  logo?: string
  tenantName: string
}

export function BrandPreview({ primary, secondary, logo, tenantName }: BrandPreviewProps) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col h-full bg-white">
      <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
        {logo ? (
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain bg-white rounded p-1" />
        ) : (
          <Shield className="h-6 w-6" style={{ color: primary }} />
        )}
        <span className="font-semibold truncate">{tenantName}</span>
      </div>
      
      <div className="p-6 flex-1 bg-slate-50">
        <h4 className="font-medium text-lg mb-4 text-slate-900">Dashboard Preview</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="p-2 rounded-md" style={{ backgroundColor: `${primary}15`, color: primary }}>
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Players</p>
              <p className="text-lg font-bold text-slate-900">1,240</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="p-2 rounded-md" style={{ backgroundColor: `${secondary}15`, color: secondary }}>
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Sessions</p>
              <p className="text-lg font-bold text-slate-900">48</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            className="w-full py-2.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90 shadow-sm"
            style={{ backgroundColor: primary }}
          >
            Primary Action
          </button>
          <button 
            className="w-full py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: `${secondary}15`, color: secondary }}
          >
            Secondary Action
          </button>
        </div>
      </div>
    </div>
  )
}
