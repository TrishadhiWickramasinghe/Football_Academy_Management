export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'MXN';

export type InvoiceStatus = 'Draft' | 'Issued' | 'Pending' | 'Paid' | 'Partially Paid' | 'Overdue' | 'Void' | 'Refunded';
export type PaymentStatus = 'Succeeded' | 'Pending' | 'Failed' | 'Cancelled' | 'Refunded' | 'Partially Refunded';
export type SubscriptionStatus = 'Trial' | 'Active' | 'Past Due' | 'Grace Period' | 'Suspended' | 'Cancelled' | 'Expired';
export type BillingCycle = 'Monthly' | 'Termly' | 'Annual';

export interface Money {
  amount: number; // in minor units, e.g., cents
  currency: Currency;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: Money;
  billingCycle: BillingCycle;
  features: string[];
}

export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: Money;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  amount: Money;
  quantity: number;
}

export interface Invoice {
  id: string;
  tenantId: string;
  customerId: string;
  customerName: string;
  number: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotal: Money;
  tax: Money;
  discount: Money;
  total: Money;
  amountPaid: Money;
  balanceDue: Money;
  items: InvoiceLineItem[];
}

export interface PaymentMethod {
  id: string;
  type: 'Card' | 'Apple Pay' | 'Google Pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  customerId: string;
  amount: Money;
  status: PaymentStatus;
  date: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
}

export interface RevenueAnalytics {
  totalRevenue: Money;
  mrr: Money;
  arr: Money;
  outstandingReceivables: Money;
  activeSubscriptions: number;
  churnRate: number;
  revenueBySource: {
    source: string;
    amount: Money;
    percentage: number;
  }[];
}
