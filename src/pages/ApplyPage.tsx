import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import {
  submitApplication,
  type ExperienceLevel,
  type SubmitApplicationResponse,
} from '../services/api';
import {
  calculateAgeFromDob,
  cmToFeetInches,
  EXPERIENCE_LEVELS,
  formatDateTime,
  formatNicInput,
  formatWhatsAppLink,
  isValidNicOrBForm,
  isValidPakistaniPhone,
  PLAYING_POSITIONS,
} from '../utils/validation';
import { PhotoUpload } from '../components/forms/PhotoUpload';
import { SignaturePad } from '../components/forms/SignaturePad';
import { AcademyLogo } from '../components/common/AcademyLogo';

export function ApplyPage() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const [playingPosition, setPlayingPosition] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Beginner');

  const [emergencyContactNumber, setEmergencyContactNumber] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('Parent');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardianConsent, setGuardianConsent] = useState(false);

  const [passportPhotoDataUrl, setPassportPhotoDataUrl] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<SubmitApplicationResponse | null>(null);

  const age = useMemo(() => calculateAgeFromDob(dateOfBirth), [dateOfBirth]);
  const isMinor = age !== null && age >= 0 && age < 18;
  const heightFeet = useMemo(() => cmToFeetInches(Number(heightCm)), [heightCm]);

  function validateForm(): Record<string, string> {
    const errors: Record<string, string> = {};

    if (fullName.trim().length < 3 || fullName.trim().length > 100) {
      errors.fullName = 'Full name must be between 3 and 100 characters.';
    }

    if (!dateOfBirth || age === null || age < 6 || age > 65) {
      errors.dateOfBirth = 'Enter a valid date of birth (applicant age 6–65 years).';
    }

    const h = Number(heightCm);
    if (!heightCm || Number.isNaN(h) || h < 100 || h > 230) {
      errors.heightCm = 'Height must be between 100 cm and 230 cm.';
    }

    if (!isValidNicOrBForm(nicNumber)) {
      errors.nicNumber = 'Enter a valid 13-digit CNIC or B-Form number (XXXXX-XXXXXXX-X).';
    }

    if (!isValidPakistaniPhone(contactNumber)) {
      errors.contactNumber = 'Enter a valid Pakistani phone number (+92 3XX XXXXXXX or 03XX XXXXXXX).';
    }

    if (address.trim().length < 8) {
      errors.address = 'Provide your complete residential address.';
    }

    if (!playingPosition) {
      errors.playingPosition = 'Select a preferred playing position.';
    }

    if (!isValidPakistaniPhone(emergencyContactNumber)) {
      errors.emergencyContactNumber = 'Enter a valid Pakistani emergency contact number.';
    }

    if (isMinor) {
      if (guardianName.trim().length < 3) {
        errors.guardianName = 'Parent or legal guardian full name is required.';
      }
      if (!guardianRelationship) {
        errors.guardianRelationship = 'Select guardian relationship.';
      }
      if (!isValidPakistaniPhone(guardianContact)) {
        errors.guardianContact = 'Enter a valid Pakistani guardian phone number.';
      }
      if (!guardianConsent) {
        errors.guardianConsent = 'Guardian consent is mandatory for applicants under 18.';
      }
    }

    if (!passportPhotoDataUrl) {
      errors.passportPhotoDataUrl = 'Please upload a passport-size photograph.';
    }

    if (!signatureDataUrl) {
      errors.signatureDataUrl = 'Please sign in the digital signature pad.';
    }

    if (!declarationAccepted) {
      errors.declarationAccepted = 'You must accept the declaration statement before submitting.';
    }

    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      const el = document.querySelector(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitApplication({
        fullName: fullName.trim(),
        dateOfBirth,
        heightCm: Number(heightCm),
        nicNumber: nicNumber.trim(),
        contactNumber: contactNumber.trim(),
        address: address.trim(),
        playingPosition,
        experienceLevel,
        emergencyContactNumber: emergencyContactNumber.trim(),
        passportPhotoDataUrl,
        signatureDataUrl,
        guardianName: isMinor ? guardianName.trim() : undefined,
        guardianRelationship: isMinor ? guardianRelationship : undefined,
        guardianContact: isMinor ? guardianContact.trim() : undefined,
        guardianConsent: isMinor ? guardianConsent : undefined,
        declarationAccepted,
      });
      setConfirmation(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const apiErr = err as Error & { fieldErrors?: Record<string, string> };
      if (apiErr.fieldErrors) {
        setFieldErrors(apiErr.fieldErrors);
      }
      setSubmitError(apiErr.message || 'Unable to submit application. Please check your entries.');
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    const waUrl = formatWhatsAppLink(
      `+${ACADEMY_INFO.phoneRaw}`,
      confirmation.applicantName,
      confirmation.reference
    );

    return (
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8">
        <div className="rounded-[14px] border border-[#10B981]/30 bg-[#161B28] p-8 sm:p-12 space-y-8">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981]">
                  <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
                  Membership Application Received
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
                  Thank You, {confirmation.applicantName}
                </h1>
              </div>
              <AcademyLogo variant="emblem" />
            </div>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Your digital membership record has been securely stored and queued for review by New
              Shaheen Sports administration.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0D111A] p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-[#64748B]">Official Reference Code</p>
              <p className="mt-1 font-mono-code text-2xl font-bold text-[#FF5500] tabular-nums">
                {confirmation.reference}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#64748B]">Submission Date</p>
              <p className="mt-1 text-base font-semibold text-[#F8FAFC]">
                {formatDateTime(confirmation.submittedAt)}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#CBD5E1]">
            <h2 className="font-display text-base font-bold text-[#F8FAFC]">
              Next Steps for Court Induction
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-[#94A3B8]">
              <li>Save or screenshot your reference number ({confirmation.reference}).</li>
              <li>
                Academy coordinators will review your position profile and contact you via phone or
                WhatsApp to confirm your weekend court trial slot.
              </li>
              <li>
                Attend your scheduled session at Shah Faisal Colony, Block 4, near Water Pump in
                athletic wear and non-marking court shoes.
              </li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 border-t border-white/[0.08]">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF5500] px-6 py-3 text-sm font-semibold text-white hover:bg-[#FF6F26] transition-colors"
            >
              Confirm on WhatsApp
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <Link
              to="/schedule"
              className="inline-flex items-center rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#F8FAFC] hover:border-white/30 transition-colors"
            >
              View Ground Directions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    'w-full h-[46px] rounded-lg border bg-[#0D111A] px-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] transition-colors focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20';

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center gap-5">
        <AcademyLogo variant="emblem" />
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
            <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            Private &amp; Encrypted Admissions Intake
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Membership Application
          </h1>
          <p className="text-base leading-relaxed text-[#94A3B8]">
            Complete all four sections below to apply for training at New Shaheen Sports, Shah
            Faisal Colony, Karachi.
          </p>
        </div>
      </header>

      {submitError && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 p-4 text-sm text-[#FCA5A5]"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#EF4444]" strokeWidth={1.75} />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Section A: Personal Information */}
        <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <p className="text-xs font-semibold text-[#FF6F26]">Section 01</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
              Personal Information
            </h2>
          </div>

          <div data-field="passportPhotoDataUrl">
            <PhotoUpload
              value={passportPhotoDataUrl}
              onChange={(val) => {
                setPassportPhotoDataUrl(val);
                setFieldErrors((prev) => ({ ...prev, passportPhotoDataUrl: '' }));
              }}
              error={fieldErrors.passportPhotoDataUrl}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div data-field="fullName" className="sm:col-span-2 space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-[#F8FAFC]">
                Full Name <span className="text-[#FF5500]">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Hamza Siddiqui"
                className={`${inputBaseClass} ${
                  fieldErrors.fullName ? 'border-[#EF4444]' : 'border-white/12'
                }`}
              />
              {fieldErrors.fullName && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.fullName}</p>
              )}
            </div>

            <div data-field="dateOfBirth" className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-[#F8FAFC]">
                Date of Birth <span className="text-[#FF5500]">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={`${inputBaseClass} ${
                  fieldErrors.dateOfBirth ? 'border-[#EF4444]' : 'border-white/12'
                }`}
              />
              {age !== null && age >= 0 && (
                <p className="text-xs text-[#94A3B8]">
                  Calculated age: <strong className="text-[#F8FAFC] tabular-nums">{age}</strong>{' '}
                  years {isMinor ? '· Guardian consent required below' : ''}
                </p>
              )}
              {fieldErrors.dateOfBirth && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.dateOfBirth}</p>
              )}
            </div>

            <div data-field="heightCm" className="space-y-2">
              <label htmlFor="heightCm" className="block text-sm font-semibold text-[#F8FAFC]">
                Height (cm) <span className="text-[#FF5500]">*</span>
              </label>
              <div className="relative">
                <input
                  id="heightCm"
                  type="number"
                  min={100}
                  max={230}
                  step="0.5"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="e.g., 178"
                  className={`${inputBaseClass} tabular-nums pr-20 ${
                    fieldErrors.heightCm ? 'border-[#EF4444]' : 'border-white/12'
                  }`}
                />
                {heightFeet && (
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono-code text-xs text-[#00E5FF]">
                    ≈ {heightFeet}
                  </span>
                )}
              </div>
              {fieldErrors.heightCm && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.heightCm}</p>
              )}
            </div>

            <div data-field="nicNumber" className="space-y-2">
              <label htmlFor="nicNumber" className="block text-sm font-semibold text-[#F8FAFC]">
                CNIC / B-Form Number <span className="text-[#FF5500]">*</span>
              </label>
              <input
                id="nicNumber"
                type="text"
                inputMode="numeric"
                value={nicNumber}
                onChange={(e) => setNicNumber(formatNicInput(e.target.value))}
                placeholder="42201-1234567-1"
                className={`${inputBaseClass} font-mono-code ${
                  fieldErrors.nicNumber ? 'border-[#EF4444]' : 'border-white/12'
                }`}
              />
              {fieldErrors.nicNumber && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.nicNumber}</p>
              )}
            </div>

            <div data-field="contactNumber" className="space-y-2">
              <label htmlFor="contactNumber" className="block text-sm font-semibold text-[#F8FAFC]">
                Mobile / WhatsApp Number <span className="text-[#FF5500]">*</span>
              </label>
              <input
                id="contactNumber"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+92 312 0206021"
                className={`${inputBaseClass} font-mono-code ${
                  fieldErrors.contactNumber ? 'border-[#EF4444]' : 'border-white/12'
                }`}
              />
              {fieldErrors.contactNumber && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.contactNumber}</p>
              )}
            </div>

            <div data-field="address" className="sm:col-span-2 space-y-2">
              <label htmlFor="address" className="block text-sm font-semibold text-[#F8FAFC]">
                Residential Address <span className="text-[#FF5500]">*</span>
              </label>
              <textarea
                id="address"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No, Block, Area, Karachi"
                className={`w-full rounded-lg border bg-[#0D111A] p-3.5 text-sm text-[#F8FAFC] placeholder-[#64748B] transition-colors focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 ${
                  fieldErrors.address ? 'border-[#EF4444]' : 'border-white/12'
                }`}
              />
              {fieldErrors.address && (
                <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.address}</p>
              )}
            </div>
          </div>
        </section>

        {/* Section B: Volleyball Profile */}
        <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <p className="text-xs font-semibold text-[#FF6F26]">Section 02</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
              Volleyball Profile
            </h2>
          </div>

          <div data-field="playingPosition" className="space-y-2">
            <label
              htmlFor="playingPosition"
              className="block text-sm font-semibold text-[#F8FAFC]"
            >
              Preferred Playing Position <span className="text-[#FF5500]">*</span>
            </label>
            <select
              id="playingPosition"
              value={playingPosition}
              onChange={(e) => setPlayingPosition(e.target.value)}
              className={`${inputBaseClass} ${
                fieldErrors.playingPosition ? 'border-[#EF4444]' : 'border-white/12'
              }`}
            >
              <option value="">Select position...</option>
              {PLAYING_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            {fieldErrors.playingPosition && (
              <p className="text-xs font-medium text-[#EF4444]">{fieldErrors.playingPosition}</p>
            )}
          </div>

          <div data-field="experienceLevel" className="space-y-3">
            <span className="block text-sm font-semibold text-[#F8FAFC]">
              Current Experience Level <span className="text-[#FF5500]">*</span>
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {EXPERIENCE_LEVELS.map((tier) => {
                const selected = experienceLevel === tier.value;
                return (
                  <label
                    key={tier.value}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      selected
                        ? 'border-[#FF5500] bg-[#FF5500]/10'
                        : 'border-white/10 bg-[#0D111A] hover:border-white/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={tier.value}
                      checked={selected}
                      onChange={() => setExperienceLevel(tier.value)}
                      className="sr-only"
                    />
                    <span className="block font-display text-sm font-bold text-[#F8FAFC]">
                      {tier.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#94A3B8]">
                      {tier.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section C: Emergency Contact & Minor Authorization */}
        <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <p className="text-xs font-semibold text-[#FF6F26]">Section 03</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
              Emergency Contact {isMinor ? '& Guardian Authorization' : ''}
            </h2>
          </div>

          <div data-field="emergencyContactNumber" className="space-y-2 max-w-md">
            <label
              htmlFor="emergencyContactNumber"
              className="block text-sm font-semibold text-[#F8FAFC]"
            >
              Emergency Contact Number <span className="text-[#FF5500]">*</span>
            </label>
            <input
              id="emergencyContactNumber"
              type="tel"
              value={emergencyContactNumber}
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              placeholder="+92 300 1234567"
              className={`${inputBaseClass} font-mono-code ${
                fieldErrors.emergencyContactNumber ? 'border-[#EF4444]' : 'border-white/12'
              }`}
            />
            {fieldErrors.emergencyContactNumber && (
              <p className="text-xs font-medium text-[#EF4444]">
                {fieldErrors.emergencyContactNumber}
              </p>
            )}
          </div>

          {isMinor && (
            <div className="rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-5 sm:p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#F59E0B]">
                  Minor Applicant Authorization (Age Under 18)
                </p>
                <p className="text-xs text-[#CBD5E1]">
                  Parent or legal guardian details and consent are mandatory for athletes under 18.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div data-field="guardianName" className="space-y-2">
                  <label
                    htmlFor="guardianName"
                    className="block text-sm font-semibold text-[#F8FAFC]"
                  >
                    Guardian Full Name <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    id="guardianName"
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Parent / Legal Guardian Name"
                    className={`${inputBaseClass} ${
                      fieldErrors.guardianName ? 'border-[#EF4444]' : 'border-white/12'
                    }`}
                  />
                  {fieldErrors.guardianName && (
                    <p className="text-xs font-medium text-[#EF4444]">
                      {fieldErrors.guardianName}
                    </p>
                  )}
                </div>

                <div data-field="guardianRelationship" className="space-y-2">
                  <label
                    htmlFor="guardianRelationship"
                    className="block text-sm font-semibold text-[#F8FAFC]"
                  >
                    Relationship <span className="text-[#FF5500]">*</span>
                  </label>
                  <select
                    id="guardianRelationship"
                    value={guardianRelationship}
                    onChange={(e) => setGuardianRelationship(e.target.value)}
                    className={`${inputBaseClass} border-white/12`}
                  >
                    <option value="Parent">Parent</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Elder Sibling">Elder Sibling (21+)</option>
                  </select>
                </div>

                <div data-field="guardianContact" className="sm:col-span-2 max-w-md space-y-2">
                  <label
                    htmlFor="guardianContact"
                    className="block text-sm font-semibold text-[#F8FAFC]"
                  >
                    Guardian Phone Number <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    id="guardianContact"
                    type="tel"
                    value={guardianContact}
                    onChange={(e) => setGuardianContact(e.target.value)}
                    placeholder="+92 3XX XXXXXXX"
                    className={`${inputBaseClass} font-mono-code ${
                      fieldErrors.guardianContact ? 'border-[#EF4444]' : 'border-white/12'
                    }`}
                  />
                  {fieldErrors.guardianContact && (
                    <p className="text-xs font-medium text-[#EF4444]">
                      {fieldErrors.guardianContact}
                    </p>
                  )}
                </div>
              </div>

              <div data-field="guardianConsent" className="space-y-1.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0D111A] accent-[#FF5500]"
                  />
                  <span className="text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
                    As the parent or legal guardian, I authorize this minor athlete to participate
                    in structured volleyball drills at New Shaheen Sports and confirm medical
                    fitness for physical athletic training.
                  </span>
                </label>
                {fieldErrors.guardianConsent && (
                  <p className="text-xs font-medium text-[#EF4444]">
                    {fieldErrors.guardianConsent}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Section D: Digital Signature & Declaration */}
        <section className="rounded-[14px] border border-white/[0.08] bg-[#161B28] p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/[0.08] pb-4">
            <p className="text-xs font-semibold text-[#FF6F26]">Section 04</p>
            <h2 className="mt-1 font-display text-xl font-bold text-[#F8FAFC]">
              Digital Signature &amp; Declaration
            </h2>
          </div>

          <div data-field="signatureDataUrl">
            <SignaturePad
              value={signatureDataUrl}
              onChange={(val) => {
                setSignatureDataUrl(val);
                setFieldErrors((prev) => ({ ...prev, signatureDataUrl: '' }));
              }}
              error={fieldErrors.signatureDataUrl}
            />
          </div>

          <div data-field="declarationAccepted" className="space-y-2 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0D111A] accent-[#FF5500]"
              />
              <span className="text-xs sm:text-sm leading-relaxed text-[#CBD5E1]">
                I confirm that all details provided in this membership application are accurate, and
                I agree to abide by New Shaheen Sports court discipline, safety protocols, and the{' '}
                <Link to="/privacy" className="text-[#00E5FF] underline hover:text-white">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {fieldErrors.declarationAccepted && (
              <p className="text-xs font-medium text-[#EF4444]">
                {fieldErrors.declarationAccepted}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.08] pt-6">
            <p className="text-xs text-[#64748B]">
              Submission Date: <span className="text-[#94A3B8]">{new Date().toLocaleDateString('en-PK')}</span> · Verified on submit
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg bg-[#FF5500] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#FF6F26] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting Application...' : 'Submit Membership Application'}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
