import React from "react";
import Link from "next/link";
import { ChevronRight, Map, ArrowRight } from "lucide-react";

export default function SitemapPage() {
  const sections = [
    {
      title: "Core Pages",
      links: [
        { label: "Home Page", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Book Appointment", href: "/book-appointment" },
        { label: "Contact Us", href: "/contact" },
        { label: "User Login & Registration", href: "/auth" },
      ],
    },
    {
      title: "Interactive Tools",
      links: [
        { label: "Onboarding & Health Assessment", href: "/" },
        { label: "Compare Plans side-by-side", href: "/plans" },
        { label: "Premium Calculator", href: "/calculator" },
        { label: "Claims Center & Timeline Tracker", href: "/claims" },
        { label: "User Dashboard & Document Vault", href: "/dashboard" },
      ],
    },
    {
      title: "Insurance Services",
      links: [
        { label: "Term Life Insurance", href: "/services?tab=term" },
        { label: "Health Insurance", href: "/services?tab=health" },
        { label: "Guaranteed Savings", href: "/services?tab=savings" },
        { label: "Mutual Funds & SIPs", href: "/services?tab=mutual-funds" },
        { label: "Expert Advisor Directory", href: "/experts" },
      ],
    },
    {
      title: "Regulatory & Legal",
      links: [
        { label: "Blog Insights & Articles", href: "/insights" },
        { label: "Independent Disclaimer", href: "/disclaimer" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300 font-sans">
      <div className="mesh" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-text-primary">Sitemap</span>
        </div>

        {/* Header */}
        <div className="mb-10 space-y-4 text-left">
          <div className="flex items-center space-x-3 text-text-primary font-bold">
            <div className="bg-primary-custom/12 text-primary-custom p-2 rounded-xl">
              <Map className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">Website Directory Map</h1>
          </div>
          <p className="text-sm text-text-secondary">
            Find and navigate to any page on the InsurEdge platform instantly.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-surface border border-border-custom rounded-3xl p-6 space-y-4">
              <h3 className="font-display font-extrabold text-text-primary text-base pb-2 border-b border-border-custom">
                {section.title}
              </h3>
              <ul className="space-y-3 font-sans">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-text-secondary hover:text-primary-custom transition-all flex items-center space-x-2 group"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-text-secondary group-hover:text-primary-custom transition-colors shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
