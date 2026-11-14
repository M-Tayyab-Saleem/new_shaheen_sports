import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 space-y-12">
      <header className="space-y-4 border-b border-white/[0.08] pb-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
          <Shield className="h-4 w-4" strokeWidth={1.75} />
          Data Protection &amp; Minor Consent
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
          Applicant Privacy Policy
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Effective Date: 2026 · New Shaheen Sports Volleyball Academy (Karachi, Pakistan)
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            1. Information We Collect
          </h2>
          <p className="text-[#94A3B8]">
            When prospective athletes or parents submit a membership application through{' '}
            <code className="font-mono-code text-xs text-[#F8FAFC]">/apply</code>, New Shaheen
            Sports collects only the data required to verify identity, assess athletic batch
            eligibility, and coordinate safe court participation:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-[#94A3B8]">
            <li>Full name, date of birth, height (cm), and CNIC or B-Form number.</li>
            <li>Contact telephone number, residential address, and emergency contact number.</li>
            <li>Preferred volleyball playing position and prior experience tier.</li>
            <li>Passport-size photograph and applicant digital canvas signature.</li>
            <li>
              For applicants under 18 years of age: parent or legal guardian name, relationship,
              telephone number, and explicit medical/training consent.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            2. Private Media Isolation &amp; Access Controls
          </h2>
          <p className="text-[#94A3B8]">
            Applicant photographs, CNIC/B-Form numbers, phone numbers, and digital signatures are
            never published publicly or indexed on search engines. Uploaded images and signatures
            are stored in private storage and can only be inspected by authenticated academy
            administration through protected server routes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            3. Guardian Authorization for Minors
          </h2>
          <p className="text-[#94A3B8]">
            Applicants younger than 18 years old cannot submit an application without providing
            verified parent or legal guardian details and confirming acknowledgment of training
            participation and emergency medical contact rules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            4. Zero Commercial Sharing &amp; Retention
          </h2>
          <p className="text-[#94A3B8]">
            New Shaheen Sports never sells, rents, or distributes applicant personal information to
            third-party marketers. Records are retained strictly for academy registration,
            attendance safety, and trial scheduling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
            5. Data Access &amp; Deletion Requests
          </h2>
          <p className="text-[#94A3B8]">
            Applicants or parents may request correction or permanent deletion of their membership
            application record at any time by contacting academy administration at{' '}
            <a
              href={`tel:${ACADEMY_INFO.phoneDisplay.replace(/\s/g, '')}`}
              className="text-[#F8FAFC] underline hover:text-[#FF6F26]"
            >
              {ACADEMY_INFO.phoneDisplay}
            </a>{' '}
            or{' '}
            <a
              href={`tel:${ACADEMY_INFO.secondaryPhoneDisplay.replace(/\s/g, '')}`}
              className="text-[#F8FAFC] underline hover:text-[#FF6F26]"
            >
              {ACADEMY_INFO.secondaryPhoneDisplay}
            </a>{' '}
            or visiting the ground desk in Shah Faisal Colony, Block 4, Karachi with their
            application reference code.
          </p>
        </section>
      </div>

      <div className="border-t border-white/[0.08] pt-8 flex flex-wrap items-center justify-between gap-4">
        <Link to="/apply" className="text-sm font-semibold text-[#FF6F26] hover:underline">
          Proceed to Membership Application &rarr;
        </Link>
        <Link to="/" className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC]">
          Return Home
        </Link>
      </div>
    </div>
  );
}
