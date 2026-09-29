"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Shield, Heart, HelpCircle, Check, Landmark, Star, Clock, Users, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingQuiz from "@/components/OnboardingQuiz";

const productData = {
  mf: {
    theme: "theme-mf",
    kicker: "Find the Right Mutual Fund Today",
    h1First: "Connect with experts &",
    h1Highlight: "start your SIP journey",
    sub: "Share your goals and get matched with a mutual fund advisor who'll compare options across top fund houses — completely free.",
    formTitle: "Get Connected to a Fund Advisor",
    formSub: "A licensed advisor will call you within 2 hours. No spam, no obligation.",
    submitText: "Connect Me With an Advisor",
  },
  term: {
    theme: "theme-term",
    kicker: "Find the Right Term Cover Today",
    h1First: "Get ₹1 Crore life cover",
    h1Highlight: "starting ₹490/month",
    sub: "Share your details and get connected to a licensed term insurance advisor who'll compare 30+ insurers to find the right plan for you.",
    formTitle: "Get Your Free Term Insurance Quote",
    formSub: "A licensed advisor will call you with quotes. No spam, no obligation.",
    submitText: "Get Free Term Plan Quotes",
  },
  save: {
    theme: "theme-save",
    kicker: "Find the Right Savings Plan Today",
    h1First: "Save smart & explore",
    h1Highlight: "guaranteed return plans",
    sub: "Connect with savings plan specialists who compare plans across top providers to match your goals, timeline, and budget.",
    formTitle: "Find Your Ideal Savings Plan",
    formSub: "A savings advisor will call you within 2 hours. Free & no obligation.",
    submitText: "Connect Me With a Savings Expert",
  },
  hlth: {
    theme: "theme-hlth",
    kicker: "Find the Right Health Plan Today",
    h1First: "Health insurance your family",
    h1Highlight: "can actually rely on",
    sub: "Get matched with health insurance advisors who compare cashless plans across top insurers for your family — completely free.",
    formTitle: "Get Free Health Insurance Quotes",
    formSub: "A health insurance advisor will call you within 2 hours. No spam.",
    submitText: "Find My Best Health Plan",
  },
};

const tabs = [
  { key: "mf", label: "Mutual Funds", icon: "📈" },
  { key: "term", label: "Term Insurance", icon: "🛡️" },
  { key: "save", label: "Savings Plans", icon: "🏦" },
  { key: "hlth", label: "Health Insurance", icon: "❤️‍🩹" },
] as const;

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<"mf" | "term" | "save" | "hlth">("mf");

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ name?: boolean; phone?: boolean }>({});

  // Product specific inputs
  const [sipAmount, setSipAmount] = useState(5000);
  const [mfGoal, setMfGoal] = useState("");
  const [mfRisk, setMfRisk] = useState("Moderate");

  const [termCoverage, setTermCoverage] = useState(1); // Crore
  const [termIncome, setTermIncome] = useState("₹5–10 LPA");
  const [termSmoker, setTermSmoker] = useState("Non-Smoker");

  const [savingsAmount, setSavingsAmount] = useState(10000);
  const [saveGoal, setSaveGoal] = useState("Retirement");
  const [saveHorizon, setSaveHorizon] = useState("7–15 years");

  const [healthCover, setHealthCover] = useState("₹10 Lakh");
  const [healthType, setHealthType] = useState("Individual");
  const [healthFamily, setHealthFamily] = useState("Just Me");
  const [healthConditions, setHealthConditions] = useState("None");

  // Footer / Mini callback form states
  const [ctaPhone, setCtaPhone] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (key: "mf" | "term" | "save" | "hlth") => {
    setActiveTab(key);
  };

  const handleExploreProduct = (key: "mf" | "term" | "save" | "hlth") => {
    setActiveTab(key);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: boolean; phone?: boolean } = {};
    if (!name.trim()) errors.name = true;
    if (!phone.trim()) errors.phone = true;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitted(true);
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaPhone.trim()) return;
    setCtaSubmitted(true);
    setCtaPhone("");
  };

  const currentProduct = productData[activeTab];

  return (
    <div className={`relative overflow-hidden min-h-screen text-text-primary transition-colors duration-300 theme-${activeTab}`}>
      {/* Background Mesh */}
      <div className="mesh"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-[5vw] pt-20 pb-24 text-center">
        {/* Product Switcher Tabs */}
        <div className="product-tabs inline-flex bg-white border border-slate-200 p-1.5 rounded-full gap-1.5 mb-12 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar shadow-lg shadow-slate-200/50 relative z-20">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`ptab flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border-none cursor-pointer whitespace-nowrap transition-all duration-300 select-none ${
                  isTabActive
                    ? "bg-accent-custom text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                style={isTabActive ? { boxShadow: "0 4px 16px var(--accent-glow)" } : undefined}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Headings */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <p className="hero-kicker text-xs font-bold font-display tracking-[0.2em] text-accent-custom uppercase transition-colors duration-500">
            {currentProduct.kicker}
          </p>
          <h1 className="hero-h1 font-display text-4xl sm:text-5xl md:text-[5.5rem] font-extrabold leading-[1.0] tracking-tight text-slate-900 max-w-5xl mx-auto transition-all duration-500">
            {currentProduct.h1First}{" "}
            <span className="text-accent-custom bg-clip-text transition-colors duration-500 block sm:inline-block">
              {currentProduct.h1Highlight}
            </span>
          </h1>
          <p className="hero-sub text-sm sm:text-base md:text-[1.05rem] text-slate-600 max-w-2xl mx-auto leading-relaxed transition-all duration-500 font-sans mt-4">
            {currentProduct.sub}
          </p>
        </div>

        {/* Interactive Lead form card */}
        <div
          ref={formRef}
          id="lead-form-card"
          className="form-card w-full max-w-[580px] bg-white border border-slate-200/90 rounded-[28px] p-8 md:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden text-left transition-all duration-500"
          style={{
            boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 0 30px var(--accent-glow)",
          }}
        >
          {/* Accent glow on form top right */}
          <div
            className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] rounded-full pointer-events-none opacity-40 transition-all duration-700"
            style={{
              background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            }}
          ></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-fields"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                <div>
                  <h3 className="form-card-title font-display text-xl md:text-2xl font-bold text-slate-900 tracking-tight transition-colors duration-500">
                    {currentProduct.formTitle}
                  </h3>
                  <p className="form-card-sub text-xs text-slate-500 leading-normal mt-1 transition-colors duration-500">
                    {currentProduct.formSub}
                  </p>
                </div>

                {/* Grid Inputs (Name, Phone) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                      Full Name
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      placeholder="Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`form-input-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-sans focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20 ${
                        validationErrors.name
                          ? "border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                          : "border-slate-200"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                      Mobile Number
                    </label>
                    <input
                      suppressHydrationWarning
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`form-input-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-sans focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20 ${
                        validationErrors.phone
                          ? "border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                          : "border-slate-200"
                      }`}
                    />
                  </div>
                </div>

                {/* Grid Inputs (Email, Age) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                      Email Address
                    </label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      placeholder="rahul@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-sans focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                      Age
                    </label>
                    <input
                      suppressHydrationWarning
                      type="number"
                      placeholder="28"
                      min="18"
                      max="70"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="form-input-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-sans focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                    />
                  </div>
                </div>

                {/* Product Specific Sub-panels */}
                <div className="border-t border-slate-100 pt-5 mt-2 transition-all duration-300">
                  {activeTab === "mf" && (
                    <div className="space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                          Monthly Investment Amount
                        </label>
                        <div className="space-y-2.5 mt-1">
                          <div className="flex justify-between items-center">
                            <span className="font-display text-2xl font-bold text-accent-custom transition-colors duration-500">
                              ₹{sipAmount.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-500 font-medium font-sans">/month</span>
                          </div>
                          <input
                            suppressHydrationWarning
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={sipAmount}
                            onChange={(e) => setSipAmount(Number(e.target.value))}
                            className="range-input w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Investment Goal
                          </label>
                          <select
                            suppressHydrationWarning
                            value={mfGoal}
                            onChange={(e) => setMfGoal(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="">Select Goal</option>
                            <option value="Retirement">Retirement Corpus</option>
                            <option value="Child Education">Child Education</option>
                            <option value="Home Purchase">Home Purchase</option>
                            <option value="Wealth Creation">Wealth Creation</option>
                            <option value="Tax Saving">Tax Saving (ELSS)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Risk Appetite
                          </label>
                          <select
                            suppressHydrationWarning
                            value={mfRisk}
                            onChange={(e) => setMfRisk(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Conservative">Conservative</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Aggressive">Aggressive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "term" && (
                    <div className="space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                          Desired Coverage Amount
                        </label>
                        <div className="space-y-2.5 mt-1">
                          <div className="flex justify-between items-center">
                            <span className="font-display text-2xl font-bold text-accent-custom transition-colors duration-500">
                              ₹{termCoverage} Crore{termCoverage > 1 ? "s" : ""}
                            </span>
                            <span className="text-xs text-slate-500 font-medium font-sans">life cover</span>
                          </div>
                          <input
                            suppressHydrationWarning
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={termCoverage}
                            onChange={(e) => setTermCoverage(Number(e.target.value))}
                            className="range-input w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Annual Income
                          </label>
                          <select
                            suppressHydrationWarning
                            value={termIncome}
                            onChange={(e) => setTermIncome(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Below ₹5 LPA">Below ₹5 LPA</option>
                            <option value="₹5–10 LPA">₹5–10 LPA</option>
                            <option value="₹10–25 LPA">₹10–25 LPA</option>
                            <option value="Above ₹25 LPA">Above ₹25 LPA</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Smoker?
                          </label>
                          <select
                            suppressHydrationWarning
                            value={termSmoker}
                            onChange={(e) => setTermSmoker(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Non-Smoker">Non-Smoker</option>
                            <option value="Smoker">Smoker</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "save" && (
                    <div className="space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                          Monthly Savings Target
                        </label>
                        <div className="space-y-2.5 mt-1">
                          <div className="flex justify-between items-center">
                            <span className="font-display text-2xl font-bold text-accent-custom transition-colors duration-500">
                              ₹{savingsAmount.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-500 font-medium font-sans">/month savings</span>
                          </div>
                          <input
                            suppressHydrationWarning
                            type="range"
                            min="1000"
                            max="200000"
                            step="1000"
                            value={savingsAmount}
                            onChange={(e) => setSavingsAmount(Number(e.target.value))}
                            className="range-input w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Savings Goal
                          </label>
                          <select
                            suppressHydrationWarning
                            value={saveGoal}
                            onChange={(e) => setSaveGoal(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Emergency Fund">Emergency Fund</option>
                            <option value="Marriage">Marriage</option>
                            <option value="Child Future">Child Future</option>
                            <option value="Retirement">Retirement</option>
                            <option value="Business Capital">Business Capital</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Time Horizon
                          </label>
                          <select
                            suppressHydrationWarning
                            value={saveHorizon}
                            onChange={(e) => setSaveHorizon(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="1–3 years">1–3 years</option>
                            <option value="3–7 years">3–7 years</option>
                            <option value="7–15 years">7–15 years</option>
                            <option value="15+ years">15+ years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "hlth" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Cover Required
                          </label>
                          <select
                            suppressHydrationWarning
                            value={healthCover}
                            onChange={(e) => setHealthCover(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="₹5 Lakh">₹5 Lakh</option>
                            <option value="₹10 Lakh">₹10 Lakh</option>
                            <option value="₹25 Lakh">₹25 Lakh</option>
                            <option value="₹50 Lakh">₹50 Lakh</option>
                            <option value="₹1 Crore+">₹1 Crore+</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Plan Type
                          </label>
                          <select
                            suppressHydrationWarning
                            value={healthType}
                            onChange={(e) => setHealthType(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Individual">Individual</option>
                            <option value="Family Floater">Family Floater</option>
                            <option value="Senior Citizen">Senior Citizen</option>
                            <option value="Critical Illness">Critical Illness</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Family Members to Cover
                          </label>
                          <select
                            suppressHydrationWarning
                            value={healthFamily}
                            onChange={(e) => setHealthFamily(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="Just Me">Just Me</option>
                            <option value="Me + Spouse">Me + Spouse</option>
                            <option value="Me + Spouse + 1 Child">Me + Spouse + 1 Child</option>
                            <option value="Me + Spouse + 2 Children">Me + Spouse + 2 Children</option>
                            <option value="Include Parents">Include Parents</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-bold text-slate-500 tracking-wider uppercase font-sans">
                            Pre-existing Conditions?
                          </label>
                          <select
                            suppressHydrationWarning
                            value={healthConditions}
                            onChange={(e) => setHealthConditions(e.target.value)}
                            className="form-select-custom w-full bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none transition-all font-sans cursor-pointer focus:border-accent-custom focus:ring-2 focus:ring-accent-custom/20"
                          >
                            <option value="None">None</option>
                            <option value="Diabetes">Diabetes</option>
                            <option value="Hypertension">Hypertension</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  className="w-full py-4 bg-accent-custom text-white font-display font-extrabold text-base border-none rounded-xl cursor-pointer tracking-tight transition-all duration-300 hover:scale-[1.01] hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 group relative z-10 shadow-lg"
                  style={{
                    boxShadow: "0 8px 24px var(--accent-glow)",
                  }}
                >
                  <span>{currentProduct.submitText}</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-[0.72rem] text-slate-500 text-center leading-relaxed font-sans pt-1">
                  By continuing, you agree to our{" "}
                  <Link href="/privacy" className="text-slate-700 underline font-medium hover:text-slate-900">
                    Privacy Policy
                  </Link>{" "}
                  &amp;{" "}
                  <Link href="/terms" className="text-slate-700 underline font-medium hover:text-slate-900">
                    Terms
                  </Link>
                  . We connect you with licensed advisors. Your data is encrypted &amp; never sold.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-10 space-y-4 relative z-10 font-sans"
              >
                <div className="text-5xl">🎉</div>
                <h3 className="font-display text-2xl font-bold text-slate-900">You're all set!</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  A licensed advisor will call you within 2 hours. Keep your phone close. We have sent a confirmation details message to your mobile number.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 border border-slate-200 bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-slate-100 transition-all font-sans"
                >
                  Fill Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Proof items below Form */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10 text-[0.82rem] text-text-secondary font-sans">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[0.7rem] text-emerald-400 font-bold">
              ✓
            </span>
            No spam calls
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[0.7rem] text-emerald-400 font-bold">
              ✓
            </span>
            100% free service
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[0.7rem] text-emerald-400 font-bold">
              ✓
            </span>
            Free consultation
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[0.7rem] text-emerald-400 font-bold">
              ✓
            </span>
            SSL secured
          </div>
        </div>
      </section>

      {/* Marquee Bar with moving dots */}
      <div className="marquee-bar bg-slate-50/80 border-y border-slate-200 py-4 overflow-hidden relative z-10 backdrop-blur-sm">
        <div className="marquee-track flex gap-12 w-max animate-marquee font-sans font-semibold text-[0.8rem] text-text-secondary tracking-wide uppercase">
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>100% Free Comparison Service
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Connect with Licensed Advisors
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>50+ Partner Insurers &amp; Fund Houses
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>10,000+ Leads Connected
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>No Hidden Charges Ever
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>4.8★ User Satisfaction
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Callback Within 2 Hours
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Trusted by Families Across India
          </span>
          {/* Duplicate loop */}
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>100% Free Comparison Service
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Connect with Licensed Advisors
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>50+ Partner Insurers &amp; Fund Houses
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>10,000+ Leads Connected
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>No Hidden Charges Ever
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>4.8★ User Satisfaction
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Callback Within 2 Hours
          </span>
          <span className="m-item flex items-center gap-2">
            <span className="m-dot"></span>Trusted by Families Across India
          </span>
        </div>
      </div>

      {/* Trust Stats Section */}
      <section className="stats-section bg-surface/50 border-y border-border-custom py-16 px-[5vw] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-border-custom rounded-[20px] overflow-hidden font-sans shadow-xl backdrop-blur-md">
            <div className="stat-box p-8 text-center border-r border-b lg:border-b-0 border-border-custom bg-background/25">
              <div className="stat-num font-display text-4xl md:text-5xl font-extrabold text-[#00D4AA] mb-2">
                10,000+
              </div>
              <div className="stat-lbl text-[0.85rem] text-text-secondary font-medium">Leads Connected</div>
            </div>
            <div className="stat-box p-8 text-center border-r-0 lg:border-r border-b lg:border-b-0 border-border-custom bg-background/25">
              <div className="stat-num font-display text-4xl md:text-5xl font-extrabold text-[#7C6FF7] mb-2">
                50+
              </div>
              <div className="stat-lbl text-[0.85rem] text-text-secondary font-medium">Partner Advisors</div>
            </div>
            <div className="stat-box p-8 text-center border-r border-border-custom bg-background/25">
              <div className="stat-num font-display text-4xl md:text-5xl font-extrabold text-[#F5A623] mb-2">
                2 Hours
              </div>
              <div className="stat-lbl text-[0.85rem] text-text-secondary font-medium">Average Callback</div>
            </div>
            <div className="stat-box p-8 text-center bg-background/25">
              <div className="stat-num font-display text-4xl md:text-5xl font-extrabold text-[#FF5E7D] mb-2">
                4.8 ★
              </div>
              <div className="stat-lbl text-[0.85rem] text-text-secondary font-medium">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-section py-24 px-[5vw] relative z-10 bg-background/40">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <div className="eyebrow font-mono text-[0.7rem] tracking-[0.15em] text-accent-custom uppercase flex items-center gap-1 justify-center">
              Our Process
            </div>
            <h2 className="section-title font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight max-w-xl mx-auto">
              Your plan in 4 simple steps
            </h2>
            <p className="section-sub text-[1rem] text-text-secondary leading-relaxed max-w-[500px] mx-auto">
              No jargon. No sales spam. Just clear goals and matched advisors.
            </p>
          </div>

          <div className="how-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {[
              {
                step: "1",
                title: "Share Your Goals",
                desc: "Fill the form above. Tell us your financial goals, income, and what matters most to you.",
                color: "s1",
                shadow: "rgba(0,212,170,0.2)",
              },
              {
                step: "2",
                title: "An Expert Calls You",
                desc: "A licensed advisor from our partner network calls within 2 hours for a free needs assessment — zero pressure.",
                color: "s2",
                shadow: "rgba(124,111,247,0.2)",
              },
              {
                step: "3",
                title: "Compare & Choose",
                desc: "Receive a personalised comparison of products, providers, premiums, and features to choose what fits.",
                color: "s3",
                shadow: "rgba(245,166,35,0.2)",
              },
              {
                step: "4",
                title: "Get Started",
                desc: "Once you choose, the advisor you're connected with handles onboarding directly. Safe and simple.",
                color: "s4",
                shadow: "rgba(255,94,125,0.2)",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="how-card p-7 bg-surface/80 border border-border-custom rounded-2xl text-center relative transition-all duration-300 hover:scale-[1.02] hover:border-accent-custom/30 shadow-md backdrop-blur-sm"
              >
                <div
                  className={`step-num-circle w-12 h-12 rounded-full border border-border-custom flex items-center justify-center font-display text-base font-extrabold mb-5 mx-auto`}
                  style={{
                    color: "var(--accent)",
                    boxShadow: `0 0 20px ${item.shadow}`,
                  }}
                >
                  {item.step}
                </div>
                <h3 className="step-title font-display text-[1.05rem] font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="step-desc text-[0.825rem] text-text-secondary leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Products Deep Dive Section */}
      <section className="py-24 px-[5vw] relative z-10 bg-surface">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <div className="eyebrow font-mono text-[0.7rem] tracking-[0.15em] text-accent-custom uppercase flex items-center gap-1">
              Categories
            </div>
            <h2 className="section-title font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Products built for your life stage
            </h2>
            <p className="section-sub text-[1rem] text-text-secondary leading-relaxed max-w-[500px]">
              Evaluate top plans, compound your wealth, and secure family income with verified advisory.
            </p>
          </div>

          <div className="cat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Mutual Funds",
                icon: "📈",
                desc: "SIP compounding and tax saving ELSS tailored to your timeline",
                tab: "mf",
                count: "45 plans reviewed",
                tag: "Most Popular",
              },
              {
                title: "Term Insurance",
                icon: "🛡️",
                desc: "High-value life coverage with claim settlement support guidance",
                tab: "term",
                count: "48 plans reviewed",
                tag: "Save up to 40%",
              },
              {
                title: "Savings Plans",
                icon: "🏦",
                desc: "Capital safe instruments with guaranteed tax-free returns",
                tab: "save",
                count: "30 plans reviewed",
                tag: "Guaranteed",
              },
              {
                title: "Health Cover",
                icon: "❤️‍🩹",
                desc: "Cashless coverage matching cashless hospital availability",
                tab: "hlth",
                count: "62 plans reviewed",
                tag: "No Claim Bonus",
              },
            ].map((cat) => (
              <button
                suppressHydrationWarning
                key={cat.title}
                onClick={() => handleExploreProduct(cat.tab as any)}
                className="cat-card p-6 bg-white border border-slate-200/80 rounded-2xl cursor-pointer hover:border-accent-custom/40 hover:-translate-y-1 transition-all duration-300 group hover:shadow-xl shadow-slate-200/40 text-left w-full block focus:outline-none relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="cat-icon w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[0.62rem] font-bold tracking-wider font-mono uppercase bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="cat-name font-display text-[1.1rem] font-bold text-text-primary mb-1">
                  {cat.title}
                </h3>
                <p className="text-[0.78rem] text-text-secondary font-sans leading-relaxed mb-4 min-h-[50px]">
                  {cat.desc}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-border-custom/50">
                  <span className="cat-count text-[0.7rem] text-accent-custom font-mono transition-colors duration-300">
                    {cat.count}
                  </span>
                  <span className="text-xs font-bold text-text-secondary group-hover:text-accent-custom transition-all flex items-center gap-1 font-sans">
                    Get Started &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Compare/Pillars Section */}
      <section className="compare-section py-24 px-[5vw] relative z-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="space-y-8 font-sans">
              <div className="space-y-4">
                <div className="eyebrow font-mono text-[0.7rem] tracking-[0.15em] text-accent-custom uppercase flex items-center gap-1">
                  Our Promise
                </div>
                <h2 className="section-title font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                  Built for the buyer, not the broker
                </h2>
                <p className="section-sub text-[1rem] text-text-secondary leading-relaxed max-w-[500px]">
                  Every recommendation is backed by conflict-free, customer-first assessments.
                </p>
              </div>

              <div className="pillar-list border-y border-border-custom divide-y divide-border-custom">
                {[
                  {
                    icon: "🔬",
                    title: "Data-First Reviews",
                    desc: "Every policy clause evaluated. No marketing payouts or product prioritization.",
                  },
                  {
                    icon: "⚖️",
                    title: "Zero Conflicts of Interest",
                    desc: "No commission markup on advisory. Transparency is our core value.",
                  },
                  {
                    icon: "🆘",
                    title: "Active Claims Advocacy",
                    desc: "Dedicated claim desk coordinating cashless approvals at hospitals.",
                  },
                ].map((pillar) => (
                  <div key={pillar.title} className="pillar flex gap-5 py-6 items-start">
                    <div className="pillar-ico w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg mt-0.5 shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[0.95rem] text-text-primary mb-1">{pillar.title}</h4>
                      <p className="text-[0.855rem] text-text-secondary leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Comparison Table */}
            <div className="compare-table bg-white border border-slate-200 rounded-[20px] overflow-hidden font-sans shadow-xl shadow-slate-200/40">
              <div className="compare-head grid grid-cols-[1.4fr_1fr_1fr] bg-slate-50 border-b border-slate-200 text-[0.72rem] font-bold tracking-wider uppercase font-mono">
                <div className="p-4 pl-5">Feature</div>
                <div className="p-4 text-accent-custom transition-colors duration-500">InsurEdge</div>
                <div className="p-4 text-text-secondary">Traditional Aggregators</div>
              </div>

              <div className="divide-y divide-border-custom">
                {[
                  { f: "Insurer alliances", a: "✓ None", b: "✗ Commission aligned", clean: true },
                  { f: "Independent reviews", a: "✓ Always", b: "✗ Sponsored ratings", clean: true },
                  { f: "Claim assistance", a: "✓ Active (24/7 Desk)", b: "✗ Relies on third-party helpline", clean: true },
                  { f: "Expert consults", a: "✓ Free & Vetted", b: "✗ Sales agents calling", clean: true },
                  { f: "Sorting criteria", a: "✓ Objective filters", b: "✗ Highest bidder gets top spot", clean: true },
                ].map((row) => (
                  <div
                    key={row.f}
                    className="compare-r grid grid-cols-[1.4fr_1fr_1fr] text-[0.85rem] hover:bg-background/25 transition-colors"
                  >
                    <div className="p-4 pl-5 text-text-primary font-sans font-medium">{row.f}</div>
                    <div className="p-4 text-accent-custom font-semibold transition-colors duration-500">{row.a}</div>
                    <div className="p-4 text-text-secondary font-medium">{row.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews/Testimonials Section */}
      <section className="testi-section py-24 px-[5vw] relative z-10 bg-surface/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <div className="eyebrow font-mono text-[0.7rem] tracking-[0.15em] text-accent-custom uppercase flex items-center justify-center gap-1">
              Customer Stories
            </div>
            <h2 className="section-title font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight max-w-xl mx-auto">
              10,000+ people connected with the right advisor
            </h2>
            <p className="section-sub text-[1rem] text-text-secondary leading-relaxed max-w-[500px] mx-auto">
              Read what they say about their free advisor matchmaking experience.
            </p>
          </div>

          <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {[
              {
                name: "Riya Sharma",
                role: "Software Engineer, Bangalore",
                avatar: "RS",
                text: `"I filled the form and got a call within 90 minutes. The advisor I was connected with helped me start a ₹5,000/month SIP. Really smooth experience and zero pressure."`,
                product: "Mutual Fund",
                color: "bg-emerald-500/10 text-[#00d4aa]",
              },
              {
                name: "Arjun Kulkarni",
                role: "Business Owner, Pune",
                avatar: "AK",
                text: `"Got connected to a term insurance advisor same day. They compared 8 plans transparently and explained the claim ratios. Ended up buying HDFC Life — great experience overall."`,
                product: "Term Insurance",
                color: "bg-violet-500/10 text-[#7c6ff7]",
              },
              {
                name: "Priya Menon",
                role: "Teacher, Chennai",
                avatar: "PM",
                text: `"Found the right family health plan through InsurEdge in under an hour. The advisor they connected me with was knowledgeable and helped us pick a cashless plan at a hospital nearby."`,
                product: "Health Insurance",
                color: "bg-rose-500/10 text-[#ff5e7d]",
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="testi-card p-7 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-slate-300 transition-all hover:-translate-y-1 duration-200 shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="text-yellow-500 text-sm tracking-wide">★★★★★</div>
                  <p className="text-text-primary text-[0.875rem] leading-relaxed italic">{rev.text}</p>
                </div>
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border-custom/50">
                  <div
                    className="w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white bg-gradient-to-br from-primary-custom to-[#8B5CF6]"
                  >
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary leading-tight">{rev.name}</h4>
                    <span className="text-[0.68rem] text-text-secondary">{rev.role}</span>
                  </div>
                  <span
                    className={`ml-auto text-[0.62rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${rev.color}`}
                  >
                    {rev.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Lead CTA Section */}
      <section className="cta2-section py-24 px-[5vw] relative z-10 text-center">
        <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-[28px] p-10 md:p-16 relative overflow-hidden shadow-xl shadow-slate-200/50">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(ellipse 60% 70% at 50% 50%, var(--accent-glow) 0%, transparent 65%)",
            }}
          ></div>

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent-custom transition-colors duration-500">
              Still thinking?
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-text-primary">
              Talk to an expert. <br />
              <span className="text-accent-custom transition-colors duration-500">It's completely free.</span>
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              No commitment. No spam. Just share your mobile number and we'll connect you with the right licensed advisor
              for your financial goals — within 2 hours.
            </p>

            {/* Inline Mini Callback Form */}
            <div className="pt-4 max-w-lg mx-auto">
              <form onSubmit={handleCtaSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  suppressHydrationWarning
                  type="tel"
                  placeholder={ctaSubmitted ? "✓ We'll call you shortly!" : "Enter your mobile number"}
                  value={ctaPhone}
                  disabled={ctaSubmitted}
                  onChange={(e) => setCtaPhone(e.target.value)}
                  className={`flex-grow bg-slate-50 border rounded-full px-6 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 font-sans shadow-sm ${
                    ctaSubmitted
                      ? "border-emerald-500/30 text-emerald-600 placeholder:text-emerald-600 bg-emerald-50"
                      : "border-slate-200 focus:border-accent-custom focus:bg-white focus:ring-4 focus:ring-accent-custom/10"
                  }`}
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={ctaSubmitted}
                  className="bg-accent-custom hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed text-white font-display font-extrabold text-sm px-8 py-3.5 rounded-full shadow-[0_8px_24px_var(--accent-glow)] transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap border-none"
                >
                  {ctaSubmitted ? "Success" : "Get Callback"} &rarr;
                </button>
              </form>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-5 pt-8 text-[0.76rem] text-text-secondary font-sans font-medium">
              <span className="flex items-center gap-1"><span className="text-sm">🔒</span> SSL Encrypted</span>
              <span className="flex items-center gap-1"><span className="text-sm">🆓</span> 100% Free Service</span>
              <span className="flex items-center gap-1"><span className="text-sm">🚫</span> No Spam Calls</span>
              <span className="flex items-center gap-1"><span className="text-sm">⭐</span> 4.8/5 Satisfaction</span>
              <span className="flex items-center gap-1"><span className="text-sm">📞</span> Callback in 2 Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section py-12 border-t border-border-custom bg-background/20 relative z-10 text-center px-6">
        <div className="max-w-6xl mx-auto space-y-8 font-sans">
          <p className="text-[0.68rem] font-bold text-text-secondary/60 uppercase tracking-[0.18em]">
            Advisors on our platform work with leading insurers &amp; fund houses including
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm font-bold text-text-secondary/40 select-none">
            {["HDFC Life", "ICICI Prudential", "Mirae Asset", "SBI Mutual Fund", "Star Health", "Niva Bupa", "Max Life", "Axis Bluechip"].map((p) => (
              <span key={p} className="hover:text-text-secondary/80 transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Quiz Overlay */}
      <AnimatePresence>
        {showQuiz && <OnboardingQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
}
