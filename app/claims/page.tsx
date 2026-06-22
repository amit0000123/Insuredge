"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldAlert, FileText, PhoneCall, CheckCircle2, Clock, MapPin, Send, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface TimelineStep {
  label: string;
  status: "completed" | "active" | "pending";
  date?: string;
  desc: string;
}

const MOCK_CLAIMS: Record<string, TimelineStep[]> = {
  "CL-8429": [
    { label: "Claim Filed", status: "completed", date: "June 12, 2026", desc: "Hospital files claim document desk sheets to TPAs." },
    { label: "Document Verification", status: "completed", date: "June 14, 2026", desc: "Our claims advocate desk verifies diagnosis codes." },
    { label: "TPA Medical Audit", status: "active", date: "In Progress", desc: "Third-party administrator reviews pre-auth checklist approval." },
    { label: "Final Approval & Settlement", status: "pending", desc: "Discharge desk clearance. Payout sent directly to hospital." },
  ],
  "CL-5920": [
    { label: "Claim Filed", status: "completed", date: "May 20, 2026", desc: "Claim schedule documents uploaded by customer." },
    { label: "Document Verification", status: "completed", date: "May 22, 2026", desc: "Verified diagnostic medical bills and records." },
    { label: "TPA Medical Audit", status: "completed", date: "May 25, 2026", desc: "TPA verified policy parameters and approved waiver limits." },
    { label: "Final Approval & Settlement", status: "completed", date: "May 28, 2026", desc: "₹4,82,000 disbursed via NEFT directly to bank account." },
  ],
};

export default function ClaimsCenter() {
  const [claimId, setClaimId] = useState("");
  const [activeClaimData, setActiveClaimData] = useState<TimelineStep[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrackClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const result = MOCK_CLAIMS[claimId.trim().toUpperCase()];
    if (result) {
      setActiveClaimData(result);
    } else {
      setActiveClaimData(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Header */}
      <section className="relative z-10 py-12 border-b border-border-custom bg-surface/30">
        <div className="container mx-auto px-6 max-w-7xl text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary font-mono">
            <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">Claims Center</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Active Claims <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Support Desk</span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto font-sans leading-relaxed">
            Track claims in real-time. In emergencies, call our active claims desk for immediate hospital cashless clearance.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Claims Tracker Widget */}
            <div className="lg:col-span-7 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-text-primary">Real-Time Claim Status</h3>
                <p className="text-xs text-text-secondary">Input your unique claim tracking ID (e.g. Try: <strong className="text-primary-custom">CL-8429</strong> or <strong className="text-primary-custom">CL-5920</strong>)</p>
              </div>

              {/* Tracker Form */}
              <form onSubmit={handleTrackClaim} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Claim ID (CL-XXXX)"
                  value={claimId}
                  onChange={(e) => setClaimId(e.target.value)}
                  className="flex-1 bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-semibold uppercase"
                />
                <button type="submit" className="btn-primary-custom text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer">
                  Track Payout <Send size={14} />
                </button>
              </form>

              {/* Timeline Output */}
              {searched && (
                <div className="pt-4 border-t border-border-custom space-y-6">
                  {activeClaimData ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs font-semibold bg-background/50 border border-border-custom px-4 py-2 rounded-xl">
                        <span className="text-text-secondary">Tracking ID: <strong className="text-text-primary">{claimId.toUpperCase()}</strong></span>
                        <span className="text-primary-custom font-mono">IRDAI-Verified Payout Pipeline</span>
                      </div>

                      {/* Timeline Nodes */}
                      <div className="relative border-l-2 border-border-custom pl-6 ml-3 space-y-6">
                        {activeClaimData.map((node, index) => {
                          let dotColor = "bg-border-custom border-border-custom";
                          if (node.status === "completed") dotColor = "bg-accent-custom border-accent-custom text-white";
                          else if (node.status === "active") dotColor = "bg-primary-custom border-primary-custom text-white animate-pulse";

                          return (
                            <div key={index} className="relative">
                              {/* Node Circle */}
                              <span className={`absolute -left-[32px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border text-[9px] font-bold ${dotColor}`}>
                                {node.status === "completed" && "✓"}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-bold text-sm ${node.status === "pending" ? "text-text-secondary" : "text-text-primary"}`}>
                                    {node.label}
                                  </h4>
                                  {node.date && (
                                    <span className="text-[10px] text-text-secondary font-semibold font-mono bg-background px-2 py-0.5 rounded-full border border-border-custom">
                                      {node.date}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-text-secondary mt-1 font-sans leading-relaxed">
                                  {node.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-start gap-3 text-xs">
                      <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                      <div>
                        <span className="font-bold text-red-500 block">Invalid Tracker ID</span>
                        <p className="text-text-secondary mt-0.5">Please verify the code. Contact our 24/7 Support Desk if you cannot find your reference schedule sheets.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Protocols */}
            <div className="lg:col-span-5 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 font-display font-bold text-lg border-b border-border-custom pb-3 text-text-primary">
                <ShieldAlert size={18} className="text-primary-custom" />
                <h3>Emergency Hospitalizations</h3>
              </div>

              {/* Emergency checklist */}
              <div className="space-y-4 text-xs">
                
                {/* Cashless guide */}
                <div className="p-4 bg-background/50 border border-border-custom rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-text-primary">
                    <CheckCircle2 size={16} className="text-accent-custom" />
                    <h4>Cashless Admission Process</h4>
                  </div>
                  <ul className="list-decimal pl-4 space-y-2 text-text-secondary leading-relaxed">
                    <li>Contact hospital TPA desk and present your <strong>InsurEdge Digital Health ID</strong> card.</li>
                    <li>Submit physician recommendation letter and diagnostic profiles.</li>
                    <li>Our active handler will authorize pre-auth limits within <strong>2 Hours</strong> of receipt.</li>
                  </ul>
                </div>

                {/* Reimbursement guide */}
                <div className="p-4 bg-background/50 border border-border-custom rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-text-primary">
                    <FileText size={16} className="text-[#8B5CF6]" />
                    <h4>Reimbursement Timeline</h4>
                  </div>
                  <ul className="list-decimal pl-4 space-y-2 text-text-secondary leading-relaxed">
                    <li>Collect all original bills, medical logs, discharge card summary sheet, and receipts.</li>
                    <li>Submit files to InsurEdge Document Vault within <strong>30 Days</strong> of discharge.</li>
                    <li>Verified funds disbursed directly via NEFT bank transfer in <strong>7-10 Days</strong>.</li>
                  </ul>
                </div>

                {/* Hotlines */}
                <div className="p-4 bg-primary-custom/5 border border-primary-custom/25 rounded-2xl flex items-start gap-3">
                  <PhoneCall className="h-5 w-5 text-primary-custom shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-text-primary block">24/7 Claim Desk Helpline</span>
                    <p className="text-[10px] text-text-secondary mt-0.5">Call <strong>1800-419-5920</strong> (toll-free) for immediate cashless support queries.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
