"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  HelpCircle,
  Sparkles,
  Check,
  Building2,
  MapPin,
  User,
  Mail,
  Phone,
  Info,
  Lock,
  Scale,
  FileText,
  AlertCircle,
  ThumbsUp,
  Star,
  Users,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Coins,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // Enquiry Form State
  const [selectedCategory, setSelectedCategory] = useState<string>("Term Insurance");
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [city, setCity] = useState("");
  const [requirementText, setRequirementText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: boolean;
    phone?: boolean;
  }>({});

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Blog Tab State
  const [selectedBlogTab, setSelectedBlogTab] = useState<string>("All");

  const homeBlogArticles = [
    {
      id: "1",
      title: "IRDAI New Term Insurance Guidelines — What Changes for You",
      excerpt: "IRDAI's latest circular standardises exclusion clauses and mandates higher claim settlement disclosures across all Indian insurers.",
      category: "Term Insurance",
      author: "Amit Sharma",
      date: "Jun 12, 2026",
      readTime: "5 min read",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60",
    },
    {
      id: "2",
      title: "Section 80D Explained: Save Up to ₹75,000 in Tax on Health Insurance",
      excerpt: "Complete guide to maximising tax deductions under Section 80D for yourself, your family, and senior citizen parents.",
      category: "Tax Planning",
      author: "Priya Nair",
      date: "Jun 05, 2026",
      readTime: "6 min read",
      badgeColor: "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60",
    },
    {
      id: "3",
      title: "SIP vs Lumpsum in 2026: Which Strategy Wins in a Volatile Market?",
      excerpt: "A data-backed comparison of rupee cost averaging through SIP versus deploying lumpsum capital during volatile index phases.",
      category: "Mutual Funds",
      author: "Rahul Verma",
      date: "May 28, 2026",
      readTime: "7 min read",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60",
    },
    {
      id: "4",
      title: "Critical Illness Riders: Are They Worth Adding to Your Term Plan?",
      excerpt: "A detailed breakdown of Critical Illness riders — understanding accelerated vs standalone payouts and when they make financial sense.",
      category: "Term Insurance",
      author: "Amit Sharma",
      date: "May 20, 2026",
      readTime: "6 min read",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60",
    },
    {
      id: "5",
      title: "10 Hidden Health Insurance Exclusions You Must Know Before Buying",
      excerpt: "From specific waiting periods to non-payable consumables and room rent sub-limits, understand what your health policy won't pay for.",
      category: "Health Insurance",
      author: "Dr. Sunita Rao",
      date: "May 12, 2026",
      readTime: "8 min read",
      badgeColor: "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60",
    },
    {
      id: "6",
      title: "Direct vs Regular Mutual Funds: How Much Are You Losing in Commissions?",
      excerpt: "Learn how the expense ratio difference between Direct and Regular mutual fund plans compounds into lakhs over a 15-year horizon.",
      category: "Mutual Funds",
      author: "Rahul Verma",
      date: "Apr 28, 2026",
      readTime: "5 min read",
      badgeColor: "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60",
    },
  ];

  const [displayedArticles, setDisplayedArticles] = useState(homeBlogArticles);

  useEffect(() => {
    const saved = localStorage.getItem("ie_blog_articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDisplayedArticles(
            parsed.map((a: { id: string; title: string; excerpt: string; category: string; author: string; date: string; readTime: string }) => ({
              id: a.id,
              title: a.title,
              excerpt: a.excerpt,
              category: a.category,
              author: a.author,
              date: a.date,
              readTime: a.readTime,
              badgeColor:
                a.category === "Health Insurance"
                  ? "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60"
                  : a.category === "Mutual Funds"
                  ? "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60"
                  : a.category === "Tax Planning"
                  ? "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60"
                  : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60",
            }))
          );
        }
      } catch (e) {
        // Fallback
      }
    }
  }, []);

  const enquiryFormRef = useRef<HTMLDivElement>(null);

  const scrollToEnquiry = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    enquiryFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: boolean; phone?: boolean } = {};
    if (!fullName.trim()) errors.name = true;
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, "").length < 10) {
      errors.phone = true;
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitted(true);
  };

  const faqData = [
    {
      q: "What is InsurEdge?",
      a: "InsurEdge is an India-wide lead-generation and professional-connect platform for insurance and investment-related enquiries. We help customers connect with relevant insurance and investment professionals from our partner network.",
    },
    {
      q: "Does InsurEdge sell insurance?",
      a: "InsurEdge's role is to generate and facilitate customer enquiries and connect customers with relevant professionals. Insurance products are provided by the applicable insurer through the relevant distribution channel.",
    },
    {
      q: "Does InsurEdge provide financial advice?",
      a: "InsurEdge itself does not provide personalised investment advice. Where investment advice or recommendations are provided, they are provided by the relevant professional or entity subject to their applicable qualifications, registrations, and regulatory requirements.",
    },
    {
      q: "How does InsurEdge make money?",
      a: "InsurEdge may receive lead-generation, referral, or other applicable fees from participating advisors, distributors, or partners. There is no charge to submit an enquiry through the InsurEdge website.",
    },
    {
      q: "Will someone contact me after I submit an enquiry?",
      a: "A relevant professional from our partner network may contact you using the details you provide. The timing and availability of contact can depend on the relevant professional and your location.",
    },
    {
      q: "Can I ask for more than one type of financial product?",
      a: "Yes. If you have multiple requirements—for example, term insurance and health insurance—you can mention them in your enquiry.",
    },
    {
      q: "Is InsurEdge available throughout India?",
      a: "InsurEdge is designed to serve customers across India, subject to the availability of relevant professionals in the customer's location and the nature of the enquiry.",
    },
    {
      q: "Do I have to buy a product after submitting an enquiry?",
      a: "No. Submitting an enquiry does not require you to purchase an insurance product, mutual fund, or other financial product. You should evaluate the information provided and make your own decision.",
    },
  ];

  const cityOptions = [
    "Select your city",
    "Mumbai",
    "Delhi NCR (Delhi, Noida, Gurgaon)",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Chandigarh",
    "Kochi",
    "Indore",
    "Surat",
    "Bhopal",
    "Nagpur",
    "Patna",
    "Other City in India",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050816] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Background Subtle Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-50/70 via-emerald-50/30 to-transparent dark:from-blue-950/20 dark:via-emerald-950/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-400 text-xs sm:text-sm font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>India-Wide Professional Connect Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                Find the Right Insurance &amp; Investment Professional in India
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-emerald-800 dark:text-emerald-400 font-display">
                Get connected for Term Insurance, Health Insurance and Mutual Funds
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Looking for the right professional to help you understand your insurance or investment options? InsurEdge connects customers across India with relevant insurance and investment professionals based on their requirements.
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Tell us what you're looking for, share a few basic details, and we'll help connect you with a suitable professional from our partner network.
              </p>

              {/* CTA and Highlights */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => scrollToEnquiry()}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base rounded-xl cursor-pointer shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    Simple enquiry
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    No charge
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    India-wide
                  </span>
                </div>
              </div>
            </div>

            {/* Right Quick Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#0B1120] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 dark:shadow-black/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    Instant Connect
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold font-mono">
                    100% Free Service
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Tell Us What You Need
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Select your priority and get connected with an accredited professional within 2 hours.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      name: "Term Insurance",
                      desc: "Pure protection life cover for your family",
                      icon: <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
                      color: "border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/20",
                    },
                    {
                      name: "Health Insurance",
                      desc: "Comprehensive cashless hospitalisation coverage",
                      icon: <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
                      color: "border-rose-100 hover:border-rose-300 hover:bg-rose-50/30 dark:border-slate-800 dark:hover:border-rose-700/60 dark:hover:bg-rose-950/20",
                    },
                    {
                      name: "Mutual Funds",
                      desc: "SIP & wealth creation aligned with your goals",
                      icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                      color: "border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/30 dark:border-slate-800 dark:hover:border-emerald-700/60 dark:hover:bg-emerald-950/20",
                    },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToEnquiry(item.name)}
                      className={`w-full p-3.5 rounded-2xl border bg-white dark:bg-[#111827] flex items-center justify-between text-left transition-all cursor-pointer group shadow-xs ${item.color}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    Your data is confidential &amp; encrypted
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">Verified Advisors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHAT FINANCIAL SOLUTION ARE YOU LOOKING FOR? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
                Financial Categories
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                What Financial Solution Are You Looking For?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you want to protect your family, prepare for healthcare expenses, or start investing for your financial goals, InsurEdge gives you a simple place to begin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Term Insurance Card */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                      Term Insurance
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                      Protect your family's financial future with life insurance.
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Term insurance provides life cover for a specified policy period. If you're considering term insurance, a relevant insurance professional can help you understand coverage requirements, policy features, premiums, exclusions, and other important terms.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Whether you're buying term insurance for the first time or reviewing your existing life cover, start by telling us what you need.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href="/term-insurance"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
                  >
                    <span>Explore Term Insurance</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Health Insurance Card */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                      Health Insurance
                    </h3>
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 font-mono">
                      Find health insurance options for yourself and your family.
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Health insurance can help cover eligible medical and hospitalisation expenses according to the policy's terms, conditions, limits, exclusions, and waiting periods.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you're looking for individual health insurance, family health insurance, senior citizen health insurance, or want to review your existing coverage, you can connect with a relevant professional through InsurEdge.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href="/health-insurance"
                    className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 transition-colors group"
                  >
                    <span>Explore Health Insurance</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Mutual Funds Card */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
                      Mutual Funds
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                      Explore mutual fund investment options based on your goals.
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Mutual funds allow investors to participate in professionally managed investment portfolios, but all investments are subject to market risks.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you're considering starting a SIP, investing for a long-term goal, or simply want to understand mutual funds better, InsurEdge can connect you with an appropriate investment professional.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <Link
                    href="/mutual-funds"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors group"
                  >
                    <span>Explore Mutual Funds</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HOW INSUREDGE HELPS (5-STEP PROCESS) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Simple 5-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              How InsurEdge Helps
            </h2>
            <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 font-display">
              A simpler way to start your financial journey
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Finding the right insurance or investment professional can be difficult when you don't know where to begin. InsurEdge makes the first step simpler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Tell Us What You Need",
                desc: "Submit a short enquiry and tell us whether you're looking for term insurance, health insurance, mutual funds, or another related requirement.",
              },
              {
                step: "2",
                title: "Share Your Basic Details",
                desc: "Provide a few details about yourself and your requirement so we can better understand the type of professional you may need.",
              },
              {
                step: "3",
                title: "Get Connected",
                desc: "Your enquiry may be shared with a relevant professional from our partner network who can contact you regarding your requirement.",
              },
              {
                step: "4",
                title: "Understand Your Options",
                desc: "The professional can explain relevant products, features, costs, eligibility requirements, risks, exclusions, and other applicable details.",
              },
              {
                step: "5",
                title: "Make Your Own Decision",
                desc: "Take the information you receive, ask questions, compare your options, and make your own financial decision.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left relative flex flex-col justify-between shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 font-display font-extrabold flex items-center justify-center text-sm mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => scrollToEnquiry()}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-display font-bold text-sm rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Submit Your Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY CHOOSE INSUREDGE? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
                Platform Advantages
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                Why Choose InsurEdge?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                One place to start for insurance and investment enquiries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Relevant Professional Connections",
                  desc: "We aim to connect your enquiry with a professional whose area of work is relevant to your requirement.",
                  icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
                },
                {
                  title: "Simple Process",
                  desc: "You don't need to understand complicated financial terminology before getting started. Tell us what you're looking for and take the first step.",
                  icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                },
                {
                  title: "Multiple Financial Categories",
                  desc: "Get started with enquiries related to Term Insurance, Health Insurance, and Mutual Funds all under one unified platform.",
                  icon: <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
                },
                {
                  title: "India-Wide Network",
                  desc: "InsurEdge is designed to connect customers with professionals across India, subject to partner availability in the customer's location.",
                  icon: <MapPin className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
                },
                {
                  title: "Transparent Role",
                  desc: "InsurEdge is a lead-generation and professional-connect platform. We help facilitate the connection between customers and relevant professionals.",
                  icon: <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                },
                {
                  title: "No Charge to Submit an Enquiry",
                  desc: "There is no charge to submit an enquiry through InsurEdge. InsurEdge may receive a lead-generation or referral fee from participating advisors, distributors, or other partners.",
                  icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-3 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INSURANCE & INVESTMENT HELP BASED ON YOUR REQUIREMENT */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Requirement-Based Guidance
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Insurance &amp; Investment Help Based on Your Requirement
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Different stages in life demand specialized conversations. Here is what an experienced professional can walk you through.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Term Insurance Checklist */}
            <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Looking for Term Insurance?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your financial responsibilities can change as your career, family, income, and financial commitments change. A term insurance professional can help you understand factors such as:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "Life cover requirements",
                    "Policy duration",
                    "Premiums & payment terms",
                    "Eligibility criteria",
                    "Policy exclusions",
                    "Riders and additional benefits",
                    "Claim-related terms",
                    "Existing insurance coverage evaluation",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/term-insurance"
                  className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1.5"
                >
                  <span>Learn More About Term Insurance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Health Insurance Checklist */}
            <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Looking for Health Insurance?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Healthcare expenses can be unpredictable, which is why understanding health insurance coverage before you need it can be important. Depending on your requirements, you may want to understand:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "Individual health insurance",
                    "Family floater health insurance",
                    "Senior citizen health insurance",
                    "Sum insured adequacy",
                    "Waiting periods for pre-existing conditions",
                    "Network hospitals near you",
                    "Cashless treatment procedure",
                    "Room-rent limits & co-payment clauses",
                    "Policy exclusions & restorative benefits",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/health-insurance"
                  className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 flex items-center gap-1.5"
                >
                  <span>Learn More About Health Insurance</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mutual Funds Checklist */}
            <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Looking to Invest in Mutual Funds?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Before investing, it's important to understand your financial goals, investment horizon, risk tolerance, and the characteristics of the investment product. A relevant investment professional can discuss:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {[
                    "SIP (Systematic Investment Plan) structure",
                    "Lump-sum investment options",
                    "Mutual fund categories (Equity, Debt, Hybrid)",
                    "Investment horizon alignment",
                    "Market risk management",
                    "Asset diversification",
                    "Expense ratio and investment costs",
                    "Long-term financial milestones",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href="/mutual-funds"
                  className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <span>Learn More About Mutual Funds</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHAT CAN YOU ASK A FINANCIAL PROFESSIONAL? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
                Sample Conversations
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                What Can You Ask a Financial Professional?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                You don't need to know exactly which product you want before submitting an enquiry. You can start with a question.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* For Term Insurance */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-mono text-xs font-bold">
                  For Term Insurance
                </div>
                <div className="space-y-3">
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "How much term insurance cover might I need?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "What should I compare before buying a term plan?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "How does my age and income affect my insurance requirement?"
                  </div>
                </div>
              </div>

              {/* For Health Insurance */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold">
                  For Health Insurance
                </div>
                <div className="space-y-3">
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "How much health insurance cover should I consider?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "Should I consider individual or family health insurance?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "What should I check before choosing a health insurance policy?"
                  </div>
                </div>
              </div>

              {/* For Mutual Funds */}
              <div className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-mono text-xs font-bold">
                  For Mutual Funds
                </div>
                <div className="space-y-3">
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "How do I start investing through mutual funds?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "What is a SIP and how does it work?"
                  </div>
                  <div className="p-3.5 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic shadow-2xs">
                    "How should I think about investment risk and time horizon?"
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              The professional you are connected with can explain the relevant information applicable to your situation.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHO IS INSUREDGE FOR? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Audience Profiles
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Who Is InsurEdge For?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              InsurEdge is designed for people who are looking for a simpler way to start conversations about insurance and investments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Young Professionals",
                desc: "Understand life insurance and health insurance options as your financial responsibilities grow.",
                icon: "💼",
              },
              {
                title: "Families",
                desc: "Explore life and health insurance options designed around family protection and financial responsibilities.",
                icon: "👨‍👩‍👧‍👦",
              },
              {
                title: "Parents & Senior Citizens",
                desc: "Explore health insurance requirements and understand available options for healthcare-related financial protection.",
                icon: "👵",
              },
              {
                title: "First-Time Investors",
                desc: "Learn about mutual funds and investment options by speaking with a relevant investment professional.",
                icon: "🌱",
              },
              {
                title: "Existing Policyholders",
                desc: "If you already have insurance or investments, you can use InsurEdge to start a conversation about your existing requirements and available options.",
                icon: "📑",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-3 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{p.icon}</div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY START WITH YOUR REQUIREMENT? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              A Simpler Starting Point
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Start With Your Requirement?
            </h2>
            <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 font-display">
              Because the right conversation starts with the right question.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              You don't always need to know the name of a specific insurance policy or mutual fund before asking for help. You might simply know that:
            </p>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto pt-2">
              {[
                "“I need to protect my family.”",
                "“I want health insurance for my parents.”",
                "“I want to start investing.”",
                "“I don't know whether my existing insurance is enough.”",
                "“I want to understand my options before making a decision.”",
              ].map((q) => (
                <div
                  key={q}
                  className="px-4 py-2.5 rounded-full bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-2xs italic"
                >
                  {q}
                </div>
              ))}
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              That's enough to get started. Tell us what you're looking for and we'll help connect you with a relevant professional.
            </p>

            <button
              onClick={() => scrollToEnquiry()}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Get Connected</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* START YOUR ENQUIRY (THE MAIN FORM) */}
        {/* ========================================================================= */}
        <section
          ref={enquiryFormRef}
          id="start-enquiry"
          className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6"
        >
          <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-black/50 relative overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
                Free Consultation Request
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                Start Your Enquiry
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Tell us what you're looking for. Complete this short form and a relevant professional from our partner network may contact you regarding your requirement.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleEnquirySubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Category Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                      What do you need help with?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        "Term Insurance",
                        "Health Insurance",
                        "Mutual Funds",
                        "I'm not sure",
                      ].map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center text-center ${
                              isSelected
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                                : "bg-slate-50 dark:bg-[#111827] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-[#111827]/80 focus:bg-white dark:focus:bg-[#050816] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all ${
                            validationErrors.name
                              ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                              : "border-slate-200 dark:border-slate-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="Enter 10-digit mobile number"
                          className={`w-full px-4 py-3 rounded-r-xl bg-slate-50 dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-[#111827]/80 focus:bg-white dark:focus:bg-[#050816] border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all font-mono ${
                            validationErrors.phone
                              ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                              : "border-slate-200 dark:border-slate-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-[#111827]/80 focus:bg-white dark:focus:bg-[#050816] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-[#111827]/80 focus:bg-white dark:focus:bg-[#050816] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all cursor-pointer"
                        >
                          {cityOptions.map((c) => (
                            <option key={c} value={c} className="bg-white dark:bg-[#111827] text-slate-900 dark:text-white">
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Requirement Details */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-mono">
                      Tell us about your requirement
                    </label>
                    <textarea
                      rows={3}
                      value={requirementText}
                      onChange={(e) => setRequirementText(e.target.value)}
                      placeholder="Briefly describe what you're looking for (e.g. ₹1 Crore term life cover, family floater health plan for 4 members, or starting a monthly SIP for wealth creation)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#111827] hover:bg-slate-50/80 dark:hover:bg-[#111827]/80 focus:bg-white dark:focus:bg-[#050816] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-base rounded-xl cursor-pointer shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Connect Me With a Professional</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Disclaimers below form */}
                  <div className="space-y-2 pt-2 text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    <p>
                      By submitting this form, you agree that InsurEdge and relevant partner professionals may contact you regarding your enquiry.
                    </p>
                    <p className="font-semibold text-slate-600 dark:text-slate-300">
                      Submitting an enquiry is free. You are not required to purchase a product or service after submitting your enquiry.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4 font-sans"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900 dark:text-white">{fullName}</strong>. Your enquiry regarding <strong className="text-emerald-700 dark:text-emerald-400">{selectedCategory}</strong> has been received. A relevant professional from our partner network may contact you shortly on <strong className="text-slate-900 dark:text-white">+91 {mobileNumber}</strong>.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Zero spam guaranteed. There is no charge or obligation to purchase.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setMobileNumber("");
                      setEmailAddress("");
                      setRequirementText("");
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHAT HAPPENS AFTER YOU SUBMIT YOUR ENQUIRY? */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
                Transparency Guarantee
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                What Happens After You Submit Your Enquiry?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Clear expectations from the moment you hit submit to making your independent financial decision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  step: "Step 1",
                  title: "Your enquiry is received",
                  desc: "We receive the information you provide through the enquiry form.",
                },
                {
                  step: "Step 2",
                  title: "Your requirement is understood",
                  desc: "Your enquiry is reviewed based on the category and information you've provided.",
                },
                {
                  step: "Step 3",
                  title: "A relevant professional may contact you",
                  desc: "Your enquiry may be shared with a suitable professional from our partner network.",
                },
                {
                  step: "Step 4",
                  title: "Discuss your requirement",
                  desc: "You can ask questions and understand the products or options relevant to your requirement.",
                },
                {
                  step: "Step 5",
                  title: "Decide for yourself",
                  desc: "You can evaluate the information and decide whether you want to proceed.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#F8FAFC] dark:bg-[#050816] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-2 relative"
                >
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono uppercase tracking-wider block">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINANCIAL INSIGHTS & BLOG SECTION */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Knowledge &amp; Insights
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Financial Guides &amp; Articles
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Clear, jargon-free explanations to help you navigate insurance policies, tax benefits, and wealth creation strategies.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {["All", "Term Insurance", "Health Insurance", "Mutual Funds", "Tax Planning"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedBlogTab(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedBlogTab === cat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles
              .filter((art) => selectedBlogTab === "All" || art.category === selectedBlogTab)
              .map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:shadow-md transition-all text-left group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold uppercase tracking-wider font-mono text-[10px] ${article.badgeColor}`}>
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {article.author}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {article.date}
                      </p>
                    </div>

                    <Link
                      href="/blog"
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>

          {/* View All Guides CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All Guides in Knowledge Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS ABOUT INSUREDGE */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions About InsurEdge
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Everything you need to know about how our platform operates, our role, and our commitment to transparency.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CTA BANNER */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-white dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono block">
              Take the First Step
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Financial Decisions Should Start With Good Information
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Insurance and investments are important financial decisions. You deserve the opportunity to understand your options, ask questions, and make an informed decision.
            </p>
            <p className="text-slate-700 dark:text-slate-200 font-semibold text-base">
              Tell us what you're looking for. We'll help you start the conversation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => scrollToEnquiry()}
                className="px-9 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base rounded-xl cursor-pointer shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* IMPORTANT INFORMATION (REGULATORY & COMPLIANCE FOOTNOTE) */}
        {/* ========================================================================= */}
        <section className="py-12 bg-[#F1F5F9] dark:bg-[#02040A] border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-left">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-slate-900 dark:text-white">
                <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                <span>Important Information &amp; Regulatory Disclaimers</span>
              </div>
              <p>
                InsurEdge is a professional-connect platform. InsurEdge is not itself an insurer and does not itself provide personalised investment advice.
              </p>
              <p>
                Enquiries submitted through this website may be shared with relevant partner professionals for the purpose of responding to the customer's enquiry. InsurEdge may receive lead-generation, referral, or other applicable fees from participating advisors, distributors, or partners.
              </p>
              <p>
                Any insurance product, investment product, advice, recommendation, or service is subject to the applicable provider's terms and conditions, eligibility requirements, risks, exclusions, charges, and applicable laws and regulations.
              </p>
              <p>
                Customers should independently verify the credentials, registration status, and authority of any professional before purchasing an insurance product or making an investment.
              </p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
              </p>
              <p>
                Product-specific terms, conditions, exclusions, risks, charges, and eligibility requirements apply.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
