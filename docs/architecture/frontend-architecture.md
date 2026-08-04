# Frontend Architecture

AcademySphere is a multi-tenant, white-label SaaS platform built with Next.js (App Router), React, and TypeScript.

## Core Principles

1. **Separation of Concerns**: UI rendering is separated from business logic. The `app` router focuses on routing and layout composition. The `features` directory encapsulates domain-specific logic.
2. **Multi-Tenancy**: The application is designed to support multiple organisations (tenants). Tenant context (ID, branding, timezone, currency) is securely maintained and passed to API requests.
3. **Role-Based Access Control (RBAC)**: Frontend permissions dictate UI visibility (e.g., hiding a "Delete Player" button). Actual security is enforced by the backend API.
4. **Internationalisation & Localisation**: All user-facing strings use translation keys. Currencies, dates, and numbers are formatted according to the tenant's locale.
5. **Component Reusability**: Generic UI elements reside in `components/ui` and are purely presentational. They do not contain football-specific logic.

## Application Layers

### 1. App / Routing Layer (`app/`)
Responsible for URL routing, server components, and page layouts. Uses Next.js 13+ App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`). Pages should be "thin" and compose feature components.

### 2. Feature Layer (`features/`)
Contains domain-specific logic (e.g., `players`, `tournaments`). Each feature is self-contained with its own components, hooks, services, and schemas.

### 3. API & Service Layer (`services/`)
A centralized API client (`services/api/api-client.ts`) handles communication with the backend, automatically attaching authentication tokens and tenant context. Feature services use this client to make specific API calls.

### 4. Context Layer (`contexts/`)
React Context is used sparingly for global state that changes infrequently, such as:
- `AuthContext`: Current user session.
- `TenantContext`: Current organisation details and branding.
- `PermissionContext`: Current user's RBAC permissions.

### 5. Shared Infrastructure (`lib/`, `types/`, `schemas/`)
- **`lib/`**: Contains pure utility functions for formatting, validation wrappers, and integrations.
- **`types/`**: Shared TypeScript models representing core domain objects.
- **`schemas/`**: Zod schemas for form validation and API response parsing, ensuring type safety at runtime.

## Data Flow Example

1. User visits `/dashboard/players`.
2. `app/(dashboard)/dashboard/players/page.tsx` renders `<PlayerPage />` from `features/players/components/player-page.tsx`.
3. `<PlayerPage />` calls `usePlayers()` from `features/players/hooks/use-players.ts`.
4. `usePlayers()` calls `playerService.getPlayers()` from `features/players/services/player.service.ts`.
5. `playerService.getPlayers()` uses the central `apiClient.get('/players')`.
6. `apiClient` attaches the `Authorization` header and `X-Tenant-ID` header, then makes the fetch request.
7. The response is validated against `PlayerSchema` (from `schemas/player.schema.ts`) and returned to the UI.
