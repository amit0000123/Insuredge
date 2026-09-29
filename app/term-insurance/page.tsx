"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  CheckCircle2,
  PhoneCall,
  Calendar,
  UserCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  Check,
  X,
  AlertCircle,
  Info,
  Building2,
  Activity,
  Wallet,
  Users,
  User,
  HeartHandshake,
  HelpCircle,
  AlertTriangle,
  Award,
  Home,
  Briefcase,
  FileText,
  Search,
  Lock,
  ChevronDown,
  Scale,
  DollarSign,
  Calculator,
  Percent,
  LifeBuoy,
  FileCheck2,
  ThumbsUp,
  ShieldQuestion,
  Umbrella,
  Heart,
  Baby,
  RefreshCw,
  BadgeCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MythItem {
  id: number;
  mythNumber: number;
  category: "timing" | "cost" | "eligibility" | "claims" | "selection";
  categoryLabel: string;
  myth: string;
  factTitle: string;
  factBody: string;
  keyPoints: string[];
  analogyOrInsight?: {
    type: "insight" | "analogy" | "warning";
    title: string;
    text: string;
  };
  highlightStat?: {
    label: string;
    value: string;
  };
}

const mythsData: MythItem[] = [
  {
    id: 1,
    mythNumber: 1,
    category: "timing",
    categoryLabel: "Age & Timing",
    myth: "“I’m young and healthy. I don’t need term insurance yet.”",
    factTitle: "Being young and healthy is actually the single best reason to buy.",
    factBody:
      "Insurance companies calculate premiums primarily based on your age and medical underwriting. The younger and healthier you are, the lower your premium is locked in for the entire policy tenure (up to 30–40 years).",
    keyPoints: [
      "Premiums increase by 8% to 12% every single year you delay.",
      "Younger applicants undergo minimal medical examinations and enjoy instant underwriting.",
      "Developing lifestyle conditions (diabetes, hypertension, fatty liver) later can lead to heavy loadings or outright policy rejection.",
      "Once issued, your premium stays frozen at that young rate for the entire policy term.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "Expert Insight",
      text: "The best time to buy term insurance is before you think you need it. When you actively need it, insurance companies may no longer offer it.",
    },
    highlightStat: {
      label: "Premium at 25 vs 35",
      value: "~50% Cheaper",
    },
  },
  {
    id: 2,
    mythNumber: 2,
    category: "cost",
    categoryLabel: "Returns & Value",
    myth: "“Term insurance is a waste of money because I won’t get anything back.”",
    factTitle: "Term insurance isn’t an investment—it’s pure income replacement.",
    factBody:
      "Term insurance is engineered to protect your family from financial catastrophe, not generate portfolio yields. Confusing life insurance with wealth accumulation often results in being drastically underinsured.",
    keyPoints: [
      "Think of term insurance like a car seatbelt: You don't wear a seatbelt hoping to crash to get value from it; you wear it so your life is protected if an accident occurs.",
      "The sole purpose of term cover is replacing 10–15 years of your income so your family never faces eviction, loan defaults, or compromised schooling.",
      "Endowment and ULIP plans that 'give money back' usually deliver mediocre 4%–5% annual returns while giving only a fraction of the life cover you actually need.",
      "By buying pure term insurance and investing the saved premium in mutual funds/PPF, you build substantially higher wealth.",
    ],
    analogyOrInsight: {
      type: "analogy",
      title: "The Seatbelt Principle",
      text: "You don't wear a seatbelt hoping to use it. You wear it because if something unexpected happens, it saves you. Term insurance replaces your income when your family needs it most.",
    },
    highlightStat: {
      label: "Cover per Rupee Spent",
      value: "10x Higher",
    },
  },
  {
    id: 3,
    mythNumber: 3,
    category: "eligibility",
    categoryLabel: "Employer Coverage",
    myth: "“My employer already provides life insurance.”",
    factTitle: "Employer group life cover is temporary and almost always inadequate.",
    factBody:
      "Corporate group term life insurance (GTLI) is a generous employee perk, but it should never serve as your family's standalone safety net. It leaves dangerous gaps in long-term financial security.",
    keyPoints: [
      "Corporate cover instantly terminates the day you resign, are laid off, take a career break, or retire.",
      "Sum assured is typically limited to 2x or 3x your annual CTC—far below the recommended 15x–20x required to support a family for decades.",
      "You cannot customize riders like Critical Illness or Accidental Disability to fit your personal debt obligations.",
      "If you leave your job in your 40s or 50s with health complications, buying an individual term policy becomes exponentially harder and costlier.",
    ],
    analogyOrInsight: {
      type: "warning",
      title: "The Corporate Illusion",
      text: "If you have a home loan, children, or aging parents, relying solely on corporate insurance leaves your loved ones completely unprotected during job transitions.",
    },
    highlightStat: {
      label: "Average Corporate Cover",
      value: "Only 2-3x CTC",
    },
  },
  {
    id: 4,
    mythNumber: 4,
    category: "eligibility",
    categoryLabel: "Marital Status",
    myth: "“Only married people need term insurance.”",
    factTitle: "Marriage isn’t the deciding factor. Financial responsibility is.",
    factBody:
      "Anyone who has financial dependents or outstanding liabilities requires term insurance, regardless of their marital status. If someone’s livelihood or financial well-being depends on your income, you need life cover.",
    keyPoints: [
      "Aging Parents: If your parents depend on your monthly financial support or medical funding, term insurance guarantees their dignity.",
      "Sibling Education & Marriage: Many unmarried professionals support younger brothers or sisters through higher education.",
      "Co-Signed Loans: If you have an education loan, car loan, or personal loan co-signed with your parents, your sudden demise would force the bank to seize their assets.",
      "Business Partners: Startup co-founders and business partners often take keyman or term insurance to safeguard business continuity.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "Who Really Depends on You?",
      text: "Don't ask 'Am I married?' Ask 'If my income stopped tomorrow, would anyone struggle financially or lose their home?' If the answer is yes, you need term insurance.",
    },
    highlightStat: {
      label: "Unmarried Buyers in India",
      value: "35%+ of Market",
    },
  },
  {
    id: 5,
    mythNumber: 5,
    category: "cost",
    categoryLabel: "Affordability",
    myth: "“Term insurance is expensive.”",
    factTitle: "Term insurance is the most affordable form of life cover ever created.",
    factBody:
      "Because term insurance has no investment component and focuses purely on risk protection, insurers can offer massive life cover for surprisingly modest monthly outlays.",
    keyPoints: [
      "A healthy 25-year-old non-smoker can secure a ₹1 Crore life cover for as little as ₹700 to ₹900 per month—less than a single weekend dinner out.",
      "Even at age 32, a ₹1.5 Crore cover typically costs around ₹1,100 to ₹1,400 monthly.",
      "Every year of delay adds 8%–12% compounding cost to your premium for the rest of your life.",
      "Under Section 80C, your term insurance premiums are tax-deductible up to ₹1.5 Lakhs annually, making the effective cost even lower.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "The Cost of Procrastination",
      text: "Term insurance is not expensive; waiting is. Delaying by just 5 years can cost you an extra ₹2,00,000 to ₹4,00,000 in cumulative premiums over your policy tenure.",
    },
    highlightStat: {
      label: "₹1 Crore Cover Cost",
      value: "Under ₹30/day",
    },
  },
  {
    id: 6,
    mythNumber: 6,
    category: "claims",
    categoryLabel: "Claim Settlement",
    myth: "“Insurance companies don’t pay claims.”",
    factTitle: "Insurers settle over 98% of genuine claims under strict IRDAI mandates.",
    factBody:
      "Leading Indian life insurers maintain Claim Settlement Ratios (CSR) of 98% to 99.3%. Legitimate claims are paid swiftly. Almost all claim disputes trace back to intentional concealment during application.",
    keyPoints: [
      "Section 45 of Insurance Act: After a policy has been in force for 3 continuous years, no insurer can reject a claim on grounds of misstatement or non-disclosure (except established intentional fraud).",
      "Why claims get rejected: Hiding tobacco/smoking habits, omitting existing heart/kidney conditions, incorrect income declarations, or forged documents.",
      "Over 98.5% of genuine claims submitted with honest declarations are settled within 15 to 30 days.",
      "Total honesty during proposal form filling is your family's strongest guarantee of a seamless settlement.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "The Golden Rule of Claims",
      text: "Never let an agent fill medical questionnaires on your behalf. Disclose all past surgeries, family illnesses, and nicotine use. 100% upfront honesty makes your claim bulletproof.",
    },
    highlightStat: {
      label: "Top Insurer CSR",
      value: "98% - 99.3%",
    },
  },
  {
    id: 7,
    mythNumber: 7,
    category: "cost",
    categoryLabel: "Savings & Wealth",
    myth: "“I already have enough savings and mutual funds.”",
    factTitle: "Savings are meant for your future dreams, not emergency income replacement.",
    factBody:
      "Having ₹15 or ₹25 Lakhs in mutual funds or fixed deposits is wonderful, but it falls drastically short of funding 20+ years of family living costs, inflation, and children's higher education.",
    keyPoints: [
      "Income Replacement: If your family spends ₹60,000/month, that's ₹7.2 Lakhs/year. Over 15 years with 6% inflation, they need over ₹1.7 Crores simply to survive.",
      "Preserving Wealth: Without term insurance, your grieving family will be forced to liquidate your equity funds, sell mutual fund SIPs, or distress-sell property.",
      "Debt Shields: Outstanding home loans (e.g. ₹50L) will instantly consume all accumulated family savings if not backed by a term cover.",
      "A term insurance payout acts as a protective fortress, allowing your family's existing savings and investments to compound untouched.",
    ],
    analogyOrInsight: {
      type: "analogy",
      title: "The Fortress Analogy",
      text: "Your savings and investments are the wealth inside the castle. Term insurance is the moat and high stone walls that keep catastrophic risks from destroying it.",
    },
    highlightStat: {
      label: "15-Yr Family Expense",
      value: "₹1.5 - ₹2.5 Cr",
    },
  },
  {
    id: 8,
    mythNumber: 8,
    category: "timing",
    categoryLabel: "Life Milestones",
    myth: "“I’ll buy term insurance after I get married.”",
    factTitle: "Life doesn’t wait for personal timelines. Lock in low rates today.",
    factBody:
      "Postponing insurance until marriage risks higher premiums, potential health complications, and missing out on early coverage. You can easily scale up coverage as life evolves.",
    keyPoints: [
      "Health risk: Even in your late 20s, sudden diagnosis of hypertension, thyroid, or diabetes can trigger permanent policy exclusions or double your premium rate.",
      "Life-Stage Increment Options: Modern term plans come with built-in milestone enhancements (allowing you to increase cover by 25% or 50% upon marriage and childbirth without fresh medical tests).",
      "Immediate Debt Protection: Your vehicle, education, or personal credit debts are covered from day one.",
      "Financial Discipline: Committing to a low, locked-in annual premium in your 20s instills lifelong financial maturity.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "Plan for Today, Scale Tomorrow",
      text: "Buy a ₹1 Crore base cover right now at minimal cost. When you get married, use the policy's Life-Stage feature to add ₹50 Lakhs without undergoing another medical exam.",
    },
    highlightStat: {
      label: "Life-Stage Cover Increase",
      value: "Up to +50%",
    },
  },
  {
    id: 9,
    mythNumber: 9,
    category: "selection",
    categoryLabel: "Plan Selection",
    myth: "“The cheapest policy is always the best policy.”",
    factTitle: "Price is only one factor. A cheap policy with claim hurdles is disastrous.",
    factBody:
      "Choosing a term plan strictly by sorting from lowest to highest price is one of the most dangerous consumer errors. Policy wording, claim support, riders, and insurer stability matter far more.",
    keyPoints: [
      "Claim Settlement Ratio (CSR) & Amount Settlement Ratio (ASR): Check whether the insurer actually settles high-value claims or only small tickets.",
      "Critical Illness Rider: Does the insurer provide an accelerated payout upon diagnosis of 30+ major life-threatening conditions like cancer or stroke?",
      "Waiver of Premium Rider: If permanent disability strikes and you lose earning power, the insurer pays all remaining premiums on your behalf.",
      "Solvency Ratio: IRDAI mandates a solvency ratio above 150%. Financially resilient insurers guarantee long-term claim-paying ability 30 years into the future.",
      "Claim Assistance Quality: When your family is grieving, they need a dedicated claim concierge, not a bureaucratic helpline.",
    ],
    analogyOrInsight: {
      type: "warning",
      title: "The False Economy",
      text: "Saving ₹100 a month on the cheapest policy means nothing if your family faces opaque claim procedures or delayed payouts during their most vulnerable moment.",
    },
    highlightStat: {
      label: "Key Metrics to Check",
      value: "CSR + ASR + Riders",
    },
  },
  {
    id: 10,
    mythNumber: 10,
    category: "selection",
    categoryLabel: "Buying Process",
    myth: "“Buying term insurance online is risky.”",
    factTitle: "Online buying is safe, direct, and transparent with certified guidance.",
    factBody:
      "Buying online directly connects you with the insurer, eliminating intermediary mis-selling and providing lower rates. However, interpreting technical clauses requires certified, unbiased expert advice.",
    keyPoints: [
      "Online term plans are 15%–20% cheaper than traditional offline agent routes because agent distribution commissions are bypassed.",
      "All policy parameters, riders, and medical disclosures are recorded digitally in IRDAI-regulated central repositories.",
      "The real risk isn't buying online—it's buying without understanding rider clauses, exclusions, or suicide clauses.",
      "InsurEdge pairs the digital efficiency and direct pricing of online plans with the personalized guidance of unbiased, certified advisors.",
    ],
    analogyOrInsight: {
      type: "insight",
      title: "The Smart Approach",
      text: "Get the transparency and low online pricing of digital policies, backed by an independent InsurEdge expert who reviews your medical disclosures and claim documents for free.",
    },
    highlightStat: {
      label: "Online Discount vs Agent",
      value: "15% - 25% Off",
    },
  },
];

export default function TermInsurancePage() {
  // Callback Request State
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbAge, setCbAge] = useState("28");
  const [cbCover, setCbCover] = useState("₹1.5 Crores");
  const [cbSubmitted, setCbSubmitted] = useState(false);
  const [cbError, setCbError] = useState("");

  // Myths Filter & Search State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedMyth, setExpandedMyth] = useState<number | null>(1);

  // Interactive Sum Assured Calculator State
  const [calcMonthlyExpense, setCalcMonthlyExpense] = useState<number>(60000);
  const [calcLoans, setCalcLoans] = useState<number>(4000000); // 40 Lakhs home loan
  const [calcEducationGoal, setCalcEducationGoal] = useState<number>(2500000); // 25 Lakhs child education
  const [calcExistingSavings, setCalcExistingSavings] = useState<number>(1500000); // 15 Lakhs existing savings

  // Interactive Cost of Delay Calculator State
  const [delayAge, setDelayAge] = useState<number>(25);

  // Filtered Myths
  const filteredMyths = useMemo(() => {
    return mythsData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.myth.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.factBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.factTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyPoints.some((pt) =>
          pt.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Sum Assured Calculation
  const recommendedCover = useMemo(() => {
    // Standard rule: (Annual living expenses * 15) + Total Outstanding Loans + Child Future Goals - Existing liquid savings
    const annualExpense = calcMonthlyExpense * 12;
    const incomeReplacementFund = annualExpense * 15;
    const totalNeed =
      incomeReplacementFund +
      calcLoans +
      calcEducationGoal -
      calcExistingSavings;
    // Round to nearest 25 Lakhs
    const roundedInLakhs = Math.max(50, Math.ceil(totalNeed / 2500000) * 25);
    return roundedInLakhs;
  }, [calcMonthlyExpense, calcLoans, calcEducationGoal, calcExistingSavings]);

  // Cost of Delay Estimates for 1 Crore cover (approximate industry average for healthy non-smoker)
  const delayEstimates = useMemo(() => {
    const baseRates: Record<number, { monthly: number; lifetimeTotal: number }> = {
      25: { monthly: 750, lifetimeTotal: 750 * 12 * 35 }, // 35 yrs till 60
      30: { monthly: 1050, lifetimeTotal: 1050 * 12 * 30 }, // 30 yrs till 60
      35: { monthly: 1550, lifetimeTotal: 1550 * 12 * 25 }, // 25 yrs till 60
      40: { monthly: 2450, lifetimeTotal: 2450 * 12 * 20 }, // 20 yrs till 60
      45: { monthly: 3950, lifetimeTotal: 3950 * 12 * 15 }, // 15 yrs till 60
    };
    return baseRates[delayAge] || baseRates[25];
  }, [delayAge]);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      setCbError("Please fill in your name and valid mobile number.");
      return;
    }
    if (cbPhone.trim().replace(/\D/g, "").length < 10) {
      setCbError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setCbError("");
    setCbSubmitted(true);
  };

  return (
    <div className="font-sans text-text-primary bg-background min-h-screen transition-colors duration-300">
      {/* Background Ambient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-primary-custom/20 to-purple-500/10 blur-[130px]" />
        <div className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-bl from-emerald-500/15 to-primary-custom/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-blue-500/15 to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-14 space-y-12 sm:space-y-16 md:space-y-24 pb-24 sm:pb-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono"
        >
          <Link href="/" className="hover:text-primary-custom transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/services"
            className="hover:text-primary-custom transition-colors"
          >
            Services
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary-custom">Term Insurance</span>
        </nav>

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-custom/10 border border-primary-custom/25 text-primary-custom text-xs font-bold font-mono tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNBIASED FINANCIAL SAFETY GUIDE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.12] tracking-tight text-text-primary">
              Term Insurance{" "}
              <span className="bg-gradient-to-r from-primary-custom via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Myths vs Facts
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
              Buying term insurance is one of the smartest financial decisions you
              can make, yet many people delay or avoid it because of common
              misconceptions. Let’s separate myths from facts so you can make an
              informed, confident decision for your family’s financial future.
            </p>

            {/* Value Proposition Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface/70 border border-border-custom shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-text-primary">
                  100% Conflict-Free
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface/70 border border-border-custom shadow-sm">
                <ShieldCheck className="w-4 h-4 text-primary-custom shrink-0" />
                <span className="text-xs font-semibold text-text-primary">
                  Zero Spam Calls
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface/70 border border-border-custom shadow-sm">
                <UserCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-xs font-semibold text-text-primary">
                  Certified IRDAI Experts
                </span>
              </div>
            </div>

            {/* Quick Action Anchor Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href="#myths-section"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary-custom to-purple-600 text-white font-bold text-sm shadow-lg shadow-primary-custom/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore 10 Myths &amp; Facts</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#cover-calculator"
                className="px-6 py-3.5 rounded-full bg-surface border border-border-custom text-text-primary font-bold text-sm hover:border-primary-custom/50 hover:bg-background transition-all flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-primary-custom" />
                <span>Calculate Your Needed Cover</span>
              </a>
            </div>
          </div>

          {/* Right Column: Instant Unbiased Callback Form */}
          <div className="lg:col-span-5">
            <div className="bg-surface/90 backdrop-blur-xl border border-border-custom rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-custom/10 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6 space-y-1.5 text-left">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary-custom uppercase tracking-wider">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Free 1-on-1 Consultation</span>
                </div>
                <h3 className="text-xl font-bold font-display text-text-primary">
                  Speak with a Certified Term Specialist
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Get personalized recommendations without aggressive sales quotas.
                  We never share your contact number with aggressive third-party call centers.
                </p>
              </div>

              {cbSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary">
                    Request Received!
                  </h4>
                  <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong className="text-text-primary">{cbName}</strong>.
                    An independent InsurEdge insurance advisor will call you within
                    2 business hours from an official verification number.
                  </p>
                  <button
                    onClick={() => {
                      setCbSubmitted(false);
                      setCbName("");
                      setCbPhone("");
                    }}
                    className="text-xs font-semibold text-primary-custom hover:underline pt-2 cursor-pointer inline-block"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4 text-left">
                  {cbError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{cbError}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="term-cb-name"
                      className="block text-xs font-semibold text-text-secondary mb-1.5"
                    >
                      Your Full Name
                    </label>
                    <input
                      id="term-cb-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={cbName}
                      onChange={(e) => setCbName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-custom focus:ring-1 focus:ring-primary-custom transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="term-cb-age"
                        className="block text-xs font-semibold text-text-secondary mb-1.5"
                      >
                        Your Current Age
                      </label>
                      <select
                        id="term-cb-age"
                        value={cbAge}
                        onChange={(e) => setCbAge(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl bg-background border border-border-custom text-sm text-text-primary focus:outline-none focus:border-primary-custom transition-all"
                      >
                        <option value="21-25">21 - 25 years</option>
                        <option value="26-30">26 - 30 years</option>
                        <option value="31-35">31 - 35 years</option>
                        <option value="36-40">36 - 40 years</option>
                        <option value="41-50">41 - 50 years</option>
                        <option value="51+">50+ years</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="term-cb-cover"
                        className="block text-xs font-semibold text-text-secondary mb-1.5"
                      >
                        Target Life Cover
                      </label>
                      <select
                        id="term-cb-cover"
                        value={cbCover}
                        onChange={(e) => setCbCover(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl bg-background border border-border-custom text-sm text-text-primary focus:outline-none focus:border-primary-custom transition-all"
                      >
                        <option value="₹1 Crore">₹1 Crore</option>
                        <option value="₹1.5 Crores">₹1.5 Crores</option>
                        <option value="₹2 Crores">₹2 Crores</option>
                        <option value="₹3 Crores+">₹3 Crores+</option>
                        <option value="Need Guidance">Help me calculate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="term-cb-phone"
                      className="block text-xs font-semibold text-text-secondary mb-1.5"
                    >
                      Mobile Number (WhatsApp verified)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-xs font-bold text-text-secondary">
                        +91
                      </span>
                      <input
                        id="term-cb-phone"
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={cbPhone}
                        onChange={(e) =>
                          setCbPhone(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border-custom text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary-custom focus:ring-1 focus:ring-primary-custom transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary-custom to-purple-600 text-white font-bold text-sm shadow-md shadow-primary-custom/20 hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Free Callback</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[0.7rem] text-text-secondary text-center leading-normal">
                    🔒 Strictly no spam. InsurEdge is 100% independent and conflict-free.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE FEATURE: THE SEATBELT VS INVESTMENT COMPARISON */}
        {/* ========================================================================= */}
        <section className="bg-surface/60 border border-border-custom rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="text-xs font-mono font-bold text-primary-custom uppercase tracking-widest block">
              THE CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary">
              The Seatbelt Principle: Pure Protection vs. Investment
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Why combining insurance with investment yields subpar results, and how
              separating them protects your family with 10x higher coverage while building
              substantially greater wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Seatbelt (Pure Term Insurance) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-emerald-500/5 border border-emerald-500/25 flex flex-col justify-between text-left space-y-6 relative">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[0.7rem] font-bold font-mono tracking-wider">
                RECOMMENDED BY ADVISORS
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-primary">
                    Pure Term Insurance
                  </h3>
                  <p className="text-xs font-mono text-emerald-500 font-semibold mt-0.5">
                    "The Financial Seatbelt"
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  You don’t wear a seatbelt hoping to use it. You wear it so if something
                  unforeseen happens, your family doesn't suffer financial destruction.
                  Its sole job is replacing your future earning capacity.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">₹1 to ₹2 Crore Cover</strong> for under ₹800 - ₹1,200/month.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">Zero Allocation Drag:</strong> 100% of money buys risk cover.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">Invest Difference Elsewhere:</strong> Invest surplus in equity mutual funds for 12%+ long-term compounding.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/80 border border-emerald-500/20 text-xs text-text-secondary">
                <span className="font-semibold text-emerald-500 block mb-1">
                  The Result:
                </span>
                Your family gets maximum safety protection + your wealth compounds freely in transparent market instruments.
              </div>
            </div>

            {/* The Endowment / Return of Premium Illusion */}
            <div className="rounded-2xl p-6 sm:p-8 bg-rose-500/5 border border-rose-500/25 flex flex-col justify-between text-left space-y-6 relative">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[0.7rem] font-bold font-mono tracking-wider">
                COMMON TRAP
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-text-primary">
                    Endowment / "Money-Back" Plans
                  </h3>
                  <p className="text-xs font-mono text-rose-500 font-semibold mt-0.5">
                    "The Expensive Compromise"
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Promoted with the catchy promise of "getting all your premiums back
                  with bonuses." In reality, they lock your money in low-yield assets,
                  leaving your family drastically underprotected.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-xs">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">Low Life Cover:</strong> For the same ₹1,200/month, you only get ₹8-12 Lakhs cover (insufficient for 2 years).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">Sub-Par Returns:</strong> Yields usually hover around 4.5% - 5.5%, barely matching consumer inflation.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text-primary">Hefty Surrender Penalties:</strong> Exiting early results in catastrophic loss of your deposited capital.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/80 border border-rose-500/20 text-xs text-text-secondary">
                <span className="font-semibold text-rose-500 block mb-1">
                  The Result:
                </span>
                Underinsured family + depreciated returns that fail to beat true education and living inflation.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: 10 MYTHS VS FACTS (MAIN FOCUS) */}
        {/* ========================================================================= */}
        <section id="myths-section" className="space-y-8">
          <div className="max-w-3xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-custom/10 text-primary-custom text-xs font-mono font-bold tracking-wide">
              <span>EVIDENCE-BASED CLARITY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-text-primary">
              Separating 10 Term Insurance Myths from Reality
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Don’t let misconceptions rob your family of security. Click on any myth
              below to discover the factual financial reality and insider advisory insights.
            </p>
          </div>

          {/* Search and Category Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3.5 justify-between items-stretch md:items-center bg-surface border border-border-custom p-3 sm:p-3.5 rounded-2xl shadow-sm">
            {/* Category Pills with smooth mobile swipe */}
            <div className="flex overflow-x-auto pb-1.5 md:pb-0 gap-2 no-scrollbar w-full md:w-auto -mx-1 px-1">
              {[
                { id: "all", label: "All 10 Myths" },
                { id: "timing", label: "Age & Timing" },
                { id: "cost", label: "Cost & Value" },
                { id: "eligibility", label: "Who Needs It" },
                { id: "claims", label: "Claims & Trust" },
                { id: "selection", label: "Choosing Plans" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-primary-custom text-white shadow-sm"
                      : "bg-background text-text-secondary hover:text-text-primary border border-border-custom/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-auto md:min-w-[240px]">
              <Search className="w-4 h-4 text-text-secondary absolute left-3 top-3 md:top-2.5" />
              <input
                type="text"
                placeholder="Search myths, claims, riders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 md:py-1.5 rounded-xl bg-background border border-border-custom text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary-custom transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-text-secondary hover:text-text-primary"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Myths Accordion / Card Deck */}
          <div className="space-y-4">
            {filteredMyths.length === 0 ? (
              <div className="text-center py-12 bg-surface/40 rounded-2xl border border-border-custom space-y-3">
                <AlertCircle className="w-8 h-8 text-text-secondary mx-auto" />
                <p className="text-sm font-semibold text-text-primary">
                  No myths found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="text-xs text-primary-custom font-semibold hover:underline"
                >
                  Reset search filters
                </button>
              </div>
            ) : (
              filteredMyths.map((item) => {
                const isOpen = expandedMyth === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-surface border-primary-custom/40 shadow-lg shadow-primary-custom/5"
                        : "bg-surface/60 border-border-custom hover:border-primary-custom/25"
                    }`}
                  >
                    {/* Header: Click to Toggle */}
                    <button
                      onClick={() => setExpandedMyth(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[0.7rem] font-bold font-mono">
                            MYTH #{item.mythNumber}
                          </span>
                          <span className="text-[0.7rem] font-mono text-text-secondary">
                            {item.categoryLabel}
                          </span>
                          {item.highlightStat && (
                            <span className="ml-auto hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-primary-custom/10 text-primary-custom text-[0.7rem] font-semibold">
                              {item.highlightStat.label}: <strong>{item.highlightStat.value}</strong>
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-display text-text-primary">
                          {item.myth}
                        </h3>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 bg-primary-custom/10 text-primary-custom border-primary-custom/30"
                            : "bg-background text-text-secondary border-border-custom"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Expandable Fact & Deep Dive Body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-border-custom/80 px-5 sm:px-6 pb-6 pt-5 bg-background/40"
                        >
                          <div className="space-y-6 text-left">
                            {/* Fact Banner */}
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wide block">
                                  THE VERIFIED FACT
                                </span>
                                <h4 className="text-sm sm:text-base font-bold text-text-primary">
                                  {item.factTitle}
                                </h4>
                                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                                  {item.factBody}
                                </p>
                              </div>
                            </div>

                            {/* Key Takeaways */}
                            <div className="space-y-2.5">
                              <h5 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-bold">
                                Crucial Realities to Understand:
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.keyPoints.map((point, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-surface border border-border-custom flex items-start gap-2.5 text-xs leading-relaxed text-text-secondary"
                                  >
                                    <div className="w-4 h-4 rounded-full bg-primary-custom/15 text-primary-custom flex items-center justify-center shrink-0 mt-0.5 font-bold text-[0.65rem]">
                                      {idx + 1}
                                    </div>
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Special Callout: Analogy or Expert Insight */}
                            {item.analogyOrInsight && (
                              <div
                                className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                                  item.analogyOrInsight.type === "warning"
                                    ? "bg-amber-500/10 border-amber-500/25 text-text-secondary"
                                    : "bg-purple-500/10 border-purple-500/25 text-text-secondary"
                                }`}
                              >
                                {item.analogyOrInsight.type === "warning" ? (
                                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                ) : (
                                  <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <strong className="text-text-primary block mb-0.5 font-sans font-bold">
                                    {item.analogyOrInsight.title}:
                                  </strong>
                                  <span>{item.analogyOrInsight.text}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE CALCULATOR: HOW MUCH COVER DO YOU ACTUALLY NEED? */}
        {/* ========================================================================= */}
        <section id="cover-calculator" className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold text-primary-custom uppercase tracking-widest block">
              PRECISION PLANNING TOOL
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary">
              Term Insurance Cover Calculator
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Don't guess a random number like ₹50 Lakhs or ₹1 Crore. Use the
              Income Replacement Method mandated by financial planners: 15 Years of Family Expenses + Liabilities + Goals - Savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Monthly Expense */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">
                    Monthly Family Living Expenses (Excluding EMIs)
                  </span>
                  <span className="font-mono font-bold text-primary-custom text-sm">
                    ₹{calcMonthlyExpense.toLocaleString("en-IN")}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={250000}
                  step={5000}
                  value={calcMonthlyExpense}
                  onChange={(e) => setCalcMonthlyExpense(Number(e.target.value))}
                  className="w-full accent-primary-custom cursor-pointer h-2 bg-background rounded-lg"
                />
                <div className="flex justify-between text-[0.65rem] text-text-secondary font-mono">
                  <span>₹25,000</span>
                  <span>₹1,25,000</span>
                  <span>₹2,50,000</span>
                </div>
              </div>

              {/* Outstanding Loans */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">
                    Outstanding Loans (Home Loan, Auto, Education)
                  </span>
                  <span className="font-mono font-bold text-purple-500 text-sm">
                    ₹{(calcLoans / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000000}
                  step={500000}
                  value={calcLoans}
                  onChange={(e) => setCalcLoans(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-background rounded-lg"
                />
                <div className="flex justify-between text-[0.65rem] text-text-secondary font-mono">
                  <span>₹0 (Debt Free)</span>
                  <span>₹75 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>
              </div>

              {/* Major Future Milestones */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">
                    Future Child Higher Education &amp; Milestones
                  </span>
                  <span className="font-mono font-bold text-pink-500 text-sm">
                    ₹{(calcEducationGoal / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={500000}
                  value={calcEducationGoal}
                  onChange={(e) => setCalcEducationGoal(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer h-2 bg-background rounded-lg"
                />
                <div className="flex justify-between text-[0.65rem] text-text-secondary font-mono">
                  <span>₹0</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Liquid Savings to Deduct */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-primary">
                    Current Liquid Savings &amp; Investments (FD, Mutual Funds)
                  </span>
                  <span className="font-mono font-bold text-emerald-500 text-sm">
                    - ₹{(calcExistingSavings / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={500000}
                  value={calcExistingSavings}
                  onChange={(e) => setCalcExistingSavings(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-background rounded-lg"
                />
                <div className="flex justify-between text-[0.65rem] text-text-secondary font-mono">
                  <span>₹0</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary-custom/10 via-purple-500/10 to-transparent border border-primary-custom/30 text-center space-y-5 shadow-lg">
                <span className="text-[0.75rem] font-mono uppercase font-bold text-primary-custom tracking-wider block">
                  RECOMMENDED LIFE COVER
                </span>

                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-extrabold font-display text-text-primary">
                    ₹{(recommendedCover / 100).toFixed(2)}{" "}
                    <span className="text-2xl sm:text-3xl text-primary-custom font-sans">
                      Crores
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Adequate to replace 15 years of your family's living standard &amp; clear all loans.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-background/80 border border-border-custom text-left space-y-2 text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>15-Yr Living Expense Fund:</span>
                    <span className="font-bold text-text-primary font-mono">
                      ₹{((calcMonthlyExpense * 12 * 15) / 100000).toFixed(1)} L
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Outstanding Liabilities:</span>
                    <span className="font-bold text-text-primary font-mono">
                      ₹{(calcLoans / 100000).toFixed(1)} L
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Future Education / Family Goals:</span>
                    <span className="font-bold text-text-primary font-mono">
                      ₹{(calcEducationGoal / 100000).toFixed(1)} L
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-500 border-t border-border-custom pt-2">
                    <span>Less Existing Liquid Wealth:</span>
                    <span className="font-bold font-mono">
                      - ₹{(calcExistingSavings / 100000).toFixed(1)} L
                    </span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3.5 px-4 rounded-xl bg-primary-custom text-white font-bold text-sm shadow-md shadow-primary-custom/25 hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-2"
                >
                  <span>Compare ₹{(recommendedCover / 100).toFixed(1)}Cr Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE FEATURE: COST OF DELAY SIMULATOR (MYTH #1 & #5) */}
        {/* ========================================================================= */}
        <section className="bg-surface/50 border border-border-custom rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl text-left space-y-3">
            <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block">
              THE MATHEMATICS OF DELAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary">
              Why Waiting Costs You Hundreds of Thousands
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              When you buy term insurance at 25, your premium stays frozen at that rate
              until you turn 60 or 65. See how delaying by 5 to 15 years inflates your lifetime premium payments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-6 space-y-6">
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider font-mono">
                Select Your Buying Age (For ₹1 Crore Cover till Age 60):
              </label>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {[25, 30, 35, 40, 45].map((age) => (
                  <button
                    key={age}
                    onClick={() => setDelayAge(age)}
                    className={`py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      delayAge === age
                        ? "bg-primary-custom text-white shadow-md shadow-primary-custom/20 scale-[1.02] sm:scale-105"
                        : "bg-background border border-border-custom text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    Age {age}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2 text-primary-custom font-bold">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Frozen Premium Guarantee</span>
                </div>
                <p>
                  In Indian term insurance, once approved, your premium never increases
                  with age. A 25-year-old keeps paying ₹750/mo even when they are 55!
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background border border-border-custom">
                    <span className="text-[0.7rem] text-text-secondary font-mono uppercase block mb-1">
                      Monthly Cost at Age {delayAge}
                    </span>
                    <span className="text-2xl font-bold font-display text-text-primary">
                      ₹{delayEstimates.monthly.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[0.65rem] text-text-secondary block mt-0.5">
                      per month locked till age 60
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border-custom">
                    <span className="text-[0.7rem] text-text-secondary font-mono uppercase block mb-1">
                      Cumulative Cost to Age 60
                    </span>
                    <span className="text-2xl font-bold font-display text-purple-500">
                      ₹{(delayEstimates.lifetimeTotal / 100000).toFixed(2)} Lakhs
                    </span>
                    <span className="text-[0.65rem] text-text-secondary block mt-0.5">
                      total premium paid
                    </span>
                  </div>
                </div>

                {delayAge > 25 && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-3 text-xs text-rose-500">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>
                      Waiting until <strong>Age {delayAge}</strong> costs you an extra{" "}
                      <strong>
                        ₹
                        {(
                          (delayEstimates.lifetimeTotal - 750 * 12 * 35) /
                          100000
                        ).toFixed(2)}{" "}
                        Lakhs
                      </strong>{" "}
                      in excess lifetime premiums compared to starting at 25!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EVALUATION MATRIX: BEYOND JUST THE CHEAPEST PLAN (MYTH #9) */}
        {/* ========================================================================= */}
        <section className="space-y-8 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-primary-custom uppercase tracking-widest block">
              POLICY DUE DILIGENCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary">
              What to Evaluate Before Buying (Beyond Price)
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              As explained in Myth #9, choosing solely based on the cheapest premium
              can backfire. Here are the 5 core pillars our advisors examine when
              filtering term plans for you:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-custom/10 text-primary-custom flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Claim Settlement &amp; Amount Ratio
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Check both the Claim Settlement Ratio (number of claims paid &gt; 98%)
                and Amount Settlement Ratio (percentage of claim money disbursed &gt; 95%).
                Avoid insurers with high value repudiation patterns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Critical Illness Riders
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Look for comprehensive Critical Illness riders covering 30+ conditions
                (Cancer, Stroke, Heart Attack) that pay out upfront on diagnosis,
                allowing you to seek experimental treatments without draining savings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Waiver of Premium (WOP)
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                An essential rider that ensures if accidental permanent total disability
                strikes, all future premiums are permanently waived by the insurer while
                your family's full life cover remains 100% active.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Solvency Ratio (&gt;150%)
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Mandated by IRDAI to prove financial health. Insurers maintaining
                solvency ratios of 180% to 220% ensure that even in severe national
                crises or pandemics, claim payouts remain completely unhindered.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Life-Stage Enhancements
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Choose policies with automated increase options upon marriage (+25% cover)
                and childbirth (+25% cover) without needing fresh blood tests or
                medical re-underwriting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-border-custom space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="font-bold text-base text-text-primary font-display">
                Payout Customization
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Option for your nominee to receive a lump sum plus monthly income
                stipends over 10 years, preventing sudden mismanagement of large funds
                by grieving relatives.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE BOTTOM LINE SECTION (USER PROVIDED CONCLUSION) */}
        {/* ========================================================================= */}
        <section className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-primary-custom/15 via-purple-600/10 to-pink-500/10 border border-primary-custom/30 overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-custom/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-custom/20 border border-primary-custom/40 text-primary-custom text-xs font-mono font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>THE BOTTOM LINE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary leading-tight">
              The biggest risk isn’t buying the wrong term insurance plan. It’s having{" "}
              <span className="bg-gradient-to-r from-primary-custom to-purple-500 bg-clip-text text-transparent">
                zero financial protection
              </span>{" "}
              when your family needs it most.
            </h2>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Don’t let common myths or procrastination stop you from making an informed
              decision. Your family’s peace of mind, home security, and dreams depend on
              the actions you take while you are healthy.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary-custom to-purple-600 text-white font-bold text-sm shadow-lg shadow-primary-custom/25 hover:opacity-95 transition-opacity inline-flex items-center gap-2"
              >
                <span>Talk to a Certified Insurance Expert</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="px-6 py-3.5 rounded-full bg-surface border border-border-custom text-text-primary font-bold text-sm hover:border-primary-custom/50 hover:bg-background transition-all inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-primary-custom" />
                <span>Explore All Financial Calculators</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQS SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-8 text-left">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-primary-custom uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-text-primary">
              Common Term Insurance Questions Answered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-border-custom space-y-2">
              <h4 className="font-bold text-sm text-text-primary">
                Are medical tests mandatory when buying term insurance?
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                For substantial covers (e.g. ₹1 Crore+), insurers typically arrange a
                free medical test at your home. Passing a medical test is actually
                advantageous for you—it creates an official medical baseline that
                makes future claim repudiation virtually impossible.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border-custom space-y-2">
              <h4 className="font-bold text-sm text-text-primary">
                What happens if I start smoking after purchasing the policy?
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                If you were genuinely a non-smoker at the time of policy inception and
                answered truthfully, you are legally covered. However, if you already
                smoked occasionally and concealed it on the form, a claim will be
                rejected upon toxicological verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border-custom space-y-2">
              <h4 className="font-bold text-sm text-text-primary">
                What is the ideal tenure for a term insurance plan?
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                We generally recommend covering yourself up to your expected retirement
                age (typically 60 to 65 years). Taking a policy up to age 85 or 99
                unnecessarily inflates premiums by 70% during years when your children
                are financially independent and loans are fully settled.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border-custom space-y-2">
              <h4 className="font-bold text-sm text-text-primary">
                Is the death benefit payout taxable for my nominee?
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Under Section 10(10D) of the Indian Income Tax Act, the entire sum
                assured payout received by the nominee upon the policyholder’s demise
                is 100% tax-free, subject to regulatory conditions.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STATUTORY DISCLAIMER */}
        {/* ========================================================================= */}
        <section className="p-6 rounded-2xl bg-surface/30 border border-border-custom text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-secondary uppercase">
            <Info className="w-3.5 h-3.5" />
            <span>Statutory Disclosure &amp; Regulatory Notice</span>
          </div>
          <p className="text-[0.72rem] text-text-secondary leading-relaxed font-sans">
            InsurEdge is an independent consumer education and insurance discovery platform.
            We are not an insurance company. Insurance is the subject matter of solicitation.
            All quotes, premium illustrations, and calculations shown are indicative based on
            standard underwriting guidelines for healthy non-smokers. Tax benefits are subject
            to changes in tax laws under Section 80C and Section 10(10D). Please read the sales
            brochure and policy wording carefully before concluding any purchase.
          </p>
        </section>
      </div>
    </div>
  );
}

// Helper icon
function Lightbulb(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
