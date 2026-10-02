import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-custom px-4 sm:px-6 lg:px-8 pt-14 pb-28 xl:pb-14 relative z-10 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 text-left">
        {/* Brand Column */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="font-display font-bold text-2xl tracking-tight text-text-primary flex items-center gap-0.5">
            InsurEdge<span className="text-primary-custom text-3xl font-bold leading-none">.</span>
          </div>
          <p className="text-[0.875rem] text-text-secondary leading-relaxed max-w-[320px]">
            India's only independent insurance discovery platform. Conflict-free guidance, no hidden agendas.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-text-secondary">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Independent &amp; 100% Conflict-Free</span>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-text-secondary uppercase mb-4">Company</h4>
          <ul className="list-none p-0 m-0 space-y-2.5">
            <li>
              <Link
                href="/about"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div>
          <h4 className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-text-secondary uppercase mb-4">Resources</h4>
          <ul className="list-none p-0 m-0 space-y-2.5">
            <li>
              <Link
                href="/term-insurance"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Term Insurance Guide
              </Link>
            </li>
            <li>
              <Link
                href="/health-insurance"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Health Insurance Guide
              </Link>
            </li>
            <li>
              <Link
                href="/mutual-funds"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Mutual Funds Hub
              </Link>
            </li>
            <li>
              <Link
                href="/calculator"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Calculators
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Blog &amp; Knowledge Hub
              </Link>
            </li>
            <li>
              <Link
                href="/insights"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Financial Insights
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Site Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-text-secondary uppercase mb-4">Legal</h4>
          <ul className="list-none p-0 m-0 space-y-2.5">
            <li>
              <Link
                href="/disclaimer"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="group inline-flex items-center text-text-secondary hover:text-primary-custom text-[0.875rem] transition-all duration-200 hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-primary-custom rounded-md py-0.5"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar with IRDAI disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-border-custom pt-6">
        <div className="space-y-4 w-full">
          <p className="text-[0.75rem] text-text-secondary max-w-4xl leading-relaxed font-sans text-left">
            <strong>Important Notice:</strong> We are not IRDAI certified. The information provided on this website is for educational and informational purposes only and should not be considered financial or insurance advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[0.8rem] text-text-secondary pt-2 gap-2">
            <span>© {currentYear} InsurEdge. Made with intention, not commission.</span>
            <span className="text-[0.75rem] text-text-secondary/70">ISO-inspired Conflict-Free Discovery Model</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
