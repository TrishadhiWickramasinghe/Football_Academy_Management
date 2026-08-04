"use client"
import React from "react"
import { ParentInvoice } from "../types/parent.types"
import { Receipt, CheckCircle2, AlertCircle, Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PaymentInvoiceCard({ invoice }: { invoice: ParentInvoice }) {
  const isPaid = invoice.status === "paid"
  const isOverdue = invoice.status === "overdue"

  return (
    <div className={`bg-card border rounded-2xl p-5 shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${isOverdue ? 'border-destructive shadow-destructive/10' : ''}`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isPaid ? "bg-success/20 text-success" : 
            isOverdue ? "bg-destructive/20 text-destructive" : 
            "bg-primary/20 text-primary"
          }`}>
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold">{invoice.description}</h4>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span>Issued: {new Date(invoice.invoiceDate).toLocaleDateString()}</span>
              <span>•</span>
              <span className={isOverdue ? 'text-destructive font-semibold' : ''}>
                Due: {new Date(invoice.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
          <div className="text-xl font-black tabular-nums">
            ${invoice.amount.toFixed(2)}
          </div>
          <div className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
            isPaid ? "bg-success/20 text-success" : 
            isOverdue ? "bg-destructive/20 text-destructive" : 
            "bg-amber-100 text-amber-700"
          }`}>
            {isPaid && <CheckCircle2 className="w-3 h-3" />}
            {isOverdue && <AlertCircle className="w-3 h-3" />}
            {invoice.status === "outstanding" && <Clock className="w-3 h-3" />}
            {invoice.status}
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t flex flex-col sm:flex-row gap-2 justify-end">
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" /> PDF
        </Button>
        {!isPaid && (
          <Button size="sm" className={`w-full sm:w-auto ${isOverdue ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' : ''}`}>
            Pay Now
          </Button>
        )}
      </div>
    </div>
  )
}
