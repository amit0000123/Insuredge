"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Shield,
  HeartPulse,
  TrendingUp,
  Scale,
  X,
  Share2,
  CheckCircle2,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string;
  takeaways?: string[];
}

export const DEFAULT_BLOG_ARTICLES: Article[] = [
  {
    id: "1",
    title: "IRDAI New Term Insurance Guidelines — What Changes for You",
    excerpt: "IRDAI's latest circular standardises exclusion clauses and mandates higher claim settlement disclosures across all Indian insurers.",
    category: "Term Insurance",
    author: "Amit Sharma",
    authorRole: "Senior Insurance Analyst",
    date: "Jun 12, 2026",
    readTime: "5 min read",
    featured: true,
    takeaways: [
      "Insurers must define critical exclusions in plain English and vernacular languages.",
      "Quarterly granular claim settlement disclosures are now mandatory.",
      "Standard definitions for critical illnesses prevent unexpected claim disputes.",
    ],
    content: `The Insurance Regulatory and Development Authority of India (IRDAI) has updated its standard operational guidelines for 2026, bringing unprecedented clarity and transparency to individual term life insurance policies.

Under these refreshed mandates, all life insurance companies in India are required to present key exclusion clauses in prominent, plain language rather than burying them in complex fine print. Furthermore, insurers must disclose granular claim settlement timelines—broken down by natural vs accidental deaths and contested vs undisputed payouts.

For everyday buyers, this means comparing term plans is no longer limited to high-level percentages. You can now examine how quickly claims are actually paid out and whether specific health disclosures could cause delays.`,
  },
  {
    id: "2",
    title: "Section 80D Explained: Save Up to ₹75,000 in Tax on Health Insurance",
    excerpt: "Complete guide to maximising tax deductions under Section 80D for yourself, your family, and senior citizen parents in FY 2025–26.",
    category: "Tax Planning",
    author: "Priya Nair",
    authorRole: "Chartered Financial Planner",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    featured: true,
    takeaways: [
      "Deduction up to ₹25,000 for self, spouse, and dependent children.",
      "Additional ₹50,000 deduction if parents are senior citizens (aged 60+).",
      "Cash payments do NOT qualify for 80D deductions—pay via banking channels.",
    ],
    content: `Section 80D of the Income Tax Act provides valuable relief by allowing deductions on health insurance premiums paid during the financial year.

For an individual, spouse, and dependent children, you can deduct up to ₹25,000 from your taxable income. If you also pay premiums for your parents who are senior citizens (aged 60 or above), you are entitled to an additional deduction of up to ₹50,000. When combined, this offers a total deduction of up to ₹75,000 annually.

Important tip: Always pay premiums via digital channels (UPI, net banking, debit/credit cards). Cash payments for health insurance premiums are strictly disqualified from Section 80D claims. However, preventive health check-up expenses (up to ₹5,000 within the overall ceiling) may be paid in cash.`,
  },
  {
    id: "3",
    title: "SIP vs Lumpsum in 2026: Which Strategy Wins in a Volatile Market?",
    excerpt: "A data-backed comparison of rupee cost averaging through SIP versus deploying lumpsum capital during volatile index phases.",
    category: "Mutual Funds",
    author: "Rahul Verma",
    authorRole: "Mutual Funds Specialist",
    date: "May 28, 2026",
    readTime: "7 min read",
    featured: false,
    takeaways: [
      "SIP eliminates the emotional risk of trying to time market highs and lows.",
      "Rupee cost averaging yields more units when market valuations dip.",
      "Lumpsum is suitable only when deploying large cash windfalls into debt/hybrid STP.",
    ],
    content: `Market volatility can test even experienced investors. When indices fluctuate, one common dilemma arises: should you continue your Systematic Investment Plan (SIP) or hold cash for a lumpsum deployment?

Historical returns across 10-year Indian equity cycles demonstrate that SIP consistently protects retail investors from behavioral mistakes. By allocating a fixed amount each month, you buy fewer units when markets are expensive and automatically buy more units when markets correct.

If you have received a large lumpsum (such as an annual bonus or property sale proceeds), rather than putting it all into equity in one go, consider parking the funds in an ultra-short duration debt fund and setting up a Systematic Transfer Plan (STP) spread across 6 to 12 months.`,
  },
  {
    id: "4",
    title: "Critical Illness Riders: Are They Worth Adding to Your Term Plan?",
    excerpt: "A detailed breakdown of Critical Illness (CI) riders — understanding accelerated vs standalone payouts and when they make financial sense.",
    category: "Term Insurance",
    author: "Amit Sharma",
    authorRole: "Senior Insurance Analyst",
    date: "May 20, 2026",
    readTime: "6 min read",
    featured: false,
    takeaways: [
      "CI riders provide a lumpsum cash payout upon diagnosis of covered illnesses.",
      "Standalone riders pay out independently without reducing your life cover.",
      "Accelerated riders reduce your basic term cover by the amount claimed.",
    ],
    content: `While standard health insurance covers hospital bills, a severe diagnosis such as advanced cancer or stroke often results in extensive income loss, specialized recuperation, and rehabilitation expenses that ordinary policies exclude.

A Critical Illness (CI) rider attached to your term policy pays out a lump sum immediately upon diagnosis of a covered illness, irrespective of actual hospital expenses incurred.

When choosing a CI rider, verify whether it is 'accelerated' or 'standalone'. An accelerated rider deducts any claim amount from your overall life cover, leaving a smaller death benefit for your nominees. A standalone rider, on the other hand, pays out without diminishing your base life cover.`,
  },
  {
    id: "5",
    title: "10 Hidden Health Insurance Exclusions You Must Know Before Buying",
    excerpt: "From specific waiting periods to non-payable consumables and room rent sub-limits, understand what your health policy won't pay for.",
    category: "Health Insurance",
    author: "Dr. Sunita Rao",
    authorRole: "Health Policy Consultant",
    date: "May 12, 2026",
    readTime: "8 min read",
    featured: false,
    takeaways: [
      "Room rent limits often trigger proportionate deductions on total doctor & surgery fees.",
      "Consumables (gloves, PPE kits, surgical masks) can account for 10-15% of the hospital bill.",
      "Pre-existing illnesses require a mandatory waiting period of 2 to 3 years.",
    ],
    content: `Many policyholders only discover exclusions at the time of claim settlement. Avoid surprises by reviewing these core boundaries:

1. **Room Rent Sub-limits**: Choosing a room rent higher than your policy's allowed limit triggers proportionate deductions across entire surgery, nursing, and anesthesia charges.
2. **Consumables Exclusion**: Items like medical gloves, syringes, gowns, and cotton balls are frequently excluded unless you have a specific consumables add-on rider.
3. **Specific Disease Waiting Periods**: Conditions such as cataracts, joint replacements, and hernias normally carry a mandatory 24-month waiting period before claims are honored.
4. **Diagnostic Outpatient Charges**: Investigative scans done outside formal hospitalization are generally non-payable unless pre-hospitalization limits apply.`,
  },
  {
    id: "6",
    title: "Direct vs Regular Mutual Funds: How Much Are You Losing in Commissions?",
    excerpt: "Learn how the expense ratio difference between Direct and Regular mutual fund plans compounds into lakhs over a 15-year investment horizon.",
    category: "Mutual Funds",
    author: "Rahul Verma",
    authorRole: "Mutual Funds Specialist",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    featured: false,
    takeaways: [
      "Direct plans do not pay distributor commissions, resulting in a lower expense ratio.",
      "A 0.75% difference in expense ratio can compound to ₹10-15 Lakhs over a 20-year SIP.",
      "Regular plans are suitable if you rely on hands-on distributor handholding and paperwork assistance.",
    ],
    content: `Every mutual fund scheme in India is available in two variants: Direct Plan and Regular Plan. Both hold the exact same portfolio of stocks or bonds and are managed by the exact same fund manager.

The only difference lies in the Expense Ratio. In a Regular plan, a distributor commission (typically 0.5% to 1.2% annually) is deducted from your daily NAV. In a Direct plan, there is no commission intermediary.

While 0.8% sounds small in year one, compounding turns it into an enormous difference over time. For a monthly SIP of ₹15,000 running for 20 years at a 12% return, the difference between a Direct plan and a Regular plan can exceed ₹12 to ₹15 Lakhs in your final wealth corpus.`,
  },
];

const CATEGORIES = [
  "All",
  "Term Insurance",
  "Health Insurance",
  "Mutual Funds",
  "Tax Planning",
];

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("ie_blog_articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
          return;
        }
      } catch (e) {
        // Fallback
      }
    }
    setArticles(DEFAULT_BLOG_ARTICLES);
    localStorage.setItem("ie_blog_articles", JSON.stringify(DEFAULT_BLOG_ARTICLES));
  }, []);

  const filteredArticles = articles.filter((a) => {
    const matchesCat =
      selectedCategory === "All" || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-emerald-50/50 via-blue-50/30 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ========================================================================= */}
        {/* HERO / HEADER SECTION */}
        {/* ========================================================================= */}
        <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold shadow-xs">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>InsurEdge Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Financial Guides &amp; Insights
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Practical, jargon-free guides to help you make informed decisions across Term Insurance, Health Insurance, and Mutual Funds.
          </p>

          {/* Search & Categories Bar */}
          <div className="pt-6 max-w-3xl mx-auto space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, guides, topics (e.g. 80D, riders, SIP)..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED ARTICLE (Shown when no active search/category filter) */}
        {/* ========================================================================= */}
        {selectedCategory === "All" && !searchQuery && featuredArticle && (
          <section className="py-6 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs hover:border-emerald-300 transition-all text-left">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Featured Guide
                </span>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
                {featuredArticle.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center font-display text-sm">
                    {featuredArticle.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {featuredArticle.author}
                    </p>
                    <p className="text-xs text-slate-500">
                      {featuredArticle.authorRole}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ARTICLE GRID */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
              <span className="text-sm font-normal text-slate-500 ml-2">
                ({filteredArticles.length})
              </span>
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-slate-800 font-bold text-lg">No articles found</p>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                No articles matched your search or category filter. Try clearing your search term.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 px-5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wider font-mono text-[10px]">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 font-medium text-[11px]">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {article.author}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {article.date}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* ARTICLE READER MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 z-10 text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Article Header */}
                <div className="space-y-4 mb-8 pr-12">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider font-mono">
                      {activeArticle.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">
                      {activeArticle.date}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 font-medium">
                      {activeArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-950 leading-tight">
                    {activeArticle.title}
                  </h2>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center font-display text-sm">
                        {activeArticle.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {activeArticle.author}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activeArticle.authorRole}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleShare(activeArticle)}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                    </button>
                  </div>
                </div>

                {/* Key Takeaways Box */}
                {activeArticle.takeaways && activeArticle.takeaways.length > 0 && (
                  <div className="mb-8 p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5">
                    <div className="flex items-center gap-2 font-display font-bold text-sm text-emerald-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-900">
                      {activeArticle.takeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Article Content */}
                <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {activeArticle.content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Bottom CTA within Article */}
                <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC] p-6 rounded-2xl">
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Need Personalized Guidance?
                    </h4>
                    <p className="text-xs text-slate-500">
                      Connect with a certified professional to discuss your requirements.
                    </p>
                  </div>
                  <Link
                    href="/#start-enquiry"
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <span>Connect with an Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* BOTTOM CALL TO ACTION */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 font-mono block">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Ready to Explore Your Options?
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
              Tell us what you're looking for, and we'll connect you with a relevant financial specialist across India.
            </p>
            <div className="pt-2">
              <Link
                href="/#start-enquiry"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm rounded-xl cursor-pointer shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Free enquiry • No charges • No obligation
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
