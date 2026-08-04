import { DomainRecord, DnsRecord } from "../types";

const MOCK_DOMAIN: DomainRecord = {
  id: "dom-123",
  tenantId: "tenant-001",
  hostname: "portal.opaacademy.com",
  status: "active",
  isPrimary: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  dnsRecords: [
    { type: "CNAME", name: "portal", value: "tenant-001.academysphere.app" },
    { type: "TXT", name: "_academysphere", value: "academysphere-verify-opaacademy" }
  ],
  sslStatus: {
    status: "active",
    issuedAt: "2026-08-04T00:00:00Z",
    expiresAt: "2027-08-04T00:00:00Z",
    autoRenew: true
  }
};

export const domainService = {
  async getDomain(tenantId: string): Promise<DomainRecord | null> {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DOMAIN), 500));
  },
  
  async addCustomDomain(tenantId: string, hostname: string): Promise<DomainRecord> {
    return new Promise((resolve) => setTimeout(() => resolve({
      ...MOCK_DOMAIN,
      hostname,
      status: "verification_required",
      sslStatus: { status: "pending", autoRenew: true }
    }), 800));
  },
  
  async verifyDomain(tenantId: string, domainId: string): Promise<DomainRecord> {
    return new Promise((resolve) => setTimeout(() => resolve({
      ...MOCK_DOMAIN,
      status: "verified"
    }), 1500));
  }
};
