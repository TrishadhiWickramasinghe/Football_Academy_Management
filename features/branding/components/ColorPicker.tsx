"use client"
import React from "react"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border shadow-sm shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer"
          />
        </div>
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
          pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
        />
      </div>
    </div>
  )
}
