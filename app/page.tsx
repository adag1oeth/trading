"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Lock } from "lucide-react";

// Define the Message interface
interface Message {
  role: "user" | "assistant";
  content: string;
}

async function formatTokenAmount(str: string): Promise<string> {
  // Early return if the string contains a 0x address
  if (str.includes("0x")) {
    return str;
  }

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
    } catch (error) {
      console.warn(
        "Error formatting amount:",
        error instanceof Error ? error.message : "Unknown error"
      );
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
        content:
          "How can I help you today? I can:\n\n1. Check balances & execute swaps\n2. Bridge tokens between chains\n3. Use ETH/Base/Arbitrum",
      },
    ];
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("chat-token");
      console.log("Retrieved token:", token);

      if (token) {
        try {
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();
          console.log("Verification response:", data);

          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("chat-token");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Verification error:", error);
          localStorage.removeItem("chat-token");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const formattedInput = await formatTokenAmount(input);
      const newMessage: Message = { role: "user", content: formattedInput };

      // Update messages state with the new user message
      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      // Send both the input and message history to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: formattedInput,
          messages,
        }),
      });

      // First get the response as text
      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      // Try to parse as JSON, if fails use the text directly
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        console.warn(
          "JSON parsing error:",
          error instanceof Error ? error.message : "Unknown error"
        );
        data = { message: responseText };
      }
      console.log("Processed API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send message");
      }

      // More flexible response handling
      let responseContent;
      if (data.result) {
        responseContent = data.result;
      } else if (data.message) {
        responseContent = data.message;
      } else if (typeof data === "string") {
        responseContent = data;
      } else {
        responseContent = JSON.stringify(data);
      }

      const formattedResponse = await formatTokenAmount(responseContent);

      const assistantMessage: Message = {
        role: "assistant",
        content: formattedResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Full error details:", error);
      let errorMessage = "An unexpected error occurred";

      // Enhanced wallet error handling
      if (error instanceof Error) {
        if (error.message.includes("User rejected")) {
          errorMessage =
            "Transaction cancelled - user rejected the wallet connection";
        } else if (error.message.includes("Wallet not connected")) {
          errorMessage = "Please connect your wallet first";
        } else if (error.message.includes("User denied")) {
          errorMessage = "Transaction cancelled - user denied the request";
        } else if (error.message.includes("timeout")) {
          errorMessage = "Request timed out - please try again";
        } else {
          errorMessage = error.message;
        }
      }

      // Add error message to chat
      const errorResponse: Message = {
        role: "assistant",
        content: `⚠️ ${errorMessage}`,
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
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
        if (response.status === 429) {
          throw new Error(
            "Too many attempts. Please wait 5 minutes before trying again."
          );
        }
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("chat-token", data.token);
      setIsAuthenticated(true);

      // Add confetti effect on successful login
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        {!isAuthenticated ? (
          <div className="flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">
            <div className="glass-card p-4 md:p-8 w-full max-w-md mt-[0px] md:mt-[-100px]">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 mx-auto mb-4 text-neon-pink" />
                <h2 className="text-2xl font-bold gradient-text">
                  Enter Password
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

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full button-gradient px-6 py-3"
                >
                  {isLoading ? "Authenticating..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="max-w-6xl mx-auto w-full px-4 flex flex-col flex-1">
              {/* Header Section */}
              <div className="text-center mb-3">
                <div className="mb-2 animate-fade-in">
                  <span className="px-3 py-1 bg-electric-purple/10 rounded-full border border-electric-purple/20 text-electric-purple text-xs font-medium">
                    GIGABRAIN-Powered Trading
                  </span>
                </div>

                {/* Images and Labels - Hidden on Mobile */}
                <div className="hidden md:flex justify-center items-center gap-4 mb-3 animate-fade-in-delay">
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

              {/* Social Links Section - hidden on mobile */}
              <div className="hidden md:flex justify-center gap-4 mb-3 animate-fade-in-delay">
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
                  href="https://soulagents.io/cryptobunny/"
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
                  <span className="text-sm text-neon-green">
                    Chat with Bunny
                  </span>
                </a>
              </div>

              {/* Warning Card - Hidden on Mobile */}
              <div className="hidden md:block glass-card p-3 border-yellow-500/20 animate-fade-in-delay mb-3">
                <p className="text-yellow-300/80 text-sm text-center">
                  ⚠️ Not Financial Advice - Do Trades at Your Own Risk. Platform
                  provided as is with no external confirmation of its
                  performance.
                </p>
              </div>

              {/* Chat Container with Fixed Height */}
              <div className="flex flex-col flex-1 min-h-0 pb-32 md:pb-40">
                {/* Messages Area - Scrollable */}
                <div className="flex-1 overflow-hidden relative">
                  <div className="chat-container absolute inset-0">
                    <div
                      className="h-full p-3 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                      ref={messagesEndRef}
                    >
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          } space-x-3 animate-fade-in`}
                        >
                          {message.role === "assistant" && (
                            <div className="w-10 h-10 flex-shrink-0">
                              <Image
                                src="/cryptobunny.png"
                                alt="Crypto Bunny"
                                width={40}
                                height={40}
                                className="rounded-full object-cover ring-2 ring-pink-500/20 shadow-lg shadow-pink-500/10"
                              />
                            </div>
                          )}
                          <div
                            className={`max-w-[60%] p-4 rounded-2xl message-glow chat-shimmer ${
                              message.role === "user"
                                ? "chat-message chat-message-user"
                                : "chat-message chat-message-assistant"
                            }`}
                          >
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content.includes("https://") ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: message.content.replace(
                                      /\[here\]\((https:\/\/[^\)]+)\)/,
                                      (_, url) =>
                                        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-electric-purple hover:text-electric-purple/80 font-medium transition-colors duration-200 underline decoration-electric-purple/50 hover:decoration-electric-purple">here</a>`
                                    ),
                                  }}
                                />
                              ) : (
                                message.content
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <div className="w-10 h-10 flex-shrink-0">
                              <Image
                                src="/crypto-trader.png"
                                alt="User"
                                width={40}
                                height={40}
                                className="rounded-full object-cover ring-2 ring-violet-500/20 shadow-lg shadow-violet-500/10"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Input Area - Fixed at Bottom */}
                <div className="flex-shrink-0 mt-2">
                  <div className="flex items-center justify-between mb-2 overflow-hidden">
                    <div className="flex-1 mr-4 overflow-hidden">
                      <div className="animate-scroll text-sm">
                        SWAP 1 USDC to ETH on ARB • 🚀 WEN LAMBO SER!!! •
                        GIGABRAIN TRADING ACTIVATED!!! 🧠 • PUMP IT TO THE
                        MOON!!! 💎 • DEGEN APE STRONG!!! 🦍 • CHARTS ONLY GO
                        UP!!! 📈 • WAGMI!!! NO SLEEP TILL 100X!!! 🔥 • BEARS R
                        FUKD!!! 🚀 • FULL SEND MODE!!! 💪 • 🚀 WEN LAMBO SER!!!
                        • GIGABRAIN TRADING ACTIVATED!!! 🧠 • PUMP IT TO THE
                        MOON!!! 💎 • DEGEN APE STRONG!!! 🦍 • CHARTS ONLY GO
                        UP!!! 📈 • WAGMI!!! NO SLEEP TILL 100X!!! 🔥 • BEARS R
                        FUKD!!! 🚀 • FULL SEND MODE!!! 💪 • SWAP 0.001 ETH to
                        USDC on ARB •
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Swap 1 USDC to ETH on Arb"
                      className="w-full pr-24"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 chat-button px-4 py-1.5 text-sm"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing</span>
                        </span>
                      ) : (
                        "Chat"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
