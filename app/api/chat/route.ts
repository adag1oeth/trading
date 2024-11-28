import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Validate input
    const body = await req.json();
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: "Invalid input provided" },
        { status: 400 }
      );
    }

    const brianApiKey = process.env["BRIAN_API_KEY"];
    const agentPrivateKey = process.env["AGENT_PRIVATE_KEY"];
    const openAiKey = process.env["API_KEY_OPENAI"];

    if (!brianApiKey || !agentPrivateKey || !openAiKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const formattedPrivateKey = agentPrivateKey.startsWith("0x")
      ? agentPrivateKey
      : `0x${agentPrivateKey}`;

    const agent = await createBrianAgent({
      apiKey: brianApiKey,
      privateKeyOrAccount: formattedPrivateKey as `0x${string}`,
      llm: new ChatOpenAI({
        apiKey: openAiKey,
        temperature: 0,
      }),
    });

    const result = await agent.invoke({
      input: input,
    });

    // Format the result before sending to client
    let formattedResult;
    if (typeof result === "string") {
      formattedResult = result;
    } else if (result && typeof result === "object") {
      formattedResult = result.output || JSON.stringify(result);
    } else {
      throw new Error("Unexpected response format from agent");
    }

    return NextResponse.json({ 
      result: formattedResult 
    });
  } catch (error) {
    console.error("Chat API error:", error instanceof Error ? error.message : "Unknown error");
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
