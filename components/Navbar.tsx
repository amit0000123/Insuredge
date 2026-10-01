"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Home,
  ShieldCheck,
  HeartPulse,
  TrendingUp,
  Layers,
  Calculator,
  Info,
  PhoneCall,
  User,
  Sparkles,
  FileCheck2,
  Calendar,
  Grid,
  BookOpen,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

// Comprehensive list of navigation items
const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    badge: null,
    category: "main",
    description: "Overview & discovery",
  },
  {
    name: "Term Insurance",
    href: "/term-insurance",
    icon: ShieldCheck,
    badge: "10 Myths & Guide",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    category: "products",
    description: "Pure life cover & income replacement",
  },
  {
    name: "Health Insurance",
    href: "/health-insurance",
    icon: HeartPulse,
    badge: "Cashless Network",
    badgeColor: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    category: "products",
    description: "10,000+ cashless hospitals & floater plans",
  },
  {
    name: "Mutual Funds",
    href: "/mutual-funds",
    icon: TrendingUp,
    badge: "SIP & Wealth",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-200/20",
    category: "products",
    description: "Disciplined SIP & tax-saving strategies",
  },
  {
    name: "Services",
    href: "/services",
    icon: Layers,
    badge: null,
    category: "tools",
    description: "Compare all protection categories",
  },
  {
    name: "Calculators",
    href: "/calculator",
    icon: Calculator,
    badge: "Free Tools",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    category: "tools",
    description: "SIP, Term Cover & delay cost calculators",
  },
  {
    name: "Blog",
    href: "/blog",
    icon: BookOpen,
    badge: null,
    category: "tools",
    description: "Financial guides, tax & policy insights",
  },
  {
    name: "About Us",
    href: "/about",
    icon: Info,
    badge: null,
    category: "company",
    description: "Independent & 100% conflict-free advisory",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: PhoneCall,
    badge: null,
    category: "company",
    description: "Speak with a certified expert",
  },
];

// Quick bottom bar items for phones
const bottomBarLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Term", href: "/term-insurance", icon: ShieldCheck },
  { name: "Health", href: "/health-insurance", icon: HeartPulse },
  { name: "Funds", href: "/mutual-funds", icon: TrendingUp },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("user_token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ========================================================================= */}
      {/* TOP DESKTOP & MOBILE HEADER */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-[200] bg-background/85 backdrop-blur-md border-b border-border-custom h-[68px] flex items-center transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-xl sm:text-2xl tracking-tight text-text-primary flex items-center gap-0.5 shrink-0"
          >
            InsurEdge<span className="text-primary-custom text-2xl sm:text-3xl leading-none font-bold">.</span>
          </Link>

          {/* Desktop Navigation Links (Visible on XL screens: 1280px+) */}
          <nav className="hidden xl:flex items-center gap-5">
            <ul className="flex gap-4 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-[0.825rem] font-medium transition-colors hover:text-primary-custom font-sans whitespace-nowrap py-1 px-1.5 rounded-lg ${
                        isActive
                          ? "text-primary-custom font-bold bg-primary-custom/10"
                          : "text-text-secondary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Buttons and Theme Toggle (XL screens) */}
          <div className="hidden xl:flex items-center gap-3.5 shrink-0">
            {mounted && (
              <button
                suppressHydrationWarning
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-surface border border-border-custom text-text-primary hover:bg-background transition-all cursor-pointer flex items-center justify-center shadow-sm"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={17} className="text-accent-custom" />
                ) : (
                  <Moon size={17} className="text-primary-custom" />
                )}
              </button>
            )}

            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary-custom to-purple-600 text-white border-none cursor-pointer px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity font-sans shadow-md shadow-primary-custom/15 whitespace-nowrap flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Book Free Call</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-xs font-medium text-text-secondary hover:text-primary-custom transition-colors font-sans ml-1"
                >
                  Dashboard
                </Link>
                <button
                  suppressHydrationWarning
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    localStorage.removeItem("user_name");
                    localStorage.removeItem("user_email");
                    setIsLoggedIn(false);
                    window.location.href = "/";
                  }}
                  className="text-text-secondary hover:text-rose-400 text-xs font-medium cursor-pointer transition-colors font-sans ml-1"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-xs font-medium text-text-secondary hover:text-primary-custom transition-colors font-sans ml-1"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile & Tablet Header Controls (Visible below XL: 1280px) */}
          <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
            {/* Quick Consultation CTA on Mobile */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary-custom to-purple-600 text-white text-[0.725rem] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1"
            >
              <PhoneCall size={11} />
              <span>Free Call</span>
            </Link>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                suppressHydrationWarning
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-surface border border-border-custom text-text-primary flex items-center justify-center cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={16} className="text-accent-custom" />
                ) : (
                  <Moon size={16} className="text-primary-custom" />
                )}
              </button>
            )}

            {/* Hamburger Menu Trigger Button */}
            <button
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-surface border border-border-custom text-text-primary hover:bg-background transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="Open full menu"
            >
              <Menu size={20} />
              <span className="text-xs font-semibold hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE PHONE-FRIENDLY MOBILE DRAWER (EVERY OPTION VISIBLE) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-[210] backdrop-blur-sm xl:hidden"
              />

              {/* Slide-out Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="fixed top-0 right-0 h-screen h-[100dvh] w-[90%] max-w-[400px] bg-surface border-l border-border-custom z-[220] flex flex-col xl:hidden shadow-2xl overflow-hidden"
              >
                {/* Drawer Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-border-custom bg-background/50 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-lg text-text-primary">
                      InsurEdge Menu
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-custom/10 text-primary-custom text-[0.65rem] font-mono font-bold">
                      ALL OPTIONS
                    </span>
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-surface border border-border-custom text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Free Advisor Call Banner */}
                <div className="p-3.5 mx-4 mt-3 rounded-2xl bg-gradient-to-r from-primary-custom/15 via-purple-500/10 to-transparent border border-primary-custom/25 shrink-0 flex items-center justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary-custom">
                      <Sparkles size={12} />
                      <span>Free 1-on-1 Consultation</span>
                    </div>
                    <p className="text-[0.7rem] text-text-secondary">
                      Unbiased guidance from certified specialists.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-primary-custom text-white text-xs font-bold shrink-0 shadow-sm"
                  >
                    Book Call
                  </Link>
                </div>

                {/* Scrollable Navigation Options List */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-left">
                  {/* Category 1: Insurance & Wealth Products */}
                  <div>
                    <span className="text-[0.65rem] font-mono font-bold uppercase text-text-secondary tracking-wider block mb-2 px-1">
                      Advisory &amp; Protection
                    </span>
                    <div className="space-y-1.5">
                      {navLinks
                        .filter((item) => item.category === "products" || item.name === "Home")
                        .map((link) => {
                          const Icon = link.icon;
                          const isActive = pathname === link.href;
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                                isActive
                                  ? "bg-primary-custom/10 border-primary-custom/40 text-primary-custom font-bold shadow-sm"
                                  : "bg-surface hover:bg-background border-border-custom/80 text-text-primary"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    isActive
                                      ? "bg-primary-custom text-white shadow-sm"
                                      : "bg-background border border-border-custom text-text-secondary"
                                  }`}
                                >
                                  <Icon size={17} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-semibold">
                                      {link.name}
                                    </span>
                                    {link.badge && (
                                      <span
                                        className={`px-1.5 py-0.5 rounded text-[0.6rem] font-bold border ${link.badgeColor}`}
                                      >
                                        {link.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[0.68rem] text-text-secondary line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight size={15} className="text-text-secondary/70 shrink-0" />
                            </Link>
                          );
                        })}
                    </div>
                  </div>

                  {/* Category 2: Tools & Services */}
                  <div>
                    <span className="text-[0.65rem] font-mono font-bold uppercase text-text-secondary tracking-wider block mb-2 px-1">
                      Tools &amp; Comparison
                    </span>
                    <div className="space-y-1.5">
                      {navLinks
                        .filter((item) => item.category === "tools")
                        .map((link) => {
                          const Icon = link.icon;
                          const isActive = pathname === link.href;
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                                isActive
                                  ? "bg-primary-custom/10 border-primary-custom/40 text-primary-custom font-bold shadow-sm"
                                  : "bg-surface hover:bg-background border-border-custom/80 text-text-primary"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    isActive
                                      ? "bg-primary-custom text-white shadow-sm"
                                      : "bg-background border border-border-custom text-text-secondary"
                                  }`}
                                >
                                  <Icon size={17} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-semibold">
                                      {link.name}
                                    </span>
                                    {link.badge && (
                                      <span
                                        className={`px-1.5 py-0.5 rounded text-[0.6rem] font-bold border ${link.badgeColor}`}
                                      >
                                        {link.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[0.68rem] text-text-secondary line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight size={15} className="text-text-secondary/70 shrink-0" />
                            </Link>
                          );
                        })}
                    </div>
                  </div>

                  {/* Category 3: Company & Support */}
                  <div>
                    <span className="text-[0.65rem] font-mono font-bold uppercase text-text-secondary tracking-wider block mb-2 px-1">
                      InsurEdge Organization
                    </span>
                    <div className="space-y-1.5">
                      {navLinks
                        .filter((item) => item.category === "company")
                        .map((link) => {
                          const Icon = link.icon;
                          const isActive = pathname === link.href;
                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                                isActive
                                  ? "bg-primary-custom/10 border-primary-custom/40 text-primary-custom font-bold shadow-sm"
                                  : "bg-surface hover:bg-background border-border-custom/80 text-text-primary"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    isActive
                                      ? "bg-primary-custom text-white shadow-sm"
                                      : "bg-background border border-border-custom text-text-secondary"
                                  }`}
                                >
                                  <Icon size={17} />
                                </div>
                                <div>
                                  <span className="text-xs sm:text-sm font-semibold block">
                                    {link.name}
                                  </span>
                                  <p className="text-[0.68rem] text-text-secondary line-clamp-1">
                                    {link.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight size={15} className="text-text-secondary/70 shrink-0" />
                            </Link>
                          );
                        })}
                    </div>
                  </div>

                  {/* Account / Dashboard Link if Logged in */}
                  {isLoggedIn && (
                    <div>
                      <span className="text-[0.65rem] font-mono font-bold uppercase text-text-secondary tracking-wider block mb-2 px-1">
                        Client Portal
                      </span>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-border-custom text-text-primary hover:bg-background"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                            <User size={17} />
                          </div>
                          <div>
                            <span className="text-xs font-semibold block">My Dashboard</span>
                            <span className="text-[0.68rem] text-text-secondary">
                              View policies &amp; advisor appointments
                            </span>
                          </div>
                        </div>
                        <ChevronRight size={15} className="text-text-secondary" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-4 border-t border-border-custom bg-background/60 shrink-0 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Theme Switcher Button */}
                    <button
                      suppressHydrationWarning
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-2.5 rounded-xl bg-surface border border-border-custom text-text-primary flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer hover:bg-background transition-colors"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun size={15} className="text-accent-custom" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon size={15} className="text-primary-custom" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>

                    {/* Sign in / Sign out Button */}
                    {isLoggedIn ? (
                      <button
                        suppressHydrationWarning
                        onClick={() => {
                          localStorage.removeItem("user_token");
                          localStorage.removeItem("user_name");
                          localStorage.removeItem("user_email");
                          setIsLoggedIn(false);
                          setMobileMenuOpen(false);
                          window.location.href = "/";
                        }}
                        className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold cursor-pointer text-center"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 rounded-xl bg-surface border border-border-custom text-text-primary hover:text-primary-custom text-xs font-semibold cursor-pointer text-center block"
                      >
                        Sign In
                      </Link>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-custom to-purple-600 text-white font-bold text-xs shadow-md shadow-primary-custom/20 text-center block"
                  >
                    Schedule Free Advisory Call
                  </Link>

                  <p className="text-[0.65rem] text-text-secondary text-center">
                    🔒 Zero Spam Promise • 100% Conflict-Free Discovery
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* PHONE STICKY BOTTOM NAVIGATION BAR (THUMB-FRIENDLY QUICK ACCESS) */}
      {/* ========================================================================= */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-[190] xl:hidden bg-surface/95 backdrop-blur-xl border-t border-border-custom h-[60px] pb-safe flex items-center justify-around px-2 shadow-lg"
      >
        {bottomBarLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "text-primary-custom font-bold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? "bg-primary-custom/15 scale-110" : ""
                }`}
              >
                <Icon size={18} />
              </div>
              <span className="text-[0.65rem] tracking-tight mt-0.5">{item.name}</span>
            </Link>
          );
        })}

        {/* 5th Tab: All Options / Menu Trigger */}
        <button
          suppressHydrationWarning
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            mobileMenuOpen
              ? "text-primary-custom font-bold"
              : "text-text-secondary hover:text-text-primary"
          }`}
          aria-label="Open all options menu"
        >
          <div
            className={`p-1 rounded-lg transition-transform ${
              mobileMenuOpen ? "bg-primary-custom/15 scale-110" : ""
            }`}
          >
            <Grid size={18} />
          </div>
          <span className="text-[0.65rem] tracking-tight mt-0.5">All Menu</span>
        </button>
      </nav>
    </>
  );
}
