export type UserRole =
  | "STUDENT"
  | "INDUSTRY"
  | "FACULTY"
  | "TPO"
  | "COLLEGE_ADMIN"
  | "GOVERNMENT"
  | "MENTOR"
  | "PROVIDER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  institution?: string;
  department?: string;
  state?: string;
}

export interface SkillEvidence {
  id: string;
  type: "PROJECT" | "ASSESSMENT" | "CERTIFICATE" | "INTERNSHIP" | "TRANSCRIPT";
  title: string;
  issuer?: string;
  verified: boolean;
  score?: number;
  date: string;
}

export interface StudentSkill {
  id: string;
  name: string;
  category: "TECHNICAL" | "DOMAIN_AYUSH" | "SOFT_SKILL" | "TOOLS" | "RESEARCH";
  proficiency: number; // 1 - 5
  confidence: number; // 0 - 100%
  verified: boolean;
  verificationSource?: "DIGILOCKER" | "COLLEGE_VERIFIED" | "ASSESSMENT_VERIFIED" | "SELF_DECLARED";
  evidence: SkillEvidence[];
  history: { date: string; level: number }[];
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  year: number;
  cgpa: number;
  careerInterests: string[];
  preferredLocations: string[];
  targetRole: string;
  resumeUrl?: string;
  readinessScore: number; // 0 - 100
  skills: StudentSkill[];
  bio?: string;
  phone?: string;
  avatar?: string;
  apaarId?: string;
  digilockerVerified: boolean;
  projectsCount: number;
  internshipsCompleted: number;
}

export type OpportunityType =
  | "INTERNSHIP"
  | "JOB"
  | "LIVE_PROJECT"
  | "RESEARCH_PROJECT"
  | "HACKATHON"
  | "MENTORSHIP"
  | "TRAINING";

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: OpportunityType;
  department: string;
  location: string;
  isRemote: boolean;
  stipend: string;
  duration: string;
  deadline: string;
  openings: number;
  description: string;
  requiredSkills: { name: string; minLevel: number }[];
  preferredSkills?: string[];
  eligibility: {
    degrees: string[];
    minCgpa: number;
    years: number[];
  };
  isAyushSpecific?: boolean;
  postedBy: string;
  postedDate: string;
}

export type ApplicationStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "SELECTED"
  | "ONGOING"
  | "COMPLETED"
  | "REJECTED";

export interface Application {
  id: string;
  opportunityId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentCollege: string;
  opportunityTitle: string;
  companyName: string;
  appliedDate: string;
  status: ApplicationStatus;
  matchScore: number;
  matchBreakdown: {
    skillMatch: number;
    proficiencyFit: number;
    eligibility: number;
    preferenceMatch: number;
  };
  milestones?: {
    id: string;
    title: string;
    completed: boolean;
    feedback?: string;
  }[];
  finalFeedback?: {
    rating: number;
    comments: string;
    skillsImproved: { skillName: string; increase: number }[];
    certificateIssued: boolean;
  };
}

export interface MatchResult {
  matchScore: number; // 0 - 100
  skillMatchScore: number;
  proficiencyFitScore: number;
  eligibilityScore: number;
  preferenceScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  explanation: string[];
  formula: string;
}

export interface SkillGapItem {
  skill: string;
  status: "READY" | "NEEDS_IMPROVEMENT" | "MISSING";
  currentLevel: number;
  requiredLevel: number;
  recommendations: {
    courses: { title: string; provider: string; url?: string }[];
    projects: string[];
    certifications: string[];
  };
}

export interface CareerRoadmapMonth {
  month: number;
  title: string;
  focus: string;
  tasks: {
    id: string;
    title: string;
    category: "LEARN" | "BUILD" | "APPLY" | "PREPARE";
    completed: boolean;
    link?: string;
  }[];
  progress: number; // 0 - 100
}

export interface AssessmentQuestion {
  id: string;
  skill: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InterviewQuestion {
  id: string;
  role: string;
  type: "TECHNICAL" | "BEHAVIORAL" | "DOMAIN";
  question: string;
  idealAnswerKeywords: string[];
}
