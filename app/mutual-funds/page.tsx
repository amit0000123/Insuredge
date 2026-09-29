"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calendar,
  UserCheck,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  Clock,
  Award,
  Zap,
  BookOpen,
  PieChart,
  ArrowUpRight,
  ShieldAlert,
  Sliders,
  DollarSign,
  MessageSquare,
  Check,
  Briefcase,
  Compass,
  Scale,
  Receipt,
  Wallet,
  FileText,
  Info,
  AlertCircle,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MutualFundsPage() {
  // Goal selector for personalized advice
  const [selectedGoal, setSelectedGoal] = useState<string>("first-sip");

  // SIP Calculator State
  const [calcMode, setCalcMode] = useState<"sip" | "lumpsum">("sip");
  const [monthlyAmount, setMonthlyAmount] = useState<number>(5000);
  const [lumpsumAmount, setLumpsumAmount] = useState<number>(100000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  const [calcResults, setCalcResults] = useState({
    invested: 0,
    returns: 0,
    total: 0,
  });

  // Callback Form State
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbGoal, setCbGoal] = useState("First-time SIP");
  const [cbSubmitted, setCbSubmitted] = useState(false);
  const [cbError, setCbError] = useState("");

  // Matchmaker State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [wizardData, setWizardData] = useState({
    experience: "beginner",
    horizon: "5-10",
    monthlyBudget: "5000-15000",
    goalType: "Wealth Creation",
  });
  const [matchDone, setMatchDone] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculate SIP / Lumpsum
  useEffect(() => {
    if (calcMode === "sip") {
      const P = monthlyAmount;
      const i = expectedReturn / 100 / 12;
      const n = timePeriod * 12;
      const totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
      const totalInvested = P * n;
      const totalReturns = totalValue - totalInvested;

      setCalcResults({
        invested: Math.round(totalInvested),
        returns: Math.round(totalReturns),
        total: Math.round(totalValue),
      });
    } else {
      const P = lumpsumAmount;
      const r = expectedReturn / 100;
      const t = timePeriod;
      const totalValue = P * Math.pow(1 + r, t);
      const totalReturns = totalValue - P;

      setCalcResults({
        invested: Math.round(P),
        returns: Math.round(totalReturns),
        total: Math.round(totalValue),
      });
    }
  }, [calcMode, monthlyAmount, lumpsumAmount, expectedReturn, timePeriod]);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      setCbError("Please enter both your name and 10-digit mobile number.");
      return;
    }
    if (cbPhone.replace(/\D/g, "").length < 10) {
      setCbError("Please enter a valid 10-digit phone number.");
      return;
    }
    setCbError("");
    setCbSubmitted(true);
  };

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  const faqs = [
    {
      id: 1,
      q: "What is a mutual fund?",
      a: "A mutual fund pools money from multiple investors and invests it in a diversified portfolio of financial assets, such as equities, debt securities, or a combination of both, depending on the scheme’s investment objective.",
    },
    {
      id: 2,
      q: "Can I start investing with a small amount?",
      a: "Many mutual fund schemes allow investors to begin investing through a Systematic Investment Plan (SIP) with relatively modest investment amounts. The minimum investment amount depends on the mutual fund scheme.",
    },
    {
      id: 3,
      q: "Is a SIP better than a lump sum investment?",
      a: "Both are valid ways of investing in mutual funds. The right approach depends on your financial goals, available funds, investment horizon, and personal preferences.",
    },
    {
      id: 4,
      q: "Are mutual funds risk-free?",
      a: "No. Mutual funds are market-linked investments, which means their value can increase or decrease depending on market conditions and the performance of the underlying investments.",
    },
    {
      id: 5,
      q: "Do mutual funds guarantee returns?",
      a: "No. Mutual fund investments do not guarantee returns. Investors should understand the risks associated with market-linked investments before investing.",
    },
    {
      id: 6,
      q: "Can I invest directly through your website?",
      a: "No. Our platform does not facilitate mutual fund investments or transactions. If you choose to invest, the investment process is completed directly through the financial professional you decide to work with.",
    },
    {
      id: 7,
      q: "What does your platform do?",
      a: "We help individuals connect with the right financial professional based on their investment goals and requirements. Our role is to simplify the process of finding professionals who can explain mutual funds, answer your questions, and guide you through the investment process according to the services they are authorised to provide.",
    },
    {
      id: 8,
      q: "Is there any obligation to invest after requesting a consultation?",
      a: "No. Requesting a consultation simply allows you to connect with a financial professional. Whether you choose to invest is entirely your decision.",
    },
  ];

  return (
    <div className="min-h-screen font-sans text-text-primary bg-background relative overflow-x-hidden selection:bg-accent-custom/20 selection:text-accent-custom">
      {/* Dynamic Ambient Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-indigo-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] -right-[10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-secondary/50" />
          <Link href="/services" className="hover:text-primary-custom transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-secondary/50" />
          <span className="text-text-primary">Mutual Funds</span>
        </nav>

        {/* ── 1. HERO SECTION ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                SEBI &amp; AMFI Certified Financial Professionals • 100% Unbiased
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-text-primary leading-[1.1]">
                  Mutual Fund Investment <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-primary-custom bg-clip-text text-transparent">
                    in India
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-bold text-text-primary/90 font-display">
                  Invest Smarter. Build Wealth with the Right Financial Professional.
                </p>
              </div>

              {/* Provided Body Text */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Whether you’re planning your first SIP, investing for your family’s future, saving for retirement, or working towards long-term wealth creation, mutual funds can play an important role in your financial journey.
              </p>

              {/* Interactive Goal Pill Filter */}
              <div className="pt-2">
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider font-mono mb-3">
                  Select your primary focus area:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "first-sip", label: "🌱 Starting 1st SIP", sub: "From ₹500/mo" },
                    { id: "family-future", label: "👨‍👩‍👧 Family's Future", sub: "Education & Growth" },
                    { id: "retirement", label: "🏖️ Retirement Corpus", sub: "Compounding Growth" },
                    { id: "wealth-creation", label: "🚀 Wealth Creation", sub: "Long-Term Alpha" },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                        selectedGoal === g.id
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                          : "bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-emerald-500/40"
                      }`}
                    >
                      <span className="block">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#matchmaker"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all text-center"
                >
                  <UserCheck className="h-4 w-4" />
                  Find the Right Financial Professional
                </a>
                <Link
                  href="/book-appointment?service=mutual-funds"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface border border-border-custom hover:border-emerald-500/50 text-text-primary font-bold text-sm sm:text-base hover:bg-surface/80 transition-all text-center"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  Book a Free Consultation
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Zero Spam Calls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>100% Free Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No Obligation to Invest</span>
                </div>
              </div>
            </div>

            {/* Right Card: Instant Quick Callback Form */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold font-mono">
                    <PhoneCall className="h-3.5 w-3.5" />
                    Quick Callback SLA
                  </div>
                  <span className="text-xs text-text-secondary font-mono">⚡ 2-Hour Response</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mb-2">
                  Request a Free Callback
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  Speak directly with an accredited mutual fund professional. Get honest answers in simple language.
                </p>

                {cbSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/30">
                      <Check className="h-6 w-6 stroke-[3]" />
                    </div>
                    <h4 className="text-lg font-bold font-display text-text-primary">
                      Request Confirmed!
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Thank you, <strong className="text-text-primary">{cbName}</strong>. A licensed financial professional has been assigned and will call you on <strong className="text-text-primary">{cbPhone}</strong> within 2 business hours.
                    </p>
                    <button
                      onClick={() => setCbSubmitted(false)}
                      className="text-xs text-emerald-600 font-bold underline hover:no-underline pt-2 cursor-pointer"
                    >
                      Submit another query
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-mono">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={cbName}
                        onChange={(e) => setCbName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-mono">
                        Mobile Number (WhatsApp Enabled)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={cbPhone}
                          onChange={(e) => setCbPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="98765 43210"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-mono">
                        Primary Investment Objective
                      </label>
                      <select
                        value={cbGoal}
                        onChange={(e) => setCbGoal(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer"
                      >
                        <option value="First-time SIP">Starting my first SIP</option>
                        <option value="Portfolio Review">Review existing mutual fund portfolio</option>
                        <option value="Tax Saving ELSS">Tax Saving (ELSS 80C)</option>
                        <option value="Retirement Planning">Retirement &amp; Long-term Wealth</option>
                        <option value="Child Future">Child Education / Marriage Goal</option>
                        <option value="General Advice">General Understanding &amp; Clarity</option>
                      </select>
                    </div>

                    {cbError && (
                      <p className="text-xs text-rose-500 font-semibold">{cbError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Request a Callback
                    </button>

                    <p className="text-[11px] text-text-secondary/70 text-center leading-normal">
                      🔒 Your details are encrypted &amp; never shared with unsolicited telemarketers.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHY INVEST IN MUTUAL FUNDS? (FROM NEW USER DOCUMENT) ── */}
        <section id="why-invest" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-10 space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Wealth Creation Fundamentals
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Why Invest in Mutual Funds?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Every financial goal begins with a plan — and investing is one of the most effective ways to turn those plans into reality.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Whether you’re saving for your child’s education, planning for retirement, buying your dream home, or building long-term wealth, mutual funds offer a flexible and structured way to invest according to your financial goals.
            </p>
          </div>

          {/* Core Concept Banner: Traditional vs Mutual Funds */}
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-surface border border-emerald-500/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                <Briefcase className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                  Access to Professionally Managed Portfolios
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Unlike traditional investment options, mutual funds give you access to professionally managed portfolios across different asset classes. This means your money is invested according to the objective of the chosen mutual fund scheme, helping you participate in financial markets without having to manage individual investments on your own.
                </p>
              </div>
            </div>
          </div>

          {/* 5 Reasons Investors Choose Mutual Funds */}
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-6">
              Why Do Investors Choose Mutual Funds?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Point 1 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Sliders className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary mb-2.5">
                    Invest at Your Own Pace
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    You can start investing through a Systematic Investment Plan (SIP) with regular contributions or invest a lump sum amount whenever it suits your financial situation.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Flexible: SIP from ₹500 or Lumpsum
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary mb-2.5">
                    Professional Fund Management
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Mutual fund schemes are managed by experienced fund managers who oversee the investment portfolio in line with the scheme’s stated objective.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  Full-Time Market Research Teams
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary mb-2.5">
                    Diversification
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Instead of depending on a single investment, mutual funds generally spread investments across multiple companies, sectors, or financial instruments, helping diversify your portfolio.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                  Multi-Company &amp; Sector Spread
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary mb-2.5">
                    Investment Options for Different Goals
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Whether you’re looking for long-term wealth creation, tax-saving opportunities through eligible schemes, or investments aligned with your financial objectives, there are different categories of mutual funds designed for different needs.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                  Customized to Life Milestones
                </div>
              </div>

              {/* Point 5 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-2">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary mb-2.5">
                    A Disciplined Way to Invest
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Regular investing through SIPs can help you build a consistent investment habit over time, making it easier to stay focused on your long-term financial goals without getting distracted by short-term market noise.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  Rupee-Cost Averaging &amp; Compounding
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Callout: Every Investment Deserves Thoughtful Planning */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Responsible Wealth Building
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Every Investment Deserves Thoughtful Planning
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                While mutual funds offer many potential benefits, every investment decision should be based on your financial goals, investment horizon, and comfort with market fluctuations.
              </p>
              <p className="text-xs sm:text-sm font-semibold text-text-primary leading-relaxed">
                Understanding your options before investing is just as important as deciding to invest.
              </p>

              {/* 3 Pillars Badge Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">Financial Goals</div>
                    <div className="text-[11px] text-text-secondary">What you aim to achieve</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">Investment Horizon</div>
                    <div className="text-[11px] text-text-secondary">Duration of investment</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-text-primary">Risk Comfort</div>
                    <div className="text-[11px] text-text-secondary">Market volatility cushion</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <p className="text-xs text-text-secondary sm:max-w-md">
                  If you’re unsure where to begin, speaking with the right financial professional can help you better understand the investment process and make informed decisions with greater confidence.
                </p>
                <a
                  href="#matchmaker"
                  className="sm:ml-auto px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm text-center transition-all shadow-md shadow-emerald-500/20 shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Speak with a Financial Professional</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. THE CHALLENGE SECTION ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="bg-surface/50 border border-border-custom rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block mb-2">
                Understanding Where to Begin
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-text-primary leading-tight mb-4">
                The Challenge Isn’t Just Deciding to Invest — It’s Knowing Where to Start
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                With hundreds of mutual fund schemes, different investment categories, and changing market conditions, choosing the right path can feel confusing, especially if you’re investing for the first time.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mt-2 font-medium">
                That’s why many investors prefer speaking with a financial professional before making important investment decisions.
              </p>
            </div>

            {/* Side-by-Side Comparison: Without vs With Expert Guidance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Without Professional Guidance */}
              <div className="bg-background/80 border border-rose-500/20 rounded-2xl p-6 relative">
                <div className="flex items-center gap-2.5 text-rose-500 font-bold font-display text-lg mb-4">
                  <ShieldAlert className="h-5 w-5" />
                  <span>Navigating Alone</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-text-secondary">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Analysis Paralysis:</strong> Getting lost across 2,500+ mutual fund schemes and complex category codes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Chasing Past Returns:</strong> Investing in last year's top performer right before market cycles change.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Emotional Panic:</strong> Halting SIPs during natural market corrections instead of rupee cost averaging.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span><strong>Mismatched Time Horizons:</strong> Putting short-term emergency funds into volatile small-cap schemes.</span>
                  </li>
                </ul>
              </div>

              {/* With Our Platform & Financial Professional */}
              <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/10 border border-emerald-500/30 rounded-2xl p-6 relative shadow-lg">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold font-display text-lg mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>With Our Platform &amp; Certified Professionals</span>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-text-primary">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                    <span><strong>Targeted Goal Mapping:</strong> Allocations structured around your specific life milestones and risk comfort.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                    <span><strong>Portfolio Diversification:</strong> Healthy balance between Equity, Hybrid, and Liquid debt cushions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                    <span><strong>Disciplined Habit:</strong> Automated compounding through consistent SIPs without panic selling.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                    <span><strong>Clear, Jargon-Free Advisory:</strong> Every decision explained in plain language with zero commission pressure.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. WHY CHOOSE OUR PLATFORM (5 CORE PILLARS FROM USER DOC) ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
              Unbiased Advisory Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-text-primary">
              Why Choose Our Platform?
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Our platform helps you connect with the right financial professional for your investment goals. Whether you want to understand how mutual funds work, explore SIPs, or discuss your financial objectives, we’ll help you start your journey with greater clarity and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                Connect with Experienced Financial Professionals
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Get matched with vetted professionals whose expertise aligns directly with your specific life stage, monthly budget, and personal risk profile.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                Learn About Mutual Funds Before Investing
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Take the time to understand where your money goes, how compounding works, and how risk is managed before committing a single rupee.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                Answers to Your Questions in Simple Language
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                No jargon, no confusing mathematical formulas, and no sales talk. Get plain, easy-to-understand explanations for every doubt you have.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                Explore Options Without Any Obligation to Invest
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Enjoy complete peace of mind. Consult freely without pressure, sales quotas, or unexpected follow-up harassment.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                Start Your Investment Journey with Confidence
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Leave guesswork behind. When you take action, it’s with a clear roadmap, verified calculations, and reliable support for years to come.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. SIP VS LUMP SUM COMPARISON (FROM USER DOCUMENT) ── */}
        <section id="sip-vs-lumpsum" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Investment Method Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              SIP vs Lump Sum – Which Investment Method Fits Your Financial Goals?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              After deciding to invest in mutual funds, the next question is often: <strong className="text-text-primary">Should you invest through a SIP or make a lump sum investment?</strong>
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              The answer depends on your financial goals, available funds, and investment preferences. Both methods invest in mutual funds — the difference lies in how you invest.
            </p>
          </div>

          {/* Dual Explainer Cards: What is SIP & What is Lump Sum */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* What is a SIP? */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-8 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                    Disciplined Habit
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Periodic</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  What is a SIP?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  A Systematic Investment Plan (SIP) allows you to invest a fixed amount in a mutual fund at regular intervals, such as every month.
                </p>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Many investors prefer SIPs because they encourage disciplined investing and allow investments to be made gradually over time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-custom flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                <Check className="h-4 w-4" />
                <span>Rupee-cost averaging across market ups &amp; downs</span>
              </div>
            </div>

            {/* What is a Lump Sum Investment? */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-8 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                    Surplus Deployment
                  </span>
                  <span className="text-xs text-text-secondary font-mono">One-Time</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  What is a Lump Sum Investment?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  A lump sum investment means investing a larger amount in a mutual fund through a single transaction.
                </p>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Some investors choose this approach when they already have investible funds available, such as a bonus, business income, or accumulated savings.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-custom flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                <Check className="h-4 w-4" />
                <span>Puts existing capital to work immediately</span>
              </div>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 overflow-hidden">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                SIP vs Lump Sum – A Quick Comparison
              </h3>
              <span className="text-xs text-text-secondary font-mono">Side-by-Side Breakdown</span>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border-custom text-xs font-bold uppercase tracking-wider font-mono text-text-secondary">
                    <th className="py-3 px-4">Feature / Parameter</th>
                    <th className="py-3 px-4 text-emerald-600 dark:text-emerald-400">SIP (Systematic Investment Plan)</th>
                    <th className="py-3 px-4 text-blue-600 dark:text-blue-400">Lump Sum Investment</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-text-primary">Investment Frequency</td>
                    <td className="py-3.5 px-4 text-text-secondary">Regular investments</td>
                    <td className="py-3.5 px-4 text-text-secondary">One-time investment</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-text-primary">Suitability</td>
                    <td className="py-3.5 px-4 text-text-secondary">Suitable for investing gradually</td>
                    <td className="py-3.5 px-4 text-text-secondary">Suitable when surplus funds are available</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-text-primary">Discipline &amp; Habit</td>
                    <td className="py-3.5 px-4 text-text-secondary">Helps build a disciplined investment habit</td>
                    <td className="py-3.5 px-4 text-text-secondary">Entire investment is made at one time</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-text-primary">Transaction Nature</td>
                    <td className="py-3.5 px-4 text-text-secondary">Monthly or periodic contributions</td>
                    <td className="py-3.5 px-4 text-text-secondary">Single investment transaction</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-background border border-border-custom text-xs text-text-secondary flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0" />
              <span>
                <strong>Important Note:</strong> Both SIP and lump sum investments are subject to market risks, and neither method guarantees returns.
              </span>
            </div>
          </div>

          {/* Which One Should You Choose? Section */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-12">
            <div className="max-w-3xl mb-8 space-y-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Decision Framework
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Which One Should You Choose?
              </h3>
              <p className="text-base sm:text-lg font-bold text-text-primary">
                There isn’t a one-size-fits-all answer.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The right investment method depends on factors such as:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
              <div className="p-4 rounded-xl bg-background border border-border-custom">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                  <Target className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-text-primary">Your Financial Goals</div>
                <div className="text-[11px] text-text-secondary mt-1">Specific targets you want to reach</div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-text-primary">Investment Horizon</div>
                <div className="text-[11px] text-text-secondary mt-1">Short vs long-term timeframe</div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
                  <Sliders className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-text-primary">Monthly Savings Capacity</div>
                <div className="text-[11px] text-text-secondary mt-1">Cashflow available each month</div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2.5">
                  <Wallet className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-text-primary">Available Investible Amount</div>
                <div className="text-[11px] text-text-secondary mt-1">Immediate capital on hand</div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold text-text-primary">Comfort with Market Fluctuations</div>
                <div className="text-[11px] text-text-secondary mt-1">Tolerance for entry timing</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
              If you’re unsure which investment approach aligns with your financial goals, discussing your options with the right financial professional can help you make a more informed decision.
            </p>

            {/* Decision Callout Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-background border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-text-primary">
                  Not sure whether to start with a SIP or a lump sum investment?
                </div>
                <p className="text-xs text-text-secondary">
                  Connect with the right financial professional and get your questions answered before you invest.
                </p>
              </div>
              <a
                href="#matchmaker"
                className="px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="h-4 w-4" />
                <span>Find the Right Financial Professional</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 5. INTERACTIVE WEALTH & SIP COMPOUNDING CALCULATOR ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block mb-1">
                  Interactive Planning Tool
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                  Mutual Fund Wealth Compounding Calculator
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  See how small, disciplined investments grow exponentially over time through the power of compounding.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex p-1 rounded-xl bg-background border border-border-custom shrink-0">
                <button
                  onClick={() => setCalcMode("sip")}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    calcMode === "sip"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  Monthly SIP
                </button>
                <button
                  onClick={() => setCalcMode("lumpsum")}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    calcMode === "lumpsum"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  One-time Lumpsum
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-6">
                {/* Investment Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary font-mono">
                      {calcMode === "sip" ? "Monthly SIP Amount" : "One-time Lumpsum"}
                    </label>
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{(calcMode === "sip" ? monthlyAmount : lumpsumAmount).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={calcMode === "sip" ? 500 : 5000}
                    max={calcMode === "sip" ? 100000 : 2000000}
                    step={calcMode === "sip" ? 500 : 5000}
                    value={calcMode === "sip" ? monthlyAmount : lumpsumAmount}
                    onChange={(e) =>
                      calcMode === "sip"
                        ? setMonthlyAmount(Number(e.target.value))
                        : setLumpsumAmount(Number(e.target.value))
                    }
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  {/* Preset Pills */}
                  {calcMode === "sip" && (
                    <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
                      {[1000, 2500, 5000, 10000, 25000, 50000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setMonthlyAmount(amt)}
                          className={`text-[11px] px-2.5 py-1 rounded-md border font-mono transition-all cursor-pointer ${
                            monthlyAmount === amt
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/50"
                              : "bg-surface border-border-custom text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expected Return Rate Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary font-mono">
                      Expected Annual Return (CAGR)
                    </label>
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      {expectedReturn}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={18}
                    step={0.5}
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-text-secondary/70 mt-1 font-mono">
                    <span>Conservative (8%)</span>
                    <span>Moderate Equity (12%)</span>
                    <span>Aggressive (15%+)</span>
                  </div>
                </div>

                {/* Time Period Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-secondary font-mono">
                      Investment Horizon
                    </label>
                    <span className="text-lg sm:text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      {timePeriod} {timePeriod === 1 ? "Year" : "Years"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
                    {[3, 5, 10, 15, 20, 25].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setTimePeriod(yr)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border font-mono transition-all cursor-pointer ${
                          timePeriod === yr
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/50"
                            : "bg-surface border-border-custom text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {yr} Yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculator Summary Card */}
              <div className="lg:col-span-5 bg-background border border-border-custom rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs text-text-secondary uppercase tracking-wider font-mono">
                    Estimated Total Wealth
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-500">
                    {formatINR(calcResults.total)}
                  </div>
                </div>

                {/* Split Visual Bar */}
                <div className="w-full h-3 rounded-full bg-border-custom overflow-hidden flex">
                  <div
                    style={{
                      width: `${Math.max(5, (calcResults.invested / (calcResults.total || 1)) * 100)}%`,
                    }}
                    className="bg-primary-custom transition-all duration-300"
                    title="Invested Amount"
                  />
                  <div
                    style={{
                      width: `${Math.max(5, (calcResults.returns / (calcResults.total || 1)) * 100)}%`,
                    }}
                    className="bg-emerald-500 transition-all duration-300"
                    title="Estimated Returns"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border-custom">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-custom shrink-0" />
                      <span>Invested Amount</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-text-primary">
                      {formatINR(calcResults.invested)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Estimated Returns</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      {formatINR(calcResults.returns)}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?subject=Mutual%20Fund%20Planning&amt=${calcMode === 'sip' ? monthlyAmount : lumpsumAmount}&term=${timePeriod}`}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <span>Discuss This Plan with an Advisor</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TYPES OF MUTUAL FUNDS (FROM USER DOCUMENT) ── */}
        <section id="types" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-10 space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Investment Categories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Types of Mutual Funds
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              One of the biggest advantages of mutual funds is that they offer investment options for different financial goals and investor preferences.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Whether you’re looking for long-term wealth creation, a balanced investment approach, or tax-saving opportunities, there are different categories of mutual funds designed to meet different objectives. Here are some of the most common types of mutual funds.
            </p>
          </div>

          {/* 5 Main Types of Mutual Funds Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Type 1: Equity Mutual Funds */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                    Listed Shares
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Long-Term Growth</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Equity Mutual Funds
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Equity mutual funds primarily invest in shares of listed companies. They are commonly considered by investors with long-term financial goals who are comfortable with market fluctuations in pursuit of potential long-term growth.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom flex items-center justify-between text-xs text-text-secondary">
                <span>Risk: Market Fluctuations</span>
                <span className="text-emerald-500 font-bold font-mono">Growth Focused</span>
              </div>
            </div>

            {/* Type 2: Debt Mutual Funds */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                    Fixed-Income
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Capital Preservation</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Debt Mutual Funds
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Debt mutual funds mainly invest in fixed-income instruments such as government securities and corporate bonds. They are generally explored by investors looking for investment options with different risk characteristics than equity-oriented funds.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom flex items-center justify-between text-xs text-text-secondary">
                <span>Risk: Lower / Fixed Income</span>
                <span className="text-blue-500 font-bold font-mono">Stability Focused</span>
              </div>
            </div>

            {/* Type 3: Hybrid Mutual Funds */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono">
                    Multi-Asset
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Balanced Exposure</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scale className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Hybrid Mutual Funds
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Hybrid mutual funds invest in a combination of equity and debt instruments within a single portfolio. They offer exposure to multiple asset classes and are designed with different investment strategies depending on the scheme.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom flex items-center justify-between text-xs text-text-secondary">
                <span>Risk: Balanced</span>
                <span className="text-teal-500 font-bold font-mono">Equity + Debt Mix</span>
              </div>
            </div>

            {/* Type 4: Index Funds */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono">
                    Benchmark Replicating
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Low Cost</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Index Funds
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Index funds aim to replicate the performance of a market index, such as the Nifty 50 or Sensex, by investing in the same securities that make up the benchmark index.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom flex items-center justify-between text-xs text-text-secondary">
                <span>Strategy: Passive Tracking</span>
                <span className="text-indigo-500 font-bold font-mono">Nifty 50 / Sensex</span>
              </div>
            </div>

            {/* Type 5: ELSS (Equity Linked Savings Scheme) */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                    Tax Benefits (Section 80C)
                  </span>
                  <span className="text-xs text-text-secondary font-mono">Statutory 3-Year Lock-In</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Receipt className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  ELSS (Equity Linked Savings Scheme)
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  ELSS is a category of equity mutual fund that may offer tax benefits under applicable tax laws, subject to prevailing regulations and eligibility conditions. These schemes are also subject to a statutory lock-in period.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom flex items-center justify-between text-xs text-text-secondary">
                <span>Tax Deduction: Up to ₹1.5L (Sec 80C)</span>
                <span className="text-emerald-500 font-bold font-mono">Lock-in: 3 Years</span>
              </div>
            </div>
          </div>

          {/* ── WHICH MUTUAL FUND IS RIGHT FOR YOU? ── */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="max-w-3xl mb-8 space-y-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Personalized Assessment
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-text-primary">
                Which Mutual Fund Is Right for You?
              </h3>
              <p className="text-base sm:text-lg font-bold text-text-primary">
                There isn’t a single mutual fund that’s suitable for everyone.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The right investment approach depends on factors such as:
              </p>
            </div>

            {/* The 6 Core Factors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Your Financial Goals</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Retirement, child education, marriage, or wealth creation milestones.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Investment Horizon</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Short-term liquidity needs vs multi-decade compound targets.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Risk Tolerance</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Your personal comfort level and capacity for handling market swings.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <PieChart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Existing Investments</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Balancing with your current PF, fixed deposits, gold, and real estate.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Financial Commitments</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Accounting for home loans, EMIs, dependents, and liquid emergency reserves.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Tax Planning Requirements</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Optimizing 80C exemptions and long-term capital gains tax treatment.</p>
                </div>
              </div>
            </div>

            {/* Core Advice Banner & Action Bridge */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-background border border-emerald-500/20 space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-text-primary leading-relaxed">
                Understanding these factors is often more important than choosing a fund based on recent performance or popular opinion.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                If you’re unsure which mutual fund category aligns with your financial goals, speaking with the right financial professional can help you better understand your options before making an investment decision.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#matchmaker"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Match with an Expert for Your Category</span>
                </a>
                <Link
                  href="/book-appointment?service=mutual-funds"
                  className="px-6 py-3.5 rounded-full bg-surface border border-border-custom hover:border-emerald-500/50 text-text-primary font-bold text-xs sm:text-sm text-center transition-all hover:bg-surface/80 inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span>Schedule Free Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. WHY SPEAKING WITH A FINANCIAL PROFESSIONAL (FROM USER DOCUMENT) ── */}
        <section id="why-professional" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Professional Advisory Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Why Speaking with a Financial Professional Before You Invest Can Make a Difference
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Investing is about more than choosing a mutual fund.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              It’s about understanding how your investments fit into your overall financial goals. Whether you’re investing for retirement, your child’s education, wealth creation, or another milestone, having a clear investment plan can help you make more informed decisions.
            </p>
            <p className="text-sm sm:text-base font-semibold text-text-primary">
              That’s why many investors choose to speak with a financial professional before they begin.
            </p>
          </div>

          {/* 6 Understandings from a Meaningful Conversation */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-12">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-2">
                A Meaningful Conversation Can Help You Better Understand:
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary">
                Professional guidance clarifies critical areas before committing your hard-earned money:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <PieChart className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">Mutual Fund Categories</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Large, mid, flexi, hybrid, and debt allocations</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Sliders className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">SIP &amp; Lump Sum Investing</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Determining the right investment approach for your cashflow</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">Risks &amp; Market Fluctuations</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Understanding volatility cushions and downside protection</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">Tax-Saving Options</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Section 80C ELSS benefits and capital gains tax rules</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">Documentation &amp; KYC</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Streamlining PAN, Aadhaar, and bank validation seamlessly</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary">Overall Investment Process</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">From account activation to automated folio tracking</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3 text-xs sm:text-sm text-text-primary font-medium">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>More importantly, it gives you an opportunity to ask questions before making financial decisions.</span>
            </div>
          </div>

          {/* Questions Worth Asking Before You Invest */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-12">
            <div className="max-w-3xl mb-8 space-y-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Pre-Investment Checklist
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Questions Worth Asking Before You Invest
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Before investing, consider asking questions like these during your consultation:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { q: "Which mutual fund categories should I understand based on my financial goals?", sub: "Category alignment for your specific timeline" },
                { q: "What level of investment risk am I comfortable with?", sub: "Balancing equity exposure with debt or hybrid cushions" },
                { q: "Should I invest regularly or as a lump sum?", sub: "Evaluating cashflow vs available investible surplus" },
                { q: "What documents do I need before investing?", sub: "KYC readiness, PAN linking, and mandate registration" },
                { q: "What costs or charges should I understand?", sub: "Expense ratios, exit loads, and transaction transparency" },
                { q: "How can I track my investments after I start?", sub: "Portfolio reviews, rebalancing triggers, and performance monitoring" },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-background border border-border-custom hover:border-emerald-500/30 transition-all flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-primary leading-snug">
                      {item.q}
                    </h4>
                    <p className="text-[11px] text-text-secondary mt-1">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              The answers to these questions can help you invest with greater clarity and confidence.
            </p>
          </div>

          {/* Investing Starts with Understanding Banner */}
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-surface border border-emerald-500/25 relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Core Philosophy
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Investing Starts with Understanding
              </h3>
              <p className="text-sm sm:text-base font-bold text-text-primary">
                The goal isn’t simply to choose a mutual fund.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                The goal is to make an informed financial decision based on your individual circumstances.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Speaking with the right financial professional can help you understand your options before taking the next step.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#matchmaker"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Connect with a Financial Professional</span>
                </a>
                <Link
                  href="/book-appointment?service=mutual-funds"
                  className="px-6 py-3.5 rounded-full bg-surface border border-border-custom hover:border-emerald-500/50 text-text-primary font-bold text-xs sm:text-sm text-center transition-all hover:bg-surface/80 inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-emerald-500" />
                  <span>Book Free 1-on-1 Call</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. HOW WE HELP YOU GET STARTED (FROM USER DOCUMENT) ── */}
        <section id="matchmaker" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Getting Started Made Simple
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              How We Help You Get Started
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Finding the right financial professional doesn’t have to be complicated.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Our platform is designed to make it easier for individuals and families to connect with financial professionals based on their investment needs and financial goals. Whether you’re planning to start your first SIP, explore mutual funds, or review your existing investments, we’re here to help you take the first step.
            </p>
          </div>

          {/* Here's How It Works - 4 Step Progression */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                Here’s How It Works
              </h3>
              <span className="text-xs text-text-secondary font-mono">4 Simple Steps to Clarity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between group shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    Tell Us About Your Requirements
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Share a few basic details about your financial goals and the kind of assistance you’re looking for.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Takes &lt; 2 minutes
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between group shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    Get Connected
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
                    Based on your requirements, we’ll help connect you with the right financial professional for your investment goals.
                  </p>
                  {/* Relevant professional tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">AMFI ARN Holder</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-semibold">SEBI RIA</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-semibold">Wealth Manager</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-semibold">Chartered Accountant</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-blue-600 dark:text-blue-400">
                  Vetted credentials
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between group shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    Discuss Your Financial Goals
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Have a one-on-one conversation, ask your questions, and understand the available investment options before making a decision.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-teal-600 dark:text-teal-400">
                  Audio or video session
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all flex flex-col justify-between group shadow-sm">
                <div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                    04
                  </div>
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    Decide at Your Own Pace
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Take your time. Review your options, ask additional questions if needed, and decide whether you want to proceed.
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                    There is no obligation to invest simply because you requested a consultation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-purple-600 dark:text-purple-400">
                  Zero sales pressure
                </div>
              </div>
            </div>
          </div>

          {/* Why People Choose Our Platform - 5 Pillars */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-14">
            <div className="max-w-3xl mb-8 space-y-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Platform Principles
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Why People Choose Our Platform
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                We believe financial advice should be transparent, unbiased, and completely pressure-free:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Educational Approach</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Focused on helping you understand before you invest.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Targeted Matching</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Access to financial professionals based on your specific requirements.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Simple &amp; Transparent</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Clear process with zero hidden agendas or complicated terms.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Free Consultation Request</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Request consultation completely free of cost.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3 md:col-span-2 lg:col-span-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Zero Pressure Guarantee</h4>
                  <p className="text-xs text-text-secondary mt-0.5">No pressure to make an immediate investment decision. Take all the time you need.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
              <p className="text-sm sm:text-base font-bold text-text-primary">
                Our goal is simple — to help you start your investment journey with greater clarity and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
        <section id="faqs" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
              Clear &amp; Transparent Answers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Find answers to the most common questions investors have about mutual funds and our connection platform.
            </p>
          </div>

          <div className="space-y-3.5 max-w-4xl">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={faq.id}
                  className="bg-surface border border-border-custom rounded-2xl overflow-hidden transition-all hover:border-emerald-500/40 shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shrink-0">
                        {String(faq.id).padStart(2, "0")}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-text-primary font-display group-hover:text-emerald-500 transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <span
                      className={`text-emerald-500 font-mono text-xl transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-custom/50 whitespace-pre-line pl-16">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 8. IMPORTANT INFORMATION (TRANSPARENCY & STATUTORY) ── */}
        <section id="important-information" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-lg">
            <div className="max-w-3xl mb-8 space-y-4">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Transparency &amp; Disclosures
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-text-primary">
                Important Information
              </h2>
              <p className="text-base sm:text-lg font-bold text-text-primary leading-relaxed">
                We believe that every investment decision should be based on understanding, not assumptions.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Our platform is designed to help you connect with financial professionals and provide educational information about mutual funds.
              </p>
            </div>

            {/* Complete Transparency Grid */}
            <div className="bg-background/90 border border-border-custom rounded-2xl p-6 sm:p-8 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>To ensure complete transparency:</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>We are not a SEBI Registered Investment Adviser (RIA).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>We do not recommend or endorse specific mutual fund schemes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>We do not provide personalised investment advice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>We do not execute or process mutual fund investments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>We do not guarantee investment returns or outcomes.</span>
                </li>
              </ul>
            </div>

            {/* Direct Relationship Notice */}
            <div className="p-4 sm:p-5 rounded-xl bg-surface border border-border-custom mb-6 text-xs sm:text-sm text-text-secondary leading-relaxed flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <span>
                Any investment decisions, recommendations, or transactions take place directly between you and the financial professional you choose to engage.
              </span>
            </div>

            {/* Statutory Market Risk Warning */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-amber-700 dark:text-amber-300 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">Statutory Market Risk Warning:</strong>
                Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. READY TO START YOUR INVESTMENT JOURNEY? (TAKE THE NEXT STEP) ── */}
        <section id="ready-to-start" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="bg-gradient-to-br from-emerald-500/10 via-surface to-background border border-emerald-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
            {/* Background Ambient Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10 space-y-4">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Begin With Confidence
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
                Ready to Start Your Investment Journey?
              </h2>
              <p className="text-base sm:text-lg font-bold text-text-primary leading-relaxed">
                Every successful investment begins with the right information.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Whether you’re planning your first SIP, exploring mutual funds for long-term wealth creation, saving for retirement, or simply looking to understand your options, taking guidance before you invest can help you make more informed financial decisions.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Our platform makes it easy to connect with the right financial professional for your investment goals.
              </p>
            </div>

            {/* Take the Next Step Subhead */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-extrabold font-display text-text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-500" />
                <span>Take the Next Step</span>
              </h3>
            </div>

            {/* 3 Action Pathways */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Path 1: Find the Right Financial Professional */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Find the Right Financial Professional
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Answer a few basic details about your financial goals and get connected with verified professionals (AMFI ARN holders or SEBI RIAs).
                  </p>
                </div>
                <a
                  href="#matchmaker"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm text-center transition-all block shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Find the Right Professional →
                </a>
              </div>

              {/* Path 2: Book a Free Consultation */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Book a Free Consultation
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Schedule a 1-on-1 audio or video discussion at a date and time convenient for you. Ask all your questions with zero obligation.
                  </p>
                </div>
                <Link
                  href="/book-appointment?service=mutual-funds"
                  className="w-full py-3 rounded-xl bg-surface border border-border-custom hover:border-emerald-500/50 text-text-primary font-bold text-xs sm:text-sm text-center transition-all block hover:bg-surface/80"
                >
                  Book Free Consultation →
                </Link>
              </div>

              {/* Path 3: Request a Callback */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Request a Callback
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Short on time? Simply provide your contact number and an experienced financial advisor will phone you back within 2 hours.
                  </p>
                </div>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm text-center transition-all block shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Request a Callback →
                </a>
              </div>
            </div>

            {/* Closing Slogan Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <p className="text-base sm:text-lg font-extrabold font-display text-emerald-600 dark:text-emerald-400">
                Start your investment journey with greater clarity and confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ── 10. FINAL STATS & REGULATORY DISCLAIMER ── */}
        <section className="border-t border-border-custom pt-10 text-left space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-center">
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-500">₹500</div>
              <div className="text-xs text-text-secondary mt-0.5">Min. Monthly SIP</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-500">10,000+</div>
              <div className="text-xs text-text-secondary mt-0.5">Investors Guided</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-500">4.9 ★</div>
              <div className="text-xs text-text-secondary mt-0.5">User Satisfaction</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-500">&lt; 2 Hrs</div>
              <div className="text-xs text-text-secondary mt-0.5">Avg. Callback SLA</div>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-text-secondary/70 leading-relaxed font-sans">
            <strong>Regulatory &amp; Statutory Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. InsurEdge is an unbiased discovery and lead connection platform connecting users with third-party SEBI/AMFI certified financial professionals. We do not handle investor funds or execute transactions directly. Past performance does not guarantee future results.
          </p>
        </section>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR (for phone responsiveness) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border-custom px-4 py-3 flex items-center justify-between gap-3 md:hidden shadow-2xl">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex-1 py-2.5 px-3 rounded-full bg-background border border-border-custom text-text-primary font-bold text-xs text-center flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="h-3.5 w-3.5 text-emerald-500" />
          <span>Quick Callback</span>
        </a>
        <Link
          href="/book-appointment?service=mutual-funds"
          className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Book Free Call</span>
        </Link>
      </div>
    </div>
  );
}
