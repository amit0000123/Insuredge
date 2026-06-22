import React from "react";
import Link from "next/link";
import { ChevronRight, Landmark } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300 font-sans">
      <div className="mesh" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Disclaimer</span>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-4 text-left">
          <div className="flex items-center space-x-3 text-text-primary font-bold">
            <div className="bg-primary-custom/12 text-primary-custom p-2 rounded-xl">
              <Landmark className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Regulatory Disclaimer</h1>
          </div>
          <p className="text-xs text-text-secondary">
            Effective Date: June 2026 | Licence DB-9988-26
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed text-left">
          <p>
            <strong>Registration & Licensing:</strong> InsurEdge is operated under valid composite insurance broker licensing registrations regulated by the Insurance Regulatory and Development Authority of India (IRDAI) and investment advisor regulations under the Securities and Exchange Board of India (SEBI). All advice provided follows strict compliance boundaries.
          </p>
          <p>
            <strong>Independence & Conflict of Interest:</strong> InsurEdge charges ₹0 advisory fees to clients for insurance research comparisons. Our platform revenue comes directly from premium commissions settled by insurer partners. However, in accordance with regulatory codes, we do not operate under targeted volume commissions or custom steering arrangements. We analyze all online plans to maintain complete objectivity.
          </p>
          <p>
            <strong>Market Risk Parameters:</strong> Mutual fund investments and SIP portfolios are subject to standard market fluctuations. Past roll-over compounding rates do not guarantee future returns. Please read all scheme-specific prospectuses and risk disclosures before allocating funds.
          </p>
          <p>
            <strong>General Information:</strong> The insurance product guidelines and calculators offered on this website are for estimation purposes only. Final premium pricing and coverage exclusions are determined dynamically by respective insurance underwriting teams upon form verification.
          </p>
        </div>
      </div>
    </div>
  );
}
