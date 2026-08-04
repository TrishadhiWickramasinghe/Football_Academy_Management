"use client"
import React, { useState } from "react"
import { DnsRecord } from "../types"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DnsRecords({ records }: { records: DnsRecord[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div key={index} className="bg-muted p-4 rounded-lg border font-mono text-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-20">
              <span className="text-muted-foreground text-xs block mb-1">Type</span>
              <span className="font-semibold">{record.type}</span>
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
              <span className="text-muted-foreground text-xs block mb-1">Name</span>
              <span className="truncate block" title={record.name}>{record.name}</span>
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
              <span className="text-muted-foreground text-xs block mb-1">Value</span>
              <span className="truncate block" title={record.value}>{record.value}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0"
              onClick={() => handleCopy(record.value, index)}
            >
              {copiedIndex === index ? (
                <><Check className="w-4 h-4 mr-2" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" /> Copy Value</>
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
