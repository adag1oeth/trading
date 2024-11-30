import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

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

    const result = await agent.invoke({
      input: input,
    });

    return NextResponse.json({ result: result.output });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
