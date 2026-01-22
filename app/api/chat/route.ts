import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { findSimilarQuestions } from "@/lib/embeddings";
import { supabase } from "@/lib/supabase";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string = body.message;

    if (!question) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("Received question:", question);

    // 1️⃣ Check vector DB (previous staff answers)
    const similar = await findSimilarQuestions(question);
    if (similar) {
      return NextResponse.json({
        response: similar.answer,
        source: "database",
      });
    }

    // 2️⃣ OpenRouter AI fallback
    const completion = await openRouter.chat.send({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant. Do not give a diagnosis. Provide safe, general medical guidance and suggest consulting a professional when appropriate.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({
      response: answer,
      source: "openrouter",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
