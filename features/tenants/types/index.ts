export type TenantStatus = "active" | "suspended" | "pending";
export type SubscriptionPlan = "STARTER" | "PROFESSIONAL" | "ENTERPRISE" | "WHITE_LABEL";

export interface TenantTheme {
  primary: string;
  secondary: string;
  logo?: string;
  favicon?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: TenantStatus;

  subdomain?: string;
  customDomain?: string;

  theme: TenantTheme;

  plan: SubscriptionPlan;

  whiteLabelEnabled: boolean;

  emailSenderName?: string;
  emailReplyTo?: string;

  termsUrl?: string;
  privacyUrl?: string;
}
