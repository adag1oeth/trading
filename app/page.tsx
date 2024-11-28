"use client";

import { createBrianAgent } from "@brian-ai/langchain";
import { ChatOpenAI } from "@langchain/openai";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Lock } from "lucide-react";
import jwt from "jsonwebtoken";
import { Navbar } from "@/components/ui/navbar";

// Define the Message interface
interface Message {
  role: "user" | "assistant";
  content: string;
}

async function formatTokenAmount(str: string): Promise<string> {
  const tokenPattern = /(\d*\.?\d+)\s*([A-Z]+)(?:\s+on\s+([A-Za-z]+))?/g;
  let result = str;

  const matches = Array.from(str.matchAll(tokenPattern));

  for (const [fullMatch, amount, token] of matches) {
    if (!amount || !token) continue;

    try {
      const numericAmount = parseFloat(amount);
      let formattedAmount: string;

      if (token === "ETH") {
        formattedAmount = numericAmount.toFixed(18);
        const [whole, decimal] = formattedAmount.split(".");
        if (decimal) {
          formattedAmount = `${whole}.${decimal.slice(0, 6)}`;
        }
      } else if (token === "USDC") {
        formattedAmount = numericAmount.toFixed(6);
        formattedAmount = formattedAmount.replace(/\.?0+$/, "");
      } else {
        formattedAmount = numericAmount.toFixed(18);
        formattedAmount = formattedAmount.replace(/\.?0+$/, "");
      }

      formattedAmount = formattedAmount.replace(/\.+/g, ".");

      result = result.replace(fullMatch, `${formattedAmount} ${token}`);
    } catch {
      console.warn("Error formatting amount");
    }
  }

  return result;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        role: "assistant",
        content: "Hi! I'm your trading assistant. How can I help you today?",
      },
    ];
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("deck-token");
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env["JWT_SECRET"] || "");
        if (decoded) {
          setIsAuthenticated(true);
        }
      } catch {
        localStorage.removeItem("deck-token");
        setIsAuthenticated(false);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll only the chat container
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement;
      chatContainer?.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Log the entire process.env to see what's available
      console.log("All env vars:", process.env);

      const brianApiKey = process.env["NEXT_PUBLIC_BRIAN_API_KEY"];
      const agentPrivateKey = process.env["NEXT_PUBLIC_AGENT_PRIVATE_KEY"];
      const openAiKey = process.env["NEXT_PUBLIC_API_KEY_OPENAI"];

      // Log the actual values (be careful with this in production!)
      console.log("API Keys:", {
        brianKey: brianApiKey,
        agentKey: agentPrivateKey,
        openAiKey: openAiKey,
      });

      if (!brianApiKey || !agentPrivateKey || !openAiKey) {
        throw new Error(
          `Missing API keys: ${!brianApiKey ? "BRIAN_API_KEY " : ""}${!agentPrivateKey ? "AGENT_PRIVATE_KEY " : ""}${!openAiKey ? "API_KEY_OPENAI" : ""}`
        );
      }

      // Ensure private key is properly formatted
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

      console.log("Raw response:", result);

      let responseContent: string;
      if (typeof result === "string") {
        responseContent = await formatTokenAmount(result);
      } else if (result && typeof result === "object") {
        if ("output" in result) {
          if (typeof result.output === "string") {
            responseContent = await formatTokenAmount(result.output);
          } else {
            responseContent = await formatTokenAmount(
              JSON.stringify(result.output)
            );
          }
        } else {
          responseContent = await formatTokenAmount(JSON.stringify(result));
        }
      } else {
        responseContent = "Unexpected response format";
      }

      console.log("Processed response:", responseContent);

      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      console.error("Trading error:", _error);
      console.log("Full error:", _error);

      const errorMessage =
        "I encountered an error while processing your request. Please try again.";

      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.content !== errorMessage) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorMessage,
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update the handleKeyPress function
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("deck-token", data.token);
      setIsAuthenticated(true);

      // Add confetti effect on successful login
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-electric-purple/5 to-black">
      <Navbar />
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <form onSubmit={handleLogin} className="space-y-4 glass-card p-6">
              <div className="flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-electric-purple animate-pulse" />
              </div>
              <div className="text-center space-y-2 mb-4">
                <h2 className="text-2xl font-bold gradient-text">
                  Soul Agents
                </h2>
                <p className="text-white/70 text-sm">
                  To access, please contact us:
                </p>
                <div className="flex flex-col gap-1 text-sm">
                  <a
                    href="https://t.me/soul_agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Telegram:</span>
                    <span className="gradient-text">@soul_agents</span>
                  </a>
                  <a
                    href="https://t.me/cryptobunnyagent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Bunny Chat:</span>
                    <span className="gradient-text">@cryptobunnyagent</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-electric-purple focus:ring-1 focus:ring-electric-purple outline-none"
                />
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full button-gradient px-6 py-3 disabled:opacity-50"
                >
                  {isLoading ? "Authenticating..." : "Authenticate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="pt-24 pb-6 min-h-screen flex flex-col">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto w-full px-4 flex flex-col flex-1">
            {/* Header Section */}
            <div className="text-center mb-6">
              <div className="mb-4 animate-fade-in">
                <span className="px-3 py-1.5 bg-electric-purple/10 rounded-full border border-electric-purple/20 text-electric-purple text-xs font-medium">
                  GIGABRAIN-Powered Trading
                </span>
              </div>

              <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in-delay">
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
            <div className="glass-card p-6 border-yellow-500/20 animate-fade-in-delay mb-6">
              <p className="text-yellow-300/80 text-sm text-center">
                ⚠️ Not Financial Advice - Do Trades at Your Own Risk. Platform
                provided as is with no external confirmation of its performance.
              </p>
            </div>

            {/* Messages Area - Add scrolling container */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div
                className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-4"
                ref={messagesEndRef}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } space-x-3`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-10 h-10 flex-shrink-0">
                        <Image
                          src="/cryptobunny.png"
                          alt="Crypto Bunny"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[60%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-electric-purple/20 text-white"
                          : "bg-neon-pink/20 text-white"
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-10 h-10 flex-shrink-0">
                        <Image
                          src="/crypto-trader.png"
                          alt="User"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Swap 100 USDC for ETH on Base"
                  className="w-full h-16 bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-white resize-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple"
                />
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="w-full button-gradient px-6 py-3 text-sm disabled:opacity-50"
                  >
                    {isLoading ? "Processing..." : "Chat"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
