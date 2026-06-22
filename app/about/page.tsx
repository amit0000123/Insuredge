import Link from "next/link";
import { Shield, Users, Award, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Hero Section */}
      <section className="relative z-10 py-16 border-b border-border-custom bg-surface/30 text-center space-y-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            About <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">InsurEdge</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed pt-2">
            We are India's only <strong className="text-text-primary">100% Unbiased</strong> insurance discovery platform.
          </p>
        </div>
      </section>

      {/* Our Mission / Unbiased Section */}
      <section className="relative z-10 py-16 bg-background/50 font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left box */}
            <div className="bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-4 text-left">
              <Shield size={48} className="text-primary-custom mb-2" />
              <h2 className="text-2xl font-display font-bold text-text-primary">No Hidden Agendas. Just Honest Advice.</h2>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                We don't sell insurance. We help you buy it. With zero sales or marketing partnerships with insurers, our loyalty is 100% to you. Our only goal is to make sure you and your family are protected by the best plan available in the market.
              </p>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                We decode complex terms, analyze thousands of plans, and provide you with actionable, unbiased insights.
              </p>
            </div>

            {/* Right box */}
            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4">
                <div className="bg-primary-custom/12 p-3 rounded-xl text-primary-custom shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-text-primary mb-1">Deepest Research</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">Covering every plan worth your attention, our research is unmatched and rigorously verified.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary-custom/12 p-3 rounded-xl text-primary-custom shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-text-primary mb-1">IRDAI Compliant Guidelines</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">Every piece of advice and recommendation strictly adheres to regulatory frameworks ensuring your safety.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Our Experts */}
      <section className="relative z-10 py-16 bg-surface border-y border-border-custom font-sans">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">Vetted Advisory Panel</h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">Not salesmen. Not call center agents. You talk to experienced professionals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Award size={24} />, title: "Highly Qualified", desc: "Handpicked after rigorous evaluations. Only the top 1% of financial advisors make it." },
              { icon: <Users size={24} />, title: "20+ Years Experience", desc: "Our experts bring decades of deep claims and underwriting experience to your table." },
              { icon: <Shield size={24} />, title: "Lifelong Advocates", desc: "They don't just advise; they are in the profession of actively assisting you forever." },
            ].map((card, i) => (
              <div key={i} className="bg-background border border-border-custom p-6 rounded-2xl text-center space-y-4 shadow-sm hover:border-primary-custom/20 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-custom/10 border border-primary-custom/25 rounded-full flex items-center justify-center mx-auto text-primary-custom">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">{card.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community and Career */}
      <section className="relative z-10 py-16 font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ask the Community */}
            <div className="bg-[#111827] border border-border-custom rounded-3xl p-8 text-white relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <MessageSquare size={100} />
              </div>
              <div className="relative z-10 space-y-4">
                <MessageSquare size={36} className="text-primary-custom" />
                <h3 className="text-2xl font-display font-bold">Ask the Community</h3>
                <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
                  Join thousands of smart buyers sharing their experiences, asking questions, and demystifying insurance.
                </p>
                <Link href="/community" className="inline-flex items-center gap-1 text-primary-custom text-xs font-bold hover:underline">
                  Join the Discussion <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Apply as Advisor */}
            <div className="bg-[#0f172a] border border-border-custom rounded-3xl p-8 text-white relative overflow-hidden group text-left">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Briefcase size={100} />
              </div>
              <div className="relative z-10 space-y-4">
                <Briefcase size={36} className="text-primary-custom" />
                <h3 className="text-2xl font-display font-bold text-white">Apply as an Advisor</h3>
                <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
                  Are you an ethical, experienced financial advisor? Join our elite panel and help thousands of Indians.
                </p>
                <Link href="/apply-advisor" className="inline-flex items-center gap-1 text-primary-custom text-xs font-bold hover:underline">
                  Become an Expert <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
