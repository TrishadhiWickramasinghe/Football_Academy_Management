"use client"
import React, { useState } from "react"
import { UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LogoUploaderProps {
  label: string
  description?: string
  currentUrl?: string
  onUpload: (url: string) => void
  onRemove: () => void
}

export function LogoUploader({ label, description, currentUrl, onUpload, onRemove }: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0])
    }
  }

  const simulateUpload = (file: File) => {
    setIsUploading(true)
    // Simulate upload delay and mock URL
    setTimeout(() => {
      onUpload(URL.createObjectURL(file))
      setIsUploading(false)
    }, 1000)
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      
      {currentUrl ? (
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-muted/30">
          <div className="w-16 h-16 rounded bg-white border shadow-sm flex items-center justify-center overflow-hidden">
            <img src={currentUrl} alt="Logo" className="max-w-full max-h-full object-contain p-1" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Current Logo</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => document.getElementById(`file-upload-${label}`)?.click()}>
                Replace
              </Button>
              <Button variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                Remove
              </Button>
            </div>
          </div>
          <input 
            id={`file-upload-${label}`}
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="hidden" 
            id={`file-upload-${label}`}
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleFileChange}
          />
          <label htmlFor={`file-upload-${label}`} className="cursor-pointer flex flex-col items-center">
            <div className="p-3 bg-muted rounded-full mb-3">
              <UploadCloud className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-medium mb-1">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-muted-foreground">
              {description || "SVG, PNG or JPG (max. 2MB)"}
            </p>
          </label>
        </div>
      )}
    </div>
  )
}
