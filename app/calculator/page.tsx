"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calculator, Landmark, ShieldCheck, Hourglass, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CalculatorType = "sip" | "insurance" | "retirement";

export default function PremiumCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("sip");

  // ==========================================
  // 1. SIP CALCULATOR STATE
  // ==========================================
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipReturnRate, setSipReturnRate] = useState(12);
  const [sipYears, setSipYears] = useState(15);
  const [sipResults, setSipResults] = useState({
    invested: 0,
    gain: 0,
    total: 0,
  });

  // Calculate SIP
  useEffect(() => {
    const P = sipMonthly;
    const i = sipReturnRate;
    const n = sipYears;
    
    const r = i / 12 / 100;
    const months = n * 12;
    
    // Future Value of an Annuity Due formula
    // M = P * [((1 + r)^n - 1) / r] * (1 + r)
    let totalValue = 0;
    if (r > 0) {
      totalValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    } else {
      totalValue = P * months;
    }
    
    const investedAmount = P * months;
    const returnsGained = Math.max(0, totalValue - investedAmount);
    
    setSipResults({
      invested: Math.round(investedAmount),
      gain: Math.round(returnsGained),
      total: Math.round(totalValue),
    });
  }, [sipMonthly, sipReturnRate, sipYears]);

  // ==========================================
  // 2. INSURANCE CALCULATOR STATE
  // ==========================================
  const [insAge, setInsAge] = useState(30);
  const [insIncome, setInsIncome] = useState(1200000); // 12 LPA
  const [insExpenses, setInsExpenses] = useState(40000); // 40k PM
  const [insLoans, setInsLoans] = useState(2500000); // 25 Lakhs
  const [insExistingCover, setInsExistingCover] = useState(1000000); // 10 Lakhs
  const [insResults, setInsResults] = useState({
    required: 0,
    gap: 0,
    factor: 20,
  });

  // Calculate Insurance Needs (Human Life Value approach)
  useEffect(() => {
    let factor = 20;
    if (insAge < 35) factor = 20;
    else if (insAge <= 45) factor = 15;
    else if (insAge <= 55) factor = 10;
    else factor = 5;

    // Coverage Needed = (Annual Income * multiplier) + Liabilities - Existing Cover
    const grossNeeded = insIncome * factor + insLoans;
    const netGap = Math.max(0, grossNeeded - insExistingCover);

    setInsResults({
      required: grossNeeded,
      gap: netGap,
      factor,
    });
  }, [insAge, insIncome, insExpenses, insLoans, insExistingCover]);

  // ==========================================
  // 3. RETIREMENT PLANNER STATE
  // ==========================================
  const [retCurrentAge, setRetCurrentAge] = useState(30);
  const [retTargetAge, setRetTargetAge] = useState(60);
  const [retExpenses, setRetExpenses] = useState(50000); // 50k PM
  const [retExpectancy, setRetExpectancy] = useState(85);
  const [retInflation, setRetInflation] = useState(6);
  const [retReturnPre, setRetReturnPre] = useState(12);
  const [retReturnPost, setRetReturnPost] = useState(8);
  const [retResults, setRetResults] = useState({
    futureExpenses: 0,
    corpus: 0,
    monthlySavings: 0,
  });

  // Calculate Retirement Need
  useEffect(() => {
    const yearsToRet = Math.max(0, retTargetAge - retCurrentAge);
    const yearsInRet = Math.max(1, retExpectancy - retTargetAge);
    
    // Future Monthly Expenses
    const futureMonthly = retExpenses * Math.pow(1 + retInflation / 100, yearsToRet);
    const annualFutureExpenses = futureMonthly * 12;
    
    // Real Return Rate post-retirement
    // r_real = [(1 + r_post) / (1 + inflation)] - 1
    const rPost = retReturnPost / 100;
    const inf = retInflation / 100;
    const rReal = (1 + rPost) / (1 + inf) - 1;
    
    // Corpus needed (PV of Annuity Due at retirement)
    let corpusNeeded = 0;
    if (rReal !== 0) {
      corpusNeeded = annualFutureExpenses * ((1 - Math.pow(1 + rReal, -yearsInRet)) / rReal) * (1 + rReal);
    } else {
      corpusNeeded = annualFutureExpenses * yearsInRet;
    }
    
    // Target Monthly Savings pre-retirement (FV of Annuity)
    // S = Corpus * [ r_pre / ((1 + r_pre)^n - 1) ] / (1 + r_pre)
    const rPre = retReturnPre / 12 / 100;
    const monthsPre = yearsToRet * 12;
    let savingsMonthly = 0;
    
    if (monthsPre > 0) {
      if (rPre > 0) {
        savingsMonthly = (corpusNeeded * rPre) / (Math.pow(1 + rPre, monthsPre) - 1);
      } else {
        savingsMonthly = corpusNeeded / monthsPre;
      }
    }

    setRetResults({
      futureExpenses: Math.round(futureMonthly),
      corpus: Math.round(corpusNeeded),
      monthlySavings: Math.round(savingsMonthly),
    });
  }, [retCurrentAge, retTargetAge, retExpenses, retExpectancy, retInflation, retReturnPre, retReturnPost]);

  // Donut SVG constants
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-16 border-b border-border-custom bg-surface/30">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">Calculators</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Financial <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Planning Hub</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Accurate, logic-backed premium simulators to secure your goals. Toggle between plans below.
          </p>
        </div>
      </section>

      {/* Main interactive segment */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Tab selectors */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-10 overflow-x-auto no-scrollbar py-2">
            {[
              { id: "sip", label: "SIP Wealth Builder", icon: <Landmark size={18} /> },
              { id: "insurance", label: "HLV Insurance Coverage", icon: <ShieldCheck size={18} /> },
              { id: "retirement", label: "Retirement Planner", icon: <Hourglass size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CalculatorType)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary-custom text-white shadow-md shadow-primary-custom/20"
                    : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input card column */}
            <div className="lg:col-span-7 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-6">
              
              <AnimatePresence mode="wait">
                {/* 1. SIP CALCULATOR PANEL */}
                {activeTab === "sip" && (
                  <motion.div
                    key="sip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 text-text-primary">
                      <Landmark className="text-primary-custom" />
                      <h3 className="font-display font-bold text-lg">SIP Compounding Inputs</h3>
                    </div>

                    {/* Monthly SIP */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Monthly Investment</span>
                        <span className="text-primary-custom font-bold">₹{sipMonthly.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="200000"
                        step="500"
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>₹500</span>
                        <span>₹2,00,000</span>
                      </div>
                    </div>

                    {/* Return Rate */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Expected Return Rate (p.a.)</span>
                        <span className="text-primary-custom font-bold">{sipReturnRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.5"
                        value={sipReturnRate}
                        onChange={(e) => setSipReturnRate(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>1%</span>
                        <span>30%</span>
                      </div>
                    </div>

                    {/* Years */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Time Horizon</span>
                        <span className="text-primary-custom font-bold">{sipYears} Years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="40"
                        value={sipYears}
                        onChange={(e) => setSipYears(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>1 Yr</span>
                        <span>40 Yrs</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. INSURANCE COVERAGE PANEL */}
                {activeTab === "insurance" && (
                  <motion.div
                    key="insurance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 text-text-primary">
                      <ShieldCheck className="text-primary-custom" />
                      <h3 className="font-display font-bold text-lg">Human Life Value Audit</h3>
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Current Age</span>
                        <span className="text-primary-custom font-bold">{insAge} Years</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="65"
                        value={insAge}
                        onChange={(e) => setInsAge(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>18 Yrs</span>
                        <span>65 Yrs</span>
                      </div>
                    </div>

                    {/* Annual Income */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Annual Take-Home Income</span>
                        <span className="text-primary-custom font-bold">₹{insIncome.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="100000"
                        max="15000000"
                        step="50000"
                        value={insIncome}
                        onChange={(e) => setInsIncome(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>₹1 Lakh</span>
                        <span>₹1.5 Crores</span>
                      </div>
                    </div>

                    {/* Liabilities */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Outstanding Loans &amp; Liabilities</span>
                        <span className="text-primary-custom font-bold">₹{insLoans.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        step="100000"
                        value={insLoans}
                        onChange={(e) => setInsLoans(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>₹0</span>
                        <span>₹5 Crores</span>
                      </div>
                    </div>

                    {/* Existing Cover */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Existing Life Insurance Coverage</span>
                        <span className="text-primary-custom font-bold">₹{insExistingCover.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30000000"
                        step="100000"
                        value={insExistingCover}
                        onChange={(e) => setInsExistingCover(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>₹0</span>
                        <span>₹3 Crores</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. RETIREMENT PLANNER PANEL */}
                {activeTab === "retirement" && (
                  <motion.div
                    key="retirement"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border-custom pb-3 text-text-primary">
                      <Hourglass className="text-primary-custom" />
                      <h3 className="font-display font-bold text-lg">Retirement Corpus Goals</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Age */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Current Age</span>
                          <span className="text-primary-custom font-bold">{retCurrentAge} Yrs</span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="59"
                          value={retCurrentAge}
                          onChange={(e) => setRetCurrentAge(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>

                      {/* Target Retirement Age */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Retirement Age</span>
                          <span className="text-primary-custom font-bold">{retTargetAge} Yrs</span>
                        </div>
                        <input
                          type="range"
                          min={Math.max(40, retCurrentAge + 1)}
                          max="75"
                          value={retTargetAge}
                          onChange={(e) => setRetTargetAge(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>
                    </div>

                    {/* Monthly Expense */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-text-secondary">Current Monthly Expenses</span>
                        <span className="text-primary-custom font-bold">₹{retExpenses.toLocaleString("en-IN")}</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="1000000"
                        step="5000"
                        value={retExpenses}
                        onChange={(e) => setRetExpenses(Number(e.target.value))}
                        className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                      />
                      <div className="flex justify-between text-[10px] text-text-secondary font-mono">
                        <span>₹5,000</span>
                        <span>₹10 Lakhs</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Expectancy */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Life Expectancy</span>
                          <span className="text-primary-custom font-bold">{retExpectancy} Yrs</span>
                        </div>
                        <input
                          type="range"
                          min={retTargetAge + 1}
                          max="100"
                          value={retExpectancy}
                          onChange={(e) => setRetExpectancy(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>

                      {/* Inflation */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Expected Inflation Rate</span>
                          <span className="text-primary-custom font-bold">{retInflation}%</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          step="0.5"
                          value={retInflation}
                          onChange={(e) => setRetInflation(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pre return */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Pre-Ret. Return (p.a.)</span>
                          <span className="text-primary-custom font-bold">{retReturnPre}%</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          step="0.5"
                          value={retReturnPre}
                          onChange={(e) => setRetReturnPre(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>

                      {/* Post return */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-text-secondary">Post-Ret. Return (p.a.)</span>
                          <span className="text-primary-custom font-bold">{retReturnPost}%</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="0.5"
                          value={retReturnPost}
                          onChange={(e) => setRetReturnPost(Number(e.target.value))}
                          className="w-full h-1.5 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Calculations & Results Column */}
            <div className="lg:col-span-5 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-6 text-center">
              
              <AnimatePresence mode="wait">
                
                {/* 1. SIP RESULTS VIEW */}
                {activeTab === "sip" && (
                  <motion.div
                    key="sip-res"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Circle chart */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r={radius} className="stroke-border-custom fill-none" strokeWidth="8" />
                          
                          {/* Invested segment */}
                          {sipResults.total > 0 && (
                            <circle
                              cx="50"
                              cy="50"
                              r={radius}
                              className="stroke-primary-custom fill-none"
                              strokeWidth="8"
                              strokeDasharray={circumference}
                              strokeDashoffset={circumference - (sipResults.invested / sipResults.total) * circumference}
                            />
                          )}

                          {/* Gain segment */}
                          {sipResults.total > 0 && sipResults.gain > 0 && (
                            <circle
                              cx="50"
                              cy="50"
                              r={radius}
                              className="stroke-[#8B5CF6] fill-none"
                              strokeWidth="8"
                              strokeDasharray={circumference}
                              strokeDashoffset={circumference - (sipResults.gain / sipResults.total) * circumference}
                              style={{
                                transform: `rotate(${(sipResults.invested / sipResults.total) * 360}deg)`,
                                transformOrigin: "50px 50px",
                              }}
                            />
                          )}
                        </svg>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-mono font-bold">Target Wealth</span>
                          <span className="text-lg font-extrabold text-text-primary mt-0.5">₹{sipResults.total.toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 text-xs font-semibold justify-center">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-primary-custom rounded-full"></span>
                          <span>Invested ({sipResults.total > 0 ? Math.round((sipResults.invested / sipResults.total) * 100) : 0}%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-[#8B5CF6] rounded-full"></span>
                          <span>Returns ({sipResults.total > 0 ? Math.round((sipResults.gain / sipResults.total) * 100) : 0}%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/40 border border-border-custom rounded-2xl p-5 text-left text-xs space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Invested Amount:</span>
                        <span className="font-bold text-text-primary">₹{sipResults.invested.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Est. Returns:</span>
                        <span className="font-bold text-text-primary">₹{sipResults.gain.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-t border-border-custom pt-3 flex justify-between font-extrabold text-sm text-text-primary">
                        <span>Total Wealth:</span>
                        <span className="text-accent-custom">₹{sipResults.total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. INSURANCE RESULTS VIEW */}
                {activeTab === "insurance" && (
                  <motion.div
                    key="ins-res"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Visual gap slider representation */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-full bg-background border border-border-custom rounded-2xl p-6 text-left space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-mono font-bold block">HLV Required Coverage</span>
                          <span className="text-3xl font-extrabold text-text-primary">₹{insResults.required.toLocaleString("en-IN")}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <span className="text-[10px] text-text-secondary font-semibold">Income Multiplier Rule:</span>
                          <span className="text-xs text-primary-custom font-bold block">{insResults.factor}x Annual Income based on age</span>
                        </div>
                      </div>

                      {insResults.gap > 0 ? (
                        <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 text-left space-y-2">
                          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
                            <span>Coverage Shortfall Detected</span>
                          </div>
                          <p className="text-[11px] text-text-secondary leading-relaxed">
                            Your liabilities and income needs exceed your existing insurance cover. You have a gap of:
                          </p>
                          <span className="text-lg font-bold text-rose-400">₹{insResults.gap.toLocaleString("en-IN")}</span>
                        </div>
                      ) : (
                        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-left space-y-2">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                            <span className="w-2.5. h-2.5 bg-emerald-500 rounded-full"></span>
                            <span>Fully Covered</span>
                          </div>
                          <p className="text-[11px] text-text-secondary">
                            Awesome! Your existing insurance coverage is sufficient to cover your liabilities and HLV replacement needs.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="bg-background/40 border border-border-custom rounded-2xl p-5 text-left text-xs space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Income Replacement Cover:</span>
                        <span className="font-bold text-text-primary">₹{(insIncome * insResults.factor).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Liabilities Coverage:</span>
                        <span className="font-bold text-text-primary">₹{insLoans.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Existing Policy Shield:</span>
                        <span className="font-bold text-text-primary">- ₹{insExistingCover.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="border-t border-border-custom pt-3 flex justify-between font-extrabold text-sm text-text-primary">
                        <span>Net Cover Shortfall:</span>
                        <span className="text-accent-custom">₹{insResults.gap.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. RETIREMENT RESULTS VIEW */}
                {activeTab === "retirement" && (
                  <motion.div
                    key="ret-res"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Corpus Display */}
                      <div className="bg-background border border-border-custom rounded-2xl p-6 text-left space-y-2">
                        <span className="text-[10px] text-text-secondary uppercase tracking-wider font-mono font-bold block">Retirement Corpus Needed</span>
                        <span className="text-3xl font-extrabold text-accent-custom">₹{retResults.corpus.toLocaleString("en-IN")}</span>
                        <p className="text-[10px] text-text-secondary leading-normal mt-2">
                          Accumulating this amount guarantees your post-retirement lifestyle, accounting for inflation and post-retirement yield.
                        </p>
                      </div>

                      {/* Required Monthly Savings */}
                      <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-2xl p-5 text-left space-y-1">
                        <span className="text-[10px] text-[#A78BFA] uppercase tracking-wider font-mono font-bold block">Required Monthly Investment</span>
                        <span className="text-2xl font-extrabold text-white">₹{retResults.monthlySavings.toLocaleString("en-IN")} <span className="text-xs text-text-secondary font-normal">/ mo</span></span>
                        <span className="text-[9px] text-text-secondary block mt-1">Based on building the corpus over {retTargetAge - retCurrentAge} years at {retReturnPre}% returns.</span>
                      </div>
                    </div>

                    <div className="bg-background/40 border border-border-custom rounded-2xl p-5 text-left text-xs space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Pre-Retirement Horizon:</span>
                        <span className="font-bold text-text-primary">{retTargetAge - retCurrentAge} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Expected Years in Retirement:</span>
                        <span className="font-bold text-text-primary">{retExpectancy - retTargetAge} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Future Monthly Expense (adjusted):</span>
                        <span className="font-bold text-text-primary">₹{retResults.futureExpenses.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* General CTA block */}
              <div className="pt-2 space-y-3">
                <Link href="/contact" className="w-full btn-primary-custom justify-center py-3.5 text-xs font-bold rounded-xl shadow-md cursor-pointer">
                  Request Free Expert Consultation <ArrowRight size={14} />
                </Link>
                <p className="text-[10px] text-text-secondary">
                  * Simulations represent mathematical compounding models. Market returns are subject to volatility.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
