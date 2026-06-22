import React from "react";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300 font-sans">
      <div className="mesh" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Terms &amp; Conditions</span>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-4 text-left">
          <div className="flex items-center space-x-3 text-text-primary font-bold">
            <div className="bg-primary-custom/12 text-primary-custom p-2 rounded-xl">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Terms &amp; Conditions</h1>
          </div>
          <p className="text-xs text-text-secondary">
            Effective Date: June 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed text-left">
          <p>
            Welcome to InsurEdge. By accessing or using our platform, services, and online comparison wizards, you agree to be bound by these terms.
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">1. Scope of Advisory Services</h3>
          <p>
            InsurEdge provides independent research, digital comparison models, and certified consultant sessions. The information provided is intended to educate users and does not constitute a formal contract of insurance coverage.
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">2. Accuracy &amp; Estimates</h3>
          <p>
            While we audit exclusion clauses and premium estimates using historical data, all policy pricing, cashless network listings, and claims parameters are determined by the underwriting insurance provider at the time of official application submission.
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">3. Zero Spam Guarantee</h3>
          <p>
            We respect your communication preferences. We do not sell your contact details to third-party marketing grids. You will receive phone consultations or WhatsApp updates only when you explicitly book a meeting or request assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
