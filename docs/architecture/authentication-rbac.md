# Authentication and RBAC Architecture

AcademySphere uses **Clerk** for Identity and Session Management, combined with a custom Role-Based Access Control (RBAC) system defined centrally in our codebase.

## Authentication (Who are you?)

- **Provider**: Clerk
- **Features Supported**:
  - Email/Password login
  - Social login (Google, Microsoft)
  - Multi-Factor Authentication (MFA)
  - Session Management
  - Organization logic (B2B SaaS mapping)

We rely on Clerk's middleware to protect routes in Next.js. Unauthorized users are immediately redirected to the login flow before hitting our application logic.

## Authorization (What can you do?)

While Clerk handles Authentication, AcademySphere enforces Authorization.

### 1. Role Hierarchy

AcademySphere supports the following standard roles across the platform:
- **Super Admin**: Platform-wide access (us). Can manage organizations and subscriptions.
- **Org Admin**: Full access to a specific tenant/organization.
- **Club Manager**: Can manage multiple teams and coaches within a tenant.
- **Head Coach**: Can manage specific programs and their assigned coaches.
- **Coach**: Can manage their assigned teams, sessions, and attendance.
- **Referee**: Can input scores for assigned tournament matches.
- **Parent / Guardian**: Read-only access to their children's data and financial invoices.
- **Player**: Access to personal development and video highlights.
- **Analyst**: Access to video tagging and performance metrics.

### 2. Centralized Permission System

Permissions are not hardcoded randomly in UI components. They are defined centrally (e.g., `packages/permissions/`).

```typescript
// Example Definition
export const PERMISSIONS = {
  CREATE_PLAYER: 'player:create',
  EDIT_TEAM: 'team:edit',
  VIEW_FINANCIALS: 'billing:view',
} as const;

export const ROLE_PERMISSIONS = {
  'Org Admin': [PERMISSIONS.CREATE_PLAYER, PERMISSIONS.EDIT_TEAM, PERMISSIONS.VIEW_FINANCIALS],
  'Coach': [PERMISSIONS.CREATE_PLAYER, PERMISSIONS.EDIT_TEAM],
  // ...
};
```

### 3. Enforcement Strategy

- **UI UX Guards**: We hide buttons and routes the user cannot access using a `usePermissions()` hook. This is for UX only.
- **Backend Enforcement**: Every tRPC router procedure MUST invoke a middleware guard (e.g., `protectedProcedure.withPermissions('player:create')`) to enforce security at the data layer.
