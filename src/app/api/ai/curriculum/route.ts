import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";

export async function POST(request: NextRequest) {
  try {
    const { syllabusText } = await request.json();
    const result = await aiService.analyzeCurriculum(syllabusText || "Standard College Syllabus");
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Curriculum analysis error:", error);
    return NextResponse.json(
      { error: "Error analyzing curriculum" },
      { status: 500 }
    );
  }
}
