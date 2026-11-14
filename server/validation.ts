import type { ExperienceLevel } from './db.ts';

export const PLAYING_POSITIONS = [
  'Setter',
  'Outside Hitter',
  'Opposite Hitter',
  'Middle Blocker',
  'Libero',
  'Defensive Specialist',
  'Not Yet Decided',
] as const;

export const EXPERIENCE_LEVELS: readonly ExperienceLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const APPLICATION_STATUSES = [
  'New',
  'Under Review',
  'Contacted',
  'Approved',
  'Rejected',
] as const;

export function calculateAgeYears(dobIso: string): number {
  const dob = new Date(dobIso);
  if (Number.isNaN(dob.getTime())) return -1;

  const today = new Date();
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - dob.getUTCMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < dob.getUTCDate())) {
    age -= 1;
  }
  return age;
}

export function normalizePhoneNumber(raw: string): string {
  const cleaned = raw.trim().replace(/[\s()-]/g, '');
  if (cleaned.startsWith('03') && cleaned.length === 11) {
    return `+92${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith('923') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+923') && cleaned.length === 13) {
    return cleaned;
  }
  return raw.trim();
}

export function isValidPakistaniPhone(raw: string): boolean {
  const normalized = normalizePhoneNumber(raw);
  return /^\+923\d{9}$/.test(normalized);
}

export function isValidNicOrBForm(raw: string): boolean {
  const trimmed = raw.trim();
  // Accepts 42201-1234567-1 or 13 raw digits
  return /^\d{5}-\d{7}-\d{1}$/.test(trimmed) || /^\d{13}$/.test(trimmed);
}

export function formatNicNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 13) {
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
  }
  return raw.trim();
}

export interface SubmissionPayload {
  fullName: string;
  dateOfBirth: string;
  heightCm: number;
  nicNumber: string;
  contactNumber: string;
  address: string;
  playingPosition: string;
  experienceLevel: ExperienceLevel;
  emergencyContactNumber: string;
  passportPhotoDataUrl: string;
  signatureDataUrl: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianContact?: string;
  guardianConsent?: boolean;
  declarationAccepted: boolean;
}

export function validateSubmissionPayload(body: Record<string, unknown>): {
  valid: boolean;
  errors: Record<string, string>;
  data?: SubmissionPayload;
} {
  const errors: Record<string, string> = {};

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  if (fullName.length < 3 || fullName.length > 100) {
    errors.fullName = 'Full name must be between 3 and 100 characters.';
  }

  const dateOfBirth = typeof body.dateOfBirth === 'string' ? body.dateOfBirth.trim() : '';
  const dobDate = new Date(dateOfBirth);
  const age = calculateAgeYears(dateOfBirth);
  if (!dateOfBirth || Number.isNaN(dobDate.getTime()) || dobDate > new Date() || age < 6 || age > 65) {
    errors.dateOfBirth = 'Enter a valid date of birth (applicant must be 6–65 years old).';
  }

  const heightCm = Number(body.heightCm);
  if (Number.isNaN(heightCm) || heightCm < 100 || heightCm > 230) {
    errors.heightCm = 'Height must be between 100 cm and 230 cm.';
  }

  const nicRaw = typeof body.nicNumber === 'string' ? body.nicNumber.trim() : '';
  if (!isValidNicOrBForm(nicRaw)) {
    errors.nicNumber = 'Enter a valid 13-digit CNIC or B-Form number (e.g., 42201-1234567-1).';
  }

  const contactRaw = typeof body.contactNumber === 'string' ? body.contactNumber.trim() : '';
  if (!isValidPakistaniPhone(contactRaw)) {
    errors.contactNumber = 'Enter a valid Pakistani mobile number (e.g., +92 312 0206021 or 03120206021).';
  }

  const address = typeof body.address === 'string' ? body.address.trim() : '';
  if (address.length < 8 || address.length > 400) {
    errors.address = 'Provide a complete residential address (at least 8 characters).';
  }

  const playingPosition =
    typeof body.playingPosition === 'string' ? body.playingPosition.trim() : '';
  if (!PLAYING_POSITIONS.includes(playingPosition as (typeof PLAYING_POSITIONS)[number])) {
    errors.playingPosition = 'Select a valid playing position.';
  }

  const experienceLevel =
    typeof body.experienceLevel === 'string' ? body.experienceLevel.trim() : '';
  if (!EXPERIENCE_LEVELS.includes(experienceLevel as ExperienceLevel)) {
    errors.experienceLevel = 'Select your current volleyball experience level.';
  }

  const emergencyRaw =
    typeof body.emergencyContactNumber === 'string' ? body.emergencyContactNumber.trim() : '';
  if (!isValidPakistaniPhone(emergencyRaw)) {
    errors.emergencyContactNumber = 'Enter a valid Pakistani emergency phone number.';
  }

  const passportPhotoDataUrl =
    typeof body.passportPhotoDataUrl === 'string' ? body.passportPhotoDataUrl : '';
  if (!passportPhotoDataUrl.startsWith('data:image/')) {
    errors.passportPhotoDataUrl = 'Upload a valid passport-size photograph (JPG, PNG, or WebP).';
  }

  const signatureDataUrl =
    typeof body.signatureDataUrl === 'string' ? body.signatureDataUrl : '';
  if (!signatureDataUrl.startsWith('data:image/png;base64,')) {
    errors.signatureDataUrl = 'Applicant digital signature is required.';
  }

  const isMinor = age >= 0 && age < 18;
  const guardianName = typeof body.guardianName === 'string' ? body.guardianName.trim() : '';
  const guardianRelationship =
    typeof body.guardianRelationship === 'string' ? body.guardianRelationship.trim() : '';
  const guardianContactRaw =
    typeof body.guardianContact === 'string' ? body.guardianContact.trim() : '';
  const guardianConsent = Boolean(body.guardianConsent);

  if (isMinor) {
    if (guardianName.length < 3) {
      errors.guardianName = 'Parent or legal guardian full name is required for applicants under 18.';
    }
    if (!guardianRelationship) {
      errors.guardianRelationship = 'Select guardian relationship.';
    }
    if (!isValidPakistaniPhone(guardianContactRaw)) {
      errors.guardianContact = 'Enter a valid Pakistani guardian phone number.';
    }
    if (!guardianConsent) {
      errors.guardianConsent = 'Guardian acknowledgment and medical consent is required for minors.';
    }
  }

  const declarationAccepted = Boolean(body.declarationAccepted);
  if (!declarationAccepted) {
    errors.declarationAccepted = 'You must accept the academy rules and accuracy declaration.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: {
      fullName,
      dateOfBirth,
      heightCm: Math.round(heightCm * 10) / 10,
      nicNumber: formatNicNumber(nicRaw),
      contactNumber: normalizePhoneNumber(contactRaw),
      address,
      playingPosition,
      experienceLevel: experienceLevel as ExperienceLevel,
      emergencyContactNumber: normalizePhoneNumber(emergencyRaw),
      passportPhotoDataUrl,
      signatureDataUrl,
      guardianName: isMinor ? guardianName : undefined,
      guardianRelationship: isMinor ? guardianRelationship : undefined,
      guardianContact: isMinor ? normalizePhoneNumber(guardianContactRaw) : undefined,
      guardianConsent: isMinor ? guardianConsent : false,
      declarationAccepted,
    },
  };
}
