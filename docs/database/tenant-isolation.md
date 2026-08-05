# Tenant Isolation Strategy

AcademySphere is a multi-tenant platform. We must strictly ensure that Tenant A (e.g., Real Madrid Academy) can NEVER access data belonging to Tenant B (e.g., Barcelona Academy).

## 1. The `organisationId` Boundary
Almost every core model in the database has a direct or indirect relationship to an `Organisation`.
- Direct: `Player`, `Team`, `User`, `Tournament`, `Invoice` all possess a direct `organisationId` column.
- Indirect: `Goal` links to `Match` which links to `Tournament` which links to `Organisation`.

## 2. API Level Enforcement
The frontend must not be trusted.
If the frontend sends `GET /api/players/123`, the backend must automatically inject the current session's `organisationId` into the Prisma query.

**INCORRECT (VULNERABLE):**
```typescript
const player = await prisma.player.findUnique({
  where: { id: input.playerId }
});
```
If a malicious user from Tenant B guesses the ID of a player in Tenant A, this query would return the data.

**CORRECT (SECURE):**
```typescript
const player = await prisma.player.findFirst({
  where: {
    id: input.playerId,
    organisationId: ctx.session.organisationId // Injected automatically from Clerk JWT
  }
});
```

## 3. Indexing Strategy
To ensure database performance at scale (e.g., 10M+ records), all queries filtering by `organisationId` must be supported by an index.
In the Prisma schema, we explicitly declare:
```prisma
@@index([organisationId])
```
on all high-volume tables (Players, Teams, Invoices).
