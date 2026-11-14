import heroVolleyballCourt from '../assets/images/hero_volleyball_court_1794665791222.jpg';
import trainingAcademyAction from '../assets/images/training_academy_action_1794665791267.jpg';
import founderSyedAmmar from '../assets/images/founder_syed_ammar_1794665791339.jpg';
import coachAkbarAli from '../assets/images/coach_akbar_ali_1794665793527.jpg';
import academyCourtFacility from '../assets/images/academy_court_facility_1794665793146.jpg';

export const ACADEMY_IMAGES = {
  heroCourt: heroVolleyballCourt,
  trainingAction: trainingAcademyAction,
  founderAmmar: founderSyedAmmar,
  coachAkbar: coachAkbarAli,
  facilityCourt: academyCourtFacility,
  logo: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_9.54.43_PM_8314337d.jpeg',
} as const;

export const ACADEMY_INFO = {
  name: 'New Shaheen Sports',
  socialIdentity: 'Volleyball by Ammar',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_9.54.43_PM_8314337d.jpeg',
  city: 'Karachi, Pakistan',
  address: 'Shah Faisal Colony, Block 4, near Water Pump, Karachi, Pakistan',
  phoneDisplay: '+92 312 0206021',
  phoneRaw: '923120206021',
  whatsappUrl: 'https://wa.me/923120206021',
  secondaryPhoneDisplay: '+92 317 1209661',
  secondaryPhoneRaw: '923171209661',
  secondaryWhatsappUrl: 'https://wa.me/923171209661',
  facebookUrl: 'https://www.facebook.com/volleyballbyammar',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Shah+Faisal+Colony+Block+4+Water+Pump+Karachi',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Shah+Faisal+Colony+Block+4+Karachi+Pakistan&output=embed',
} as const;

export interface TrainingProgram {
  id: string;
  indexLabel: string;
  title: string;
  audience: string;
  focusSummary: string;
  duration: string;
  skills: string[];
  outcomes: string[];
}

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'beginner',
    indexLabel: '01',
    title: 'Beginner Development',
    audience: 'Ages 8–16 · New & Emerging Athletes',
    focusSummary:
      'Foundational ball mastery, proper forearm passing posture, overhead setting mechanics, and court movement discipline.',
    duration: '3 Sessions / Week · 90 Minutes',
    skills: [
      'Forearm passing & platform stability',
      'Underhand & float serving fundamentals',
      'Court awareness & lateral footwork',
      'Athletic conditioning & jump landing mechanics',
    ],
    outcomes: [
      'Consistent serve placement across court zones',
      'Confident three-touch rally participation',
      'Injury-free court posture and balance',
    ],
  },
  {
    id: 'intermediate',
    indexLabel: '02',
    title: 'Intermediate Skills',
    audience: 'Club & School Athletes · 1–3 Years Experience',
    focusSummary:
      'Positional specialization, transition defense-to-offense rhythm, three-step spike approach, and structured blocking timing.',
    duration: '4 Sessions / Week · 105 Minutes',
    skills: [
      'Three-step & four-step spike approach timing',
      'Jump float & topspin serve consistency',
      'Setter footwork & tempo distribution',
      'Single and double block hand penetration',
    ],
    outcomes: [
      'Position-specific readiness for district trials',
      'High-percentage serve receive formations',
      'Coordinated transition offense under pressure',
    ],
  },
  {
    id: 'advanced',
    indexLabel: '03',
    title: 'Advanced Competitive',
    audience: 'Senior & Tournament Squads · 3+ Years',
    focusSummary:
      'High-intensity 5-1 and 6-2 match systems, tactical opponent scouting, jump serve mechanics, and competitive match simulation.',
    duration: '5 Sessions / Week · 120 Minutes',
    skills: [
      '5-1 and 6-2 offensive rotation systems',
      'Quick middle attacks & back-row pipe combinations',
      'Defensive perimeter coverage & libero communication',
      'Match-pressure mental composure & conditioning',
    ],
    outcomes: [
      'Readiness for Karachi city and provincial championships',
      'Disciplined tactical execution in 5-set matches',
      'Leadership and vocal court command',
    ],
  },
];

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  credentials: string;
  specialization: string;
  bio: string;
  image: string;
  phoneDisplay?: string;
  focusAreas: string[];
}

export const COACHING_STAFF: CoachProfile[] = [
  {
    id: 'syed-ammar-ali',
    name: 'Syed Ammar Ali',
    role: 'Founder & Head Coach',
    credentials: 'National Volleyball Player · Creator of Volleyball by Ammar',
    specialization: 'Attacking Mechanics, Setter Vision & Match Tactics',
    bio: 'Representing Pakistan at the national level, Syed Ammar Ali founded New Shaheen Sports to give Karachi youth structured, disciplined volleyball mentorship modeled on elite national camp standards.',
    image: ACADEMY_IMAGES.founderAmmar,
    phoneDisplay: '+92 312 0206021',
    focusAreas: ['Offensive Systems', 'Jump Serve Mechanics', 'National Trial Preparation'],
  },
  {
    id: 'syed-kausar-ali-tirmizi',
    name: 'Syed Kausar Ali Tirmizi',
    role: 'Co-Founder & Coach',
    credentials: 'Academy Co-Founder · Senior Court & Conditioning Coach',
    specialization: 'Serve Strategy, Passing Mechanics & Youth Squad Development',
    bio: 'Co-founder and coach at New Shaheen Sports, Syed Kausar Ali Tirmizi leads daily technical court drills, athlete onboarding, and disciplined squad preparation for emerging Karachi players.',
    image: ACADEMY_IMAGES.trainingAction,
    phoneDisplay: '+92 317 1209661',
    focusAreas: ['Court Fundamentals', 'Athlete Onboarding', 'Serve & Receive Drills'],
  },
  {
    id: 'syed-akbar-ali',
    name: 'Syed Akbar Ali',
    role: 'Co-Founder & Senior Director',
    credentials: 'Academy Co-Founder · Youth Athletic Development Director',
    specialization: 'Court Discipline, Defensive Systems & Grassroots Pathway',
    bio: 'Co-founder of New Shaheen Sports, Syed Akbar Ali oversees daily academy operations, parent communication, athlete discipline, and dedicated youth development pipelines in Shah Faisal Colony.',
    image: ACADEMY_IMAGES.coachAkbar,
    focusAreas: ['Defensive Structure', 'Youth Fundamentals', 'Parent & Athlete Guidance'],
  },
  {
    id: 'karachi-coaching-panel',
    name: 'Academy Specialist Coaching Unit',
    role: 'Assistant & Conditioning Staff',
    credentials: 'Certified Court Instructors · Boys & Girls Batch Supervisors',
    specialization: 'Serve Receive, Libero Agility & Safe Supervised Girls Training',
    bio: 'Supporting our founders on court, the assistant coaching unit runs structured drill stations, monitors athlete attendance, and supervises separate scheduled batches for boys and girls.',
    image: ACADEMY_IMAGES.facilityCourt,
    focusAreas: ['Platform Passing', 'Lateral Agility', 'Supervised Girls Batches'],
  },
];

export interface ScheduleSlot {
  id: string;
  batch: string;
  category: 'Boys' | 'Girls' | 'Combined Trials';
  days: string;
  timing: string;
  ageGroup: string;
  level: string;
}

export const TRAINING_SCHEDULE: ScheduleSlot[] = [
  {
    id: 'boys-junior',
    batch: 'Boys Foundation & Junior Batch',
    category: 'Boys',
    days: 'Monday, Wednesday, Friday',
    timing: '4:30 PM – 6:00 PM',
    ageGroup: 'Ages 9 – 15',
    level: 'Beginner & Intermediate',
  },
  {
    id: 'girls-dedicated',
    batch: 'Girls Dedicated Development Batch',
    category: 'Girls',
    days: 'Tuesday, Thursday, Saturday',
    timing: '4:00 PM – 5:30 PM',
    ageGroup: 'Ages 9 – 20',
    level: 'Beginner to Intermediate',
  },
  {
    id: 'boys-senior',
    batch: 'Boys Competitive & Senior Squad',
    category: 'Boys',
    days: 'Monday to Saturday',
    timing: '6:30 PM – 8:30 PM',
    ageGroup: 'Ages 16 – 26',
    level: 'Intermediate & Advanced',
  },
  {
    id: 'weekend-assessment',
    batch: 'New Applicant Court Induction & Trials',
    category: 'Combined Trials',
    days: 'Saturday & Sunday',
    timing: '5:30 PM – 7:00 PM',
    ageGroup: 'All Eligible Applicants',
    level: 'By Scheduled Reference Only',
  },
];

export const CORE_VALUES = [
  {
    index: '01',
    title: 'Discipline',
    description:
      'Every athlete arrives on time, respects court lines, maintains uniform standards, and treats practice repetitions with match-day seriousness.',
  },
  {
    index: '02',
    title: 'Teamwork',
    description:
      'Volleyball is a zero-ego sport. Passers, setters, blockers, and liberos learn to communicate clearly before every contact.',
  },
  {
    index: '03',
    title: 'Tenacity',
    description:
      'No ball drops without pursuit. We build defensive grit, vertical endurance, and composure during decisive late-set points.',
  },
  {
    index: '04',
    title: 'Sportsmanship',
    description:
      'Respect for coaches, teammates, referees, and opponents defines how New Shaheen Sports represents Shah Faisal Colony and Karachi.',
  },
];
