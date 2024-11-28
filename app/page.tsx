"use client";

import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

// Define the Message interface
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Add this helper function at the top level
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [{
    role: "assistant",
    content: "Hi! I'm your trading assistant. How can I help you today?",
    timestamp: new Date(),
  }]);

  useEffect(() => {
    // Initial confetti effect
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 2,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ["#9333EA", "#EC4899"], // electric-purple and neon-pink
        disableForReducedMotion: true,
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const brianApiKey = process.env["BRIAN_API_KEY"];
      const agentPrivateKey = process.env["AGENT_PRIVATE_KEY"];
      const openAiKey = process.env["API_KEY_OPENAI"];

      if (!brianApiKey || !agentPrivateKey || !openAiKey) {
        throw new Error("Missing required API keys");
      }

      const agent = await createBrianAgent({
        apiKey: brianApiKey,
        privateKeyOrAccount: agentPrivateKey as `0x${string}`,
        llm: new ChatOpenAI({
          apiKey: openAiKey,
          temperature: 0,
        }),
      });

      const result = await agent.invoke({
        input: input,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: result["output"] as string,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Trading error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error while processing your request.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add keyboard handler
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-electric-purple/5 to-black p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="max-w-4xl mx-auto space-y-8 pt-24 relative">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="mb-8 animate-fade-in">
            <span className="px-4 py-2 bg-electric-purple/10 rounded-full border border-electric-purple/20 text-electric-purple text-sm font-medium">
              GIGABRAIN-Powered Trading
            </span>
          </div>

          <div className="flex justify-center items-center gap-8 mb-12 animate-fade-in-delay">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-purple to-transparent rounded-full blur opacity-50"></div>
              <Image
                src="/cryptobunny.png"
                alt="Crypto Bunny"
                width={120}
                height={120}
                className="relative rounded-full border-2 border-electric-purple hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full border border-electric-purple/30">
                <span className="text-sm text-electric-purple">
                  Crypto Bunny
                </span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-full bg-black/40 border border-white/20 flex items-center justify-center">
              <span className="text-2xl">⚡️</span>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-l from-neon-pink to-transparent rounded-full blur opacity-50"></div>
              <Image
                src="/crypto-trader.png"
                alt="Trading AI"
                width={120}
                height={120}
                className="relative rounded-full border-2 border-neon-pink hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full border border-neon-pink/30">
                <span className="text-sm text-neon-pink">Trading AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="flex justify-center gap-6 mb-8 animate-fade-in-delay">
          <a
            href="https://x.com/soul_agents"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-2 hover:scale-105 transition-all duration-200"
          >
            <span className="text-sm text-electric-purple">
              GIGABRAIN Creators
            </span>
          </a>
          <a
            href="https://x.com/cryptobunny__"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-2 hover:scale-105 transition-all duration-200"
          >
            <span className="text-sm text-neon-pink">Crypto Bunny</span>
          </a>
          <a
            href="https://t.me/soul_agents"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-2 hover:scale-105 transition-all duration-200"
          >
            <span className="text-sm text-aqua-blue">Announcements</span>
          </a>
          <a
            href="https://t.me/cryptobunnyagent"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-4 py-2 hover:scale-105 transition-all duration-200"
          >
            <span className="text-sm text-neon-green">Chat with Bunny</span>
          </a>
        </div>

        {/* Warning Card */}
        <div className="glass-card p-6 border-yellow-500/20 animate-fade-in-delay">
          <p className="text-yellow-300/80 text-sm text-center">
            ⚠️ Not Financial Advice - Do Trades at Your Own Risk. Platform
            provided as is with no external confirmation of its performance.
        
          </p>
        </div>

        {/* Trading Interface */}
        <div className="glass-card p-8 space-y-6 animate-fade-in-delay-2">
          {/* Messages Area */}
          <div className="space-y-4 h-[400px] overflow-y-auto mb-4 p-4 bg-black/20 rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } space-x-2`}
              >
                {message.role === "assistant" && (
                  <div className="w-12 h-12 flex-shrink-0">
                    <Image
                      src="/cryptobunny.png"
                      alt="Crypto Bunny"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-electric-purple/20 text-white"
                      : "bg-neon-pink/20 text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-white/50 mt-1 block">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-12 h-12 flex-shrink-0">
                    <Image
                      src="/crypto-trader.png"
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="tradingPrompt" className="text-white/80 text-sm">
                What would you like to trade?
              </label>
              <textarea
                id="tradingPrompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Swap 100 USDC for ETH on Base"
                className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-white resize-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple"
              />
            </div>

            {/* Buttons */}
            <div className="flex">
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full button-gradient px-6 py-3 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Chat"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
