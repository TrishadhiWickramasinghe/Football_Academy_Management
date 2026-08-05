export const REGISTRATION_STEPS = [
  { id: 'type', title: 'Organisation Type' },
  { id: 'details', title: 'Details' },
  { id: 'administrator', title: 'Administrator' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'plan', title: 'Plan Selection' },
  { id: 'payment', title: 'Payment' },
  { id: 'verification', title: 'Verification' }
] as const;

export const ORGANISATION_TYPES = [
  {
    id: 'academy',
    title: 'Sports Academy',
    description: 'Manage players, teams, coaches, training, tournaments and long-term development.',
    features: ['Player development', 'Training management', 'Teams', 'Tournaments', 'Parent portal', 'Payments', 'Video analysis'],
    disabled: false
  },
  {
    id: 'company',
    title: 'Corporate / Company',
    description: 'Run employee football and sports programmes with simplified administration.',
    features: ['Employee registration', 'Company billing', 'Non-competitive mode', 'HR integrations', 'Training management'],
    disabled: false
  },
  {
    id: 'school',
    title: 'School',
    description: 'Manage school sports programmes, students, coaches, teachers and guardian workflows.',
    features: ['Student profiles', 'Guardian consent', 'Academic calendar', 'Teacher / PE roles', 'Curriculum alignment', 'School integrations'],
    disabled: false
  },
  {
    id: 'federation',
    title: 'Federation',
    description: 'Manage regional bodies, leagues, clubs, and national team selections. Coming in Phase 4.',
    features: ['League management', 'Club oversight', 'National teams', 'Referee assignment', 'Federation billing'],
    disabled: true // Disabled as per Phase 4 requirement
  }
] as const;
