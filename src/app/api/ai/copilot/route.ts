import { NextRequest, NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";
import { PRIMARY_STUDENT_PROFILE } from "@/lib/data-store";

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await aiService.askCopilot(query, PRIMARY_STUDENT_PROFILE);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Copilot error:", error);
    return NextResponse.json(
      { error: "Error processing query" },
      { status: 500 }
    );
  }
}
