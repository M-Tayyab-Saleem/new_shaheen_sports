export const PLAYING_POSITIONS = [
  'Setter',
  'Outside Hitter',
  'Opposite Hitter',
  'Middle Blocker',
  'Libero',
  'Defensive Specialist',
  'Not Yet Decided',
] as const;

export const EXPERIENCE_LEVELS = [
  {
    value: 'Beginner' as const,
    label: 'Beginner',
    description: '0–1 years · Learning fundamentals, passing, and court movement',
  },
  {
    value: 'Intermediate' as const,
    label: 'Intermediate',
    description: '1–3 years · Club or school court experience and position play',
  },
  {
    value: 'Advanced' as const,
    label: 'Advanced',
    description: '3+ years · Competitive tournament and rotational system player',
  },
];

export function calculateAgeFromDob(dobIso: string): number | null {
  if (!dobIso) return null;
  const dob = new Date(dobIso);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

export function cmToFeetInches(cm: number): string {
  if (Number.isNaN(cm) || cm < 50 || cm > 260) return '';
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}' ${inches}"`;
}

export function isValidPakistaniPhone(raw: string): boolean {
  const cleaned = raw.trim().replace(/[\s()-]/g, '');
  return (
    /^\+923\d{9}$/.test(cleaned) ||
    /^03\d{9}$/.test(cleaned) ||
    /^923\d{9}$/.test(cleaned)
  );
}

export function isValidNicOrBForm(raw: string): boolean {
  const trimmed = raw.trim();
  return /^\d{5}-\d{7}-\d{1}$/.test(trimmed) || /^\d{13}$/.test(trimmed);
}

export function formatNicInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

export function formatWhatsAppLink(phone: string, applicantName: string, reference: string): string {
  const digits = phone.replace(/\D/g, '');
  const intl = digits.startsWith('03') ? `92${digits.slice(1)}` : digits;
  const msg = `Assalam-o-Alaikum ${applicantName}, this is New Shaheen Sports regarding your membership application (${reference}).`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatFullDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
