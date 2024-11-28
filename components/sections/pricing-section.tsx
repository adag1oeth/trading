import { Check } from "lucide-react";

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "499",
      period: "/month",
      description: "Single X Account AI Agent",
      features: [
        "Up to 500 interactions per month",
        "X (Twitter) platform integration",
        "AI-powered targeting by relevance",
        "Connect with influencers across 'Crypto Twitter'",
        "Long-term memory and custom prompts",
      ],
      buttonText: "Get Started",
      buttonClass: "button-gradient-secondary",
      buttonLink: "https://forms.gle/zxe1hgrbL8rbTELL7",
    },
    {
      name: "Professional",
      price: "999",
      period: "/month",
      description: "X + Telegram Integrated Intelligence",
      features: [
        "Everything in Starter plan",
        "Up to 1,000 interactions per month",
        "X and Telegram platform integration",
        "Cross-platform intelligence sharing",
        "Build your following on X and Telegram",
      ],
      buttonText: "Get Started",
      buttonClass: "button-gradient",
      featured: true,
      buttonLink: "https://forms.gle/zxe1hgrbL8rbTELL7",
    },
    {
      name: "Whale",
      price: "9999",
      period: "/month",
      description: "Discord, X, TG and Farcaster Solution",
      features: [
        "Everything in Professional",
        "10,000+ interactions per month",
        "Seamless cross-platform implementation",
        "Discord integration with voice chat",
        "Custom solutions tailored to your vision",
      ],
      buttonText: "Contact Us",
      buttonClass: "button-gradient",
      buttonLink: "https://forms.gle/zxe1hgrbL8rbTELL7",
    },
    {
      name: "AI Trading",
      price: "SOUL",
      period: "",
      description: "Trade using our AI Agents",
      features: [
        "Create trading strategies based on X and Codex",
        "KOL mention detection and analysis",
        "Automatic trade execution",
        "Strategy marketplace with a leaderboard",
        "Copy-trade or get rev share from others copy-trading you",
      ],
      buttonText: "Join Waitlist",
      buttonClass: "button-gradient-secondary",
      special: true,
      buttonLink: "https://forms.gle/fGffRz2P45Q2ZH2K8",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 bg-dark-navy/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-electric-purple/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Pricing
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`glass-card p-8 animate-fade-in-up ${
                tier.featured ? "border-2 border-neon-pink" : ""
              } ${tier.special ? "border-2 border-neon-blue" : ""}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold text-white mb-4">
                  {tier.price.startsWith("$") ? tier.price : `$${tier.price}`}
                  <span className="text-lg text-white/60">{tier.period}</span>
                </div>
                <p className="text-white/80 mb-6">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start text-white/80"
                  >
                    <Check className="h-5 w-5 text-neon-pink mr-3 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  tier.buttonLink && window.open(tier.buttonLink, "_blank")
                }
                className={`w-full ${tier.buttonClass} text-white font-bold py-4 rounded-lg`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-white/60">
          <p>All prices are per single AI agent</p>
        </div>
      </div>
    </section>
  );
}
