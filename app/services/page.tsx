"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  HeartPulse,
  TrendingUp,
  UserCheck,
  Landmark,
  Calculator,
  ChevronRight,
  FileCheck2,
  PhoneCall,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceTab = "term" | "health" | "savings" | "mutual-funds" | "claims";

function ServicesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<ServiceTab>("term");

  useEffect(() => {
    const tabParam = searchParams.get("tab") as ServiceTab;
    if (tabParam && ["term", "health", "savings", "mutual-funds", "claims"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Premium Estimator State
  const [termAge, setTermAge] = useState<number>(30);
  const [termCover, setTermCover] = useState<number>(10000000); // 1 Cr
  const [isSmoker, setIsSmoker] = useState<boolean>(false);
  const [termPremium, setTermPremium] = useState<number>(750);

  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipReturn, setSipReturn] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(15);
  const [sipResult, setSipResult] = useState({ invested: 0, returns: 0, total: 0 });

  // Recalculate Term Premium
  useEffect(() => {
    let base = 400;
    // Age factor
    if (termAge > 30) base += (termAge - 30) * 25;
    else if (termAge < 30) base -= (30 - termAge) * 10;
    
    // Cover factor
    base = base * (termCover / 5000000);
    
    // Smoker factor
    if (isSmoker) base = base * 1.8;
    
    setTermPremium(Math.round(base));
  }, [termAge, termCover, isSmoker]);

  // Recalculate SIP value
  useEffect(() => {
    const P = sipMonthly;
    const i = (sipReturn / 100) / 12;
    const n = sipYears * 12;
    
    const totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const totalInvested = P * n;
    const totalReturns = totalValue - totalInvested;

    setSipResult({
      invested: Math.round(totalInvested),
      returns: Math.round(totalReturns),
      total: Math.round(totalValue),
    });
  }, [sipMonthly, sipReturn, sipYears]);

  const tabs: { id: ServiceTab; label: string; icon: React.ComponentType<any> }[] = [
    { id: "term", label: "Term Insurance", icon: ShieldCheck },
    { id: "health", label: "Health Insurance", icon: HeartPulse },
    { id: "savings", label: "Savings Plans", icon: Landmark },
    { id: "mutual-funds", label: "Mutual Funds", icon: TrendingUp },
    { id: "claims", label: "Claim Assistant", icon: UserCheck },
  ];

  return (
    <div className="font-sans text-text-primary transition-colors duration-300">
      <div className="mesh" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Services</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4 text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Insurance &amp; <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Categories</span>
          </h1>
          <p className="text-base text-text-secondary leading-relaxed">
            Unbiased protection planning and disciplined wealth accumulation models. Certified, IRDAI and SEBI registered advisory support.
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="flex overflow-x-auto pb-3 mb-10 border-b border-border-custom no-scrollbar space-x-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                    : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {activeTab === "term" && (
                <>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary-custom uppercase tracking-widest block font-mono">
                      Security &amp; Family Protection
                    </span>
                    <h2 className="text-3xl font-extrabold font-display text-text-primary">
                      Pure Term Insurance Cover
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      Term insurance provides pure financial replacement value for your family. Unlike ULIPs or endowment products, 100% of your premium goes toward high coverage limits, avoiding expensive fund management charges.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">High Sum Assured</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Get covered up to ₹2 Crores based on your current age, income parameters, and family structure.
                      </p>
                    </div>
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">Riders &amp; Add-ons</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Incorporate Critical Illness, Waiver of Premium, and Accidental Death benefits directly into your policy.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary-custom/5 rounded-2xl p-5 border border-primary-custom/15 flex items-start space-x-3 text-xs">
                    <Info className="h-5 w-5 text-primary-custom flex-shrink-0 mt-0.5" />
                    <div className="text-text-secondary leading-relaxed">
                      <strong className="text-text-primary block mb-0.5">Tax Exemption Note:</strong> Term insurance premiums paid are fully deductible up to ₹1.5 Lakhs annually under Section 80C of the Income Tax Act.
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/term-insurance"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-custom to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary-custom/20 hover:opacity-95 transition-opacity inline-flex items-center gap-1.5"
                    >
                      <span>Explore Term Insurance Myths &amp; Complete Guide</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}

              {activeTab === "health" && (
                <>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary-custom uppercase tracking-widest block font-mono">
                      Healthcare &amp; Emergency Care
                    </span>
                    <h2 className="text-3xl font-extrabold font-display text-text-primary">
                      Cashless Health Protection
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      Secure your savings from medical inflation. We design family floater and individual health profiles that feature cashless hospitalizations, covering inpatient care, pre &amp; post hospital costs, and outpatient procedures.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">10,000+ Cashless Networks</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Instant cashless admissions across leading multi-specialty healthcare centers in India.
                      </p>
                    </div>
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">No Room Rent Sublimits</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        We recommend plans that let you choose any single private room without proportional deduction penalty charges.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary-custom/5 rounded-2xl p-5 border border-primary-custom/15 flex items-start space-x-3 text-xs">
                    <Info className="h-5 w-5 text-primary-custom flex-shrink-0 mt-0.5" />
                    <div className="text-text-secondary leading-relaxed">
                      <strong className="text-text-primary block mb-0.5">Tax Exemption Note:</strong> Health insurance premiums help you claim up to ₹25,000 (self/family) and up to ₹50,000 (senior parents) under Section 80D.
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/health-insurance"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 hover:opacity-95 transition-opacity inline-flex items-center gap-1.5"
                    >
                      <span>Explore Complete Health Insurance Guide</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}

              {activeTab === "savings" && (
                <>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary-custom uppercase tracking-widest block font-mono">
                      Assured Returns &amp; Wealth
                    </span>
                    <h2 className="text-3xl font-extrabold font-display text-text-primary">
                      Guaranteed Savings &amp; Tax Plans
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      Protect your milestones like children&apos;s higher education or retirement capital. We filter through guaranteed savings products to find low-cost, capital-safe structures matching your investment horizon.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">Guaranteed Milestones</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Ensure tax-free maturity returns under section 10(10D) for your absolute financial targets.
                      </p>
                    </div>
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">Zero Market Volatility</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        100% capital protection. Assured additions that accumulate year-on-year, unaffected by index corrections.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "mutual-funds" && (
                <>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary-custom uppercase tracking-widest block font-mono">
                      Mutual Fund Investment in India
                    </span>
                    <h2 className="text-3xl font-extrabold font-display text-text-primary">
                      Invest Smarter. Build Wealth with the Right Financial Professional.
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      Whether you’re planning your first SIP, investing for your family’s future, saving for retirement, or working towards long-term wealth creation, mutual funds can play an important role in your financial journey.
                    </p>
                    <p className="text-text-secondary leading-relaxed text-xs">
                      The challenge isn’t just deciding whether to invest—it’s understanding where to begin. Connect with experienced financial professionals to explore investment options without any obligation to invest.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">Experienced Professionals</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Match with vetted advisors based on your specific requirements, timeline, and risk comfort.
                      </p>
                    </div>
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">Zero-Obligation Learning</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Get answers to your investment questions in simple language before committing any money.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/mutual-funds"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 hover:opacity-95 transition-opacity inline-flex items-center gap-1.5"
                    >
                      <span>Explore Mutual Funds Hub</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}

              {activeTab === "claims" && (
                <>
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-primary-custom uppercase tracking-widest block font-mono">
                      Lifetime Personal Advocacy
                    </span>
                    <h2 className="text-3xl font-extrabold font-display text-text-primary">
                      Dedicated Claim Assistance
                    </h2>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      The true value of insurance is realized at the time of claims. Unlike traditional platforms that hand you toll-free numbers, InsurEdge provides an expert handler to guide your family through paperwork, pre-authorization, and final billing queries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">98.5% Settlement Support</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        We review claim definitions and medical terms proactively to avoid technical rejections by TPAs.
                      </p>
                    </div>
                    <div className="bg-surface border border-border-custom rounded-2xl p-5">
                      <h4 className="font-bold text-text-primary text-sm mb-1.5">24-Hour Emergency Desk</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Active escalation links to handle hospital admissions disputes or delayed cashless clearance issues.
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-3 flex-wrap">
                <Link href="/contact">
                  <button className="btn-primary-custom font-bold">
                    Book Free Consultation
                  </button>
                </Link>
                <Link href="/plans" className="btn-outline-custom">
                  Compare Plans
                </Link>
              </div>
            </div>

            {/* Right Interactive Calculator Column */}
            <div className="lg:col-span-5 bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-sm">
              {activeTab === "term" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-text-primary font-bold border-b border-border-custom pb-4">
                    <Calculator className="h-5 w-5 text-primary-custom" />
                    <h3>Term Premium Estimator</h3>
                  </div>

                  {/* Age Input */}
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">Your Current Age</span>
                      <span className="font-bold text-primary-custom">{termAge} Years</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={termAge}
                      onChange={(e) => setTermAge(parseInt(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  {/* Cover Input */}
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">Sum Assured Cover</span>
                      <span className="font-bold text-primary-custom">₹{(termCover / 10000000).toFixed(1)} Cr</span>
                    </div>
                    <input
                      type="range"
                      min="5000000"
                      max="20000000"
                      step="2500000"
                      value={termCover}
                      onChange={(e) => setTermCover(parseInt(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  {/* Smoker Toggle */}
                  <div className="flex items-center justify-between py-2 border-y border-border-custom font-sans text-xs font-semibold">
                    <span className="text-text-secondary">Do you consume tobacco/nicotine?</span>
                    <button
                      onClick={() => setIsSmoker(!isSmoker)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isSmoker ? "bg-primary-custom" : "bg-border-custom"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isSmoker ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Calculations Display */}
                  <div className="bg-[#111827] border border-border-custom text-white rounded-2xl p-5 text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-primary-custom font-bold">Estimated Premium</span>
                    <div className="text-2xl font-extrabold text-white">₹{termPremium} <span className="text-xs font-normal text-text-secondary">/ month</span></div>
                    <span className="text-[9px] text-text-secondary block font-sans">* Subject to underwriting. Taxes extra.</span>
                  </div>
                </div>
              )}

              {activeTab === "health" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-text-primary font-bold border-b border-border-custom pb-4">
                    <Calculator className="h-5 w-5 text-primary-custom" />
                    <h3>Health Premium Estimator</h3>
                  </div>

                  <div className="space-y-4 font-sans text-xs text-text-secondary">
                    <p className="leading-relaxed">
                      Health insurance premiums are computed based on family setup, geographical medical zones, and corporate exclusions.
                    </p>
                    <div className="space-y-3 bg-background/50 border border-border-custom rounded-2xl p-4">
                      <div className="flex justify-between border-b border-border-custom pb-2 font-semibold">
                        <span>Individual (Age 30)</span>
                        <strong className="text-text-primary">~ ₹550 / mo</strong>
                      </div>
                      <div className="flex justify-between border-b border-border-custom pb-2 font-semibold">
                        <span>Spouse + Self (Age 30)</span>
                        <strong className="text-text-primary">~ ₹850 / mo</strong>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Family (2 Adults + 1 Child)</span>
                        <strong className="text-text-primary">~ ₹1,100 / mo</strong>
                      </div>
                    </div>
                    <Link href="/contact" className="w-full btn-primary-custom justify-center py-3 text-xs font-bold rounded-xl mt-2">
                      Request Quote Breakdowns
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "savings" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-text-primary font-bold border-b border-border-custom pb-4">
                    <Calculator className="h-5 w-5 text-primary-custom" />
                    <h3>Savings Plan Estimator</h3>
                  </div>

                  <div className="space-y-4 font-sans text-xs text-text-secondary">
                    <p className="leading-relaxed">
                      Guaranteed plans lock in interest rates. Ideal for parents building solid educational blocks.
                    </p>
                    <div className="bg-background/50 border border-border-custom rounded-2xl p-5 space-y-3">
                      <div>
                        <span className="text-[10px] text-text-secondary block">Annual Investment</span>
                        <span className="font-bold text-text-primary text-sm">₹1,00,000 / year</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary block">Term Horizon</span>
                        <span className="font-bold text-text-primary text-sm">10 Years Pay → 20 Years Maturity</span>
                      </div>
                      <div className="border-t border-border-custom pt-3.5 flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase text-primary-custom">Tax-Free Returns</span>
                        <strong className="text-text-primary text-sm">₹22.4 Lakhs*</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "mutual-funds" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-text-primary font-bold border-b border-border-custom pb-4">
                    <Calculator className="h-5 w-5 text-primary-custom" />
                    <h3>SIP Calculator</h3>
                  </div>

                  {/* Monthly Investment Slider */}
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">Monthly Contribution</span>
                      <span className="font-bold text-primary-custom">₹{sipMonthly.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={sipMonthly}
                      onChange={(e) => setSipMonthly(parseInt(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  {/* Rate of Return Slider */}
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">Expected Rate of Return</span>
                      <span className="font-bold text-primary-custom">{sipReturn}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="22"
                      step="0.5"
                      value={sipReturn}
                      onChange={(e) => setSipReturn(parseFloat(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  {/* Time Horizon Slider */}
                  <div className="space-y-2 font-sans text-xs">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">Time Horizon</span>
                      <span className="font-bold text-primary-custom">{sipYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      value={sipYears}
                      onChange={(e) => setSipYears(parseInt(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  {/* Calculation Values */}
                  <div className="bg-[#111827] border border-border-custom text-white rounded-2xl p-4.5 space-y-3 font-sans text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total Invested:</span>
                      <span className="font-bold text-white">₹{sipResult.invested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Est. Growth Returns:</span>
                      <span className="font-bold text-accent-custom">₹{sipResult.returns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-border-custom pt-2.5 text-sm font-bold">
                      <span>Total Future Value:</span>
                      <span className="text-accent-custom">₹{sipResult.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "claims" && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-text-primary font-bold border-b border-border-custom pb-4">
                    <PhoneCall className="h-5 w-5 text-primary-custom" />
                    <h3>Claim Assistance Flow</h3>
                  </div>

                  <div className="space-y-4 font-sans text-xs text-text-secondary">
                    <div className="relative border-l border-border-custom pl-6 ml-3 space-y-6">
                      <div className="relative">
                        <span className="absolute -left-[30px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-custom text-[10px] text-white font-bold font-mono">1</span>
                        <h4 className="font-bold text-text-primary text-xs">Emergency Alert</h4>
                        <p className="text-text-secondary mt-0.5">Call our claim support handler or WhatsApp hospital details instantly.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[30px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-custom text-[10px] text-white font-bold font-mono">2</span>
                        <h4 className="font-bold text-text-primary text-xs">Pre-Auth Coordination</h4>
                        <p className="text-text-secondary mt-0.5">We coordinate with TPA desks to clear medical criteria approvals.</p>
                      </div>
                      <div className="relative">
                        <span className="absolute -left-[30px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-custom text-[10px] text-white font-bold font-mono">3</span>
                        <h4 className="font-bold text-text-primary text-xs">Documentation filing</h4>
                        <p className="text-text-secondary mt-0.5">We compile hospital papers, bills, and discharge papers for fast payouts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-custom"></div>
      </div>
    }>
      <ServicesContent />
    </Suspense>
  );
}
