"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Calculators", href: "/calculator" },
  { name: "Blog", href: "/insights" },
  { name: "Contact", href: "/contact" },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-background/80 backdrop-blur-md border-b border-border-custom h-[68px] flex items-center transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display font-bold text-2xl tracking-tight text-text-primary flex items-center gap-0.5 shrink-0">
          InsurEdge<span className="text-primary-custom text-3xl leading-none font-bold">.</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-[0.825rem] lg:text-[0.875rem] font-medium transition-colors hover:text-primary-custom font-sans whitespace-nowrap ${
                    pathname === link.href ? "text-primary-custom font-bold" : "text-text-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons and Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {mounted && (
            <button
              suppressHydrationWarning
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-surface border border-border-custom text-text-primary hover:bg-background transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-accent-custom" />
              ) : (
                <Moon size={18} className="text-primary-custom" />
              )}
            </button>
          )}

          <Link
            href="/contact"
            className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] text-white border-none cursor-pointer px-5 py-2.5 rounded-full text-[0.825rem] font-semibold hover:opacity-90 transition-opacity font-sans shadow-md shadow-primary-custom/10 whitespace-nowrap flex items-center justify-center"
          >
            Book Free Call
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-[0.825rem] font-medium text-text-secondary hover:text-primary-custom transition-colors font-sans ml-1">
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
                className="text-text-secondary hover:text-rose-400 text-[0.825rem] font-medium cursor-pointer transition-colors font-sans ml-1"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="text-[0.825rem] font-medium text-text-secondary hover:text-primary-custom transition-colors font-sans ml-1">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {mounted && (
            <button
              suppressHydrationWarning
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-surface border border-border-custom text-text-primary flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-accent-custom" />
              ) : (
                <Moon size={16} className="text-primary-custom" />
              )}
            </button>
          )}
          <button
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(true)}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[210] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[360px] bg-surface border-l border-border-custom z-[220] flex flex-col lg:hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-border-custom">
                <span className="font-display font-bold text-xl text-text-primary">Menu</span>
                <button
                  suppressHydrationWarning
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-background text-text-secondary hover:text-text-primary font-medium transition-all font-sans"
                  >
                    {link.name}
                    <ChevronRight size={16} />
                  </Link>
                ))}
                {isLoggedIn && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-background text-text-secondary hover:text-text-primary font-medium transition-all font-sans"
                  >
                    Dashboard
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>

              <div className="p-6 border-t border-border-custom bg-background/40 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-gradient-to-r from-primary-custom to-[#8B5CF6] text-white border-none py-3 rounded-xl text-sm font-semibold font-sans shadow-md cursor-pointer text-center block"
                >
                  Book Free Call
                </Link>

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
                    className="w-full bg-transparent border border-rose-500/30 text-rose-400 hover:border-rose-500 hover:text-rose-500 py-3 rounded-xl text-sm font-medium font-sans cursor-pointer"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-transparent border border-border-custom text-text-secondary hover:text-text-primary py-3 rounded-xl text-sm font-medium font-sans cursor-pointer text-center block"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
