"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";

export default function HeroSection() {
  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3 * 1000;
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

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-24 sm:pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-purple/10 to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <span className="px-3 sm:px-4 py-2 bg-electric-purple/10 rounded-full border border-electric-purple/20 text-electric-purple text-xs sm:text-sm font-medium whitespace-nowrap">
              Revolutionizing Community Engagement
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold mb-6 gradient-text tracking-tight leading-tight animate-fade-in">
            Soul Agents
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in-delay">
            Next Generation AI Agents for your community
          </p>

          <div className="flex justify-center items-center gap-4 mb-12 relative animate-fade-in-delay">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-electric-purple to-transparent rounded-full blur opacity-50"></div>
              <a
                href="https://x.com/cryptobunny__"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/placeholder-avatar2.png"
                  alt="Community"
                  className="relative w-24 h-24 sm:w-48 sm:h-48 rounded-full border-2 border-electric-purple"
                />
              </a>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full border border-electric-purple/30">
                <span className="text-sm text-electric-purple">Community</span>
              </div>
            </div>

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/40 border border-white/20 flex items-center justify-center">
              <span className="text-xl sm:text-2xl">⚡️</span>
            </div>

            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-l from-neon-pink to-transparent rounded-full blur opacity-50"></div>
              <a
                href="https://x.com/soul_agents"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/trading-ai-avatar.png"
                  alt="Trading"
                  className="relative w-24 h-24 sm:w-48 sm:h-48 rounded-full border-2 border-neon-pink"
                />
              </a>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full border border-neon-pink/30">
                <span className="text-sm text-neon-pink">Trading</span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 mb-12 animate-fade-in-delay">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-wrap justify-center gap-3 text-lg text-white/80">
                <span>Automate interactions</span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span>Build presence</span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span>Connect with key players</span>
              </div>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="text-sm uppercase tracking-wider text-white/60">
                Trusted by Web3 Leaders
              </p>
            </div>
          </div>
          <div className="animate-fade-in-delay-2">
            <Link
              href="/deck"
              className="button-gradient inline-flex items-center gap-2 px-8 py-6 text-lg font-bold text-white 
                       hover:opacity-90 transition-all transform hover:scale-105 
                       shadow-lg shadow-neon-pink/20 hover:shadow-electric-purple/30"
            >
              <span>Get Access</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
