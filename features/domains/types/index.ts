export type DomainStatus = 
  | "pending"
  | "verification_required"
  | "verifying"
  | "verified"
  | "ssl_provisioning"
  | "active"
  | "ssl_expiring"
  | "failed"
  | "suspended";

export interface DomainRecord {
  id: string;
  tenantId: string;
  hostname: string;
  status: DomainStatus;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  dnsRecords?: DnsRecord[];
  sslStatus?: SslStatus;
}

export interface DnsRecord {
  type: "CNAME" | "TXT" | "A";
  name: string;
  value: string;
}

export interface SslStatus {
  status: "pending" | "active" | "failed" | "expired";
  issuedAt?: string;
  expiresAt?: string;
  autoRenew: boolean;
}
