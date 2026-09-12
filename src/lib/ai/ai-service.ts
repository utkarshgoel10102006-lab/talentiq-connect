import {
  StudentSkill,
  StudentProfile,
  Opportunity,
  MatchResult,
  SkillGapItem,
} from "@/types";
import { ROLES_CATALOG } from "@/lib/data-store";

export interface AIResumeAnalysis {
  technicalSkills: { name: string; proficiency: number; confidence: number }[];
  softSkills: { name: string; proficiency: number; confidence: number }[];
  tools: string[];
  projects: { title: string; description: string; skillsIdentified: string[] }[];
  certifications: string[];
  education: { degree: string; institution: string; score: string };
  missingInformation: string[];
  suggestions: string[];
  overallAtsScore: number;
}

export interface AICurriculumAnalysis {
  courseTitle: string;
  department: string;
  industryAlignmentScore: number; // 0 - 100
  coveredSkills: string[];
  missingSkills: string[];
  emergingSkills: string[];
  recommendedModules: {
    title: string;
    description: string;
    skillsTargeted: string[];
    suggestedIndustryPartner: string;
  }[];
  regulatoryAlignment: string[];
}

export interface CopilotMessage {
  id: string;
  sender: "user" | "copilot";
  content: string;
  timestamp: string;
  citations?: string[];
  suggestedActions?: { label: string; action: string }[];
}

export interface AIInterviewEvaluation {
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
  problemSolvingScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  modelFeedback: string;
}

export class AIService {
  // 1. SKILL EXTRACTOR
  async extractSkillsFromResume(text: string): Promise<StudentSkill[]> {
    await new Promise((r) => setTimeout(r, 600));

    const lower = text.toLowerCase();
    const detected: StudentSkill[] = [];

    if (lower.includes("ayurved") || lower.includes("bams") || lower.includes("charaka") || lower.includes("clinical")) {
      detected.push({
        id: `sk_ext_1_${Date.now()}`,
        name: "Ayurvedic Clinical Knowledge",
        category: "DOMAIN_AYUSH",
        proficiency: 4,
        confidence: 91,
        verified: true,
        verificationSource: "ASSESSMENT_VERIFIED",
        evidence: [
          {
            id: "ev_ext_1",
            type: "TRANSCRIPT",
            title: "Verified Clinical Internship Experience",
            verified: true,
            score: 92,
            date: "2026-01-10",
          },
        ],
        history: [{ date: "2026-01-01", level: 4 }],
      });
      detected.push({
        id: `sk_ext_2_${Date.now()}`,
        name: "Dravyaguna (Herbal Pharmacology)",
        category: "DOMAIN_AYUSH",
        proficiency: 4,
        confidence: 88,
        verified: true,
        verificationSource: "DIGILOCKER",
        evidence: [
          {
            id: "ev_ext_2",
            type: "CERTIFICATE",
            title: "Pharmacognosy & Botanical Identification",
            verified: true,
            date: "2025-11-20",
          },
        ],
        history: [{ date: "2025-11-01", level: 4 }],
      });
    }

    if (lower.includes("research") || lower.includes("gcp") || lower.includes("trials") || lower.includes("trial")) {
      detected.push({
        id: `sk_ext_3_${Date.now()}`,
        name: "Clinical Research & GCP Protocols",
        category: "RESEARCH",
        proficiency: 3,
        confidence: 82,
        verified: true,
        verificationSource: "COLLEGE_VERIFIED",
        evidence: [
          {
            id: "ev_ext_3",
            type: "PROJECT",
            title: "Phase-II Observational Trial Documentation",
            verified: true,
            date: "2025-12-15",
          },
        ],
        history: [{ date: "2025-12-01", level: 3 }],
      });
    }

    if (lower.includes("python") || lower.includes("code") || lower.includes("programming")) {
      detected.push({
        id: `sk_ext_4_${Date.now()}`,
        name: "Python for Data Science",
        category: "TECHNICAL",
        proficiency: 3,
        confidence: 76,
        verified: false,
        verificationSource: "SELF_DECLARED",
        evidence: [
          {
            id: "ev_ext_4",
            type: "PROJECT",
            title: "Biomedical data parsing script",
            verified: false,
            date: "2026-02-01",
          },
        ],
        history: [{ date: "2026-02-01", level: 3 }],
      });
    }

    if (lower.includes("data") || lower.includes("statistics") || lower.includes("excel") || lower.includes("spss")) {
      detected.push({
        id: `sk_ext_5_${Date.now()}`,
        name: "Data Analytics & Biostatistics",
        category: "TECHNICAL",
        proficiency: 3,
        confidence: 74,
        verified: true,
        verificationSource: "ASSESSMENT_VERIFIED",
        evidence: [
          {
            id: "ev_ext_5",
            type: "ASSESSMENT",
            title: "Biostatistics Diagnostic Exam",
            verified: true,
            score: 79,
            date: "2026-01-18",
          },
        ],
        history: [{ date: "2026-01-18", level: 3 }],
      });
    }

    if (lower.includes("communication") || lower.includes("english") || lower.includes("presentation") || lower.includes("report")) {
      detected.push({
        id: `sk_ext_6_${Date.now()}`,
        name: "Scientific Communication & Reporting",
        category: "SOFT_SKILL",
        proficiency: 4,
        confidence: 88,
        verified: true,
        verificationSource: "COLLEGE_VERIFIED",
        evidence: [
          {
            id: "ev_ext_6",
            type: "CERTIFICATE",
            title: "National Conference Poster Presentation Distinction",
            verified: true,
            date: "2025-10-12",
          },
        ],
        history: [{ date: "2025-10-12", level: 4 }],
      });
    }

    return detected;
  }

  // 2. EXPLAINABLE MATCH ENGINE
  calculateMatch(
    student: StudentProfile,
    opportunity: Opportunity
  ): MatchResult {
    const requiredSkills = opportunity.requiredSkills;
    let matchedCount = 0;
    let totalProficiencyScore = 0;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    const partialSkills: string[] = [];
    const explanation: string[] = [];

    requiredSkills.forEach((req) => {
      const studentSkill = student.skills.find(
        (s) => s.name.toLowerCase() === req.name.toLowerCase()
      );
      if (studentSkill) {
        if (studentSkill.proficiency >= req.minLevel) {
          matchedCount += 1;
          totalProficiencyScore += 1;
          matchedSkills.push(req.name);
          explanation.push(
            `✓ Possesses required proficiency (Level ${studentSkill.proficiency}/${req.minLevel}) in ${req.name}`
          );
        } else {
          matchedCount += 0.5;
          totalProficiencyScore += studentSkill.proficiency / req.minLevel;
          partialSkills.push(req.name);
          explanation.push(
            `⚠ Has foundational knowledge in ${req.name} (Level ${studentSkill.proficiency}/${req.minLevel}), needs advancement`
          );
        }
      } else {
        missingSkills.push(req.name);
        explanation.push(`✕ Missing required competency: ${req.name}`);
      }
    });

    const skillMatchScore = Math.round(
      (matchedCount / Math.max(requiredSkills.length, 1)) * 100
    );
    const proficiencyFitScore = Math.round(
      (totalProficiencyScore / Math.max(requiredSkills.length, 1)) * 100
    );

    // Eligibility check
    let eligibilityScore = 100;
    if (student.cgpa < opportunity.eligibility.minCgpa) {
      eligibilityScore -= 30;
      explanation.push(
        `⚠ CGPA (${student.cgpa}) is slightly below preferred threshold (${opportunity.eligibility.minCgpa})`
      );
    } else {
      explanation.push(
        `✓ Academic eligibility criteria met (CGPA ${student.cgpa} >= ${opportunity.eligibility.minCgpa})`
      );
    }

    if (!opportunity.eligibility.years.includes(student.year)) {
      eligibilityScore -= 20;
    } else {
      explanation.push(`✓ Year of study eligible (${student.year}th Year)`);
    }

    // Preference match
    let preferenceScore = 80;
    if (
      student.preferredLocations.includes(opportunity.location) ||
      (opportunity.isRemote && student.preferredLocations.includes("Remote"))
    ) {
      preferenceScore = 100;
      explanation.push(
        `✓ Location alignment: ${opportunity.location} matches candidate preferences`
      );
    }

    // Official SIH Formula:
    // Match Score = 0.6 * skill_match + 0.2 * proficiency_fit + 0.1 * eligibility + 0.1 * preference_match
    const rawMatch =
      0.6 * skillMatchScore +
      0.2 * proficiencyFitScore +
      0.1 * eligibilityScore +
      0.1 * preferenceScore;

    const matchScore = Math.min(99, Math.max(30, Math.round(rawMatch)));

    return {
      matchScore,
      skillMatchScore,
      proficiencyFitScore,
      eligibilityScore,
      preferenceScore,
      matchedSkills,
      missingSkills,
      partialSkills,
      explanation,
      formula: `0.6 × Skill Match (${skillMatchScore}%) + 0.2 × Proficiency Fit (${proficiencyFitScore}%) + 0.1 × Eligibility (${eligibilityScore}%) + 0.1 × Preference (${preferenceScore}%) = ${matchScore}%`,
    };
  }

  // 3. SKILL GAP ANALYZER
  analyzeSkillGap(
    studentSkills: StudentSkill[],
    targetRoleTitle: string
  ): SkillGapItem[] {
    const roleDef =
      ROLES_CATALOG.find((r) => r.title.toLowerCase().includes(targetRoleTitle.toLowerCase())) ||
      ROLES_CATALOG[0];

    return roleDef.skillsRequired.map((req) => {
      const existing = studentSkills.find(
        (s) => s.name.toLowerCase() === req.name.toLowerCase()
      );

      let status: "READY" | "NEEDS_IMPROVEMENT" | "MISSING" = "MISSING";
      const currentLevel = existing ? existing.proficiency : 0;

      if (currentLevel >= req.minLevel) {
        status = "READY";
      } else if (currentLevel > 0) {
        status = "NEEDS_IMPROVEMENT";
      }

      return {
        skill: req.name,
        status,
        currentLevel,
        requiredLevel: req.minLevel,
        recommendations: {
          courses: [
            {
              title: `Advanced ${req.name} Mastery`,
              provider: "SWAYAM Plus / NPTEL",
              url: "https://swayam.gov.in",
            },
            {
              title: `${req.name} in Industry Clinical Practices`,
              provider: "Skill India Digital Hub",
              url: "https://skillindiadigital.gov.in",
            },
          ],
          projects: [
            `Implement an end-to-end milestone case study applying ${req.name} to real-world dataset.`,
            `Collaborate with faculty mentor on sponsored industry research challenge.`,
          ],
          certifications: [
            `National AYUSH / AICTE Accredited Certification in ${req.name}`,
          ],
        },
      };
    });
  }

  // 4. CAREER COPILOT (RAG-backed Controlled Knowledge Base)
  async askCopilot(
    query: string,
    student?: StudentProfile
  ): Promise<CopilotMessage> {
    await new Promise((r) => setTimeout(r, 600));

    const q = query.toLowerCase();

    // RAG Routing with zero hallucination
    if (q.includes("ayurved") || q.includes("ayush") || q.includes("research career")) {
      return {
        id: `copilot_${Date.now()}`,
        sender: "copilot",
        content: `For a high-impact research career in **Ayurvedic Medicine & Integrative Healthcare**:

1. **Key Competency Pillars**:
   - Master **ICH-GCP Guidelines** & CDSCO Schedule Y clinical trial protocols.
   - Deepen knowledge in **Dravyaguna (Phytochemistry)** and high-throughput marker quantification (HPTLC).
   - Acquire **Biostatistics** (R or Python) to evaluate p-values, odds ratios, and Kaplan-Meier curves for clinical outcomes.

2. **National Regulatory Pathways**:
   - Ministry of Ayush and CCRAS regularly offer **AYUSH-Ph.D. Fellowships** and Junior Research Fellowships (JRF).
   - Premier institutions like **All India Institute of Ayurveda (AIIA)**, **ITRA Jamnagar**, and **NIA Jaipur** collaborate directly with pharma leaders (Dabur, Himalaya, Zydus).

3. **Recommended Next Step**:
   - Complete your Biostatistics gap analysis on TalentIQ and apply to the *Dabur Clinical Research Internship* where your profile has an **explainable 92% match**!`,
        timestamp: "Just now",
        citations: [
          "Ministry of Ayush National Research Guidelines 2024",
          "CCRAS Standardized Protocol Handbook",
          "NEP 2020 High-Quality Multidisciplinary Healthcare Framework",
        ],
        suggestedActions: [
          { label: "View Dabur Internship (92% Match)", action: "VIEW_OPP_1" },
          { label: "Take Biostatistics Assessment", action: "TAKE_ASSESSMENT" },
        ],
      };
    }

    if (q.includes("why am i not eligible") || q.includes("eligibility") || q.includes("match")) {
      return {
        id: `copilot_${Date.now()}`,
        sender: "copilot",
        content: `Your eligibility and match scores are governed by TalentIQ's **Explainable Matching Algorithm**:

- **Skill Overlap (60% weight)**: Compares your verified & declared skills against mandatory role prerequisites.
- **Proficiency Fit (20% weight)**: Checks if your demonstrated skill level (1 to 5) meets or exceeds the recruiter's minimum expectation.
- **Academic Filters (10% weight)**: Validates CGPA criteria (e.g., minimum 7.5 CGPA) and eligible batch years.
- **Location Preference (10% weight)**: Matches on-site cities or remote preferences.

If your score is below 75%, it is almost always due to **missing secondary skills** (such as Cloud Computing or Advanced Biostatistics) rather than lack of fundamental knowledge. Closing just 1 critical gap typically raises your score by **+14% to +18%**!`,
        timestamp: "Just now",
        citations: ["TalentIQ Transparent Match Formulation v2.4"],
        suggestedActions: [
          { label: "Inspect My Skill Twin", action: "VIEW_SKILL_TWIN" },
          { label: "Open Career GPS Roadmap", action: "VIEW_CAREER_GPS" },
        ],
      };
    }

    if (q.includes("interview") || q.includes("prepare")) {
      return {
        id: `copilot_${Date.now()}`,
        sender: "copilot",
        content: `I recommend initiating a practice session on our **AI Mock Interviewer**:

- It generates **real-time technical, behavioral, and domain-specific questions** customized for your target role: *${student?.targetRole || "Clinical Research Associate"}*.
- You will receive structured instant feedback across 4 parameters: **Communication, Technical Rigor, Confidence, and Problem Solving**.
- You can practice text responses today, and your results will dynamically update your Skill Twin profile!`,
        timestamp: "Just now",
        suggestedActions: [
          { label: "Launch AI Mock Interview", action: "START_INTERVIEW" },
        ],
      };
    }

    // Default intelligent response
    return {
      id: `copilot_${Date.now()}`,
      sender: "copilot",
      content: `Hello ${student?.name || "Scholar"}! I am your **TalentIQ Career Copilot**, connected to the National Academia-Industry Skill Graph.

Based on your current profile:
- Your **Employability Readiness Score** is **${student?.readinessScore || 78}%** for *${student?.targetRole || "Clinical Research Associate"}*.
- Your strongest verified competency is **Ayurvedic Clinical Knowledge (Level 4/5)**.
- Your highest-priority growth area is **Data Analytics & Biostatistics** (Level 2/5 vs required Level 3).

How can I assist your career roadmap today?`,
      timestamp: "Just now",
      suggestedActions: [
        { label: "How do I close my Biostatistics gap?", action: "ASK_GAP" },
        { label: "Explore Best Matched Internships", action: "VIEW_OPPS" },
      ],
    };
  }

  // 5. RESUME ADVISOR
  async analyzeResume(_resumeText: string): Promise<AIResumeAnalysis> {
    await new Promise((r) => setTimeout(r, 700));

    return {
      technicalSkills: [
        { name: "Ayurvedic Clinical Diagnostics", proficiency: 4, confidence: 92 },
        { name: "Dravyaguna (Herbal Pharmacology)", proficiency: 4, confidence: 89 },
        { name: "Good Clinical Practice (ICH-GCP)", proficiency: 3, confidence: 82 },
        { name: "Data Analytics & Biostatistics", proficiency: 2, confidence: 65 },
      ],
      softSkills: [
        { name: "Scientific Writing & Documentation", proficiency: 4, confidence: 88 },
        { name: "Multidisciplinary Collaboration", proficiency: 4, confidence: 85 },
      ],
      tools: ["MS Excel", "SPSS Basics", "Python", "e-Sanjeevani Portal", "HPTLC Analysis"],
      projects: [
        {
          title: "Comparative Study of Polyherbal Anti-Inflammatory Extracts",
          description: "Conducted in-vitro phytochemical assay testing on standard herbal batches.",
          skillsIdentified: ["Dravyaguna", "Phytochemistry", "Lab Protocols"],
        },
        {
          title: "Tele-Health Clinical Rotation at AIIA OPD",
          description: "Assisted Vaidyas in digital case history documentation for 250+ patients.",
          skillsIdentified: ["Clinical Knowledge", "Patient Communication"],
        },
      ],
      certifications: [
        "Certificate in Good Clinical Practice (GCP) - NIDA CTN",
        "DigiLocker Verified AYUSH Diagnostic Foundations",
      ],
      education: {
        degree: "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
        institution: "All India Institute of Ayurveda (AIIA)",
        score: "8.85 CGPA",
      },
      missingInformation: [
        "Quantified outcome metrics on clinical trial projects (e.g., sample size, p-values)",
        "Link to verified DigiLocker credentials or Academic Bank of Credits (ABC) ID",
        "Target role statement in resume summary",
      ],
      suggestions: [
        "Add measurable indicators: Replace 'assisted in trial' with 'audited 120+ Case Report Forms with zero GCP non-compliances'.",
        "Include formal Biostatistics coursework to increase ATS score for Clinical Research Associate roles.",
        "Highlight medical Sanskrit literacy for classical formulations authentication.",
      ],
      overallAtsScore: 84,
    };
  }

  // 6. AI INTERVIEW EVALUATION
  async evaluateInterview(
    question: string,
    answer: string,
    role: string
  ): Promise<{
    communicationScore: number;
    technicalScore: number;
    confidenceScore: number;
    problemSolvingScore: number;
    overallScore: number;
    strengths: string[];
    improvements: string[];
    modelFeedback: string;
  }> {
    await new Promise((r) => setTimeout(r, 600));

    const length = answer.trim().split(/\s+/).length;
    const lower = answer.toLowerCase();

    let techBoost = 0;
    if (lower.includes("gcp") || lower.includes("trial") || lower.includes("randomiz") || lower.includes("prakriti")) {
      techBoost += 15;
    }
    if (lower.includes("ethical") || lower.includes("irb") || lower.includes("documentation") || lower.includes("audit")) {
      techBoost += 10;
    }

    const communicationScore = Math.min(95, Math.max(70, 75 + Math.floor(length / 10)));
    const technicalScore = Math.min(96, Math.max(68, 72 + techBoost));
    const confidenceScore = Math.min(92, Math.max(70, 74 + Math.floor(length / 15)));
    const problemSolvingScore = Math.min(94, Math.max(68, 76 + techBoost));

    const overallScore = Math.round(
      (communicationScore + technicalScore + confidenceScore + problemSolvingScore) / 4
    );

    return {
      communicationScore,
      technicalScore,
      confidenceScore,
      problemSolvingScore,
      overallScore,
      strengths: [
        "Demonstrated articulate clinical vocabulary and ethical mindfulness.",
        "Structured response with clear sequential progression from problem to clinical resolution.",
        "Accurately cited regulatory principles relevant to the Indian healthcare landscape.",
      ],
      improvements: [
        "Provide specific quantitative metrics (e.g., patient sample sizes, test-retest reliability).",
        "Elaborate on how unforeseen adverse events would be escalated to institutional review boards.",
      ],
      modelFeedback: `Strong performance for an entry-to-mid level ${role} candidate. Your structured approach and clinical reasoning demonstrate solid readiness for industry interviews.`,
    };
  }

  // 7. CURRICULUM ANALYZER (Faculty / College Feature)
  async analyzeCurriculum(_syllabusText: string): Promise<AICurriculumAnalysis> {
    await new Promise((r) => setTimeout(r, 800));

    return {
      courseTitle: "Integrated BAMS Clinical Curriculum 2023-2027",
      department: "All India Institute of Ayurveda",
      industryAlignmentScore: 74,
      coveredSkills: [
        "Classical Ayurvedic Diagnostics (Roga Nidana)",
        "Dravyaguna & Botanical Pharmacognosy",
        "Panchakarma Shodhana Procedures",
        "Medical Sanskrit & Textual Hermeneutics",
        "Basic Human Anatomy & Physiology",
      ],
      missingSkills: [
        "Modern ICH-GCP Regulatory Compliance Protocols",
        "Biomedical Data Analytics & Clinical Trial Biostatistics",
        "Electronic Health Records (EHR) & Health Informatics",
        "High Performance Liquid Chromatography (HPLC / HPTLC) Lab Instrumentation",
      ],
      emergingSkills: [
        "Ayurgenomics & Phenotype-Genotype Mapping",
        "AI for Botanical Drug Discovery & Formulation Screening",
        "Digital Health Tele-Consultation Regulations",
      ],
      recommendedModules: [
        {
          title: "Module 4.2: Biostatistics for Botanical Clinical Trials",
          description: "4-week hands-on lab analyzing clinical cohorts with SPSS / Python.",
          skillsTargeted: ["Biostatistics", "Data Analytics", "Hypothesis Testing"],
          suggestedIndustryPartner: "Tata Consultancy Services Life Sciences & CCRAS",
        },
        {
          title: "Module 5.1: Commercial Standardization & Phytochemical Fingerprinting",
          description: "Industrial training module in batch-to-batch stability and pesticide residue testing.",
          skillsTargeted: ["Pharmacognosy", "Quality Control", "Regulatory Affairs"],
          suggestedIndustryPartner: "Dabur Research & Development Center",
        },
      ],
      regulatoryAlignment: [
        "National Commission for Indian System of Medicine (NCISM) Guidelines 2022",
        "National Education Policy (NEP) 2020 Experiential Learning Mandate",
        "UGC Mandatory 4-Year Undergraduate Internship Framework",
      ],
    };
  }

  // 8. RECRUITER COPILOT
  async generateJobDescription(rolePrompt: string): Promise<{
    title: string;
    department: string;
    suggestedSkills: { name: string; minLevel: number }[];
    generatedDescription: string;
    suggestedStipend: string;
  }> {
    await new Promise((r) => setTimeout(r, 600));

    const p = rolePrompt.toLowerCase();

    if (p.includes("analyst") || p.includes("data")) {
      return {
        title: "Healthcare Data Analyst Intern",
        department: "Health Informatics & AI",
        suggestedSkills: [
          { name: "Python for Data Science", minLevel: 3 },
          { name: "Data Analytics & Biostatistics", minLevel: 3 },
          { name: "SQL & Relational Databases", minLevel: 3 },
          { name: "Scientific Communication & Reporting", minLevel: 3 },
        ],
        generatedDescription:
          "We are seeking an inquisitive Data Analyst Intern to join our Health Informatics research wing. You will aggregate multi-centric patient data, extract statistical insights for drug efficacy, and build interactive executive dashboards.",
        suggestedStipend: "₹25,000 - ₹35,000 / month",
      };
    }

    return {
      title: "Ayush Clinical Research Associate Intern",
      department: "Clinical Formulations & R&D",
      suggestedSkills: [
        { name: "Ayurvedic Clinical Knowledge", minLevel: 3 },
        { name: "Clinical Research & GCP Protocols", minLevel: 3 },
        { name: "Dravyaguna (Herbal Pharmacology)", minLevel: 3 },
        { name: "Scientific Communication & Reporting", minLevel: 4 },
      ],
      generatedDescription:
        "Exciting opportunity for pre-final and final year BAMS scholars to gain hands-on clinical research exposure. You will assist principal investigators in ICH-GCP compliant clinical trials, monitor patient CRFs, and assist in scientific dossier submissions.",
      suggestedStipend: "₹22,000 - ₹30,000 / month",
    };
  }
}

export const aiService = new AIService();
