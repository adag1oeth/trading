import { Twitter, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-dark-navy/30 relative overflow-hidden"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-electric-purple/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-neon-pink/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-electric-purple/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 gradient-text animate-fade-in">
          Get in Touch
        </h2>
        <div className="glass-card max-w-xl mx-auto p-8 animate-fade-in-up hover:border-electric-purple/50 transition-all duration-500 hover:shadow-2xl hover:shadow-electric-purple/20">
          <div className="text-center space-y-8">
            <p className="text-xl font-bold text-white/90 animate-fade-in-delay">
              Connect with us directly:
            </p>
            <div className="flex flex-col items-center space-y-4">
              <a
                href="https://x.com/soul_agents"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-[240px] flex items-center justify-center gap-3 px-6 py-3 rounded-xl 
                         bg-gradient-to-r from-transparent via-electric-purple/5 to-transparent
                         hover:via-electric-purple/10 border border-electric-purple/20 hover:border-electric-purple/40
                         transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Twitter className="w-5 h-5 text-electric-purple flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  @soul_agents
                </span>
              </a>
              <a
                href="https://x.com/adag1oeth"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-[240px] flex items-center justify-center gap-3 px-6 py-3 rounded-xl 
                         bg-gradient-to-r from-transparent via-electric-purple/5 to-transparent
                         hover:via-electric-purple/10 border border-electric-purple/20 hover:border-electric-purple/40
                         transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Twitter className="w-5 h-5 text-electric-purple flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  @adag1oeth
                </span>
              </a>
              <a
                href="https://t.me/adag1oeth"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full max-w-[240px] flex items-center justify-center gap-3 px-6 py-3 rounded-xl 
                         bg-gradient-to-r from-transparent via-electric-purple/5 to-transparent
                         hover:via-electric-purple/10 border border-electric-purple/20 hover:border-electric-purple/40
                         transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Send className="w-5 h-5 text-electric-purple flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  @adag1oeth
                </span>
              </a>
            </div>

            <div className="pt-8">
              <p className="text-white/90 text-xl mb-6 font-medium animate-fade-in-delay">
                Early adopter discounts available! 🚀
                <br />
                <span className="text-lg text-white/70">
                  Be among the first to deploy AI Agents for your project's X
                  and Telegram channels!
                </span>
              </p>
              <a
                href="https://forms.gle/zxe1hgrbL8rbTELL7"
                target="_blank"
                rel="noopener noreferrer"
                className="button-gradient inline-block px-8 py-4 rounded-xl font-bold text-white
                         hover:opacity-90 transition-all duration-300 transform hover:scale-105
                         shadow-lg shadow-electric-purple/20 hover:shadow-electric-purple/40"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
