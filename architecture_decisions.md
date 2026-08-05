# Architecture Decisions Log

This document records the major architectural decisions made for the AcademySphere platform.

## 1. Modular Monolith over Microservices
**Context**: We need to scale to 50,000 concurrent users across multiple tenants (academies, companies, schools). 
**Decision**: We will begin with a **Modular Monolith** structure (using Next.js and feature-based folders) rather than splitting into 10+ microservices from Day 1.
**Reasoning**: Premature microservices introduce immense operational complexity (network latency, distributed transactions, complex CI/CD). A modular monolith allows us to enforce strict boundaries now, while keeping deployment simple, with the ability to extract specific high-load services (e.g. video processing) later.

## 2. Next.js App Router (Server & Client Components)
**Context**: We need SEO for public pages, fast initial loads (< 2s on 4G), and highly interactive dashboards.
**Decision**: Use Next.js 14 App Router. Default to Server Components, and use Client Components (`"use client"`) *only* at the leaves of the tree for interactivity (forms, charts, real-time widgets).
**Reasoning**: Reduces JavaScript bundle size shipped to the client, improving TTI (Time to Interactive) and Core Web Vitals.

## 3. tRPC + React Query for API Layer
**Context**: We need strong type-safety between the backend API and frontend, plus efficient caching.
**Decision**: Use tRPC for end-to-end type safety, wrapped with TanStack React Query for data fetching, caching, and background synchronization.
**Reasoning**: Prevents entire classes of bugs (e.g. mismatched API contracts) and provides a highly optimized cache to prevent duplicate requests across different dashboard widgets.

## 4. Zustand for Client State
**Context**: We need to manage UI state (sidebar toggles, active modal, local wizard progress).
**Decision**: Use Zustand instead of Redux or React Context.
**Reasoning**: Zustand is lightweight, avoids unnecessary re-renders, and is much simpler than Redux. Crucially, **we do not duplicate server state into Zustand**. Server data lives exclusively in React Query.

## 5. Clerk for Authentication & Tenant Base
**Context**: We need secure B2B multi-tenancy, SSO, and MFA without rolling our own crypto.
**Decision**: Use Clerk for Identity and User Management.
**Reasoning**: Offloads security, password resets, and session management to a dedicated platform, ensuring GDPR/compliance foundations while we focus on the core sports SaaS value.

## 6. Monorepo Structure (Target Phase)
**Context**: We will eventually have a web app, a mobile app (React Native/Expo), and shared UI/Validation libraries.
**Decision**: We will migrate the architecture to a Turborepo-managed monorepo (`apps/web`, `apps/mobile`, `packages/ui`).
**Reasoning**: Ensures 100% sharing of types, validation schemas, and design system tokens across web and mobile.

## 7. PostgreSQL + Prisma (Data Layer)
**Context**: We need relational data with strict ACID guarantees for billing, permissions, and records.
**Decision**: Use PostgreSQL managed via Prisma ORM.
**Reasoning**: Prisma provides excellent TypeScript safety. PostgreSQL handles the complex relations of sports organizations efficiently.

## 8. Stripe for Billing (No Client-side Card Data)
**Context**: We must securely process payments and SaaS subscriptions.
**Decision**: Use Stripe Checkout and Stripe Connect (for marketplace payouts). The frontend *never* touches raw card numbers.
**Reasoning**: PCI compliance is mandatory. Using Stripe Checkout delegates this responsibility entirely.
