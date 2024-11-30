import { NextResponse } from "next/server";
import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";

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

    // Create basic agent first
    const agent = await createBrianAgent({
      apiKey: process.env["BRIAN_API_KEY"]!,
      privateKeyOrAccount: formattedPrivateKey as `0x${string}`,
      llm: new ChatOpenAI({
        apiKey: process.env["API_KEY_OPENAI"]!,
        modelName: "gpt-4o",
        temperature: 0.7,
        maxTokens: 4096,
      }),
    });

    // The agent should have access to all tools by default
    const response = await agent.invoke({
      input,
    });

    return NextResponse.json({ result: response.output });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
