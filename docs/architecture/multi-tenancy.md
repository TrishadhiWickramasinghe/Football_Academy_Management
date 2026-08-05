# Multi-Tenancy Architecture

AcademySphere is fundamentally a multi-tenant platform. A "Tenant" represents a distinct organization (e.g., a Football Academy, a School, or a Corporate Sports Program).

## Core Principles

### 1. Strict Tenant Isolation
- **Data Boundary**: Every tenant-owned database record must include a `tenantId`.
- **Authorization**: The backend (tRPC procedures) MUST enforce that the currently authenticated user has the right to access the requested `tenantId`.
- **Zero Client Trust**: We NEVER trust a `tenantId` parameter provided by the frontend if the user does not demonstrably belong to that tenant.

### 2. Tenant Context Resolution
When a user accesses the platform, the Tenant Context is resolved via:
1. **Custom Domain/Subdomain**: e.g., `opaacademy.academysphere.com` resolves to the OPA Academy tenant.
2. **User Context**: If a user logs in via a generic portal, Clerk determines which Organization(s) they belong to, and they select one to establish context.

### 3. White-label Branding
Once the Tenant Context is resolved, the platform dynamically fetches the tenant's configuration:
- CSS variables (`--tenant-primary`, `--tenant-secondary`) are injected into the DOM.
- The UI (Tailwind via `shadcn/ui`) consumes these CSS variables.
- Logos, favicons, and email branding (Resend) are overridden dynamically.

## Multi-Tenant Database Design (Prisma)

```prisma
model Organisation {
  id              String   @id @default(cuid())
  name            String
  subdomain       String   @unique
  // Branding
  primaryColor    String?
  secondaryColor  String?
  
  // Relations
  users           User[]
  players         Player[]
  teams           Team[]
}

model Player {
  id             String       @id @default(cuid())
  organisationId String       // The Tenant Boundary
  organisation   Organisation @relation(fields: [organisationId], references: [id])
  
  @@index([organisationId])   // Critical for performance
}
```

## Security Rule
Never write a Prisma query like this:
```typescript
// DANGEROUS: Missing tenant isolation
const players = await prisma.player.findMany();
```
Always scope to the resolved tenant:
```typescript
// SAFE
const players = await prisma.player.findMany({
  where: { organisationId: ctx.tenantId }
});
```
