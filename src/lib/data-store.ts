import {
  User,
  StudentProfile,
  Opportunity,
  Application,
  CareerRoadmapMonth,
  AssessmentQuestion,
  InterviewQuestion,
} from "@/types";

// ==========================================
// 1. DEMO USERS (Authentication)
// ==========================================
export const DEMO_USERS: User[] = [
  {
    id: "usr_student_1",
    email: "student@demo.com",
    name: "Priya Sharma",
    role: "STUDENT",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    institution: "All India Institute of Ayurveda (AIIA), New Delhi",
    department: "Ayurvedic Medicine & Clinical Research",
    state: "Delhi",
  },
  {
    id: "usr_student_2",
    email: "rahul.cse@demo.com",
    name: "Rahul Verma",
    role: "STUDENT",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    institution: "Indian Institute of Technology (IIT), Delhi",
    department: "Computer Science & Engineering",
    state: "Delhi",
  },
  {
    id: "usr_industry_1",
    email: "industry@demo.com",
    name: "Dr. Arvind Swaminathan",
    role: "INDUSTRY",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    institution: "Dabur India Healthcare & R&D Division",
    department: "Clinical Formulations & AI Research",
    state: "Uttar Pradesh",
  },
  {
    id: "usr_tpo_1",
    email: "tpo@demo.com",
    name: "Prof. Rajeshwar Kulkarni",
    role: "TPO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    institution: "All India Institute of Ayurveda (AIIA)",
    department: "Training & Placement Cell",
    state: "Delhi",
  },
  {
    id: "usr_gov_1",
    email: "government@demo.com",
    name: "Smt. Sunita Deshmukh, IAS",
    role: "GOVERNMENT",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    institution: "Ministry of Ayush, Govt. of India",
    department: "National Skill & Institutional Collaboration Mission",
    state: "National Capital Region",
  },
  {
    id: "usr_faculty_1",
    email: "faculty@demo.com",
    name: "Dr. Ananya Mukherjee",
    role: "FACULTY",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    institution: "AIIA New Delhi",
    department: "Dravyaguna & Herbal Pharmacology",
    state: "Delhi",
  },
  {
    id: "usr_mentor_1",
    email: "mentor@demo.com",
    name: "Vikram Malhotra",
    role: "MENTOR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    institution: "Himalaya Global Wellness",
    department: "Pharma Innovation Group",
    state: "Karnataka",
  },
];

// ==========================================
// 2. PRIMARY STUDENT PROFILE (Skill Twin & Portfolio)
// ==========================================
export const PRIMARY_STUDENT_PROFILE: StudentProfile = {
  id: "std_priya_01",
  userId: "usr_student_1",
  name: "Priya Sharma",
  email: "student@demo.com",
  college: "All India Institute of Ayurveda (AIIA), New Delhi",
  degree: "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
  branch: "Clinical Research & Integrative Pharmacology",
  year: 3,
  cgpa: 8.85,
  careerInterests: [
    "Clinical Research Associate",
    "Herbal Formulation Scientist",
    "AYUSH HealthTech Data Analyst",
    "Integrative Medicine Consultant",
  ],
  preferredLocations: ["New Delhi", "Bengaluru", "Mumbai", "Remote"],
  targetRole: "Clinical Research Associate",
  readinessScore: 78,
  bio: "Pre-final year BAMS scholar passionate about evidence-based Ayurveda, clinical trial methodologies, pharmacognosy, and applying modern data analytics to traditional herbal formulations.",
  apaarId: "APAAR-2024-9981-4412",
  digilockerVerified: true,
  projectsCount: 4,
  internshipsCompleted: 1,
  skills: [
    {
      id: "sk_1",
      name: "Ayurvedic Clinical Knowledge",
      category: "DOMAIN_AYUSH",
      proficiency: 4,
      confidence: 92,
      verified: true,
      verificationSource: "COLLEGE_VERIFIED",
      evidence: [
        {
          id: "ev_1",
          type: "TRANSCRIPT",
          title: "AIIA 4th Sem Clinical Diagnostic Distinction",
          verified: true,
          score: 91,
          date: "2025-11-15",
        },
        {
          id: "ev_2",
          type: "ASSESSMENT",
          title: "National Ayush Diagnostic Assessment",
          issuer: "CCRAS / Ministry of Ayush",
          verified: true,
          score: 88,
          date: "2026-01-20",
        },
      ],
      history: [
        { date: "2024-06-01", level: 2 },
        { date: "2025-01-15", level: 3 },
        { date: "2025-09-10", level: 4 },
      ],
    },
    {
      id: "sk_2",
      name: "Dravyaguna (Herbal Pharmacology)",
      category: "DOMAIN_AYUSH",
      proficiency: 4,
      confidence: 89,
      verified: true,
      verificationSource: "DIGILOCKER",
      evidence: [
        {
          id: "ev_3",
          type: "CERTIFICATE",
          title: "Certificate in Pharmacognosy & Phytochemistry",
          issuer: "DigiLocker / NPTEL SWAYAM",
          verified: true,
          score: 85,
          date: "2025-08-12",
        },
        {
          id: "ev_4",
          type: "PROJECT",
          title: "Phytochemical profiling of 15 Himalayan medicinal herbs",
          verified: true,
          date: "2025-12-05",
        },
      ],
      history: [
        { date: "2024-05-01", level: 2 },
        { date: "2025-04-10", level: 3 },
        { date: "2025-11-20", level: 4 },
      ],
    },
    {
      id: "sk_3",
      name: "Clinical Research & GCP Protocols",
      category: "RESEARCH",
      proficiency: 3,
      confidence: 78,
      verified: true,
      verificationSource: "ASSESSMENT_VERIFIED",
      evidence: [
        {
          id: "ev_5",
          type: "ASSESSMENT",
          title: "Good Clinical Practice (GCP) Certification Quiz",
          issuer: "TalentIQ Assessment Engine",
          verified: true,
          score: 82,
          date: "2026-02-10",
        },
      ],
      history: [
        { date: "2025-03-01", level: 1 },
        { date: "2025-08-15", level: 2 },
        { date: "2026-01-10", level: 3 },
      ],
    },
    {
      id: "sk_4",
      name: "Medical Sanskrit & Classical Texts",
      category: "DOMAIN_AYUSH",
      proficiency: 4,
      confidence: 94,
      verified: true,
      verificationSource: "COLLEGE_VERIFIED",
      evidence: [
        {
          id: "ev_6",
          type: "TRANSCRIPT",
          title: "Charaka Samhita & Ashtanga Hridaya Term Paper",
          verified: true,
          score: 94,
          date: "2025-05-15",
        },
      ],
      history: [
        { date: "2024-01-10", level: 3 },
        { date: "2025-06-20", level: 4 },
      ],
    },
    {
      id: "sk_5",
      name: "Data Analytics & Biostatistics",
      category: "TECHNICAL",
      proficiency: 2,
      confidence: 65,
      verified: false,
      verificationSource: "SELF_DECLARED",
      evidence: [
        {
          id: "ev_7",
          type: "PROJECT",
          title: "Preliminary exploratory statistical analysis of clinical trial cohorts",
          verified: false,
          date: "2026-01-05",
        },
      ],
      history: [
        { date: "2025-09-01", level: 1 },
        { date: "2026-01-10", level: 2 },
      ],
    },
    {
      id: "sk_6",
      name: "Scientific Communication & Reporting",
      category: "SOFT_SKILL",
      proficiency: 4,
      confidence: 86,
      verified: true,
      verificationSource: "ASSESSMENT_VERIFIED",
      evidence: [
        {
          id: "ev_8",
          type: "ASSESSMENT",
          title: "Healthcare Communication & Ethical Reporting",
          issuer: "TalentIQ AI Assessment",
          verified: true,
          score: 87,
          date: "2026-02-02",
        },
      ],
      history: [
        { date: "2024-09-01", level: 3 },
        { date: "2025-12-10", level: 4 },
      ],
    },
    {
      id: "sk_7",
      name: "Panchakarma Procedure Protocols",
      category: "DOMAIN_AYUSH",
      proficiency: 3,
      confidence: 82,
      verified: true,
      verificationSource: "COLLEGE_VERIFIED",
      evidence: [
        {
          id: "ev_9",
          type: "TRANSCRIPT",
          title: "Practical Clinical Rotations: Panchakarma Unit",
          verified: true,
          score: 84,
          date: "2025-10-18",
        },
      ],
      history: [
        { date: "2024-11-01", level: 1 },
        { date: "2025-06-01", level: 2 },
        { date: "2025-10-25", level: 3 },
      ],
    },
    {
      id: "sk_8",
      name: "Python for Data Science",
      category: "TECHNICAL",
      proficiency: 2,
      confidence: 60,
      verified: false,
      verificationSource: "SELF_DECLARED",
      evidence: [
        {
          id: "ev_10",
          type: "PROJECT",
          title: "Herbal chemical compound lookup script in Python",
          verified: false,
          date: "2026-01-15",
        },
      ],
      history: [
        { date: "2025-11-01", level: 1 },
        { date: "2026-01-20", level: 2 },
      ],
    },
  ],
};

// ==========================================
// 3. TARGET ROLE DEFINITIONS & REQUIREMENTS
// ==========================================
export const ROLES_CATALOG = [
  {
    id: "role_cra",
    title: "Clinical Research Associate (AYUSH)",
    sector: "Clinical Trials & Healthcare",
    description: "Designs, monitors, and evaluates observational and randomized clinical trials for AYUSH botanical drugs and integrative therapeutics.",
    skillsRequired: [
      { name: "Clinical Research & GCP Protocols", minLevel: 4, weight: 0.3 },
      { name: "Ayurvedic Clinical Knowledge", minLevel: 4, weight: 0.25 },
      { name: "Dravyaguna (Herbal Pharmacology)", minLevel: 3, weight: 0.2 },
      { name: "Data Analytics & Biostatistics", minLevel: 3, weight: 0.15 },
      { name: "Scientific Communication & Reporting", minLevel: 4, weight: 0.1 },
    ],
  },
  {
    id: "role_ds",
    title: "Data Scientist (HealthTech & AI)",
    sector: "Information Technology & AI",
    description: "Develops machine learning pipelines, predictive health models, and NLP models for biomedical literature and clinical informatics.",
    skillsRequired: [
      { name: "Python for Data Science", minLevel: 4, weight: 0.3 },
      { name: "Machine Learning & Neural Nets", minLevel: 3, weight: 0.25 },
      { name: "SQL & Relational Databases", minLevel: 3, weight: 0.2 },
      { name: "Data Analytics & Biostatistics", minLevel: 4, weight: 0.15 },
      { name: "Cloud Deployment (AWS/Azure)", minLevel: 2, weight: 0.1 },
    ],
  },
  {
    id: "role_herbal_formulator",
    title: "Herbal Formulation Scientist",
    sector: "Pharmaceutical & Nutraceuticals",
    description: "Develops standard operating procedures, stability testing, and novel extraction techniques for commercial AYUSH formulations.",
    skillsRequired: [
      { name: "Dravyaguna (Herbal Pharmacology)", minLevel: 4, weight: 0.35 },
      { name: "Pharmacognosy & Extraction Techniques", minLevel: 4, weight: 0.3 },
      { name: "Ayurvedic Clinical Knowledge", minLevel: 3, weight: 0.2 },
      { name: "Scientific Communication & Reporting", minLevel: 3, weight: 0.15 },
    ],
  },
  {
    id: "role_wellness_consultant",
    title: "Integrative Wellness Consultant",
    sector: "Wellness Tourism & Preventative Health",
    description: "Provides personalized lifestyle, dietetics, and therapeutic regimens combining Prakriti assessment, Yoga, and Dinacharya guidelines.",
    skillsRequired: [
      { name: "Ayurvedic Clinical Knowledge", minLevel: 4, weight: 0.35 },
      { name: "Panchakarma Procedure Protocols", minLevel: 3, weight: 0.25 },
      { name: "Scientific Communication & Reporting", minLevel: 4, weight: 0.25 },
      { name: "Yoga Therapy & Dinacharya", minLevel: 3, weight: 0.15 },
    ],
  },
];

// ==========================================
// 4. 30+ OPPORTUNITIES (Marketplace)
// ==========================================
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp_1",
    title: "Ayush Clinical Research Intern",
    company: "Dabur India Healthcare & R&D",
    companyLogo: "🌿",
    type: "INTERNSHIP",
    department: "Medical Research",
    location: "Ghaziabad / New Delhi",
    isRemote: false,
    stipend: "₹25,000 / month",
    duration: "6 Months",
    deadline: "2026-04-15",
    openings: 5,
    description:
      "Join Dabur's Center for Phytomedical Innovation. You will assist principal investigators in phase-II clinical trials on standardized Ashwagandha & Guduchi formulations, audit CRF documentation per ICH-GCP guidelines, and synthesize adverse event reports.",
    requiredSkills: [
      { name: "Ayurvedic Clinical Knowledge", minLevel: 3 },
      { name: "Dravyaguna (Herbal Pharmacology)", minLevel: 3 },
      { name: "Clinical Research & GCP Protocols", minLevel: 3 },
    ],
    preferredSkills: ["Data Analytics & Biostatistics", "Medical Sanskrit & Classical Texts"],
    eligibility: {
      degrees: ["BAMS", "MD (Ayu)", "B.Pharm (Ayurveda)", "M.Sc Herbal Science"],
      minCgpa: 7.5,
      years: [3, 4, 5],
    },
    isAyushSpecific: true,
    postedBy: "Dr. Arvind Swaminathan",
    postedDate: "2026-02-15",
  },
  {
    id: "opp_2",
    title: "HealthTech AI & Clinical Data Science Intern",
    company: "Tata Consultancy Services (TCS Digital Life Sciences)",
    companyLogo: "⚡",
    type: "INTERNSHIP",
    department: "AI & Healthcare Analytics",
    location: "Bengaluru",
    isRemote: true,
    stipend: "₹35,000 / month",
    duration: "4 Months",
    deadline: "2026-04-20",
    openings: 8,
    description:
      "Work with the Healthcare & Life Sciences engineering team to train biomedical LLMs and predictive clinical models using Electronic Health Records (EHR) and clinical trial repositories.",
    requiredSkills: [
      { name: "Python for Data Science", minLevel: 3 },
      { name: "Data Analytics & Biostatistics", minLevel: 3 },
      { name: "SQL & Relational Databases", minLevel: 3 },
    ],
    preferredSkills: ["Machine Learning & Neural Nets", "Cloud Deployment (AWS/Azure)"],
    eligibility: {
      degrees: ["B.Tech CSE", "B.Tech AI/ML", "BAMS (Integrative Analytics)", "M.Tech BioTech"],
      minCgpa: 7.0,
      years: [3, 4],
    },
    isAyushSpecific: false,
    postedBy: "Kavita Rao, Head of Campus Talent",
    postedDate: "2026-02-18",
  },
  {
    id: "opp_3",
    title: "Herbal Formulation & Standardization Fellow",
    company: "Himalaya Wellness Company",
    companyLogo: "🌱",
    type: "RESEARCH_PROJECT",
    department: "Phytochemistry & Quality Control",
    location: "Bengaluru",
    isRemote: false,
    stipend: "₹28,000 / month",
    duration: "6 Months",
    deadline: "2026-04-30",
    openings: 4,
    description:
      "Sponsored research fellow position in high-performance thin-layer chromatography (HPTLC) marker compound quantification for polyherbal wellness elixirs.",
    requiredSkills: [
      { name: "Dravyaguna (Herbal Pharmacology)", minLevel: 4 },
      { name: "Pharmacognosy & Extraction Techniques", minLevel: 3 },
      { name: "Scientific Communication & Reporting", minLevel: 3 },
    ],
    preferredSkills: ["Ayurvedic Clinical Knowledge"],
    eligibility: {
      degrees: ["BAMS", "B.Pharm", "M.Sc Chemistry", "M.Pharm (Ayurveda)"],
      minCgpa: 8.0,
      years: [3, 4],
    },
    isAyushSpecific: true,
    postedBy: "Vikram Malhotra",
    postedDate: "2026-02-20",
  },
  {
    id: "opp_4",
    title: "AYUSH Tele-Health Clinical Navigator",
    company: "All India Institute of Ayurveda (AIIA)",
    companyLogo: "🏥",
    type: "LIVE_PROJECT",
    department: "Integrative OPD Telemedicine",
    location: "New Delhi",
    isRemote: true,
    stipend: "₹18,000 / month",
    duration: "3 Months",
    deadline: "2026-03-31",
    openings: 12,
    description:
      "Serve as a digital clinical assistant assessing patient Prakriti profiles, reviewing initial case histories, and assisting senior Ayurveda specialists on the e-Sanjeevani AYUSH portal.",
    requiredSkills: [
      { name: "Ayurvedic Clinical Knowledge", minLevel: 3 },
      { name: "Panchakarma Procedure Protocols", minLevel: 2 },
      { name: "Scientific Communication & Reporting", minLevel: 3 },
    ],
    preferredSkills: ["Medical Sanskrit & Classical Texts"],
    eligibility: {
      degrees: ["BAMS", "MD (Ayu)"],
      minCgpa: 7.2,
      years: [3, 4, 5],
    },
    isAyushSpecific: true,
    postedBy: "Dr. Ananya Mukherjee",
    postedDate: "2026-02-22",
  },
  {
    id: "opp_5",
    title: "Junior Data Analyst — National Skill Mission",
    company: "AICTE / Ministry of Education",
    companyLogo: "🏛️",
    type: "INTERNSHIP",
    department: "National Skill Intelligence Cell",
    location: "New Delhi",
    isRemote: true,
    stipend: "₹22,000 / month",
    duration: "6 Months",
    deadline: "2026-04-10",
    openings: 6,
    description:
      "Analyze cross-institutional placement metrics, skill-demand ratios across 500+ Indian colleges, and build interactive PowerBI / Tableau analytics dashboards.",
    requiredSkills: [
      { name: "Data Analytics & Biostatistics", minLevel: 3 },
      { name: "SQL & Relational Databases", minLevel: 3 },
      { name: "Python for Data Science", minLevel: 2 },
    ],
    preferredSkills: ["Scientific Communication & Reporting"],
    eligibility: {
      degrees: ["B.Tech CSE", "B.Tech IT", "BCA", "B.Sc Data Science"],
      minCgpa: 7.0,
      years: [2, 3, 4],
    },
    isAyushSpecific: false,
    postedBy: "Smt. Sunita Deshmukh",
    postedDate: "2026-02-25",
  },
  {
    id: "opp_6",
    title: "Integrative Wellness Consultant",
    company: "Patanjali Wellness Resorts",
    companyLogo: "🌿",
    type: "JOB",
    department: "Clinical Wellness Operations",
    location: "Haridwar",
    isRemote: false,
    stipend: "₹6.5 LPA (Full Time)",
    duration: "Full-Time",
    deadline: "2026-05-15",
    openings: 10,
    description:
      "Permanent clinical position leading Panchakarma therapy scheduling, dietary consultation, and patient discharge protocols for international wellness guests.",
    requiredSkills: [
      { name: "Ayurvedic Clinical Knowledge", minLevel: 4 },
      { name: "Panchakarma Procedure Protocols", minLevel: 3 },
      { name: "Scientific Communication & Reporting", minLevel: 4 },
    ],
    preferredSkills: ["Yoga Therapy & Dinacharya"],
    eligibility: {
      degrees: ["BAMS", "MD (Ayu)"],
      minCgpa: 7.5,
      years: [4, 5],
    },
    isAyushSpecific: true,
    postedBy: "Acharya Rajesh, HR Director",
    postedDate: "2026-02-28",
  },
  {
    id: "opp_7",
    title: "National Smart Ayurveda Hackathon 2026",
    company: "Ministry of Ayush & AIIA",
    companyLogo: "🏆",
    type: "HACKATHON",
    department: "Innovation & Startup Cell",
    location: "Hybrid (Grand Finale in New Delhi)",
    isRemote: true,
    stipend: "₹5,00,000 Cash Prize Pool",
    duration: "48 Hours Sprint",
    deadline: "2026-04-05",
    openings: 50,
    description:
      "Build AI, IoT, or computer vision solutions for authentic raw herb authentication, pulse diagnosis sensor integrations, or automated Panchakarma oil temperature controllers.",
    requiredSkills: [
      { name: "Scientific Communication & Reporting", minLevel: 3 },
      { name: "Ayurvedic Clinical Knowledge", minLevel: 2 },
    ],
    preferredSkills: ["Python for Data Science", "Data Analytics & Biostatistics"],
    eligibility: {
      degrees: ["All Streams (Multidisciplinary Teams Encouraged)"],
      minCgpa: 6.0,
      years: [1, 2, 3, 4, 5],
    },
    isAyushSpecific: true,
    postedBy: "SIH Ayush Nodal Center",
    postedDate: "2026-03-01",
  },
];

// ==========================================
// 5. APPLICATIONS (Live Lifecycle Pipeline)
// ==========================================
export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app_101",
    opportunityId: "opp_1",
    studentId: "std_priya_01",
    studentName: "Priya Sharma",
    studentEmail: "student@demo.com",
    studentCollege: "All India Institute of Ayurveda (AIIA)",
    opportunityTitle: "Ayush Clinical Research Intern",
    companyName: "Dabur India Healthcare & R&D",
    appliedDate: "2026-02-20",
    status: "SHORTLISTED",
    matchScore: 92,
    matchBreakdown: {
      skillMatch: 95,
      proficiencyFit: 90,
      eligibility: 100,
      preferenceMatch: 85,
    },
    milestones: [
      {
        id: "m_1",
        title: "CRF Review & GCP Audit Onboarding",
        completed: true,
        feedback: "Exemplary understanding of classical references and Good Clinical Practice guidelines.",
      },
      {
        id: "m_2",
        title: "Interim Clinical Trial Cohort Analysis",
        completed: false,
      },
      {
        id: "m_3",
        title: "Final Botanical Trial Dossier & Submission",
        completed: false,
      },
    ],
  },
  {
    id: "app_102",
    opportunityId: "opp_4",
    studentId: "std_priya_01",
    studentName: "Priya Sharma",
    studentEmail: "student@demo.com",
    studentCollege: "All India Institute of Ayurveda (AIIA)",
    opportunityTitle: "AYUSH Tele-Health Clinical Navigator",
    companyName: "All India Institute of Ayurveda (AIIA)",
    appliedDate: "2026-02-24",
    status: "SELECTED",
    matchScore: 89,
    matchBreakdown: {
      skillMatch: 90,
      proficiencyFit: 88,
      eligibility: 100,
      preferenceMatch: 80,
    },
    milestones: [
      {
        id: "m_4",
        title: "e-Sanjeevani Portal Patient Triage Certification",
        completed: true,
        feedback: "Completed 45 successful tele-consultation triage intakes with 4.9/5 patient rating.",
      },
      {
        id: "m_5",
        title: "Prakriti Assessment Digital Form Optimization",
        completed: true,
        feedback: "Standardized 12 diagnostic clinical rubrics.",
      },
    ],
    finalFeedback: {
      rating: 4.8,
      comments:
        "Outstanding clinical judgment. Demonstrates natural empathy combined with sharp analytical diagnostic acumen.",
      skillsImproved: [
        { skillName: "Ayurvedic Clinical Knowledge", increase: 1 },
        { skillName: "Scientific Communication & Reporting", increase: 1 },
      ],
      certificateIssued: true,
    },
  },
  {
    id: "app_103",
    opportunityId: "opp_2",
    studentId: "std_priya_01",
    studentName: "Priya Sharma",
    studentEmail: "student@demo.com",
    studentCollege: "All India Institute of Ayurveda (AIIA)",
    opportunityTitle: "HealthTech AI & Clinical Data Science Intern",
    companyName: "Tata Consultancy Services",
    appliedDate: "2026-03-02",
    status: "APPLIED",
    matchScore: 68,
    matchBreakdown: {
      skillMatch: 60,
      proficiencyFit: 65,
      eligibility: 90,
      preferenceMatch: 80,
    },
  },
];

// ==========================================
// 6. 50+ SEEDED STUDENTS (For TPO & Gov Dashboard)
// ==========================================
export const SEEDED_STUDENTS_LIST = Array.from({ length: 50 }).map((_, i) => {
  const isAyush = i % 2 === 0;
  const collegesAyush = [
    "All India Institute of Ayurveda (AIIA), New Delhi",
    "National Institute of Ayurveda (NIA), Jaipur",
    "Institute of Teaching and Research in Ayurveda (ITRA), Jamnagar",
    "Government Ayurvedic College, Lucknow",
    "Faculty of Ayurveda, IMS BHU Varanasi",
  ];
  const collegesTech = [
    "Indian Institute of Technology (IIT), Delhi",
    "Delhi Technological University (DTU)",
    "National Institute of Technology (NIT), Trichy",
    "Vellore Institute of Technology (VIT)",
    "BITS Pilani",
  ];

  const firstNames = [
    "Aarav", "Ananya", "Rohan", "Sneha", "Aditya", "Ishita", "Vikram", "Pooja",
    "Kavya", "Siddharth", "Meera", "Arjun", "Neha", "Manish", "Divya", "Karan",
    "Bhavna", "Harsh", "Deepika", "Nikhil", "Sunita", "Tarun", "Shreya", "Gaurav",
    "Tanvi", "Varun", "Rhea", "Pranav", "Anjali", "Suresh", "Ritu", "Akash",
  ];
  const lastNames = [
    "Sharma", "Verma", "Patel", "Gupta", "Nair", "Iyer", "Rao", "Reddy",
    "Mishra", "Joshi", "Choudhury", "Bose", "Kulkarni", "Deshmukh", "Singhal", "Mehta",
  ];

  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[(i * 3) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const college = isAyush ? collegesAyush[i % collegesAyush.length] : collegesTech[i % collegesTech.length];
  const department = isAyush
    ? i % 4 === 0 ? "Dravyaguna" : i % 4 === 1 ? "Panchakarma" : i % 4 === 2 ? "Rasashastra" : "Kayachikitsa"
    : i % 3 === 0 ? "Computer Science" : i % 3 === 1 ? "AI & Data Science" : "Electronics & Comm";
  const degree = isAyush ? "BAMS" : "B.Tech";
  const readinessScore = Math.floor(58 + ((i * 7) % 38));

  return {
    id: `std_gen_${i + 1}`,
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@demo.edu`,
    college,
    department,
    degree,
    year: 3 + (i % 2),
    cgpa: +(7.0 + ((i * 0.27) % 2.8)).toFixed(2),
    readinessScore,
    isAyush,
    verifiedSkillsCount: 3 + (i % 5),
    internshipPlaced: readinessScore > 75 && i % 3 !== 0,
    targetRole: isAyush ? "Clinical Research Associate" : "Data Scientist",
  };
});

// ==========================================
// 7. TPO SKILL GAP HEATMAP DATA (Matrix)
// ==========================================
export const TPO_HEATMAP_DATA = [
  {
    department: "Ayurveda (BAMS - AIIA)",
    skills: {
      "Clinical Diagnostics": 92,
      "Herbal Pharmacology": 88,
      "Panchakarma Protocol": 85,
      "Biostatistics & Analytics": 46, // Red Gap
      "Research GCP": 71,
      "Medical Communication": 89,
    },
  },
  {
    department: "Computer Science (CSE)",
    skills: {
      "Clinical Diagnostics": 15,
      "Herbal Pharmacology": 10,
      "Panchakarma Protocol": 5,
      "Biostatistics & Analytics": 88,
      "Research GCP": 42, // Amber Gap
      "Medical Communication": 82,
    },
  },
  {
    department: "AI & Data Science",
    skills: {
      "Clinical Diagnostics": 22,
      "Herbal Pharmacology": 18,
      "Panchakarma Protocol": 8,
      "Biostatistics & Analytics": 94,
      "Research GCP": 54,
      "Medical Communication": 79,
    },
  },
  {
    department: "Ayurvedic Pharmacy (B.Pharm Ayu)",
    skills: {
      "Clinical Diagnostics": 68,
      "Herbal Pharmacology": 95,
      "Panchakarma Protocol": 60,
      "Biostatistics & Analytics": 38, // Red Gap
      "Research GCP": 64,
      "Medical Communication": 74,
    },
  },
  {
    department: "Electronics & Biomedical (ECE)",
    skills: {
      "Clinical Diagnostics": 34,
      "Herbal Pharmacology": 20,
      "Panchakarma Protocol": 30,
      "Biostatistics & Analytics": 82,
      "Research GCP": 58,
      "Medical Communication": 76,
    },
  },
];

// ==========================================
// 8. CAREER GPS ROADMAP (5 Months)
// ==========================================
export const CAREER_GPS_ROADMAP: CareerRoadmapMonth[] = [
  {
    month: 1,
    title: "Foundations & Biostatistics Bridge",
    focus: "Bridge critical statistical gap for clinical documentation & research validation.",
    progress: 85,
    tasks: [
      {
        id: "t_101",
        title: "Complete SWAYAM Biostatistics for Health Researchers Course (4 Weeks)",
        category: "LEARN",
        completed: true,
        link: "https://swayam.gov.in",
      },
      {
        id: "t_102",
        title: "Clean & analyze sample Phase-I botanical trial dataset in Python/Excel",
        category: "BUILD",
        completed: true,
      },
      {
        id: "t_103",
        title: "Earn TalentIQ Verified Biostatistics Badge",
        category: "PREPARE",
        completed: false,
      },
    ],
  },
  {
    month: 2,
    title: "Clinical Trial Protocols & Regulatory ICH-GCP",
    focus: "Master CDSCO & Ministry of Ayush ethical guidelines for clinical trials.",
    progress: 40,
    tasks: [
      {
        id: "t_201",
        title: "Study ICMR / CCRAS Ethical Guidelines for Biomedical Research in Ayurveda",
        category: "LEARN",
        completed: true,
      },
      {
        id: "t_202",
        title: "Draft a Case Report Form (CRF) for an anti-inflammatory herbal formulation",
        category: "BUILD",
        completed: false,
      },
      {
        id: "t_203",
        title: "Take TalentIQ GCP Protocol Certification Quiz",
        category: "PREPARE",
        completed: false,
      },
    ],
  },
  {
    month: 3,
    title: "Industry Apprenticeship / Clinical Rotation",
    focus: "Immerse in an active hospital OPD or pharmaceutical clinical research unit.",
    progress: 15,
    tasks: [
      {
        id: "t_301",
        title: "Apply to 3 Recommended Clinical Research Internships on TalentIQ",
        category: "APPLY",
        completed: true,
      },
      {
        id: "t_302",
        title: "Log 40 hours of patient data entry and adverse symptom auditing",
        category: "BUILD",
        completed: false,
      },
      {
        id: "t_303",
        title: "Receive Mid-Term Industry Mentor Review on TalentIQ",
        category: "PREPARE",
        completed: false,
      },
    ],
  },
  {
    month: 4,
    title: "Advanced Phytochemical & Mechanistic Profiling",
    focus: "Synthesize pharmacological mechanisms with clinical biomarkers.",
    progress: 0,
    tasks: [
      {
        id: "t_401",
        title: "Complete HPTLC & Mass Spectrometry Chromatogram analysis module",
        category: "LEARN",
        completed: false,
      },
      {
        id: "t_402",
        title: "Publish or present a poster at the National AYUSH Research Conclave",
        category: "BUILD",
        completed: false,
      },
    ],
  },
  {
    month: 5,
    title: "AI Interview Simulation & Placement Drive",
    focus: "Execute mock technical interviews and finalize full-time career placement.",
    progress: 0,
    tasks: [
      {
        id: "t_501",
        title: "Complete 3 AI Technical Mock Interviews for CRA Role",
        category: "PREPARE",
        completed: false,
      },
      {
        id: "t_502",
        title: "Attend TalentIQ National Industry Recruitment Fair",
        category: "APPLY",
        completed: false,
      },
      {
        id: "t_503",
        title: "Accept Offer & Transfer Internship Credits to Academic Bank of Credits (ABC)",
        category: "APPLY",
        completed: false,
      },
    ],
  },
];

// ==========================================
// 9. ADAPTIVE ASSESSMENT QUESTION BANK
// ==========================================
export const ASSESSMENT_QUESTIONS: Record<string, AssessmentQuestion[]> = {
  "Ayurvedic Clinical Knowledge": [
    {
      id: "q_ayu_1",
      skill: "Ayurvedic Clinical Knowledge",
      difficulty: "EASY",
      question: "Which of the following is considered the primary site (Sthana) of Pitta Dosha according to classical texts?",
      options: ["Hridaya (Heart)", "Amashaya (Lower Stomach / Duodenum)", "Pakwashaya (Large Intestine)", "Murdha (Head)"],
      correctIndex: 1,
      explanation: "According to Ashtanga Hridaya, Grahani / lower part of Amashaya is the primary seat of Pachaka Pitta.",
    },
    {
      id: "q_ayu_2",
      skill: "Ayurvedic Clinical Knowledge",
      difficulty: "MEDIUM",
      question: "In a patient presenting with Sandhigata Vata, which Panchakarma procedure is indicated as primary line of Shodhana?",
      options: ["Vamana", "Virechana", "Basti (Taila / Kashaya Basti)", "Nasya"],
      correctIndex: 2,
      explanation: "Basti Karma is universally acknowledged in Charaka Samhita as the paramo aushadha for all Vata vyadhis.",
    },
    {
      id: "q_ayu_3",
      skill: "Ayurvedic Clinical Knowledge",
      difficulty: "HARD",
      question: "In modern clinical trial terminology, matching Prakriti phenotypes with genomic polymorphisms is termed:",
      options: ["Ayurgenomics", "Dravyaguna Profiling", "Rasayana Proteomics", "Vata-Metabolomics"],
      correctIndex: 0,
      explanation: "Ayurgenomics is the recognized interdisciplinary field pioneered by CSIR & Ministry of Ayush bridging Prakriti with SNP genomic variations.",
    },
  ],
  "Data Analytics & Biostatistics": [
    {
      id: "q_stat_1",
      skill: "Data Analytics & Biostatistics",
      difficulty: "EASY",
      question: "Which statistical measure of central tendency is least sensitive to extreme outliers in clinical symptom scores?",
      options: ["Mean", "Median", "Standard Deviation", "Variance"],
      correctIndex: 1,
      explanation: "The median represents the 50th percentile and is robust against skewed outliers.",
    },
    {
      id: "q_stat_2",
      skill: "Data Analytics & Biostatistics",
      difficulty: "MEDIUM",
      question: "When comparing the clinical efficacy score of an herbal drug versus placebo in two independent randomized cohorts with normally distributed scores, which test is appropriate?",
      options: ["Paired t-test", "Independent Two-Sample t-test", "Chi-Square Test of Independence", "Fisher's Exact Test"],
      correctIndex: 1,
      explanation: "An independent two-sample t-test compares the means of two distinct groups.",
    },
    {
      id: "q_stat_3",
      skill: "Data Analytics & Biostatistics",
      difficulty: "HARD",
      question: "What is the primary purpose of computing a Kaplan-Meier survival curve in a longitudinal herbal oncology clinical study?",
      options: [
        "To test normality of liver enzyme distribution",
        "To estimate the probability of symptom-free progression over time with right-censored data",
        "To compute inter-rater diagnostic reliability between Vaidyas",
        "To cluster chemical compounds based on retention time",
      ],
      correctIndex: 1,
      explanation: "Kaplan-Meier analysis handles time-to-event outcomes with censored patients.",
    },
  ],
};

// ==========================================
// 10. AI MOCK INTERVIEW QUESTION BANK
// ==========================================
export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "int_1",
    role: "Clinical Research Associate",
    type: "TECHNICAL",
    question: "Walk us through how you would design a double-blind, randomized clinical trial to validate the anti-hyperglycemic efficacy of an Ayush formulation while maintaining traditional ethical protocols.",
    idealAnswerKeywords: ["randomization", "placebo matching", "IRB / ethical clearance", "primary endpoints", "HbA1c", "GCP guidelines"],
  },
  {
    id: "int_2",
    role: "Clinical Research Associate",
    type: "BEHAVIORAL",
    question: "Describe a scenario where you noticed discrepancies between patient Case Report Forms (CRFs) and the source clinical logs during an audit. How did you resolve it?",
    idealAnswerKeywords: ["investigation", "impartiality", "root cause", "documentation", "PI communication", "corrective action plan"],
  },
  {
    id: "int_3",
    role: "Clinical Research Associate",
    type: "DOMAIN",
    question: "How do you harmonize classical Ayurvedic diagnostic parameters (like Agni, Bala, and Kostha) with modern quantitative biomarker assays?",
    idealAnswerKeywords: ["validated questionnaires", "biomarkers", "correlation", "standardization", "inter-rater agreement", "Ayurgenomics"],
  },
];
