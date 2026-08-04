"use client"
import React, { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ParentInvoice } from "@/features/parent-portal/types/parent.types"
import { PaymentInvoiceCard } from "@/features/parent-portal/components/PaymentInvoiceCard"
import { Loader2, CreditCard } from "lucide-react"

export default function ParentPaymentsPage() {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState<ParentInvoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await parentService.getInvoices(user.id);
        setInvoices(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load();
  }, [user])

  if (!user || isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  const outstanding = invoices.filter(i => i.status !== "paid")
  const paid = invoices.filter(i => i.status === "paid")

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground mt-1">Manage your subscriptions and tournament fees.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Action Required</h2>
          {outstanding.length > 0 ? (
            <div className="space-y-4">
              {outstanding.map(inv => (
                <PaymentInvoiceCard key={inv.id} invoice={inv} />
              ))}
            </div>
          ) : (
            <div className="p-6 bg-success/10 text-success rounded-xl border border-success/20 font-medium flex items-center gap-3">
              <CreditCard className="w-5 h-5" /> You are all caught up! No outstanding payments.
            </div>
          )}
        </div>

        {paid.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-muted-foreground">Payment History</h2>
            <div className="space-y-4 opacity-80">
              {paid.map(inv => (
                <PaymentInvoiceCard key={inv.id} invoice={inv} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
