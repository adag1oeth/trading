"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Intelligent Engagement",
    description:
      "AI-powered responses that maintain authentic community connections",
    benefits: [
      "Natural language understanding",
      "Context-aware conversations",
      "Intelligent follows",
      "Web3-fame analysis",
    ],
  },
  {
    title: "24/7 Community Building",
    description:
      "Continuous community monitoring and real-time response capabilities",
    benefits: [
      "Round-the-clock engagement",
      "High value accounts response system",
      "Community growth automation",
      "Automatic interaction improvement",
    ],
  },
  {
    title: "Strategic Networking",
    description: "Connect and engage with key players in your industry",
    benefits: [
      "Industry leader targeting",
      "Smart relationship building",
      "Partnership and sales opportunities",
      "Grow your token or brand",
    ],
  },
  {
    title: "Advanced Analytics",
    description: "Insights-based community engagement and real value creation",
    benefits: [
      "Valuable replies to targeted accounts on X",
      "Replies to posts to boost algo ratings",
      "Sentiment tracking and meme engagement",
      "Increased visibility of your brand",
    ],
  },
  {
    title: "Trading Integration",
    description:
      "Autonomous trading capabilities powered by AI and community insights (Q1 2025)",
    benefits: [
      "Planned: Market analysis",
      "Future: Smart trade execution",
      "Upcoming: Risk management",
      "Vision: Performance tracking",
    ],
  },
  {
    title: "Custom Strategies",
    description: "Tailored approaches for your specific needs and goals",
    benefits: [
      "Brand voice customization",
      "Goal-based optimization",
      "Adaptive behaviour and learning",
      "Strategy refinement",
    ],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-purple/5 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Powerful Features
          </h2>
          <p className="text-xl text-white/80">
            Advanced AI capabilities designed for Web3 communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 backdrop-blur-sm border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                {feature.title}
              </h3>
              <p className="text-white/80 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-center text-white/70"
                  >
                    <span className="text-neon-pink mr-3">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="https://forms.gle/zxe1hgrbL8rbTELL7"
            target="_blank"
            rel="noopener noreferrer"
            className="button-gradient inline-block px-8 py-4 text-lg font-bold rounded-lg shadow-lg shadow-electric-purple/20 hover:shadow-neon-pink/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </section>
  );
}
