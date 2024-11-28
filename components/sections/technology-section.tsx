/* eslint-disable @typescript-eslint/no-unused-vars */
import { Code2 } from "lucide-react";

export default function TechnologySection() {
  return (
    <section id="technology" className="py-20 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy/50 via-electric-purple/10 to-dark-navy/50" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Floating orbs/particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-pink/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-electric-purple/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative">
        <h2 className="text-5xl font-bold text-center mb-16 gradient-text animate-fade-in">
          Technology Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* AI Framework Card */}
          <div className="glass-card p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-neon-pink/20 animate-fade-in-up">
            <div className="flex items-start mb-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-neon-pink/20 to-electric-purple/20 group-hover:from-neon-pink/30 group-hover:to-electric-purple/30 transition-all duration-300">
                <Code2 className="h-6 w-6 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold gradient-text mb-2">
                  AI Framework
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Advanced Context Understanding</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Long-term Memory Agent</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Cognitive Reasoning</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Sentiment Analysis Integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* X Integration Card */}
          <div
            className="glass-card p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-neon-pink/20 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-start mb-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-neon-pink/20 to-electric-purple/20 group-hover:from-neon-pink/30 group-hover:to-electric-purple/30 transition-all duration-300">
                <Code2 className="h-6 w-6 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold gradient-text mb-2">
                  X Integration
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Top Influencer Posts Analysis</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Smart Reply System</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Legitimate Account Interaction</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Post and DM Management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Telegram Integration Card */}
          <div
            className="glass-card p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-neon-pink/20 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-start mb-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-neon-pink/20 to-electric-purple/20 group-hover:from-neon-pink/30 group-hover:to-electric-purple/30 transition-all duration-300">
                <Code2 className="h-6 w-6 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold gradient-text mb-2">
                  Telegram Integration
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Community Moderation</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Cross-Platform Context Memory</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Knowledge Base Integration</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Automated Question Response</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Trading Capability Card */}
          <div
            className="glass-card p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-neon-pink/20 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex items-start mb-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-neon-pink/20 to-electric-purple/20 group-hover:from-neon-pink/30 group-hover:to-electric-purple/30 transition-all duration-300">
                <Code2 className="h-6 w-6 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold gradient-text mb-2">
                  Trading Capability
                </h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Future: Custom Strategy Execution</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Planned: Market Analysis Integration</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                    <span>Upcoming: Base (EVM) Integration</span>
                  </li>
                  <li className="flex items-center space-x-2 hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-purple" />
                    <span>Planned: Solana Integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
