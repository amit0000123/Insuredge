import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-custom px-[5vw] py-12 relative z-10 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-left">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="font-display font-bold text-2xl tracking-tight text-text-primary flex items-center gap-0.5">
            InsurEdge<span className="text-primary-custom text-3xl font-bold leading-none">.</span>
          </div>
          <p className="text-[0.875rem] text-text-secondary leading-relaxed max-w-[280px]">
            India's only independent insurance discovery platform. Conflict-free guidance, no hidden agendas.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-mono text-[0.65rem] tracking-[0.14em] text-text-secondary uppercase mb-5">Company</h4>
          <ul className="list-none p-0 m-0 space-y-3">
            <li>
              <Link href="/about" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div>
          <h4 className="font-mono text-[0.65rem] tracking-[0.14em] text-text-secondary uppercase mb-5">Resources</h4>
          <ul className="list-none p-0 m-0 space-y-3">
            <li>
              <Link href="/term-insurance" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Term Insurance Guide
              </Link>
            </li>
            <li>
              <Link href="/health-insurance" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Health Insurance Guide
              </Link>
            </li>
            <li>
              <Link href="/mutual-funds" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Mutual Funds Hub
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Calculators
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Blog &amp; Knowledge Hub
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Financial Insights
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Site Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-mono text-[0.65rem] tracking-[0.14em] text-text-secondary uppercase mb-5">Legal</h4>
          <ul className="list-none p-0 m-0 space-y-3">
            <li>
              <Link href="/disclaimer" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-text-secondary hover:text-primary-custom text-[0.875rem] transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar with IRDAI disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-border-custom pt-6 flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="space-y-4 w-full">
          <p className="text-[0.75rem] text-text-secondary max-w-[800px] leading-relaxed font-sans text-left">
            <strong>Important Notice:</strong> We are not IRDAI certified. The information provided on this website is for educational and informational purposes only and should not be considered financial or insurance advice.
          </p>
          <div className="flex justify-between items-center text-[0.8rem] text-text-secondary pt-2">
            <span>© {currentYear} InsurEdge. Made with intention, not commission.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
