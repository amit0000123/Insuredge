"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, Shield, Search, CheckCircle2, ChevronRight, SlidersHorizontal, ArrowRight, ArrowUpDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Plan {
  id: string;
  name: string;
  provider: string;
  category: "health" | "term";
  baseCover: string;
  basePremium: number; // base monthly premium for baseline variables
  roomRent: string;
  copayment: string;
  preExisting: string;
  settlement: string;
  logoText: string;
  badge?: string;
  rating: string;
}

const PLANS_DB: Plan[] = [
  // Health
  {
    id: "h1",
    name: "Optima Secure",
    provider: "HDFC ERGO",
    category: "health",
    baseCover: "₹10 Lakhs",
    basePremium: 650,
    roomRent: "No Limit",
    copayment: "0%",
    preExisting: "3 Years",
    settlement: "99.2%",
    logoText: "HE",
    badge: "Recommended",
    rating: "9.5/10",
  },
  {
    id: "h2",
    name: "ReAssure 2.0",
    provider: "Niva Bupa",
    category: "health",
    baseCover: "₹10 Lakhs",
    basePremium: 580,
    roomRent: "Any Category",
    copayment: "0%",
    preExisting: "3 Years",
    settlement: "96.5%",
    logoText: "NB",
    badge: "Good Choice",
    rating: "8.8/10",
  },
  {
    id: "h3",
    name: "Care Supreme",
    provider: "Care Health",
    category: "health",
    baseCover: "₹7 Lakhs",
    basePremium: 480,
    roomRent: "Single Private",
    copayment: "0%",
    preExisting: "4 Years",
    settlement: "95.2%",
    logoText: "CH",
    rating: "8.4/10",
  },
  {
    id: "h4",
    name: "Activ Health Platinum",
    provider: "Aditya Birla",
    category: "health",
    baseCover: "₹10 Lakhs",
    basePremium: 620,
    roomRent: "No Limit",
    copayment: "10% Co-pay",
    preExisting: "3 Years",
    settlement: "94.0%",
    logoText: "AB",
    rating: "8.1/10",
  },
  // Term
  {
    id: "t1",
    name: "Click2Protect Super",
    provider: "HDFC Life",
    category: "term",
    baseCover: "₹1 Crore",
    basePremium: 820,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting",
    settlement: "98.5%",
    logoText: "HL",
    badge: "Recommended",
    rating: "9.6/10",
  },
  {
    id: "t2",
    name: "iProtect Smart",
    provider: "ICICI Pru",
    category: "term",
    baseCover: "₹1 Crore",
    basePremium: 790,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting",
    settlement: "97.8%",
    logoText: "IP",
    badge: "Good Choice",
    rating: "9.2/10",
  },
  {
    id: "t3",
    name: "Tech Term",
    provider: "LIC India",
    category: "term",
    baseCover: "₹1 Crore",
    basePremium: 980,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting",
    settlement: "98.6%",
    logoText: "LI",
    badge: "Review Needed",
    rating: "7.9/10",
  },
  {
    id: "t4",
    name: "eTouch Plan",
    provider: "Bajaj Allianz",
    category: "term",
    baseCover: "₹1 Crore",
    basePremium: 710,
    roomRent: "N/A",
    copayment: "0%",
    preExisting: "No Waiting",
    settlement: "96.2%",
    logoText: "BA",
    rating: "8.3/10",
  },
];

export default function Plans() {
  const [activeTab, setActiveTab] = useState<"health" | "term">("health");
  const [searchQuery, setSearchQuery] = useState("");
  const [ageGroup, setAgeGroup] = useState("31-45");
  const [coverageLimit, setCoverageLimit] = useState("standard");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Toggle selection for comparison
  const handleToggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert("You can compare up to 3 plans side-by-side.");
        return;
      }
      setSelectedForCompare((prev) => [...prev, id]);
    }
  };

  // Adjust premium dynamically based on filters
  const getDynamicPremium = (base: number) => {
    let multiplier = 1.0;
    
    // Age Group adjustments
    if (ageGroup === "18-30") multiplier = 0.8;
    else if (ageGroup === "46-60") multiplier = 1.5;
    else if (ageGroup === "60+") multiplier = 2.4;

    // Coverage limit adjustments
    if (coverageLimit === "basic") multiplier *= 0.7;
    else if (coverageLimit === "premium") multiplier *= 1.6;

    return Math.round(base * multiplier);
  };

  const getDynamicCoverText = (planCat: "health" | "term") => {
    if (planCat === "health") {
      if (coverageLimit === "basic") return "₹5 Lakhs";
      if (coverageLimit === "standard") return "₹10 Lakhs";
      return "₹25 Lakhs+";
    } else {
      if (coverageLimit === "basic") return "₹50 Lakhs";
      if (coverageLimit === "standard") return "₹1 Crore";
      return "₹2 Crores+";
    }
  };

  // Filter plans list
  const filteredPlans = PLANS_DB.filter(
    (plan) =>
      plan.category === activeTab &&
      (plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.provider.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      {/* Mesh background */}
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-16 border-b border-border-custom bg-surface/30">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">Compare Plans</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Compare Insurance <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">With No Bias</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            We evaluate room-rent limits, copayments, claim settlement rates, and waiting periods. Check plans to compare up to 3 side-by-side.
          </p>
        </div>
      </section>

      {/* Compare Floating Bar */}
      <AnimatePresence>
        {selectedForCompare.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl bg-surface border border-primary-custom/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <span className="bg-primary-custom/12 text-primary-custom text-xs font-mono font-bold px-3 py-1.5 rounded-full">
                {selectedForCompare.length} Selected
              </span>
              <p className="hidden sm:block text-xs text-text-secondary font-medium">Ready for side-by-side features comparison.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedForCompare([])}
                className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompareModal(true)}
                className="btn-primary-custom text-xs py-2 px-5 font-semibold cursor-pointer shadow-md"
              >
                Compare Now <ArrowUpDown size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="relative z-10 py-12 flex-grow">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Tabs switcher */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              onClick={() => {
                setActiveTab("health");
                setSelectedForCompare([]);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                activeTab === "health"
                  ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                  : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
              }`}
            >
              <HeartPulse size={18} /> Health Protection
            </button>
            <button
              onClick={() => {
                setActiveTab("term");
                setSelectedForCompare([]);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all cursor-pointer ${
                activeTab === "term"
                  ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                  : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
              }`}
            >
              <Shield size={18} /> Term Life Cover
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Filter Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface border border-border-custom p-6 rounded-3xl space-y-6">
                <div className="flex items-center gap-2 font-display font-bold text-lg border-b border-border-custom pb-3">
                  <SlidersHorizontal size={18} className="text-primary-custom" />
                  <h3>Dynamic Filters</h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Search Insurer / Policy</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="e.g. HDFC, Care..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-background border border-border-custom rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                    />
                  </div>
                </div>

                {/* Age filter */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary block">Age Group (Adjusts Premium)</label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    {[
                      { value: "18-30", label: "18 - 30 Yrs" },
                      { value: "31-45", label: "31 - 45 Yrs" },
                      { value: "46-60", label: "46 - 60 Yrs" },
                      { value: "60+", label: "60+ Yrs" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setAgeGroup(opt.value)}
                        className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                          ageGroup === opt.value
                            ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                            : "border-border-custom hover:bg-background text-text-secondary"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sum Assured selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary block">Desired Coverage Tier</label>
                  <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-xs font-semibold">
                    {[
                      { value: "basic", label: "Basic" },
                      { value: "standard", label: "Standard" },
                      { value: "premium", label: "Premium" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCoverageLimit(opt.value)}
                        className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                          coverageLimit === opt.value
                            ? "border-primary-custom bg-primary-custom/5 text-primary-custom"
                            : "border-border-custom hover:bg-background text-text-secondary"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upload Policy Decode Widget */}
              <div className="bg-[#111827] border border-border-custom p-6 rounded-3xl relative overflow-hidden text-center space-y-4">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary-custom rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
                <h4 className="font-display font-bold text-lg text-white">Need a Second Opinion?</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Upload an existing policy schedule PDF. Our certified experts will audit fine print, co-pays, and hidden restrictions.
                </p>
                <Link href="/dashboard" className="w-full bg-white hover:bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                  Upload to Doc Vault <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Plans List */}
            <div className="lg:col-span-8 space-y-4">
              {filteredPlans.length === 0 ? (
                <div className="bg-surface border border-border-custom rounded-3xl p-12 text-center text-text-secondary font-sans">
                  No plans matching filters found. Try clearing search query.
                </div>
              ) : (
                filteredPlans.map((plan) => {
                  const isChecked = selectedForCompare.includes(plan.id);
                  const dynamicPremium = getDynamicPremium(plan.basePremium);
                  const dynamicCover = getDynamicCoverText(plan.category);
                  
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 bg-surface border rounded-3xl hover:border-primary-custom/30 transition-all duration-300 relative overflow-hidden ${
                        plan.badge ? "border-primary-custom/30" : "border-border-custom"
                      }`}
                    >
                      {plan.badge && (
                        <div className="absolute top-0 right-0 bg-primary-custom text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl font-mono uppercase tracking-wider">
                          {plan.badge}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary-custom/10 to-[#8B5CF6]/5 border border-border-custom rounded-2xl flex items-center justify-center font-display font-extrabold text-primary-custom text-lg">
                            {plan.logoText}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold font-display text-text-primary">{plan.name}</h3>
                            <p className="text-xs text-text-secondary font-semibold">{plan.provider}</p>
                          </div>
                        </div>

                        {/* Premium Price */}
                        <div className="text-left sm:text-right font-sans">
                          <span className="text-[10px] text-text-secondary block font-bold uppercase tracking-wider">Est. Sum Assured: {dynamicCover}</span>
                          <span className="text-2xl font-extrabold text-text-primary">₹{dynamicPremium} <span className="text-xs font-normal text-text-secondary">/ month</span></span>
                        </div>
                      </div>

                      {/* Detail metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-xs font-sans">
                        <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                          <span className="text-[10px] text-text-secondary block mb-0.5">Claim Settlement</span>
                          <span className="font-bold text-text-primary">{plan.settlement}</span>
                        </div>
                        <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                          <span className="text-[10px] text-text-secondary block mb-0.5">Copayment Clauses</span>
                          <span className="font-bold text-text-primary">{plan.copayment}</span>
                        </div>
                        <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                          <span className="text-[10px] text-text-secondary block mb-0.5">Room Rent Limit</span>
                          <span className="font-bold text-text-primary">{plan.roomRent}</span>
                        </div>
                        <div className="bg-background/40 border border-border-custom p-3 rounded-xl">
                          <span className="text-[10px] text-text-secondary block mb-0.5">Pre-existing disease</span>
                          <span className="font-bold text-text-primary">{plan.preExisting}</span>
                        </div>
                      </div>

                      {/* Card Action footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border-custom flex-wrap gap-4 font-sans">
                        {/* Checkbox for compare */}
                        <button
                          onClick={() => handleToggleCompare(plan.id)}
                          className={`flex items-center gap-2 text-xs font-bold transition-all cursor-pointer py-1.5 px-3 rounded-lg border ${
                            isChecked
                              ? "bg-primary-custom/12 text-primary-custom border-primary-custom/40"
                              : "border-border-custom text-text-secondary hover:text-text-primary hover:border-border-custom/80"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isChecked ? "bg-primary-custom border-primary-custom text-white" : "border-border-custom"
                          }`}>
                            {isChecked && "✓"}
                          </span>
                          Compare side-by-side
                        </button>

                        <div className="flex gap-2">
                          <Link
                            href={`/products/${plan.id}`}
                            className="px-4 py-2 border border-border-custom text-text-primary rounded-xl text-xs font-bold hover:bg-background transition-colors cursor-pointer flex items-center justify-center"
                          >
                            Full Details
                          </Link>
                          <Link
                            href="/contact"
                            className="bg-text-primary text-background dark:bg-white dark:text-slate-900 px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center"
                          >
                            Get Free Advice
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison Overlay Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompareModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-surface border border-border-custom rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-background transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-2xl">Side-by-Side Comparison</h3>
                  <p className="text-xs text-text-secondary font-sans">Objective criteria audit of your chosen policies.</p>
                </div>

                {/* Table Comparison */}
                <div className="overflow-x-auto border border-border-custom rounded-2xl bg-background/40 font-sans text-xs">
                  <table className="w-full border-collapse text-left min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border-custom bg-surface/80">
                        <th className="p-4 font-bold text-text-secondary font-mono uppercase tracking-wider">Features</th>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return (
                            <th key={id} className="p-4 font-extrabold text-text-primary text-sm font-display">
                              {plan?.name} <span className="block text-[10px] text-text-secondary font-sans font-semibold mt-0.5">{plan?.provider}</span>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom">
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Claim Settlement Rate</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return <td key={id} className="p-4 font-extrabold text-accent-custom">{plan?.settlement}</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Sum Assured Cover Tier</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return <td key={id} className="p-4 text-text-primary font-medium">{getDynamicCoverText(plan?.category || "health")}</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Est. Monthly Premium</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          const premiumVal = getDynamicPremium(plan?.basePremium || 0);
                          return <td key={id} className="p-4 font-extrabold text-text-primary text-sm">₹{premiumVal} / mo</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Room Rent Sublimits</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return <td key={id} className="p-4 text-text-primary font-semibold">{plan?.roomRent}</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Copayment Clauses</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return <td key={id} className="p-4 text-text-primary font-semibold">{plan?.copayment}</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Pre-existing Illness Wait</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return <td key={id} className="p-4 text-text-primary">{plan?.preExisting}</td>;
                        })}
                      </tr>
                      <tr className="hover:bg-background/20 transition-colors">
                        <td className="p-4 font-bold text-text-secondary">Overall Advisor Score</td>
                        {selectedForCompare.map((id) => {
                          const plan = PLANS_DB.find((p) => p.id === id);
                          return (
                            <td key={id} className="p-4 font-bold text-primary-custom flex items-center gap-1">
                              <span>★</span> {plan?.rating}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 flex justify-end gap-3 font-sans text-xs">
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="px-6 py-3 border border-border-custom hover:bg-background text-text-secondary hover:text-text-primary rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Close Comparison
                  </button>
                  <Link href="/contact" onClick={() => setShowCompareModal(false)}>
                    <button className="btn-primary-custom font-bold">
                      Book Expert Consultation
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
