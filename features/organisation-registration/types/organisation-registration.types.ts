export type OrganisationType = 'academy' | 'company' | 'school' | 'federation';

export type RegistrationStep = 
  | 'type' 
  | 'details' 
  | 'administrator' 
  | 'configuration' 
  | 'plan' 
  | 'payment' 
  | 'verification';

export interface OrganisationDetails {
  legalName: string;
  displayName: string;
  country: string; // ISO Code
  primarySport: string;
  website?: string;
  logoUrl?: string;
}

export interface AdministratorDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  role: string;
}

export interface AcademyConfiguration {
  methodologyFramework: string;
  customMethodologyName?: string;
  ageGroups: { min: number; max: number; name: string }[];
  programTypes: string[];
  hostTournaments: boolean;
  connectVeo: boolean;
}

export interface CompanyConfiguration {
  employeeRegistrationEnabled: boolean;
  companyEmailDomain?: string;
  competitiveMode: 'Competitive' | 'Non-competitive';
  hrIntegration: string;
  accountsPayableContact: string;
  billingEmail: string;
}

export interface SchoolConfiguration {
  studentIdEnabled: boolean;
  academicYearStart?: string;
  academicYearEnd?: string;
  guardianConsentRequired: boolean;
  digitalWaiverRequired: boolean;
  schoolRoles: string[];
  schoolIntegration: string;
  curriculumAlignmentEnabled: boolean;
}

export type OrganisationConfiguration = 
  | AcademyConfiguration 
  | CompanyConfiguration 
  | SchoolConfiguration;

export interface RegistrationState {
  step: RegistrationStep;
  organisationType?: OrganisationType;
  organisationDetails?: OrganisationDetails;
  administratorDetails?: AdministratorDetails;
  configuration?: OrganisationConfiguration;
  selectedPlanId?: string;
  billingFrequency?: 'Monthly' | 'Termly' | 'Annual';
  paymentStatus: 'Pending' | 'Checkout Started' | 'Payment Successful' | 'Payment Failed';
  verificationStatus: 'Pending' | 'Sent' | 'Verified';
}
