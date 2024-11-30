import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

// Set timeout for the API route
export const maxDuration = 300; // 5 minutes in seconds
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const privateKey = process.env["AGENT_PRIVATE_KEY"]!;
    const formattedPrivateKey = privateKey.startsWith("0x")
      ? privateKey
      : `0x${privateKey}`;

    // Create basic agent with timeout
    const agent = await createBrianAgent({
      apiKey: process.env["BRIAN_API_KEY"]!,
      privateKeyOrAccount: formattedPrivateKey as `0x${string}`,
      llm: new ChatOpenAI({
        apiKey: process.env["API_KEY_OPENAI"]!,
        modelName: "gpt-4o",
        temperature: 0.7,
        maxTokens: 4096,
        timeout: 240000,
      }),
    });

    // Add timeout to the invoke call
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 240000)
    );

    const result = await Promise.race([
      agent.invoke({ input }),
      timeoutPromise
    ]);

    return NextResponse.json({ 
      result: result.output,
      message: "If you submitted a transaction, it may still be processing even if this request times out. You can check your wallet or block explorer for confirmation."
    });
  } catch (error) {
    console.error("Detailed error:", error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred";
      
    // Special handling for timeout errors
    if (errorMessage.includes("timeout")) {
      return NextResponse.json(
        { 
          error: "The request timed out, but if you submitted a transaction, it may still be processing. Please check your wallet or block explorer for confirmation.",
          status: "TIMEOUT_BUT_TX_MAY_BE_PROCESSING"
        },
        { status: 504 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
