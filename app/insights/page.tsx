"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  X,
  Upload,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: string;
  published: boolean;
  imageUrl?: string;
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "1",
    title: "IRDAI New Term Insurance Guidelines — What Changes for You",
    excerpt: "IRDAI's latest circular standardises exclusion clauses and mandates higher claim settlement disclosures across all insurers.",
    category: "Term Insurance",
    author: "Amit Sharma",
    date: "Jun 12, 2026",
    readTime: "5 min read",
    featured: true,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
    content: "The Insurance Regulatory and Development Authority of India (IRDAI) has issued standard guidelines for 2026 that bring transparency to term insurance products. Under these instructions, insurers are required to define critical exclusions in plain language and disclose their granular claims settlement experience quarterly. This prevents agents from concealing crucial facts and assists policyholders in comparing the real-time settlement capability of insurers. Key adjustments include standard definitions for critical illnesses and accidental disability benefits."
  },
  {
    id: "2",
    title: "Section 80D Explained: Save Up to ₹75,000 in Tax on Health Insurance",
    excerpt: "Complete guide to maximising 80D deductions for self, spouse, children, and senior parents in FY 2025–26.",
    category: "Tax Planning",
    author: "Priya Nair",
    date: "Jun 05, 2026",
    readTime: "6 min read",
    featured: true,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
    content: "Section 80D of the Income Tax Act allows deductions on premiums paid for health insurance policies. For self, spouse, and dependent children, the maximum deduction limit is ₹25,000. Additionally, you can claim up to ₹50,000 for premiums paid for senior citizen parents. If both the taxpayer and parent are senior citizens, the cumulative deduction limit increases to ₹75,000. Our experts advise tracking payment records (use digital banking only; cash premiums do not qualify for deductions) to claim these benefits smoothly."
  },
  {
    id: "3",
    title: "SIP vs Lumpsum in 2026: Which Strategy Wins in a Volatile Market?",
    excerpt: "A data-backed comparison of rupee cost averaging vs lumpsum deployment in the current market cycle.",
    category: "Mutual Funds",
    author: "Rahul Verma",
    date: "May 28, 2026",
    readTime: "7 min read",
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=60",
    content: "With global rate adjustments and index corrections in 2026, market volatility remains a concern. Systematic Investment Plans (SIP) allow investors to average out purchasing costs by investing fixed sums at defined periods, known as rupee cost averaging. Lumpsum investments expose capital to timing risks, making it optimal only during severe corrections. For retail families, running an automated monthly SIP remains the most disciplined way to compound long-term wealth without emotional bias."
  },
  {
    id: "4",
    title: "Critical Illness Riders: Are They Worth Adding to Your Term Plan?",
    excerpt: "A detailed look at CI riders — when they add genuine value and when they're just upselling.",
    category: "Term Insurance",
    author: "Amit Sharma",
    date: "May 20, 2026",
    readTime: "6 min read",
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=60",
    content: "Critical Illness (CI) riders pay out a lumpsum benefit upon diagnosis of specified conditions like cancer, stroke, or organ failure. This payout provides immediate liquidity to cover expensive medical treatments and compensate for lost income. When selecting CI riders, check whether they are 'accelerated' (which reduces your base term cover upon payout) or 'standalone/additional' (which pays out separately without reducing base cover). We recommend standalone riders if your budget permits."
  },
  {
    id: "5",
    title: "The 50/30/20 Rule: Building Your First Personal Budget",
    excerpt: "Simple structural guidelines to organize personal finance allocations and grow automated savings shields.",
    category: "Financial Planning",
    author: "Sneha Gupta",
    date: "Apr 15, 2026",
    readTime: "4 min read",
    featured: false,
    published: true,
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
    content: "The 50/30/20 budget framework divides your post-tax income into three pillars: 50% for Needs (rent, utilities, groceries), 30% for Wants (dining out, entertainment, hobbies), and 20% for Savings and debt payments (SIPs, insurance premium, emergency cache). Setting up this automated routing system takes the guesswork out of money management, establishing a secure financial baseline from your very first salary."
  }
];

const CATEGORIES = [
  "All",
  "Term Insurance",
  "Health Insurance",
  "Mutual Funds",
  "Tax Planning",
  "Financial Planning"
];

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ie_blog_articles");
    if (saved) {
      try {
        setArticles(JSON.parse(saved));
      } catch (e) {
        setArticles(DEFAULT_ARTICLES);
      }
    } else {
      setArticles(DEFAULT_ARTICLES);
      localStorage.setItem("ie_blog_articles", JSON.stringify(DEFAULT_ARTICLES));
    }
  }, []);

  // Save to localStorage wrapper
  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("ie_blog_articles", JSON.stringify(newArticles));
  };

  // Admin Management State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Blog Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("Term Insurance");
  const [formAuthor, setFormAuthor] = useState("InsurEdge Expert");
  const [formReadTime, setFormReadTime] = useState("5 min read");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublished, setFormPublished] = useState(true);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(false);

  // Open Form for Adding New Blog
  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormTitle("");
    setFormExcerpt("");
    setFormContent("");
    setFormCategory("Term Insurance");
    setFormAuthor("InsurEdge Expert");
    setFormReadTime("5 min read");
    setFormFeatured(false);
    setFormPublished(true);
    setFormImageUrl("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60");
    setShowFormModal(true);
  };

  // Open Form for Editing Existing Blog
  const handleOpenEdit = (article: Article) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormExcerpt(article.excerpt);
    setFormContent(article.content);
    setFormCategory(article.category);
    setFormAuthor(article.author);
    setFormReadTime(article.readTime);
    setFormFeatured(!!article.featured);
    setFormPublished(article.published);
    setFormImageUrl(article.imageUrl || "");
    setShowFormModal(true);
  };

  // Delete Blog
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const updated = articles.filter((a) => a.id !== id);
      saveArticles(updated);
    }
  };

  // Submit Add/Edit Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formContent) {
      alert("Please fill out the Title and Content fields.");
      return;
    }

    if (editingArticle) {
      // Edit mode
      const updated = articles.map((a) =>
        a.id === editingArticle.id
          ? {
              ...a,
              title: formTitle,
              excerpt: formExcerpt,
              content: formContent,
              category: formCategory,
              author: formAuthor,
              readTime: formReadTime,
              featured: formFeatured,
              published: formPublished,
              imageUrl: formImageUrl,
            }
          : a
      );
      saveArticles(updated);
    } else {
      // Add mode
      const newArt: Article = {
        id: Math.random().toString(36).substring(7),
        title: formTitle,
        excerpt: formExcerpt || formContent.slice(0, 100) + "...",
        content: formContent,
        category: formCategory,
        author: formAuthor,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        readTime: formReadTime,
        featured: formFeatured,
        published: formPublished,
        imageUrl: formImageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
      };
      const updated = [newArt, ...articles];
      saveArticles(updated);
    }

    setShowFormModal(false);
  };

  // Handle Mock Image Upload
  const handleMockUpload = () => {
    setUploadProgress(true);
    setTimeout(() => {
      setUploadProgress(false);
      setFormImageUrl("https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60");
    }, 1000);
  };

  // Filter and Search Lists
  const filteredArticles = articles.filter((article) => {
    // Hide drafts if not in admin mode
    if (!isAdminMode && !article.published) return false;

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="font-sans text-text-primary transition-colors duration-300">
      <div className="mesh" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb & Admin Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-primary">Insights</span>
          </div>

          <button
            suppressHydrationWarning
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs font-bold transition-all cursor-pointer ${
              isAdminMode
                ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                : "bg-surface border-border-custom text-text-secondary hover:text-text-primary"
            }`}
          >
            {isAdminMode ? <Unlock size={14} /> : <Lock size={14} />}
            <span>{isAdminMode ? "Exit Admin Mode" : "Admin Panel"}</span>
          </button>
        </div>

        {/* Tagline Headings */}
        <div className="max-w-3xl mb-12 space-y-4 text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display leading-tight tracking-tight">
            Financial <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Insights</span>
          </h1>
          <p className="text-lg text-primary-custom font-display font-semibold">
            Learn before you invest. Know before you insure.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
            Jargon-free guides on term insurance, health insurance, mutual funds, tax planning, and personal finance.
          </p>
        </div>

        {/* Admin Dashboard Actions */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#1e1b4b]/40 border border-primary-custom/25 rounded-3xl p-6 mb-10 text-left space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Admins Blog Manager</h3>
                  <p className="text-xs text-text-secondary">Perform instant CRUD operations on local client state articles.</p>
                </div>
                <button
                  suppressHydrationWarning
                  onClick={handleOpenAdd}
                  className="flex items-center gap-1.5 bg-primary-custom text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Plus size={16} /> Add New Blog
                </button>
              </div>

              {/* Quick statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                <div className="bg-background/50 border border-border-custom p-3.5 rounded-2xl">
                  <span className="text-[10px] text-text-secondary block">Total Blogs Loaded</span>
                  <span className="text-lg font-bold text-text-primary">{articles.length}</span>
                </div>
                <div className="bg-background/50 border border-border-custom p-3.5 rounded-2xl">
                  <span className="text-[10px] text-text-secondary block">Published Posts</span>
                  <span className="text-lg font-bold text-emerald-400">{articles.filter(a => a.published).length}</span>
                </div>
                <div className="bg-background/50 border border-border-custom p-3.5 rounded-2xl">
                  <span className="text-[10px] text-text-secondary block">Drafts</span>
                  <span className="text-lg font-bold text-amber-400">{articles.filter(a => !a.published).length}</span>
                </div>
                <div className="bg-background/50 border border-border-custom p-3.5 rounded-2xl">
                  <span className="text-[10px] text-text-secondary block">Featured Slots</span>
                  <span className="text-lg font-bold text-primary-custom">{articles.filter(a => a.featured).length}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search & Filter Section */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-10">
          {/* Search bar */}
          <div className="relative w-full lg:w-96">
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-custom text-text-primary py-3 pl-11 pr-4 rounded-2xl text-xs focus:outline-none focus:border-primary-custom transition-all"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-text-secondary" />
          </div>

          {/* Categories list */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                suppressHydrationWarning
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold py-2.5 px-5 rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary-custom text-white border-primary-custom shadow-md shadow-primary-custom/10"
                    : "bg-surface text-text-secondary border-border-custom hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured articles layout */}
        {searchQuery === "" && selectedCategory === "All" && !isAdminMode && (
          <div className="mb-14 text-left">
            <h3 className="text-xs font-bold text-primary-custom uppercase tracking-widest mb-6 font-mono">
              Featured &amp; Editor pick
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {articles.filter((a) => a.featured && a.published).slice(0, 2).map((article) => (
                <div
                  key={article.id}
                  className="bg-surface rounded-3xl p-6 sm:p-8 border border-border-custom hover:border-primary-custom/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                      <span className="text-primary-custom font-bold uppercase tracking-wider">{article.category}</span>
                      <span className="bg-primary-custom/12 text-primary-custom text-[9px] uppercase font-bold py-0.5 px-2.5 rounded-full border border-primary-custom/20">
                        Featured
                      </span>
                    </div>
                    <h4 className="text-xl font-bold font-display text-text-primary leading-tight">
                      {article.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed font-sans">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-border-custom mt-6 font-sans text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-8 w-8 bg-primary-custom/12 text-primary-custom rounded-full flex items-center justify-center font-bold text-xs">
                        {article.author.charAt(0)}
                      </div>
                      <span className="font-bold text-text-primary">{article.author}</span>
                    </div>
                    <button
                      suppressHydrationWarning
                      onClick={() => setSelectedArticle(article)}
                      className="text-xs font-bold text-primary-custom hover:opacity-90 inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles List / Grid */}
        <div className="mb-16 text-left">
          <h3 className="text-xs font-bold text-primary-custom uppercase tracking-widest mb-6 font-mono">
            {isAdminMode ? "All Managed Articles" : `Latest Articles (${filteredArticles.length})`}
          </h3>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 bg-surface rounded-2xl border border-border-custom text-text-secondary">
              <BookOpen className="mx-auto h-10 w-10 text-text-secondary mb-3" />
              <p className="text-sm font-sans">No articles matched your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-surface rounded-3xl p-6 border border-border-custom shadow-sm hover:border-primary-custom/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-primary-custom uppercase tracking-wider font-mono">
                      <span>{article.category}</span>
                      {isAdminMode && (
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] uppercase ${
                          article.published
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {article.published ? "Published" : "Draft"}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-base font-bold text-text-primary leading-snug font-display">
                      {article.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Actions depending on admin mode */}
                  <div className="flex items-center justify-between pt-5 border-t border-border-custom mt-5 font-sans text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="h-7 w-7 bg-primary-custom/12 text-primary-custom rounded-full flex items-center justify-center font-bold text-xs">
                        {article.author.charAt(0)}
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-text-primary block leading-none">{article.author}</span>
                        <span className="text-[9px] text-text-secondary font-semibold font-mono mt-0.5 block">{article.date}</span>
                      </div>
                    </div>

                    {isAdminMode ? (
                      <div className="flex gap-2">
                        <button
                          suppressHydrationWarning
                          onClick={() => handleOpenEdit(article)}
                          className="p-2 text-text-secondary hover:text-primary-custom rounded-full hover:bg-background transition-colors cursor-pointer"
                          aria-label="Edit post"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          suppressHydrationWarning
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-text-secondary hover:text-red-400 rounded-full hover:bg-background transition-colors cursor-pointer"
                          aria-label="Delete post"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        suppressHydrationWarning
                        onClick={() => setSelectedArticle(article)}
                        className="text-xs font-bold text-primary-custom hover:opacity-90 inline-flex items-center space-x-0.5 cursor-pointer"
                      >
                        <span>Read More</span>
                        <ChevronRight className="h-4.5 w-4.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl border border-border-custom flex flex-col text-left z-10"
            >
              {/* Modal Header */}
              <div className="bg-background/45 px-6 py-4 border-b border-border-custom flex items-center justify-between sticky top-0 backdrop-blur-md">
                <span className="text-[10px] font-bold text-primary-custom uppercase tracking-widest font-mono">
                  {selectedArticle.category}
                </span>
                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedArticle(null)}
                  className="text-text-secondary hover:text-text-primary p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-extrabold text-text-primary leading-tight font-display">
                  {selectedArticle.title}
                </h2>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-secondary pb-4 border-b border-border-custom">
                  <div className="flex items-center space-x-1.5">
                    <User className="h-4 w-4 text-primary-custom" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="h-4 w-4 text-primary-custom" />
                    <span>{selectedArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-4 w-4 text-primary-custom" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Article Text Content */}
                <div className="text-xs sm:text-sm text-text-secondary leading-relaxed space-y-4 font-sans">
                  <p className="font-semibold text-text-primary text-sm leading-relaxed">{selectedArticle.excerpt}</p>
                  <p className="whitespace-pre-wrap">{selectedArticle.content}</p>
                  <p className="border-t border-border-custom/50 pt-4 mt-6 text-[11px] font-mono leading-relaxed">
                    Disclaimer: This guide is prepared by our editorial experts for education. We are not IRDAI certified. Check dynamic guidelines before finalizing policies.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-background/45 p-6 border-t border-border-custom flex flex-col sm:flex-row gap-4 items-center justify-between font-sans text-xs">
                <span className="text-text-secondary font-medium">Questions about this layout?</span>
                <Link
                  href="/contact"
                  onClick={() => setSelectedArticle(null)}
                  className="btn-primary-custom py-2 px-5 text-xs font-bold rounded-xl shadow-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Ask InsurEdge Advisor</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Add/Edit Form Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-surface rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl border border-border-custom flex flex-col text-left z-10"
            >
              {/* Form Header */}
              <div className="bg-background/45 px-6 py-4 border-b border-border-custom flex items-center justify-between sticky top-0 backdrop-blur-md">
                <h3 className="font-display font-bold text-base text-text-primary">
                  {editingArticle ? "Edit Managed Article" : "Create New Post"}
                </h3>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-text-secondary hover:text-text-primary p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-4 text-xs font-semibold">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-text-secondary">Article Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rupee Cost Averaging in 2026"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-1">
                  <label className="text-text-secondary">Summary Excerpt</label>
                  <input
                    type="text"
                    placeholder="Brief description showing on cards..."
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                  />
                </div>

                {/* Category & Read Time Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-text-secondary">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-background border border-border-custom rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary cursor-pointer"
                    >
                      <option value="Term Insurance">Term Insurance</option>
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Mutual Funds">Mutual Funds</option>
                      <option value="Tax Planning">Tax Planning</option>
                      <option value="Financial Planning">Financial Planning</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-text-secondary">Reading Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(e.target.value)}
                      className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                    />
                  </div>
                </div>

                {/* Author */}
                <div className="space-y-1">
                  <label className="text-text-secondary">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-text-secondary">Full Body Content</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write detailed paragraphs here..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                  />
                </div>

                {/* Mock Image Upload */}
                <div className="space-y-2 pt-1 border-t border-border-custom/50">
                  <label className="text-text-secondary block">Featured Image</label>
                  <input
                    type="text"
                    placeholder="Custom image URL e.g. https://..."
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary mb-2"
                  />
                  <div
                    onClick={handleMockUpload}
                    className="border-2 border-dashed border-border-custom rounded-xl p-4 text-center cursor-pointer hover:bg-background/20 transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <Upload size={20} className="text-text-secondary" />
                    {uploadProgress ? (
                      <span className="text-[10px] text-primary-custom animate-pulse">Uploading mock image asset...</span>
                    ) : formImageUrl ? (
                      <span className="text-[10px] text-emerald-400 font-mono overflow-hidden max-w-xs truncate">{formImageUrl}</span>
                    ) : (
                      <span className="text-[10px] text-text-secondary">Drag image here or click to simulate mock upload</span>
                    )}
                  </div>
                </div>

                {/* Featured and Published Toggles */}
                <div className="flex gap-6 py-2 border-t border-border-custom/50">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="accent-primary-custom cursor-pointer w-4 h-4"
                    />
                    <span className="text-text-primary">Featured Editor's Pick</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="accent-primary-custom cursor-pointer w-4 h-4"
                    />
                    <span className="text-text-primary">Publish immediately</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="pt-4 flex justify-end gap-3 border-t border-border-custom">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-5 py-3 border border-border-custom hover:bg-background text-text-secondary hover:text-text-primary rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-custom px-6 py-3 font-bold shadow-md cursor-pointer"
                  >
                    Save &amp; Apply
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
