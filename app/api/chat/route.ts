import { OpenRouter } from "@openrouter/sdk";
import { findSimilarQuestions } from "@/lib/embeddings";
import { supabase } from "@/lib/supabase";

// Initialize OpenRouter (server-side only)
const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // or your deployed URL
    "X-Title": "Secure Telemedicine Prototype",
  },
});

async function checkForAnswer(question: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("answer")
    .eq("question", question)
    .limit(1)
    .single();

  if (error || !data) return null;
  return data.answer;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const question: string = body.message;

    if (!question) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400 }
      );
    }

    console.log("Received question:", question);

    // 1️⃣ NLP semantic retrieval (AI decision support)
    const similarQuestion = await findSimilarQuestions(question);
    if (similarQuestion) {
      return new Response(
        JSON.stringify({
          response: similarQuestion.answer,
          source: "semantic_retrieval",
        }),
        { status: 200 }
      );
    }

    // 2️⃣ Staff-curated knowledge
    const staffAnswer = await checkForAnswer(question);
    if (staffAnswer) {
      return new Response(
        JSON.stringify({
          response: staffAnswer,
          source: "clinical_knowledge",
        }),
        { status: 200 }
      );
    }

    // 3️⃣ OpenRouter LLM fallback (FREE / multi-provider)
    const completion = await openRouter.chat.send({
      model: "openai/gpt-3.5-turbo", 
      // You can also try:
      // "meta-llama/llama-3-8b-instruct"
      // "mistralai/mistral-7b-instruct"

      messages: [
        {
          role: "system",
          content:
            "You are a medical decision-support assistant. Provide safe, non-diagnostic, informational responses only. Do not prescribe medication or give definitive diagnoses.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      stream: false,
    });

    const answer = completion.choices[0]?.message?.content;

    if (!answer) {
      throw new Error("Empty response from OpenRouter");
    }

    return new Response(
      JSON.stringify({
        response: answer,
        source: "openrouter_llm",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
      }),
      { status: 500 }
    );
  }
}
