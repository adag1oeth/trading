import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log('Starting chat request...');
    
    const { input } = await req.json();
    console.log('Input received:', { input });
    
    // Validate environment variables with proper TypeScript syntax
    const requiredEnvVars = {
      BRIAN_API_KEY: !!process.env["BRIAN_API_KEY"],
      API_KEY_OPENAI: !!process.env["API_KEY_OPENAI"],
      AGENT_PRIVATE_KEY: !!process.env["AGENT_PRIVATE_KEY"]
    };
    console.log('Environment variables status:', requiredEnvVars);

    // Validate input
    if (!input) {
      console.log('Input validation failed');
      return new Response(
        JSON.stringify({ error: 'Input is required' }),
        { status: 400 }
      );
    }

    // Log before API call
    console.log('Preparing to call external API...');

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
      result: formattedResult,
    });

  } catch (error) {
    // Detailed error logging
    console.error('Chat error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown type',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      // If error is from API response
      status: error instanceof Response ? error.status : 'Not a Response',
      statusText: error instanceof Response ? error.statusText : 'Not a Response'
    });

    // Return detailed error for debugging
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        type: error instanceof Error ? error.constructor.name : 'Unknown type'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
