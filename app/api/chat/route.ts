import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const { BRIAN_API_KEY, AGENT_PRIVATE_KEY, API_KEY_OPENAI } = process.env;

    if (!BRIAN_API_KEY || !AGENT_PRIVATE_KEY || !API_KEY_OPENAI) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const formattedPrivateKey = AGENT_PRIVATE_KEY.startsWith("0x")
      ? AGENT_PRIVATE_KEY
      : `0x${AGENT_PRIVATE_KEY}`;

    const agent = await createBrianAgent({
      apiKey: BRIAN_API_KEY,
      privateKeyOrAccount: formattedPrivateKey as `0x${string}`,
      llm: new ChatOpenAI({
        apiKey: API_KEY_OPENAI,
        temperature: 0,
      }),
    });

    const result = await agent.invoke({ input });
    const formattedResult =
      typeof result === "string"
        ? result
        : result?.output || JSON.stringify(result);

    return NextResponse.json({ result: formattedResult });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
