"use client";

import React, { useState } from "react";
import { Briefcase, Award, ShieldAlert, CheckCircle2, Send, Upload, User, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ApplyAdvisor() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [experience, setExperience] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300 font-sans">
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-12 border-b border-border-custom bg-surface/30">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4 font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/about" className="hover:text-primary-custom transition-colors">About</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-text-primary">Apply as Advisor</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold font-display leading-tight">
            Apply as an <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Advisor</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Join the elite panel of India's only 100% unbiased financial discovery platform. Help customers protect their future.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative z-10 py-12 flex-grow">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Info Block */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-5">
                <h2 className="text-xl font-display font-bold text-text-primary">Why Join InsurEdge?</h2>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  We are building a community of ethical advisors who put the customer's needs first. No target stress. No spam calls. Just genuine advisory.
                </p>

                <div className="space-y-4 pt-2 text-xs">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-custom shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-text-primary">No Sales Targets</h4>
                      <p className="text-text-secondary mt-0.5 leading-relaxed">We do not sell policies directly. You provide unbiased, professional advice.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-custom shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-text-primary">Paid Consultation Model</h4>
                      <p className="text-text-secondary mt-0.5 leading-relaxed">Earn directly from your expertise through booked consultation slots instead of commission tables.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary-custom shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-text-primary">Elevated Reputation</h4>
                      <p className="text-text-secondary mt-0.5 leading-relaxed">Position yourself as a certified expert backed by our 100% transparent brand.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement Card */}
              <div className="bg-[#111827] border border-border-custom rounded-3xl p-5 flex items-start gap-4">
                <ShieldAlert className="text-primary-custom shrink-0 mt-0.5" size={20} />
                <div className="text-[11px] text-text-secondary leading-relaxed">
                  <h4 className="font-bold text-text-primary text-xs mb-1">Minimum Eligibility Criteria</h4>
                  <ul className="list-disc pl-4 space-y-1 mt-1 text-text-secondary">
                    <li>Minimum 3 years of financial planning or claims experience.</li>
                    <li>Professional certifications (CFP, Licentiate/Associate/Fellow from III) preferred.</li>
                    <li>Strict commitment to our zero-commission recommendation code.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Block */}
            <div className="lg:col-span-7 bg-surface p-6 sm:p-8 rounded-3xl border border-border-custom shadow-sm text-left">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-6 text-xs font-semibold"
                >
                  <div className="w-16 h-16 bg-accent-custom/12 text-accent-custom border border-accent-custom/25 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-text-primary">Application Submitted!</h3>
                  <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                    Thank you for applying. Our credentials verification board will review your background and reach out within 3-5 business days.
                  </p>
                  <Link href="/" className="inline-block btn-primary-custom py-2.5 px-6 font-bold rounded-xl mt-4">
                    Back to Home
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                  <h3 className="text-lg font-bold font-display text-text-primary mb-2">Expert Advisor Form</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-text-secondary">Full Name</label>
                      <input type="text" required className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary" placeholder="Amit Sharma" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-text-secondary">Email Address</label>
                      <input type="email" required className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary" placeholder="amit@advisor.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-text-secondary">Phone Number</label>
                      <input type="tel" required className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-text-secondary">City of Practice</label>
                      <input type="text" required className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary" placeholder="Bengaluru" />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-text-secondary">Years of Professional Experience</label>
                      <span className="font-bold text-primary-custom">{experience} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={experience}
                      onChange={(e) => setExperience(parseInt(e.target.value))}
                      className="w-full h-2 bg-background border border-border-custom rounded-lg appearance-none cursor-pointer accent-primary-custom"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-text-secondary">Primary Qualification</label>
                    <select className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-xs outline-none text-text-primary cursor-pointer font-medium">
                      <option>Certified Financial Planner (CFP)</option>
                      <option>Chartered Accountant (CA)</option>
                      <option>Licentiate / Associate III</option>
                      <option>MBA in Finance</option>
                      <option>Other / Experienced Advisor</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-text-secondary block">Resume / Certification Upload</label>
                    <div className="border border-border-custom border-dashed hover:border-primary-custom rounded-2xl p-6 text-center cursor-pointer transition-colors bg-background flex flex-col items-center justify-center">
                      <Upload className="text-text-secondary mb-2" size={24} />
                      <span className="font-bold text-text-primary text-xs">Click to upload file (PDF, Docx)</span>
                      <span className="text-[10px] text-text-secondary mt-1">Maximum file size: 5MB</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary-custom justify-center py-3.5 rounded-xl font-bold mt-2 shadow-md">
                    Submit Application <Send size={14} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
