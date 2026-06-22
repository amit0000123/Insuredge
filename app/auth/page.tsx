"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { KeyRound, Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname !== "/register";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth check and redirect to dashboard
    localStorage.setItem("user_token", "mock_jwt_token_2026");
    localStorage.setItem("user_name", isLogin ? "John Doe" : name);
    localStorage.setItem("user_email", email);
    
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-[85vh] text-text-primary justify-center items-center px-6 transition-colors duration-300">
      <div className="mesh" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 font-sans text-xs"
      >
        <div className="text-center space-y-2">
          {/* Logo */}
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-text-primary">
            InsurEdge<span className="text-primary-custom">.</span>
          </Link>
          <h2 className="text-lg font-bold font-display text-text-primary pt-2">
            {isLogin ? "Sign in to InsurEdge" : "Create your account"}
          </h2>
          <p className="text-[10px] text-text-secondary">
            {isLogin ? "Access your secure document vault and track active claims." : "Take control of your insurance decisions with conflict-free advice."}
          </p>
        </div>

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-left">
          
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 overflow-hidden"
              >
                <label className="text-text-secondary">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
                  <input
                    type="text"
                    required={!isLogin}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-border-custom rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-text-secondary">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border-custom rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-text-secondary">Password</label>
              {isLogin && (
                <button type="button" className="text-[10px] text-primary-custom font-bold hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border-custom rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary-custom justify-center py-3 rounded-xl font-bold mt-2">
            {isLogin ? "Sign In" : "Register Account"} <ArrowRight size={14} />
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border-custom"></div>
          <span className="flex-shrink mx-4 text-[9px] text-text-secondary font-mono uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-border-custom"></div>
        </div>

        {/* Mock Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-1.5 py-2.5 border border-border-custom hover:bg-background rounded-xl font-bold cursor-pointer transition-colors text-text-primary"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.81c2.23-2.06 3.64-5.1 3.64-8.46z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.81-3c-1.06.71-2.42 1.16-4.15 1.16-3.19 0-5.9-2.16-6.87-5.07H1.305v3.1A11.98 11.98 0 0012 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.13 14.18A7.2 7.2 0 014.76 12c0-.76.13-1.5.37-2.18V6.72H1.305A11.98 11.98 0 000 12c0 1.92.45 3.74 1.305 5.28l3.825-3.1z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.34 0 3.35 2.68 1.305 6.72L5.13 9.82c.97-2.91 3.68-5.07 6.87-5.07z"
              />
            </svg>
            Google
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-1.5 py-2.5 border border-border-custom hover:bg-background rounded-xl font-bold cursor-pointer transition-colors text-text-primary"
          >
            <KeyRound size={15} className="text-primary-custom" />
            Passkeys
          </button>
        </div>

        {/* Toggle link */}
        <div className="text-center text-[10px] text-text-secondary">
          {isLogin ? "New to InsurEdge?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-primary-custom font-bold hover:underline ml-1 cursor-pointer"
          >
            {isLogin ? "Create an account" : "Sign in instead"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
