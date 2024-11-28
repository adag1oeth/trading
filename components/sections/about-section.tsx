export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            About Soul AI Agents
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Launched in October 2024, Soul AI Agents brings autonomous
            intelligence to Web3 community management, starting with Crypto
            Bunny's journey of daily growth and learning.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Cross-Platform AI</h3>
              <p>
                Advanced AI agents that seamlessly operate across X and
                Telegram, delivering intelligent engagement for Web3
                communities.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Strategic Growth</h3>
              <p>
                Our AI agents intelligently engage with key industry influencers
                and decision-makers to expand your network and visibility.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-3">Trading Integration</h3>
              <p>
                Trading capabilities powered by social sentiment analysis and
                community-driven insights (coming soon).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
