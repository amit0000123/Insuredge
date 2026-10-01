"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Hourglass,
  ArrowRight,
  Check,
  Sparkles,
  PhoneCall,
  Calendar,
  Layers,
  Info,
  Clock,
  Zap,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CalculatorType = "compounding" | "insurance" | "retirement";
type FrequencyType = "one-time" | "monthly" | "yearly";

// Indian Number to Words converter (e.g. 10000 -> "Ten Thousand")
function numberToIndianWords(num: number): string {
  if (!num || isNaN(num) || num <= 0) return "Zero";

  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertHundreds(n: number): string {
    let str = "";
    if (n >= 100) {
      str += a[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      str += b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "") + " ";
    } else if (n > 0) {
      str += a[n] + " ";
    }
    return str.trim();
  }

  let n = Math.floor(num);
  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const remaining = n;

  const parts: string[] = [];
  if (crore > 0) parts.push(convertHundreds(crore) + " Crore");
  if (lakh > 0) parts.push(convertHundreds(lakh) + " Lakh");
  if (thousand > 0) parts.push(convertHundreds(thousand) + " Thousand");
  if (remaining > 0) parts.push(convertHundreds(remaining));

  return parts.join(" ") || "Zero";
}

function formatIndianCompact(val: number): string {
  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${Math.round(val).toLocaleString("en-IN")}`;
}

export default function PremiumCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorType>("compounding");

  // ==========================================
  // 1. POWER OF COMPOUNDING CALCULATOR STATE
  // ==========================================
  const [frequency, setFrequency] = useState<FrequencyType>("monthly");
  const [investAmount, setInvestAmount] = useState<number>(10000);
  const [investYears, setInvestYears] = useState<number>(10);
  const [stayYears, setStayYears] = useState<number>(20);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);

  // Maintain consistency: Stay invested for should be >= Invest for
  const handleInvestYearsChange = (val: number) => {
    setInvestYears(val);
    if (val > stayYears) {
      setStayYears(val);
    }
  };

  const handleStayYearsChange = (val: number) => {
    setStayYears(val);
    if (val < investYears) {
      setInvestYears(val);
    }
  };

  // Compounding Calculations
  const compoundingResults = useMemo(() => {
    let totalInvested = 0;
    let maturityValue = 0;

    const rYear = expectedReturn / 100;

    if (frequency === "monthly") {
      const P = investAmount;
      const i = rYear / 12;
      const nInvest = investYears * 12;

      // Phase 1: SIP accumulated at end of investYears (ordinary annuity with monthly compounding)
      let fv1 = 0;
      if (i > 0) {
        fv1 = P * ((Math.pow(1 + i, nInvest) - 1) / i) * (1 + i);
      } else {
        fv1 = P * nInvest;
      }

      totalInvested = P * nInvest;

      // Phase 2: Corpus grows without new deposits for the remaining (stayYears - investYears) years
      const extraYears = Math.max(0, stayYears - investYears);
      const extraMonths = extraYears * 12;
      if (extraMonths > 0) {
        maturityValue = fv1 * Math.pow(1 + i, extraMonths);
      } else {
        maturityValue = fv1;
      }
    } else if (frequency === "yearly") {
      const P = investAmount;
      const R = rYear;
      const nInvest = investYears;

      let fv1 = 0;
      if (R > 0) {
        fv1 = P * ((Math.pow(1 + R, nInvest) - 1) / R) * (1 + R);
      } else {
        fv1 = P * nInvest;
      }

      totalInvested = P * nInvest;

      const extraYears = Math.max(0, stayYears - investYears);
      if (extraYears > 0) {
        maturityValue = fv1 * Math.pow(1 + R, extraYears);
      } else {
        maturityValue = fv1;
      }
    } else {
      // One-time (Lump sum)
      const P = investAmount;
      totalInvested = P;
      maturityValue = P * Math.pow(1 + rYear, stayYears);
    }

    const wealthGained = Math.max(0, maturityValue - totalInvested);
    const multiplier = totalInvested > 0 ? (maturityValue / totalInvested).toFixed(1) : "1.0";

    // Chart curve points (generate up to stayYears points)
    const points: { year: number; invested: number; value: number }[] = [];
    const maxYear = Math.max(1, stayYears);

    for (let y = 0; y <= maxYear; y++) {
      let invAtY = 0;
      let valAtY = 0;

      if (frequency === "monthly") {
        const i = rYear / 12;
        const invY = Math.min(y, investYears);
        const mCount = invY * 12;
        invAtY = investAmount * mCount;

        let fvPhase1 = 0;
        if (i > 0) {
          fvPhase1 = investAmount * ((Math.pow(1 + i, mCount) - 1) / i) * (1 + i);
        } else {
          fvPhase1 = invAtY;
        }

        const remainingExtraMonths = Math.max(0, y - investYears) * 12;
        valAtY = fvPhase1 * Math.pow(1 + i, remainingExtraMonths);
      } else if (frequency === "yearly") {
        const invY = Math.min(y, investYears);
        invAtY = investAmount * invY;
        let fvPhase1 = 0;
        if (rYear > 0) {
          fvPhase1 = investAmount * ((Math.pow(1 + rYear, invY) - 1) / rYear) * (1 + rYear);
        } else {
          fvPhase1 = invAtY;
        }
        const remainingExtraYears = Math.max(0, y - investYears);
        valAtY = fvPhase1 * Math.pow(1 + rYear, remainingExtraYears);
      } else {
        invAtY = investAmount;
        valAtY = investAmount * Math.pow(1 + rYear, y);
      }

      points.push({
        year: y,
        invested: Math.round(invAtY),
        value: Math.round(valAtY),
      });
    }

    return {
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(wealthGained),
      maturityValue: Math.round(maturityValue),
      multiplier,
      points,
    };
  }, [frequency, investAmount, investYears, stayYears, expectedReturn]);

  // ==========================================
  // 2. INSURANCE CALCULATOR STATE (HLV)
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

    const futureMonthly = retExpenses * Math.pow(1 + retInflation / 100, yearsToRet);
    const annualFutureExpenses = futureMonthly * 12;

    const rPost = retReturnPost / 100;
    const inf = retInflation / 100;
    const rReal = (1 + rPost) / (1 + inf) - 1;

    let corpusNeeded = 0;
    if (rReal !== 0) {
      corpusNeeded =
        annualFutureExpenses *
        ((1 - Math.pow(1 + rReal, -yearsInRet)) / rReal) *
        (1 + rReal);
    } else {
      corpusNeeded = annualFutureExpenses * yearsInRet;
    }

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
  }, [
    retCurrentAge,
    retTargetAge,
    retExpenses,
    retExpectancy,
    retInflation,
    retReturnPre,
    retReturnPost,
  ]);

  // Donut SVG constants
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  // Compounding Donut Math
  const investedPercent =
    compoundingResults.maturityValue > 0
      ? Math.round((compoundingResults.totalInvested / compoundingResults.maturityValue) * 100)
      : 0;
  const gainPercent = Math.max(0, 100 - investedPercent);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#050816] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Dynamic Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-blue-500/10 via-emerald-500/10 to-indigo-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Header & Breadcrumb */}
      <section className="relative z-10 py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#0B1120]/70 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 dark:text-white">Calculators</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-400 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE FINANCIAL INTELLIGENCE</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
            Financial{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
              Planning Simulators
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Discover the exponential power of compounding, evaluate your Human Life Value insurance coverage, and map out your retirement corpus with mathematical clarity.
          </p>
        </div>
      </section>

      {/* Main Interactive Section */}
      <section className="relative z-10 py-10 sm:py-14 flex-grow font-sans">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-8">
          {/* Main Tab Selectors */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2">
            {[
              {
                id: "compounding",
                label: "Investment Return (Power of Compounding)",
                icon: <TrendingUp size={16} />,
                badge: "Featured",
              },
              {
                id: "insurance",
                label: "HLV Insurance Coverage",
                icon: <ShieldCheck size={16} />,
                badge: null,
              },
              {
                id: "retirement",
                label: "Retirement Planner",
                icon: <Hourglass size={16} />,
                badge: null,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CalculatorType)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25"
                      : "bg-white dark:bg-[#0B1120] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="hidden sm:inline-block ml-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-amber-400 text-slate-950">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: INVESTMENT RETURN CALCULATOR (POWER OF COMPOUNDING) */}
          {/* ========================================================================= */}
          {activeTab === "compounding" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* LEFT COLUMN: Input Card (Matches user's Policybazaar reference) */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden text-left">
                {/* Top Banner (Identical to Policybazaar header) */}
                <div className="bg-blue-50/90 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 py-3.5 px-6 sm:px-8 flex items-center justify-between">
                  <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    Investment Return Calculator{" "}
                    <span className="font-normal text-slate-600 dark:text-slate-400 text-sm">
                      (Power of Compounding)
                    </span>
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-900/60 px-2.5 py-1 rounded-full font-mono">
                    <Zap className="w-3 h-3" /> Real-time
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-7">
                  {/* 1. Frequency Switcher Pills: One Time | Monthly | Yearly */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {[
                      { id: "one-time", label: "One Time" },
                      { id: "monthly", label: "Monthly" },
                      { id: "yearly", label: "Yearly" },
                    ].map((pill) => {
                      const isSelected = frequency === pill.id;
                      return (
                        <button
                          key={pill.id}
                          type="button"
                          onClick={() => setFrequency(pill.id as FrequencyType)}
                          className={`py-2.5 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-bold text-center transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30"
                              : "bg-white dark:bg-[#111827] border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* 2. Amount I wish to Invest (Notched / Floating Field) */}
                  <div className="space-y-2">
                    <div className="relative border border-slate-300 dark:border-slate-700 rounded-2xl p-3.5 sm:p-4 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 bg-[#F8FAFC] dark:bg-[#111827] transition-all">
                      <label className="block text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Amount I wish to Invest
                      </label>
                      <div className="flex items-center text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                        <span className="text-slate-400 mr-2">₹</span>
                        <input
                          type="text"
                          value={investAmount ? investAmount.toLocaleString("en-IN") : ""}
                          onChange={(e) => {
                            const val = Number(e.target.value.replace(/,/g, "").replace(/\D/g, ""));
                            setInvestAmount(val || 0);
                          }}
                          className="w-full bg-transparent border-none outline-none font-display font-bold text-slate-900 dark:text-white"
                          placeholder="10,000"
                        />
                      </div>
                    </div>

                    {/* Dynamic Indian Words Display */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <p className="text-slate-500 dark:text-slate-400 font-medium">
                        • {numberToIndianWords(investAmount)}
                      </p>
                      {/* Quick Amount Suggestion Chips */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        {[5000, 10000, 25000, 50000].map((quick) => (
                          <button
                            key={quick}
                            type="button"
                            onClick={() => setInvestAmount(quick)}
                            className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                          >
                            ₹{quick >= 1000 ? `${quick / 1000}k` : quick}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3. Invest For (in Years) */}
                  {frequency !== "one-time" && (
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          Invest For <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(in Years)</span>
                        </label>
                        <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-1.5 bg-[#F8FAFC] dark:bg-[#111827]">
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={investYears}
                            onChange={(e) => handleInvestYearsChange(Number(e.target.value))}
                            className="w-10 text-center font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-transparent outline-none"
                          />
                          <span className="text-xs font-medium text-slate-400 ml-1">Years</span>
                        </div>
                      </div>

                      {/* Range Slider */}
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={investYears}
                        onChange={(e) => handleInvestYearsChange(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 font-mono px-0.5">
                        <span>1</span>
                        <span>30</span>
                      </div>
                    </div>
                  )}

                  {/* 4. Stay invested for (in Years) */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          Stay invested for <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(in Years)</span>
                        </label>
                        {stayYears > investYears && frequency !== "one-time" && (
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            +{stayYears - investYears} years of pure passive compounding!
                          </p>
                        )}
                      </div>
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-1.5 bg-[#F8FAFC] dark:bg-[#111827]">
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={stayYears}
                          onChange={(e) => handleStayYearsChange(Number(e.target.value))}
                          className="w-10 text-center font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-transparent outline-none"
                        />
                        <span className="text-xs font-medium text-slate-400 ml-1">Years</span>
                      </div>
                    </div>

                    {/* Range Slider */}
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={stayYears}
                      onChange={(e) => handleStayYearsChange(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 font-mono px-0.5">
                      <span>1</span>
                      <span>30</span>
                    </div>
                  </div>

                  {/* 5. Expected rate of return (in %) */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        Expected rate of return <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(in %)</span>
                      </label>
                      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-1.5 bg-[#F8FAFC] dark:bg-[#111827]">
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          max="35"
                          value={expectedReturn}
                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                          className="w-10 text-center font-bold text-sm sm:text-base text-slate-900 dark:text-white bg-transparent outline-none"
                        />
                        <span className="text-xs font-medium text-slate-400 ml-1">% /Year</span>
                      </div>
                    </div>

                    {/* Range Slider */}
                    <input
                      type="range"
                      min="1"
                      max="35"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 font-mono px-0.5">
                      <span>1</span>
                      <span>35</span>
                    </div>

                    {/* Quick rate preset chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { rate: 8, label: "8% (Conservative / FD)" },
                        { rate: 12, label: "12% (Nifty Index / Large Cap)" },
                        { rate: 15, label: "15% (Midcap / Alpha)" },
                      ].map((item) => (
                        <button
                          key={item.rate}
                          type="button"
                          onClick={() => setExpectedReturn(item.rate)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            expectedReturn === item.rate
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800"
                              : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Results & Compounding Intelligence View */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 text-left">
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400 dark:text-slate-500 block">
                        Compounding Forecast
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        After {stayYears} Years
                      </span>
                    </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-extrabold font-mono">
                    {compoundingResults.multiplier}x Multiplier
                  </div>
                </div>

                {/* Big Maturity Wealth Display */}
                <div className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 sm:p-6 space-y-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono block">
                    Expected Future Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-blue-600 dark:text-blue-400 tracking-tight">
                    ₹ {compoundingResults.maturityValue.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 pt-1">
                    ≈ {formatIndianCompact(compoundingResults.maturityValue)} ({numberToIndianWords(compoundingResults.maturityValue)})
                  </p>
                </div>

                {/* Donut & Key Breakdown Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Donut Chart */}
                  <div className="sm:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background ring */}
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          className="stroke-slate-200 dark:stroke-slate-800 fill-none"
                          strokeWidth="10"
                        />
                        {/* Invested segment */}
                        {compoundingResults.maturityValue > 0 && (
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            className="stroke-blue-600 dark:stroke-blue-500 fill-none"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={
                              circumference -
                              (compoundingResults.totalInvested / compoundingResults.maturityValue) *
                                circumference
                            }
                          />
                        )}
                        {/* Gain segment */}
                        {compoundingResults.maturityValue > 0 && compoundingResults.wealthGained > 0 && (
                          <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            className="stroke-emerald-500 fill-none"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={
                              circumference -
                              (compoundingResults.wealthGained / compoundingResults.maturityValue) *
                                circumference
                            }
                            style={{
                              transform: `rotate(${
                                (compoundingResults.totalInvested / compoundingResults.maturityValue) * 360
                              }deg)`,
                              transformOrigin: "50px 50px",
                            }}
                          />
                        )}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Gain</span>
                        <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          {gainPercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Breakdown Metrics */}
                  <div className="sm:col-span-7 space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                        <span className="text-slate-600 dark:text-slate-400">Total Invested:</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹ {compoundingResults.totalInvested.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="text-slate-600 dark:text-slate-400">Wealth Gained:</span>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        + ₹ {compoundingResults.wealthGained.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* The "Power of Compounding" Phase Insight */}
                {stayYears > investYears && frequency !== "one-time" ? (
                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>The Compounding Secret in Action</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      You contribute for only <strong className="text-slate-900 dark:text-white">{investYears} years</strong> (total ₹{compoundingResults.totalInvested.toLocaleString("en-IN")}). For the next <strong className="text-slate-900 dark:text-white">{stayYears - investYears} years</strong>, you invest <strong className="text-emerald-600 dark:text-emerald-400">₹0 extra</strong>, yet your corpus compounds by an additional{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        ₹{(compoundingResults.maturityValue - (compoundingResults.points[investYears]?.value || 0)).toLocaleString("en-IN")}
                      </strong>{" "}
                      purely through accumulated interest!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>Pro Compounding Tip</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                      Try increasing <em>"Stay invested for"</em> while keeping <em>"Invest For"</em> at 10 years to visualize how your money snowballs without additional deposits.
                    </p>
                  </div>
                )}

                {/* Consultation & Mutual Funds CTA */}
                <div className="pt-2 space-y-3">
                  <Link
                    href="/contact"
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Talk to a Mutual Fund Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> 100% Free
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Zero Commission
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Conflict-Free Advice
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HLV INSURANCE COVERAGE CALCULATOR */}
          {/* ========================================================================= */}
          {activeTab === "insurance" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Inputs */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-left">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
                  <ShieldCheck className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-display font-bold text-lg">Human Life Value (HLV) Audit</h3>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Current Age</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{insAge} Years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="65"
                    value={insAge}
                    onChange={(e) => setInsAge(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>18 Yrs</span>
                    <span>65 Yrs</span>
                  </div>
                </div>

                {/* Annual Income */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Annual Take-Home Income</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ₹{insIncome.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="15000000"
                    step="50000"
                    value={insIncome}
                    onChange={(e) => setInsIncome(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>₹1 Lakh</span>
                    <span>₹1.5 Crores</span>
                  </div>
                </div>

                {/* Liabilities */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Outstanding Loans &amp; Liabilities</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ₹{insLoans.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50000000"
                    step="100000"
                    value={insLoans}
                    onChange={(e) => setInsLoans(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>₹0</span>
                    <span>₹5 Crores</span>
                  </div>
                </div>

                {/* Existing Cover */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Existing Life Insurance Coverage</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ₹{insExistingCover.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30000000"
                    step="100000"
                    value={insExistingCover}
                    onChange={(e) => setInsExistingCover(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>₹0</span>
                    <span>₹3 Crores</span>
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-left">
                <div className="w-full bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-3">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold block">
                    Recommended HLV Coverage
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ₹{insResults.required.toLocaleString("en-IN")}
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block">
                    {insResults.factor}x Annual Income + Liabilities
                  </span>
                </div>

                {insResults.gap > 0 ? (
                  <div className="w-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
                      <span>Coverage Shortfall Detected</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Your existing life insurance falls short by:
                    </p>
                    <span className="text-xl font-bold text-rose-600 dark:text-rose-400 block">
                      ₹{insResults.gap.toLocaleString("en-IN")}
                    </span>
                  </div>
                ) : (
                  <div className="w-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
                      <span>Adequately Protected</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Your existing coverage meets your family's income replacement and debt obligations.
                    </p>
                  </div>
                )}

                <div className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-xs space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Income Replacement:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{(insIncome * insResults.factor).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Liabilities Buffer:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{insLoans.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Existing Policy Cover:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      - ₹{insExistingCover.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between font-extrabold text-sm">
                    <span className="text-slate-900 dark:text-white">Net Gap:</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ₹{insResults.gap.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/term-insurance"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center shadow-lg shadow-blue-600/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Compare Zero-Commission Term Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: RETIREMENT CORPUS PLANNER */}
          {/* ========================================================================= */}
          {activeTab === "retirement" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Inputs */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-left">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
                  <Hourglass className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-display font-bold text-lg">Retirement Corpus Goals</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Current Age</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retCurrentAge} Yrs</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="59"
                      value={retCurrentAge}
                      onChange={(e) => setRetCurrentAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Retirement Age</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retTargetAge} Yrs</span>
                    </div>
                    <input
                      type="range"
                      min={Math.max(40, retCurrentAge + 1)}
                      max="75"
                      value={retTargetAge}
                      onChange={(e) => setRetTargetAge(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Current Monthly Household Expenses</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ₹{retExpenses.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="1000000"
                    step="5000"
                    value={retExpenses}
                    onChange={(e) => setRetExpenses(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>₹5,000</span>
                    <span>₹10 Lakhs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Life Expectancy</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retExpectancy} Yrs</span>
                    </div>
                    <input
                      type="range"
                      min={retTargetAge + 1}
                      max="100"
                      value={retExpectancy}
                      onChange={(e) => setRetExpectancy(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Expected Inflation Rate</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retInflation}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={retInflation}
                      onChange={(e) => setRetInflation(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Pre-Ret. Return (p.a.)</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retReturnPre}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.5"
                      value={retReturnPre}
                      onChange={(e) => setRetReturnPre(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Post-Ret. Return (p.a.)</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{retReturnPost}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={retReturnPost}
                      onChange={(e) => setRetReturnPost(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 text-left">
                <div className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono font-bold block">
                    Retirement Corpus Needed
                  </span>
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{retResults.corpus.toLocaleString("en-IN")}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal pt-1">
                    Accumulating this corpus sustains your lifestyle from age {retTargetAge} to {retExpectancy}, accounting for inflation.
                  </p>
                </div>

                <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-5 space-y-1">
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 uppercase tracking-wider font-mono font-bold block">
                    Required Monthly SIP
                  </span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    ₹{retResults.monthlySavings.toLocaleString("en-IN")}{" "}
                    <span className="text-xs text-slate-400 font-normal">/ mo</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                    Invested over {retTargetAge - retCurrentAge} years at {retReturnPre}% pre-retirement yield.
                  </span>
                </div>

                <div className="bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-xs space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Pre-Retirement Horizon:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {retTargetAge - retCurrentAge} Years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Years in Retirement:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {retExpectancy - retTargetAge} Years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Future Monthly Expense:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{retResults.futureExpenses.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center shadow-lg shadow-blue-600/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build Your Retirement Plan With An Expert</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Educational Insights Box */}
          <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-left space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Why the Power of Compounding Matters
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Albert Einstein called compound interest the 8th wonder of the world
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  1. Time Beats Timing
                </span>
                <p>
                  The earlier you start, the less capital you have to invest out-of-pocket. The returns generated in the later years dwarf your initial contributions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  2. The Second Phase Multiplier
                </span>
                <p>
                  Notice what happens when you stop investing after 10 years but stay invested for 20 years. Your money continues growing exponentially with zero effort.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  3. Inflation Defense
                </span>
                <p>
                  Equities and mutual funds have historically outperformed inflation (typically 6% in India), safeguarding your real purchasing power over 10+ year horizons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
