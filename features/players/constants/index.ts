export const PLAYER_POSITIONS = [
  { value: "GK", label: "Goalkeeper" },
  { value: "CB", label: "Centre Back" },
  { value: "LB", label: "Left Back" },
  { value: "RB", label: "Right Back" },
  { value: "CM", label: "Central Midfielder" },
  { value: "AM", label: "Attacking Midfielder" },
  { value: "LW", label: "Left Wing" },
  { value: "RW", label: "Right Wing" },
  { value: "ST", label: "Striker" },
] as const;

export const PLAYER_STATUS = [
  { value: "Active", label: "Active", color: "bg-green-100 text-green-800 border-green-200" },
  { value: "Trial", label: "Trial", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "Waitlist", label: "Waitlist", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { value: "Alumni", label: "Alumni", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { value: "Inactive", label: "Inactive", color: "bg-slate-100 text-slate-800 border-slate-200" },
] as const;

export const AGE_GROUPS = [
  "U3-U4",
  "U5-U6",
  "U7-U9",
  "U10-U12",
  "U13-U14",
  "U15-U17",
  "U18+"
] as const;

export const DEVELOPMENT_PHASES = [
  "Phase 1: Foundation",
  "Phase 2: Discovery",
  "Phase 3: Development",
  "Phase 4: Advanced",
  "Phase 5: Elite"
] as const;

export const METHODOLOGIES = [
  "Kimero Method",
  "PSG P.A.R.I.S.",
  "Custom Methodology"
] as const;
