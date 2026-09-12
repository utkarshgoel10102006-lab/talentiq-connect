# TalentIQ Connect — Portal for Academia–Industry Collaboration

> **“From Skills to Opportunities — One Intelligent Academia–Industry Ecosystem”**

**Smart India Hackathon 2026** &bull; Problem Statement: **SIH26044**  
**Organization:** Ministry of Ayush &bull; **Department:** All India Institute of Ayurveda (AIIA)  
**Category:** Software &bull; **Theme:** Smart Automation  

---

## 🏆 Project Overview

**TalentIQ Connect** is a national-scale **Academia–Industry Talent Intelligence Operating System**. It solves the persistent disconnect between student education, industry competency requirements, collegiate curriculum development, and national policy planning.

### The Core Differentiator:
Unlike commercial job portals (LinkedIn, Internshala, Naukri) that treat candidates as static keyword resumes:
1. **Every student gets a living, evidence-backed Skill Digital Twin** with multidimensional skill radars and explainable readiness scores.
2. **Every opportunity is matched using an explainable AI score** (`0.6 × Skill Match + 0.2 × Proficiency + 0.1 × Eligibility + 0.1 × Preference`).
3. **Internship outcomes feed back into the curriculum** via TPO Skill Gap Heatmaps and the AI Curriculum Analyzer, closing the loop.

---

## ⚡ 5-Minute SIH Demo Presentation Script

| Step | Persona | Action / Screen | What the Jury Sees |
| :--- | :--- | :--- | :--- |
| **1** | Student | Landing Page &rarr; Quick Login as Student | Seamless sign-in as **Priya Sharma (BAMS 3rd Year, AIIA New Delhi)** |
| **2** | Student | **My Skill Twin** (`/student/skill-twin`) | Multidimensional skill radar, 8 competencies with DigiLocker verification, and **"Why is my score 78%?"** explainable formula |
| **3** | Student | **AI Resume Analyzer** (`/student/resume-analyzer`) | Click "Extract Skills & Score Resume" &rarr; Multi-pass NLP extracts structured skill objects and ATS upgrade tips |
| **4** | Student | **Skill Gap Analyzer** (`/student/skill-gap`) | Direct side-by-side gap matrix vs. Clinical Research Associate benchmark with recommended SWAYAM bridge courses |
| **5** | Student | **AI Career GPS** (`/student/career-gps`) | Dynamic 5-month milestone trajectory; checking items recalculates readiness velocity |
| **6** | Student | **Matched Opportunities** (`/student/opportunities`) | Inspect **92% Match** on Dabur Clinical Research Internship &rarr; Click "Why 92%?" to view formula breakdown &rarr; Click Apply with instant confetti |
| **7** | Student | **Applications & Lifecycle** (`/student/applications`) | Closed-loop tracking: Milestone sign-offs, employer ratings (4.8/5.0), and **+1 automatic skill promotion transferred to Academic Bank of Credits (ABC)** |
| **8** | Student | **AI Mock Interviewer** (`/student/interview`) | Practice clinical GCP questions with real-time AI scoring across Communication, Technical Rigor, Confidence & Problem Solving |
| **9** | Student | **TalentIQ Floating Copilot** (Bottom Right) | RAG-backed assistant answering career queries using Ministry of Ayush & AICTE guidelines without hallucinations |
| **10** | Industry | Top Navbar &rarr; Role Switch: **Industry Hub** (`/industry`) | **Dr. Arvind Swaminathan (Dabur R&D)** views AI-Ranked Candidates (#1 Priya 96% fit) and generates JDs using Recruiter Copilot |
| **11** | TPO | Top Navbar &rarr; Role Switch: **TPO Command** (`/tpo`) | **Prof. Rajeshwar Kulkarni** views Institutional Skill Gap Heatmap (🟢🟡🔴) and deploys AI-recommended Biostatistics bridge programs |
| **12** | Govt | Top Navbar &rarr; Role Switch: **National Dashboard** (`/government`) | **Smt. Sunita Deshmukh, IAS** reviews 640+ onboarded colleges, supply vs. demand deficit charts, and AYUSH sector velocity |
| **13** | Faculty | Top Navbar &rarr; Role Switch: **Faculty & Curriculum** (`/faculty`) | **Dr. Ananya Mukherjee** pastes syllabus into **AI Curriculum Analyzer** &rarr; benchmarks against market demand |

---

## 🔑 Demo Login Credentials

All demo accounts share the password: `demo123456`

- **Student:** `student@demo.com` (Priya Sharma, BAMS, AIIA New Delhi)
- **Industry / Recruiter:** `industry@demo.com` (Dr. Arvind Swaminathan, Dabur India Healthcare & R&D)
- **TPO Placement Officer:** `tpo@demo.com` (Prof. Rajeshwar Kulkarni, Training & Placement Cell)
- **Government / Ministry Admin:** `government@demo.com` (Smt. Sunita Deshmukh, IAS, Ministry of Ayush)
- **Faculty:** `faculty@demo.com` (Dr. Ananya Mukherjee, Dravyaguna Department)

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **UI System:** shadcn/ui custom variant tokens (Card, Dialog, Tabs, Badge, Button, Input)
- **Visual Analytics:** Recharts (Radar charts, Line trajectories, Bar supply-demand, Sector pie charts)
- **Security & Auth:** Edge-compatible JWT signed with native Web Crypto API (`crypto.subtle` HMAC-SHA256)
- **AI Service Engine:** Multi-service abstraction (`ai-service.ts`) with deterministic RAG knowledge base for zero-hallucination demo reliability
- **Trust Layer:** Simulated verification integration with DigiLocker, Academic Bank of Credits (ABC), and APAAR IDs
- **AYUSH Taxonomy:** Native support for Dravyaguna, Rasashastra, Panchakarma, Sanskrit textology, and clinical Ayurgenomics

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build
npm run start
```
Visit `http://localhost:3000` to launch the platform.
