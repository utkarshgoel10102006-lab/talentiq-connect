import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";

export async function POST(request: NextRequest) {
  try {
    const { question, answer, role } = await request.json();
    if (!answer) {
      return NextResponse.json({ error: "Answer is required" }, { status: 400 });
    }

    const evaluation = await aiService.evaluateInterview(
      question || "Clinical design question",
      answer,
      role || "Clinical Research Associate"
    );

    return NextResponse.json({ evaluation });
  } catch (error) {
    console.error("Interview evaluation error:", error);
    return NextResponse.json(
      { error: "Error evaluating interview answer" },
      { status: 500 }
    );
  }
}
