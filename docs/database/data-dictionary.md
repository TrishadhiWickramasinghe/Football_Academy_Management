# Data Dictionary

This document explains the core fields for the most critical entities in the AcademySphere database.

## 1. Organisation
The root tenant entity.
- `id` (String): Primary Key (CUID).
- `type` (OrganisationType): Distinguishes between Academy, School, Company, etc.
- `slug` (String): Unique identifier used for subdomain routing (e.g. `opa-academy`).
- `defaultCurrency` (String): 3-letter ISO code (e.g. `USD`, `GBP`).

## 2. Player
Represents a student/athlete in the academy.
- `id` (String): Primary Key (CUID).
- `organisationId` (String): **Tenant Boundary.** 
- `dateOfBirth` (DateTime): Used to automatically assign players to age groups (e.g., U12, U13).
- `status` (PlayerStatus): ACTIVE, TRIAL, ALUMNI.

## 3. PlayerMedicalProfile
Highly sensitive entity. Extracted from `Player` to restrict access.
- `playerId` (String): Unique Foreign Key linking to the Player.
- `medicalConditions` (String): Sensitive. Should be encrypted at the application layer.

## 4. Invoice
Represents a financial request for payment.
- `organisationId` (String): **Tenant Boundary.**
- `amount` (Decimal): The total amount owed. Uses `Decimal` type, not Float, to avoid rounding errors in financial transactions.
- `currency` (String): 3-letter ISO code. Must explicitly match the line items.

## 5. AuditLog
Used for platform security and compliance.
- `actorUserId` (String): The User ID of the person performing the action (e.g., Org Admin).
- `action` (String): The event (e.g., `PLAYER_DELETED`, `INVOICE_REFUNDED`).
- `metadata` (Json): Safe contextual data. **MUST NOT contain raw passwords or credit card information.**
