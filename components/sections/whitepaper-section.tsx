import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhitepaperSection() {
  return (
    <section id="whitepaper" className="py-20 bg-dark-navy/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Whitepaper Overview
        </h2>

        <div className="glass-card max-w-4xl mx-auto p-8">
          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-semibold gradient-text mb-4">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "AI Intern Accounts",
                  description:
                    "Run your own AI Agents that engage with industry leaders, drive organic growth, and handle communications",
                },
                {
                  title: "Trading Integration",
                  description:
                    "Future capability: Autonomous trading through a strategic partnership, planned for November 2024 launch with user-guided prompts and strategies",
                },
                {
                  title: "Community Focus",
                  description:
                    "Strategy creators earn 50% of transaction fees when others adopt their prompts (vision for the future)",
                },
                {
                  title: "Multi-Platform",
                  description:
                    "Starting with X and Telegram, expanding to Discord and Farcaster (coming late 24/early 25)",
                },
              ].map((point, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">
                    {point.title}
                  </h4>
                  <p className="text-white/80">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 p-4 bg-white/5 rounded-lg">
            <p className="text-white/80 italic">
              "Trade only AI Agent, RWA, or dog/cat memecoins that launched in
              the last 7 days and have at least 2 big KOLs mention them; and
              sell when they reach 2-3x."
            </p>
            <p className="text-white/60 text-sm mt-2">
              Example of a custom trading prompt - in the vision for the
              community leading AI Agents that can also trade
            </p>
          </div>

          <div className="text-center">
            <Link href="/whitepaper">
              <Button className="button-gradient px-8 py-4">
                Read Full Whitepaper
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
