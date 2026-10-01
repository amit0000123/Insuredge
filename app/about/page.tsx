import React from "react";
import Link from "next/link";
import {
  Shield,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Clock,
  Eye,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  Lock,
  Scale,
  Info,
  Check,
  X,
  MessageSquare,
  HelpCircle,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About InsurEdge | Making the Search for Financial Professionals Simpler",
  description:
    "Learn about InsurEdge, our philosophy, customer-first approach, transparency, and how we connect individuals across India with relevant insurance and investment professionals.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Subtle Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-blue-50/60 via-emerald-50/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: About InsurEdge */}
        {/* ========================================================================= */}
        <section className="pt-14 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Customer Connection Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            About InsurEdge
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-emerald-800 font-display">
            Making the Search for Financial Professionals Simpler
          </p>

          <div className="max-w-3xl mx-auto space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              Finding someone to speak with about insurance or investments shouldn't feel like a second job.
            </p>
            <p>
              There are countless products, providers, websites, comparisons, and opinions. For someone simply trying to understand their options, knowing who to speak with can be just as difficult as understanding the product itself.
            </p>
            <p className="font-semibold text-slate-800">
              InsurEdge was created to make that first connection simpler.
            </p>
            <p>
              We are a customer-connection and lead-generation platform that helps people across India connect with relevant insurance and investment professionals.
            </p>
            <p className="text-emerald-900 font-medium bg-emerald-50/80 border border-emerald-200/60 p-4 rounded-2xl">
              Our focus isn't to make the decision for you. It's to make finding the right person to speak with easier.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WHY WE STARTED INSUREDGE */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5 text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
                  Origin &amp; Purpose
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                  Why We Started InsurEdge
                </h2>
                <p className="text-lg font-bold text-emerald-800 font-display">
                  Because the first conversation matters.
                </p>
                <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  <p>
                    Financial decisions are personal.
                  </p>
                  <p>
                    The right insurance policy or investment approach can depend on factors such as your age, family situation, financial goals, income, existing coverage, investment horizon, and risk preferences.
                  </p>
                  <p>
                    Yet online experiences often begin with a product rather than a person. We believe the process can start differently.
                  </p>
                  <p>
                    Instead of asking you to figure everything out before you reach out, InsurEdge starts with a simple question:
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-emerald-600 text-slate-900 font-display font-bold text-base sm:text-lg italic">
                    "What are you looking for?"
                  </div>
                  <p>
                    From there, we help facilitate a connection with a relevant professional who can understand your requirements and discuss the options available to you.
                  </p>
                </div>
              </div>

              {/* Right Decorative Feature Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    A Person-First Approach
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Starts with your personal goals, not generic product catalogs</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Takes into account age, family dependency, and risk preferences</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Matches you with an accredited specialist in your domain</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Empowers you with information so you decide for yourself</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. OUR PHILOSOPHY */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Our Philosophy
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-emerald-800 font-display">
              Connect first. Understand better. Decide yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-display font-extrabold">
                1
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Connect First
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We don't believe an online platform should make an important financial decision on behalf of a customer. Our role is to make the connection easier.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-display font-extrabold">
                2
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Understand Better
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The professional you are connected with can explain relevant products, features, terms, costs, eligibility requirements, exclusions, risks, and other applicable information.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-display font-extrabold">
                3
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                Decide Yourself
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You can ask questions. You can compare options. And ultimately, you decide whether you want to proceed without pressure or obligation.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. WE RESPECT YOUR TIME & TRANSPARENCY MATTERS */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Respect Time Box */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                    We Respect Your Time
                  </h3>
                  <p className="text-xs font-semibold text-rose-600 font-mono">
                    No Spam. No Unnecessary Hassle.
                  </p>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    We know why people hesitate before submitting their phone number online. They don't want their enquiry to turn into a long list of unrelated calls.
                  </p>
                  <p>
                    We understand that. That's why we want every enquiry to have a clear purpose: helping you connect with a relevant professional for the requirement you submitted.
                  </p>
                  <p className="font-semibold text-slate-800">
                    We don't want the experience to be about chasing you. We want it to be about helping you find the right conversation.
                  </p>
                </div>
              </div>

              {/* Transparency Box */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                    Transparency Matters
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 font-mono">
                    You should know how the platform works.
                  </p>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    InsurEdge is a lead-generation and customer-connection platform. Customers can submit enquiries through InsurEdge without paying us a fee.
                  </p>
                  <p>
                    InsurEdge may receive fees from participating advisors, distributors, or professionals for customer enquiries or leads. We believe being open about this relationship is important.
                  </p>
                  <p className="font-semibold text-slate-800">
                    A lead enquiry does not mean you have agreed to purchase a product. You remain free to ask questions, evaluate the information provided, and decide whether you want to proceed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHAT INSUREDGE IS — AND ISN'T */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
              Clear Boundaries
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              What InsurEdge Is — And Isn't
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We believe upfront clarity is the foundation of trust. Here is exactly what our role is and where it ends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pair 1 */}
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>We Are</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  A platform that helps customers find and connect with relevant insurance and investment professionals.
                </p>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>We Aren't</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  An insurance company or insurer.
                </p>
              </div>
            </div>

            {/* Pair 2 */}
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>We Are</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  A starting point for people looking for professional assistance.
                </p>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>We Aren't</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  A replacement for the professional advice, product documentation, or terms provided by the relevant product provider or professional.
                </p>
              </div>
            </div>

            {/* Pair 3 */}
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>We Are</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Focused on making the connection simpler.
                </p>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 font-mono">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>We Aren't</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Here to make the financial decision for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. BUILT AROUND THE CUSTOMER */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
                Customer-First Design
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Built Around the Customer
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We want the InsurEdge experience to feel:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Clear",
                  desc: "You should understand why someone is contacting you and what your enquiry is about.",
                  icon: "💡",
                },
                {
                  title: "Relevant",
                  desc: "Your enquiry should be connected based on the requirement you submitted.",
                  icon: "🎯",
                },
                {
                  title: "Simple",
                  desc: "You shouldn't need to understand every financial term before starting a conversation.",
                  icon: "⚡",
                },
                {
                  title: "Respectful",
                  desc: "Your time and attention matter.",
                  icon: "🤝",
                },
                {
                  title: "Transparent",
                  desc: "You should know what InsurEdge does and how our platform works.",
                  icon: "🔍",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 text-left space-y-2 shadow-xs hover:border-emerald-300 transition-all"
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <h3 className="text-base font-bold font-display text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. OUR VISION & WHAT COMES NEXT */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Vision */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
                  Looking Forward
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  Our Vision
                </h2>
                <p className="text-base font-bold text-emerald-800 font-display">
                  A simpler starting point for better financial conversations.
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    We want InsurEdge to become a trusted starting point for people who need help navigating insurance and investment decisions.
                  </p>
                  <p>
                    Not by telling everyone what to buy. Not by making financial decisions for customers.
                  </p>
                  <p className="font-semibold text-slate-800">
                    But by making it easier to find the right professional, ask the right questions, understand the available options, and make an informed decision.
                  </p>
                </div>
              </div>
            </div>

            {/* What Comes Next */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
                  Continuous Evolution
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  What Comes Next
                </h2>
                <p className="text-base font-bold text-emerald-800 font-display">
                  InsurEdge is being built around a simple idea:
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    Better connections can lead to better conversations.
                  </p>
                  <p>
                    And better conversations can help people make more informed financial decisions.
                  </p>
                  <p className="font-semibold text-slate-800">
                    We're continuing to improve the way customers discover professionals, submit enquiries, compare information, and get the help they're looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. HAVE A REQUIREMENT? (CTA SECTION) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
              Take the First Step
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Have a Requirement?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              If you're exploring Term Insurance, Health Insurance, or Mutual Funds, you can start by telling us what you're looking for.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#start-enquiry"
                className="px-9 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base rounded-xl cursor-pointer shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>Get Connected</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Free enquiry • No obligation to purchase
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. IMPORTANT INFORMATION (REGULATORY & COMPLIANCE FOOTNOTE) */}
        {/* ========================================================================= */}
        <section className="py-12 bg-[#F1F5F9] border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-slate-500 leading-relaxed text-left">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-slate-900">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Important Information</span>
              </div>
              <p>
                InsurEdge is a lead-generation and customer-connection platform. InsurEdge does not itself provide personalised insurance, financial, or investment advice.
              </p>
              <p>
                Product information, recommendations, pricing, eligibility, policy terms, exclusions, risks, and other product-related information are provided by the relevant professional or product provider, as applicable.
              </p>
              <p>
                Customers should independently review applicable product documents, terms, conditions, charges, exclusions, risks, and other relevant information before making a financial decision.
              </p>
              <p>
                InsurEdge may receive fees from participating advisors, distributors, or professionals for customer enquiries or leads.
              </p>
              <p className="font-semibold text-slate-700">
                Submitting an enquiry through InsurEdge is free and does not obligate a customer to purchase any product.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
