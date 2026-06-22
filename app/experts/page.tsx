"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, Mail, Calendar, User, ChevronRight, Search, PhoneCall } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Expert {
  id: number;
  name: string;
  role: string;
  experience: string;
  specialization: string[];
  bio: string;
  claimsSettled: string;
  satisfiedClients: string;
  rating: number;
  logoInitials: string;
}

const mockExperts: Expert[] = [
  {
    id: 1,
    name: "Karan Johar",
    role: "Senior Claims Consultant",
    experience: "18 Years",
    specialization: ["Health Claims", "Critical Illness Disclaimers", "Proportional Deductions"],
    bio: "Ex-underwriting manager at Apollo Munich. Karan specializes in auditing corporate floaters and resolving complex hospitalization bill disputes.",
    claimsSettled: "1,200+",
    satisfiedClients: "98.8%",
    rating: 4.9,
    logoInitials: "KJ",
  },
  {
    id: 2,
    name: "Priya Menon",
    role: "Term Policy Analyst",
    experience: "15 Years",
    specialization: ["Pure Term Planning", "Keyman Cover", "Tax Optimization (80C)"],
    bio: "Certified Financial Planner (CFP). Priya helps families choose optimal online-only term cover parameters to secure their primary assets.",
    claimsSettled: "800+",
    satisfiedClients: "99.2%",
    rating: 4.8,
    logoInitials: "PM",
  },
  {
    id: 3,
    name: "Amit Joshi",
    role: "Mutual Funds Specialist",
    experience: "12 Years",
    specialization: ["SIP Asset Allocations", "ELSS Tax Savings", "PPF Switching Strategy"],
    bio: "Ex-mutual fund manager. Amit guides disciplined investors in active vs passive indices weight allocations for long-term compounding goals.",
    claimsSettled: "N/A",
    satisfiedClients: "96.4%",
    rating: 4.7,
    logoInitials: "AJ",
  }
];

export default function Experts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperts = mockExperts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-12 border-b border-border-custom bg-surface/30">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-text-primary">Our Experts</span>
          </div>
          
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Consult Vetted <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Advisors</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
            Not salesmen or commission brokers. You consult with experienced underwriting and claims professionals handpicked after rigorous evaluations.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl space-y-10">
          
          {/* Search bar */}
          <div className="max-w-md mx-auto bg-surface p-3.5 rounded-2xl border border-border-custom shadow-sm flex items-center gap-2">
            <Search size={18} className="text-text-secondary ml-1" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-xs font-sans text-text-primary placeholder-text-secondary" 
              placeholder="Search experts or specializations..." 
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map(expert => (
              <div 
                key={expert.id}
                className="bg-surface rounded-3xl border border-border-custom shadow-sm hover:border-primary-custom/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Expert Card Body */}
                <div className="p-6 space-y-5 text-left">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-primary-custom/12 text-primary-custom rounded-xl flex items-center justify-center font-display font-bold text-sm">
                        {expert.logoInitials}
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-display text-text-primary">{expert.name}</h3>
                        <p className="text-[11px] text-primary-custom font-semibold font-sans mt-0.5">{expert.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold font-sans">
                      <Star size={12} className="fill-current" /> {expert.rating}
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans">{expert.bio}</p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block font-sans">Specializations</span>
                    <div className="flex flex-wrap gap-1.5">
                      {expert.specialization.map((spec, i) => (
                        <span 
                          key={i}
                          className="bg-background text-text-secondary text-[10px] font-semibold px-2 py-1 rounded-lg border border-border-custom font-sans"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Row */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-custom font-sans text-center">
                    <div className="bg-background/40 p-2.5 rounded-xl border border-border-custom">
                      <span className="text-[10px] text-text-secondary block mb-0.5">Claims Managed</span>
                      <strong className="text-text-primary text-xs font-bold">{expert.claimsSettled}</strong>
                    </div>
                    <div className="bg-background/40 p-2.5 rounded-xl border border-border-custom">
                      <span className="text-[10px] text-text-secondary block mb-0.5">Experience</span>
                      <strong className="text-text-primary text-xs font-bold">{expert.experience}</strong>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="p-4 bg-background/50 border-t border-border-custom flex gap-3">
                  <Link 
                    href="/book-appointment"
                    className="flex-grow btn-primary-custom text-center py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 rounded-xl shadow-none"
                  >
                    <Calendar size={14} /> Schedule Consultation
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
