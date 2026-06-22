"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, HeartPulse, Check, AlertCircle, FileCheck, PhoneCall, Star, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  provider: string;
  category: "health" | "term";
  baseCover: string;
  premium: number;
  roomRent: string;
  copayment: string;
  preExisting: string;
  settlement: string;
  logoText: string;
  badge?: string;
  rating: string;
  inclusions: string[];
  exclusions: string[];
}

const PRODUCTS_DB: Record<string, Product> = {
  h1: {
    id: "h1",
    name: "Optima Secure",
    provider: "HDFC ERGO",
    category: "health",
    baseCover: "₹10 Lakhs",
    premium: 650,
    roomRent: "No Limit",
    copayment: "0%",
    preExisting: "3 Years",
    settlement: "99.2%",
    logoText: "HE",
    badge: "Recommended",
    rating: "9.5/10",
    inclusions: [
      "2x coverage benefit (Secure Benefit) from day one",
      "Cashless hospitalization in 10,000+ network hospitals",
      "Zero sublimits on ICU or single private room rents",
      "Pre and post hospitalization medical charges covered up to 60/180 days",
    ],
    exclusions: [
      "Cosmetic surgery or cosmetic dental treatments",
      "Injury due to active participation in hazardous sports",
      "Self-inflicted injuries or suicide attempts",
    ],
  },
  h2: {
    id: "h2",
    name: "ReAssure 2.0",
    provider: "Niva Bupa",
    category: "health",
    baseCover: "₹10 Lakhs",
    premium: 580,
    roomRent: "Any Category",
    copayment: "0%",
    preExisting: "3 Years",
    settlement: "96.5%",
    logoText: "NB",
    badge: "Good Choice",
    rating: "8.8/10",
    inclusions: [
      "Unlimited restore benefit for same or different illnesses",
      "Lock-in premium rates until a claim is filed",
      "Covers alternative AYUSH treatments (Ayurveda, Yoga, Unani)",
      "Daily hospital cash benefits included in premium",
    ],
    exclusions: [
      "Outpatient treatments (OPD) unless specifically rider-covered",
      "Weight loss treatments or obesity control surgeries",
      "Rehabilitation or drug/alcohol abuse therapies",
    ],
  },
  t1: {
    id: "t1",
    name: "Click2Protect Super",
    provider: "HDFC Life",
    category: "term",
    baseCover: "₹1 Crore",
    premium: 820,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting Period",
    settlement: "98.5%",
    logoText: "HL",
    badge: "Recommended",
    rating: "9.6/10",
    inclusions: [
      "Flexible death benefit payout (Lumpsum, Monthly income, or Hybrid)",
      "Waiver of premium on critical illness diagnosis",
      "Wife/spouse coverage attachment options in single policy",
      "Return of Premium (ROP) options at policy terminal maturity",
    ],
    exclusions: [
      "Suicide exclusion clause within first 12 months of policy schedule",
      "Fatal injuries due to war, riots, or radioactive chemical reactions",
      "Aviation hazard participation (unless licensed commercial pilot)",
    ],
  },
  t2: {
    id: "t2",
    name: "iProtect Smart",
    provider: "ICICI Pru",
    category: "term",
    baseCover: "₹1 Crore",
    premium: 790,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting Period",
    settlement: "97.8%",
    logoText: "IP",
    badge: "Good Choice",
    rating: "9.2/10",
    inclusions: [
      "Accelerated terminal illness payouts upon medical assessment",
      "Optional accidental death rider cover up to ₹2 Crores",
      "Special discounts on premiums for female policyholders",
      "Permanent disability premium waiver benefits",
    ],
    exclusions: [
      "Suicide exclusion within 1 year of policy start",
      "Participation in illegal activities or criminal actions",
      "Hazardous skydiving, racing, or commercial diving",
    ],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = idStr ? PRODUCTS_DB[idStr] : null;

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen text-text-primary text-center p-12 justify-center items-center">
        <div className="mesh" />
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <h2 className="text-xl font-bold font-display">Product Not Found</h2>
        <p className="text-xs text-text-secondary mt-1">The requested policy code does not exist in our audit records.</p>
        <Link href="/plans" className="btn-primary-custom mt-6 text-xs">
          Return to Comparison
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !consent) {
      alert("Please fill required phone number and accept terms.");
      return;
    }
    setCheckoutStep(2);
  };

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-12 border-b border-border-custom bg-surface/30 font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono mb-4">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/plans" className="hover:text-primary-custom transition-colors">Compare Plans</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">{product.name}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-custom/12 to-[#8B5CF6]/5 border border-border-custom rounded-2xl flex items-center justify-center font-display font-extrabold text-xl text-primary-custom">
                {product.logoText}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl font-bold">{product.name}</h1>
                  {product.badge && (
                    <span className="bg-primary-custom/12 text-primary-custom border border-primary-custom/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary font-semibold">{product.provider} · Overall Rating: {product.rating}</p>
              </div>
            </div>

            <div className="text-left md:text-right font-sans">
              <span className="text-[10px] text-text-secondary block font-bold uppercase tracking-wider">Estimated Premium</span>
              <span className="text-3xl font-extrabold text-text-primary">₹{product.premium} <span className="text-sm font-normal text-text-secondary">/ mo</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main product specs split */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left specs detail box */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Objective Parameters */}
              <div className="bg-surface border border-border-custom p-6 rounded-3xl space-y-4">
                <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-1.5"><FileCheck size={18} className="text-primary-custom" /> Clause &amp; Limits Audit</h3>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                    <span className="text-[10px] text-text-secondary block mb-0.5">Claim Settlement</span>
                    <span className="font-bold text-text-primary">{product.settlement}</span>
                  </div>
                  <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                    <span className="text-[10px] text-text-secondary block mb-0.5">Copayment Clauses</span>
                    <span className="font-bold text-text-primary">{product.copayment}</span>
                  </div>
                  <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                    <span className="text-[10px] text-text-secondary block mb-0.5">Room Rent Limit</span>
                    <span className="font-bold text-text-primary">{product.roomRent}</span>
                  </div>
                  <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                    <span className="text-[10px] text-text-secondary block mb-0.5">Pre-existing illness waiting</span>
                    <span className="font-bold text-text-primary">{product.preExisting}</span>
                  </div>
                </div>
              </div>

              {/* Inclusions */}
              <div className="bg-surface border border-border-custom p-6 rounded-3xl space-y-3">
                <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-1.5"><Check className="h-5 w-5 text-accent-custom" /> What is covered (Inclusions)</h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  {product.inclusions.map((inc, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="h-4.5 w-4.5 rounded-full bg-accent-custom/15 border border-accent-custom/30 text-accent-custom flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-surface border border-border-custom p-6 rounded-3xl space-y-3">
                <h3 className="font-display font-bold text-lg text-text-primary flex items-center gap-1.5"><AlertCircle className="h-5 w-5 text-red-500" /> What is not covered (Exclusions)</h3>
                <ul className="space-y-2.5 text-xs text-text-secondary">
                  {product.exclusions.map((exc, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="h-4.5 w-4.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">✕</span>
                      <span className="leading-relaxed">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Checkout form / expert sync */}
            <div className="lg:col-span-5 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-6 text-center">
              <AnimatePresence mode="wait">
                {checkoutStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-lg text-text-primary">Instant Quote Breakdown</h3>
                      <p className="text-xs text-text-secondary">Fill details to retrieve personalized schedule rates.</p>
                    </div>

                    <form onSubmit={handleCheckoutSubmit} className="text-left space-y-4 text-xs font-semibold">
                      <div className="space-y-1">
                        <label className="text-text-secondary">Mobile Number (IRDAI OTP Verified)</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                        />
                      </div>

                      <div className="flex items-start gap-2.5 py-1">
                        <input
                          type="checkbox"
                          required
                          id="consent"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 border-border-custom cursor-pointer accent-primary-custom"
                        />
                        <label htmlFor="consent" className="text-[10px] text-text-secondary leading-relaxed font-normal cursor-pointer select-none">
                          I consent to receive policy comparisons via WhatsApp. InsurEdge is SEBI/IRDAI registered and operates zero insurer alliances.
                        </label>
                      </div>

                      <button type="submit" className="w-full btn-primary-custom justify-center py-3 rounded-xl font-bold">
                        Confirm Quote Booking
                      </button>
                    </form>

                    <div className="p-4 bg-primary-custom/5 border border-primary-custom/25 rounded-2xl flex items-start gap-3 text-left">
                      <PhoneCall className="h-5 w-5 text-primary-custom shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-text-primary text-xs block">Need help matching this policy?</span>
                        <p className="text-[10px] text-text-secondary mt-0.5">Call <strong>1800-419-5920</strong> (Toll-free). An unbiased claim advisor will guide you.</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6 py-6"
                  >
                    <div className="w-12 h-12 bg-accent-custom/12 rounded-full border border-accent-custom/20 flex items-center justify-center text-accent-custom mx-auto mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-extrabold text-xl">Quote Request Sent!</h3>
                      <p className="text-xs text-text-secondary max-w-[280px] mx-auto leading-relaxed">
                        A personal advisor has been allocated to match this quote. Verification sheets sent to <strong className="text-text-primary">{phone}</strong>.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col gap-2.5">
                      <Link href="/dashboard" className="w-full bg-text-primary text-background dark:bg-white dark:text-slate-900 py-3 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                        Go to My Dashboard
                      </Link>
                      <button onClick={() => setCheckoutStep(1)} className="w-full border border-border-custom hover:bg-background text-text-secondary hover:text-text-primary py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer">
                        Check Another Policy
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
