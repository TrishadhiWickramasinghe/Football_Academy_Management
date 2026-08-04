# Folder Structure

AcademySphere uses a hybrid Route-Based and Feature-Based architecture designed for a large, multi-tenant SaaS application.

## High-Level Directories

- \`app/\`: Next.js App Router. Handles routing, layouts, and page composition. Does not contain complex business logic.
- \`components/\`: Highly reusable UI components shared across the entire application (e.g., UI primitives, layouts).
- \`features/\`: Domain-specific modules (e.g., \`players\`, \`tournaments\`, \`auth\`). Each feature encapsulates its own components, hooks, services, and types.
- \`services/\`: Centralised API clients and external integrations.
- \`contexts/\`: React Context providers for global state (Auth, Tenant, Theme).
- \`hooks/\`: Generic, non-feature-specific React hooks.
- \`types/\`: Global TypeScript types and interfaces used across multiple features.
- \`schemas/\`: Zod validation schemas for forms and API responses.
- \`lib/\`: Utility functions and third-party wrappers (e.g., formatting, currency, i18n).
- \`config/\`: Application configuration constants.
- \`i18n/\`: Internationalisation setup and translation files.
- \`store/\`: Global state management (if applicable, e.g., Zustand), though preferred approach is server-state + context.
- \`mocks/\`: Mock data for development and testing.
- \`constants/\`: Global constants (e.g., roles, permissions).
- \`docs/\`: Architectural and feature documentation.

## Feature Module Structure

Every feature inside \`features/\` should follow a standard internal structure:

\`\`\`text
features/[feature-name]/
├── components/       # Feature-specific UI components
├── hooks/            # Feature-specific custom hooks
├── services/         # Feature-specific API interactions
├── schemas/          # Feature-specific validation schemas
├── types/            # Feature-specific types
├── constants/        # Feature-specific constants
└── index.ts          # Barrel file exporting public API of the feature
\`\`\`

## Rules
1. **Direction of Dependency**: \`app\` -> \`features\` -> \`services/lib\` -> \`components/ui\`.
2. **Shared UI**: Do not put business logic in \`components/ui\`.
3. **No Circular Dependencies**: Ensure features do not depend on each other improperly. Use shared \`types/\` if two features need the same model.
