"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, HeartPulse, Landmark, Sparkles, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizData {
  age: number;
  dependents: string;
  income: string;
  medicalHistory: boolean;
  riskPreference: string;
}

export default function OnboardingQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuizData>({
    age: 30,
    dependents: "1-2",
    income: "5L-15L",
    medicalHistory: false,
    riskPreference: "balanced",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Calculate Health Score & Recommendations
  const calculateScoreAndRecommendation = () => {
    let score = 95;
    
    // Age Deductions
    if (data.age > 45) score -= 10;
    else if (data.age > 35) score -= 5;

    // Dependents Deductions (Assuming currently uninsured)
    if (data.dependents === "1-2") score -= 15;
    else if (data.dependents === "3+") score -= 25;

    // Medical Conditions
    if (data.medicalHistory) score -= 20;

    // Output Suggestions
    let termCover = "₹1 Crore";
    if (data.income === "15L-30L") termCover = "₹2 Crores";
    else if (data.income === "30L+") termCover = "₹3 Crores+";
    else if (data.income === "Under 5L") termCover = "₹50 Lakhs";

    let healthCover = "₹10 Lakhs";
    if (data.income === "15L-30L" || data.income === "30L+") healthCover = "₹15 - 25 Lakhs (with Super Top-up)";
    else if (data.medicalHistory) healthCover = "₹15 Lakhs (with Pre-existing cover)";

    let investmentType = "Mutual Funds (SIP)";
    if (data.riskPreference === "conservative") investmentType = "Guaranteed Savings Plan (Tax-Free)";
    else if (data.riskPreference === "balanced") investmentType = "Hybrid SIP + Capital Protection Plan";

    return {
      score: Math.max(30, score),
      termCover,
      healthCover,
      investmentType,
    };
  };

  const results = calculateScoreAndRecommendation();

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-xl bg-surface border border-border-custom rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-background transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Step Progress */}
        {step <= 5 && (
          <div className="w-full bg-border-custom h-1.5 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Age */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-custom">Step 1 of 5</span>
                <h3 className="text-2xl font-bold font-display">How old are you?</h3>
                <p className="text-sm text-text-secondary">Your age is the biggest driver of term life premiums.</p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Age</span>
                  <span className="text-primary-custom">{data.age} Years</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
                  className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                />
              </div>
              <div className="pt-6 flex justify-end">
                <button onClick={nextStep} className="btn-primary-custom">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Dependents */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-custom">Step 2 of 5</span>
                <h3 className="text-2xl font-bold font-display">Who relies on your income?</h3>
                <p className="text-sm text-text-secondary">We evaluate dependents to size your required term protection limit.</p>
              </div>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { value: "none", label: "No one (Independent)" },
                  { value: "1-2", label: "Spouse or 1-2 Dependents" },
                  { value: "3+", label: "Parents, Spouse & Children (3+ Dependents)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setData({ ...data, dependents: opt.value })}
                    className={`p-4 rounded-2xl border text-left font-medium transition-all cursor-pointer ${
                      data.dependents === opt.value
                        ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                        : "border-border-custom hover:bg-background"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <button onClick={prevStep} className="btn-outline-custom">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} className="btn-primary-custom">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Income */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-custom">Step 3 of 5</span>
                <h3 className="text-2xl font-bold font-display">What is your annual income?</h3>
                <p className="text-sm text-text-secondary">Used to estimate a cover multiplier (typically 15-20x annual income).</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { value: "Under 5L", label: "Under ₹5 Lakhs" },
                  { value: "5L-15L", label: "₹5L - ₹15 Lakhs" },
                  { value: "15L-30L", label: "₹15L - ₹30 Lakhs" },
                  { value: "30L+", label: "₹30 Lakhs+" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setData({ ...data, income: opt.value })}
                    className={`p-4 rounded-2xl border text-center font-medium transition-all cursor-pointer ${
                      data.income === opt.value
                        ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                        : "border-border-custom hover:bg-background"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <button onClick={prevStep} className="btn-outline-custom">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} className="btn-primary-custom">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Medical History */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-custom">Step 4 of 5</span>
                <h3 className="text-2xl font-bold font-display">Any medical conditions?</h3>
                <p className="text-sm text-text-secondary">Do you have history of diabetes, high blood pressure, or thyroid conditions?</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setData({ ...data, medicalHistory: true })}
                  className={`p-5 rounded-2xl border font-bold text-center transition-all cursor-pointer ${
                    data.medicalHistory === true
                      ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                      : "border-border-custom hover:bg-background"
                  }`}
                >
                  Yes, I have history
                </button>
                <button
                  onClick={() => setData({ ...data, medicalHistory: false })}
                  className={`p-5 rounded-2xl border font-bold text-center transition-all cursor-pointer ${
                    data.medicalHistory === false
                      ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                      : "border-border-custom hover:bg-background"
                  }`}
                >
                  No, I am fully fit
                </button>
              </div>
              <div className="pt-6 flex justify-between">
                <button onClick={prevStep} className="btn-outline-custom">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} className="btn-primary-custom">
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Risk preference */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-custom">Step 5 of 5</span>
                <h3 className="text-2xl font-bold font-display">What is your investment style?</h3>
                <p className="text-sm text-text-secondary">We customize savings plans to fit capital safety or equity compounding preference.</p>
              </div>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { value: "conservative", label: "100% Capital Safety (Tax-Free Returns)" },
                  { value: "balanced", label: "Moderate Risk (Hybrid Growth + Cover)" },
                  { value: "aggressive", label: "High Growth (Wealth Compounding / Index-linked)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setData({ ...data, riskPreference: opt.value })}
                    className={`p-4 rounded-2xl border text-left font-medium transition-all cursor-pointer ${
                      data.riskPreference === opt.value
                        ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                        : "border-border-custom hover:bg-background"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="pt-6 flex justify-between">
                <button onClick={prevStep} className="btn-outline-custom">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={nextStep} className="btn-primary-custom">
                  Analyze My Score <Sparkles size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Results */}
          {step === 6 && (
            <motion.div
              key="results"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-6 text-center"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-border-custom fill-none"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="48"
                      className="stroke-primary-custom fill-none"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 48}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - results.score / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold font-display text-text-primary">
                    {results.score}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold font-display">Your Financial Health Score</h4>
                  <p className="text-xs text-text-secondary max-w-[320px] mx-auto">
                    A score of {results.score}/100 indicates some key gaps in term or health insurance covers.
                  </p>
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="text-left bg-background border border-border-custom rounded-2xl p-5 space-y-4">
                <h5 className="font-bold text-xs uppercase tracking-wider text-primary-custom flex items-center gap-1.5">
                  <Activity size={14} /> Recommended Action Plan
                </h5>

                <div className="space-y-3.5 divide-y divide-border-custom">
                  {/* Term Recommend */}
                  <div className="flex items-start gap-3 pt-0">
                    <ShieldCheck className="h-5 w-5 text-primary-custom shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-text-primary">Term Life Cover</div>
                      <div className="text-xs text-text-secondary mt-0.5">Secure a pure life cover of <strong className="text-text-primary">{results.termCover}</strong> to protect dependents.</div>
                    </div>
                  </div>

                  {/* Health Recommend */}
                  <div className="flex items-start gap-3 pt-3">
                    <HeartPulse className="h-5 w-5 text-accent-custom shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-text-primary">Individual Health Plan</div>
                      <div className="text-xs text-text-secondary mt-0.5">Add an individual protection limit of <strong className="text-text-primary">{results.healthCover}</strong> to hedge hospital inflation.</div>
                    </div>
                  </div>

                  {/* Wealth Recommend */}
                  <div className="flex items-start gap-3 pt-3">
                    <Landmark className="h-5 w-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-xs text-text-primary">Milestone Wealth Planner</div>
                      <div className="text-xs text-text-secondary mt-0.5">Accumulate through a disciplined <strong className="text-text-primary">{results.investmentType}</strong> portfolio.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-border-custom text-text-secondary hover:text-text-primary hover:bg-background rounded-full font-medium transition-all text-sm cursor-pointer"
                >
                  Close Analysis
                </button>
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = `/plans?tab=term&income=${data.income}&age=${data.age}`;
                  }}
                  className="btn-primary-custom text-sm"
                >
                  View Recommended Plans <CheckCircle2 size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
