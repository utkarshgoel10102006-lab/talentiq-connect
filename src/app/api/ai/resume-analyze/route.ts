import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    const resumeText = text || "Ayurvedic clinical researcher BAMS AIIA Delhi GCP trials and biostatistics.";
    const analysis = await aiService.analyzeResume(resumeText);
    const extractedSkills = await aiService.extractSkillsFromResume(resumeText);

    return NextResponse.json({
      analysis,
      extractedSkills,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json(
      { error: "Error analyzing resume" },
      { status: 500 }
    );
  }
}
