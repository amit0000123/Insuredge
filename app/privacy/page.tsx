import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300 font-sans">
      <div className="mesh" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Privacy Policy</span>
        </div>

        {/* Title */}
        <div className="mb-10 space-y-4 text-left">
          <div className="flex items-center space-x-3 text-text-primary font-bold">
            <div className="bg-primary-custom/12 text-primary-custom p-2 rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Privacy Policy</h1>
          </div>
          <p className="text-xs text-text-secondary">
            Effective Date: June 2026
          </p>
        </div>

        {/* Content */}
        <div className="text-xs sm:text-sm text-text-secondary space-y-6 leading-relaxed text-left">
          <p>
            At InsurEdge, we take your data privacy seriously. This policy describes how we collect, store, protect, and handle your personal details when using our services.
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">1. Information We Collect</h3>
          <p>
            We collect personal information such as Name, Email Address, Phone Number, and Age parameters when you explicitly submit forms on our website (such as booking appointments, contacting us, or subscribing to our newsletters).
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">2. Data Security &amp; Protection</h3>
          <p>
            All connection flows are encrypted via SSL. We implement rigorous internal databases protection layers to prevent unauthorised disclosure or leaks. We never share, sell, or rent your data to insurance marketing networks.
          </p>
          <h3 className="font-display font-bold text-sm sm:text-base text-text-primary pt-2">3. Policy Controls</h3>
          <p>
            You retain absolute rights over your data. You can request deletion of your appointment records or opt out of our Sunday newsletters at any time by clicking the unsubscribe link or contacting hello@insuredge.com.
          </p>
        </div>
      </div>
    </div>
  );
}
