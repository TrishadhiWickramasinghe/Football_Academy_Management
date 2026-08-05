# Database Relationships

AcademySphere uses explicitly modeled join tables (many-to-many relationships) to ensure query performance, referential integrity, and historical accuracy. We **do not** use arrays of IDs (e.g., `coach_ids = ["uuid-1", "uuid-2"]`) in JSON or Postgres Array columns for relational business logic.

## 1. Player ↔ Guardian (`PlayerGuardian`)
**Why not `guardianId` on the Player model?**
A single player (child) can have multiple guardians (Mother, Father, Step-parent).
A single guardian can have multiple children in the academy.
Therefore, `PlayerGuardian` is a join table mapping `playerId` to `userId`.
- It tracks `isPrimary`.
- It tracks permissions: `canViewMedicalInformation`, `canMakePayments`.

## 2. Team ↔ Coach (`TeamCoach`)
**Why not `coachId` on the Team model?**
A football team typically has a Head Coach and multiple Assistant Coaches or Specialists.
`TeamCoach` joins `teamId` to `coachId` (User), allowing us to assign roles (`HEAD_COACH`, `ASSISTANT_COACH`) per relationship.

## 3. Player ↔ Team History (`PlayerTeam`)
**Why not just `teamId` on the Player model?**
Players move between age groups (e.g., from U12 to U13) every season.
If we only kept `teamId` on the Player, we would lose the historical record of which team they played for last year.
`PlayerTeam` includes `startDate` and `endDate`, allowing us to query exactly who was on a roster at any given date in history.

## 4. Program ↔ Player (`ProgramEnrollment`)
Programs represent camps, clinics, or seasonal enrollments. A player enrolls in a Program via `ProgramEnrollment`, which generates `Session` records.

## 5. Session ↔ Player (`Attendance`)
A `Session` belongs to a `Program`. `Attendance` is a join table connecting a `Session` and a `Player`. It tracks `status` (PRESENT, ABSENT, EXCUSED). A unique constraint on `[sessionId, playerId]` ensures a player is not marked present twice for the same session.
