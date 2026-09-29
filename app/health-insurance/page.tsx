"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calendar,
  UserCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
  Check,
  X,
  AlertCircle,
  Info,
  Building2,
  Stethoscope,
  Activity,
  Bed,
  Syringe,
  Pill,
  Ambulance,
  FileCheck,
  Layers,
  Lightbulb,
  ShieldAlert,
  Wallet,
  Users,
  Compass,
  User,
  Baby,
  Car,
  PlusCircle,
  HeartHandshake,
  ArrowDown,
  HelpCircle,
  Shield,
  AlertTriangle,
  RefreshCw,
  Award,
  Home,
  Briefcase,
  FileText,
  Search,
  Plane,
  Lock,
  BookOpen,
  CheckCircle,
  XCircle,
  ChevronDown,
  ShieldOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HealthInsurancePage() {
  // Callback Form State
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbCoverFor, setCbCoverFor] = useState("Family (Self + Spouse + Kids)");
  const [cbSubmitted, setCbSubmitted] = useState(false);
  const [cbError, setCbError] = useState("");

  // Interactive Hospital Bill Switcher
  const [selectedExample, setSelectedExample] = useState<number>(0);

  // Interactive 7 Questions Questionnaire State
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  // Interactive Co-Payment Example State
  const [copayPercent, setCopayPercent] = useState<number>(10);
  const [copayClaimAmount, setCopayClaimAmount] = useState<number>(200000);

  // Interactive Situation Matcher State
  const [selectedSituation, setSelectedSituation] = useState<number>(0);

  // FAQ Filter & Search State
  const [faqCategory, setFaqCategory] = useState<string>("All");
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Myth expanded state
  const [expandedMyth, setExpandedMyth] = useState<number | null>(null);

  // 12 Health Insurance Myths vs Facts
  const mythsAndFacts = [
    {
      id: 1,
      myth: "“I’m young and healthy, so I don’t need health insurance.”",
      fact: "Good health today doesn’t guarantee that medical emergencies won’t happen tomorrow. Unexpected illnesses, accidents, infections, or surgeries can occur at any age. Buying health insurance while you’re young also helps you lock in coverage before health conditions develop and may result in lower premiums. Health insurance isn’t just for when you’re sick—it’s about being financially prepared if something unexpected happens.",
      category: "Eligibility & Age"
    },
    {
      id: 2,
      myth: "“My employer already provides health insurance.”",
      fact: "Employer health insurance is a valuable benefit, but it may not always provide sufficient protection. Employer policies often have limited sum insured, cover only while you’re employed, may not include your parents, and can change when you switch jobs. Having a personal health insurance policy provides continuity and greater control over your healthcare coverage.",
      category: "Corporate Cover"
    },
    {
      id: 3,
      myth: "“Health insurance is too expensive.”",
      fact: "Many people overestimate the cost of health insurance and underestimate the cost of hospitalization. A single medical emergency can cost several times more than years of health insurance premiums. Health insurance is designed to protect your savings from unexpected healthcare expenses.",
      category: "Cost & Value"
    },
    {
      id: 4,
      myth: "“I’ll buy health insurance when I get older.”",
      fact: "Waiting may not always work in your favor. As you age: premiums generally increase, waiting periods begin later, health conditions may affect eligibility, and policy options may become more limited. Buying earlier gives you the advantage of continuous coverage and long-term financial protection.",
      category: "Timing"
    },
    {
      id: 5,
      myth: "“All health insurance policies are the same.”",
      fact: "Every policy differs in terms of coverage, waiting periods, room rent eligibility, network hospitals, co-payment, restoration benefits, No Claim Bonus, and exclusions. Understanding these differences is essential before making a decision.",
      category: "Policy Features"
    },
    {
      id: 6,
      myth: "“Cashless treatment means I never have to pay anything.”",
      fact: "Cashless hospitalization applies to eligible expenses under your policy and is subject to policy terms, approvals, and hospital network availability. Some expenses (such as non-medical consumables, registration fees, or room rent differences) may still need to be paid by the policyholder, depending on the policy and treatment.",
      category: "Claims"
    },
    {
      id: 7,
      myth: "“Health insurance covers every medical expense.”",
      fact: "Every policy has exclusions and limitations. Reading the policy wording and understanding what is—and isn’t—covered helps set realistic expectations.",
      category: "Exclusions"
    },
    {
      id: 8,
      myth: "“If I don’t make a claim, I’ve wasted my money.”",
      fact: "Health insurance is a protection plan, not an investment. Just like you hope never to use a fire extinguisher, you hope you never need health insurance. Its value lies in protecting your finances during unexpected medical situations.",
      category: "Mindset"
    },
    {
      id: 9,
      myth: "“Buying the cheapest plan saves money.”",
      fact: "A lower premium may also mean lower coverage, more restrictions, higher out-of-pocket costs, and limited benefits. The goal should be choosing the policy that provides the most suitable protection—not simply the lowest premium.",
      category: "Cost & Value"
    },
    {
      id: 10,
      myth: "“I can always use my savings.”",
      fact: "Savings are meant to help you achieve life’s goals. Using years of accumulated savings to pay a large hospital bill can affect retirement planning, children’s education, home purchase plans, and emergency funds. Health insurance helps protect the savings you’ve worked hard to build.",
      category: "Financial Planning"
    },
    {
      id: 11,
      myth: "“Insurance claims are always rejected.”",
      fact: "Many genuine claims are successfully settled every year. Claim issues often arise because of incomplete disclosure, incorrect information, waiting periods, policy exclusions, or missing documentation. Providing accurate information and understanding your policy helps reduce complications.",
      category: "Claims"
    },
    {
      id: 12,
      myth: "“Health insurance is only for older people.”",
      fact: "People of all ages can benefit from health insurance. Young professionals, newly married couples, families with children, self-employed individuals, and senior citizens all have different healthcare needs—and health insurance can play an important role at every life stage.",
      category: "Eligibility & Age"
    }
  ];

  // Which Health Insurance Plan May Suit Your Situation (7 Real-Life Personas)
  const situations = [
    {
      id: 0,
      title: "I’m 24 and Just Started Working",
      icon: User,
      subtitle: "First-time job holders & early career professionals",
      consider: [
        "Individual Health Insurance (dedicate ₹5L–₹10L sum insured)",
        "Employer health insurance (if available through corporate policy)",
        "Building continuous coverage early to lock in lower premiums"
      ],
      insight: "Starting early can help you establish long-term protection while you’re healthy and complete waiting periods with zero pre-existing conditions."
    },
    {
      id: 1,
      title: "We’re Newly Married",
      icon: HeartHandshake,
      subtitle: "Couples planning for shared life milestones",
      consider: [
        "Individual policies for each partner",
        "Family Floater plans with shared sum insured",
        "Coverage with maternity riders that can grow with your future family"
      ],
      insight: "Early enrollment allows you to complete the 9 to 36-month maternity waiting periods well before starting your family."
    },
    {
      id: 2,
      title: "We Have Young Children",
      icon: Baby,
      subtitle: "Growing families with pediatric care needs",
      consider: [
        "Family Floater Health Insurance covering 2 adults + kids",
        "Higher sum insured (₹15L–₹25L+) to shield against inflation",
        "Extensive cashless hospital network in your locality",
        "Restoration benefits to refill sum insured if exhausted"
      ],
      insight: "Healthcare needs often grow alongside your family. A floater with automatic restoration guarantees uninterrupted safety for all members."
    },
    {
      id: 3,
      title: "I Want to Buy Insurance for My Parents",
      icon: ShieldCheck,
      subtitle: "Caring for senior parents with age-specific needs",
      consider: [
        "Dedicated Senior Citizen Health Insurance",
        "Coverage for pre-existing conditions (diabetes, hypertension)",
        "Evaluating co-payment clauses (e.g. 10%–20%) vs premium trade-offs",
        "Checking waiting periods and annual preventive health checkups"
      ],
      insight: "Insuring elderly parents on their own policy preserves your primary family floater's No Claim Bonus while giving parents specialized geriatric care."
    },
    {
      id: 4,
      title: "I Already Have ₹10 Lakh Health Insurance",
      icon: Layers,
      subtitle: "Policyholders seeking cost-effective super-coverage",
      consider: [
        "Super Top-up plans with a ₹10 Lakh deductible",
        "Adding ₹40L–₹90L additional coverage for a fraction of the cost",
        "Protecting against critical interventions & hyper-inflation"
      ],
      insight: "A Super Top-up evaluates total cumulative expenses across the year, providing a multi-lakh safety buffer at very affordable annual premiums."
    },
    {
      id: 5,
      title: "I Travel Frequently for Work",
      icon: Plane,
      subtitle: "Frequent domestic travelers & commuting professionals",
      consider: [
        "Comprehensive health insurance with pan-India cashless network",
        "Personal Accident Insurance for accidental death & disability protection",
        "Emergency road and air ambulance coverage riders"
      ],
      insight: "Combining comprehensive health cover with Personal Accident Insurance creates a complete safety cushion against travel and transit mishaps."
    },
    {
      id: 6,
      title: "I Own a Business",
      icon: Briefcase,
      subtitle: "Entrepreneurs, business owners & self-employed consultants",
      consider: [
        "Personal Health Insurance (since there is no employer group cover)",
        "Critical Illness Insurance for lump-sum income replacement",
        "Personal Accident Insurance for business continuity"
      ],
      insight: "Without corporate safety nets, business owners must evaluate healthcare needs alongside business cash flow and family financial commitments."
    }
  ];

  // Comprehensive 25 FAQs
  const faqData = [
    {
      id: 1,
      q: "What is health insurance?",
      a: "Health insurance is a policy that helps cover eligible medical expenses arising from illnesses, accidents, surgeries, or hospitalization, according to the policy terms and conditions.",
      cat: "Basics"
    },
    {
      id: 2,
      q: "Why is health insurance important?",
      a: "Health insurance helps protect your savings from unexpected healthcare expenses and gives you financial support during medical emergencies.",
      cat: "Basics"
    },
    {
      id: 3,
      q: "Who should buy health insurance?",
      a: "Anyone can benefit from health insurance, including young professionals, families, senior citizens, self-employed individuals, business owners, and parents.",
      cat: "Basics"
    },
    {
      id: 4,
      q: "What is the difference between health insurance and mediclaim?",
      a: "Mediclaim traditionally focuses on hospitalization expenses, while many modern health insurance plans offer broader coverage and additional benefits. The exact features depend on the policy.",
      cat: "Policies & Types"
    },
    {
      id: 5,
      q: "What is a Family Floater Plan?",
      a: "A Family Floater policy covers multiple family members under one shared sum insured.",
      cat: "Policies & Types"
    },
    {
      id: 6,
      q: "What is Individual Health Insurance?",
      a: "It covers one individual with a dedicated sum insured.",
      cat: "Policies & Types"
    },
    {
      id: 7,
      q: "What is a waiting period?",
      a: "It’s the period during which certain benefits or conditions may not be covered immediately after purchasing the policy.",
      cat: "Costs & Clauses"
    },
    {
      id: 8,
      q: "What are pre-existing diseases?",
      a: "Medical conditions that existed before purchasing the policy, as defined by the insurer.",
      cat: "Costs & Clauses"
    },
    {
      id: 9,
      q: "What is cashless hospitalization?",
      a: "Eligible medical expenses are settled directly between the insurer and a network hospital, subject to policy terms and approvals.",
      cat: "Claims & Hospitals"
    },
    {
      id: 10,
      q: "What is reimbursement?",
      a: "You pay the hospital first and later submit eligible expenses to the insurer for reimbursement, according to the policy.",
      cat: "Claims & Hospitals"
    },
    {
      id: 11,
      q: "What is a network hospital?",
      a: "A hospital that has an arrangement with an insurer to provide cashless treatment for eligible claims.",
      cat: "Claims & Hospitals"
    },
    {
      id: 12,
      q: "What is a co-payment?",
      a: "A percentage of eligible medical expenses that the policyholder pays, while the insurer pays the remaining eligible amount according to the policy.",
      cat: "Costs & Clauses"
    },
    {
      id: 13,
      q: "What is a No Claim Bonus?",
      a: "A benefit offered by many insurers for claim-free years, subject to policy terms.",
      cat: "Costs & Clauses"
    },
    {
      id: 14,
      q: "What is a restoration benefit?",
      a: "A feature that restores the sum insured under specified conditions after it has been exhausted.",
      cat: "Costs & Clauses"
    },
    {
      id: 15,
      q: "What does health insurance usually cover?",
      a: "Coverage may include hospitalization, surgeries, ICU expenses, diagnostic tests, medicines, ambulance charges, and pre- and post-hospitalization expenses, depending on the policy.",
      cat: "Policies & Types"
    },
    {
      id: 16,
      q: "What is generally not covered?",
      a: "Policies commonly exclude cosmetic procedures, experimental treatments, self-inflicted injuries, and certain conditions during waiting periods. Always review the policy wording.",
      cat: "Policies & Types"
    },
    {
      id: 17,
      q: "Can I buy health insurance online?",
      a: "Yes. However, it’s important to understand the policy features before making a decision.",
      cat: "Basics"
    },
    {
      id: 18,
      q: "Should I rely only on employer health insurance?",
      a: "Employer coverage is valuable, but many people also choose a personal policy for continuity and additional protection.",
      cat: "Basics"
    },
    {
      id: 19,
      q: "How do I choose the right health insurance policy?",
      a: "Compare coverage, waiting periods, network hospitals, policy features, exclusions, and suitability for your healthcare needs rather than focusing only on the premium.",
      cat: "Basics"
    },
    {
      id: 20,
      q: "Can I buy health insurance for my parents?",
      a: "Yes. Many insurers offer plans designed specifically for senior citizens.",
      cat: "Policies & Types"
    },
    {
      id: 21,
      q: "What is a Top-up Health Insurance Plan?",
      a: "A Top-up plan provides additional coverage after a specified deductible is crossed, according to the policy terms.",
      cat: "Policies & Types"
    },
    {
      id: 22,
      q: "What is a Super Top-up Plan?",
      a: "A Super Top-up considers cumulative eligible medical expenses during the policy year instead of a single hospitalization.",
      cat: "Policies & Types"
    },
    {
      id: 23,
      q: "Why should I compare policies before buying?",
      a: "Different insurers offer different features, hospital networks, waiting periods, and benefits. Comparing options helps you make an informed decision.",
      cat: "Basics"
    },
    {
      id: 24,
      q: "Why should I speak with a certified insurance expert?",
      a: "An expert can explain policy features, clarify complex terms, help you compare options objectively, and guide you toward a plan that aligns with your healthcare needs.",
      cat: "Basics"
    },
    {
      id: 25,
      q: "How can your platform help me?",
      a: "We simplify health insurance by providing educational resources and connecting you with certified insurance experts who can help you understand and compare suitable health insurance options.",
      cat: "Basics"
    }
  ];

  // 10 Guides in Library (Coming Soon)
  const upcomingGuides = [
    { title: "How to Choose the Right Health Insurance Policy", tag: "Strategy", desc: "A practical guide to balancing sum insured, premium affordability, and sublimits." },
    { title: "Individual vs Family Floater Plans", tag: "Comparison", desc: "Determining whether separate covers or unified family sum insured is right for your home." },
    { title: "Understanding Waiting Periods", tag: "Policy Terms", desc: "Detailed breakdown of initial, pre-existing, and disease-specific waiting periods." },
    { title: "Cashless vs Reimbursement Claims", tag: "Claims", desc: "Navigating hospital TPA desks, pre-authorization, and documentation timelines." },
    { title: "Health Insurance for Parents", tag: "Senior Care", desc: "How to insure aging parents effectively without spiking family floater premiums." },
    { title: "Top-up vs Super Top-up Plans", tag: "Smart Cover", desc: "How to add ₹50L+ protection for nominal cost using deductibles." },
    { title: "Critical Illness Insurance Explained", tag: "Specialized", desc: "Lump-sum cancer, heart attack, and stroke payouts vs regular health insurance." },
    { title: "Common Claim Mistakes to Avoid", tag: "Claim Tips", desc: "Top reasons TPAs reject or delay claims and how you can prevent them." },
    { title: "Health Insurance Glossary", tag: "Dictionary", desc: "Plain-English explanations of 50+ insurance terms and medical definitions." },
    { title: "Annual Health Insurance Review Checklist", tag: "Audit", desc: "A 5-minute annual checklist to adjust coverage as life events occur." },
  ];

  const billExamples = [
    {
      title: "Example 1: Dengue Hospitalization",
      tag: "Seasonal Illness",
      icon: Activity,
      color: "emerald",
      total: "₹1,80,000",
      items: [
        { label: "Room Charges (4 Days)", cost: "₹70,000" },
        { label: "Doctor Visits & Rounds", cost: "₹20,000" },
        { label: "Diagnostic Tests (Platelets, Blood)", cost: "₹30,000" },
        { label: "Medicines & IV Infusions", cost: "₹35,000" },
        { label: "Nursing & Miscellaneous Supplies", cost: "₹25,000" },
      ],
      insight: "A 4-day monsoon illness can easily cost upwards of ₹1.8 Lakh in Tier-1 multi-specialty hospitals.",
    },
    {
      title: "Example 2: Appendix Surgery",
      tag: "Planned / Semi-Emergency",
      icon: Syringe,
      color: "blue",
      total: "₹2,15,000",
      items: [
        { label: "Hospital Room (Private)", cost: "₹50,000" },
        { label: "Surgery Charges & OT Theater", cost: "₹90,000" },
        { label: "Medicines & Post-Operative Drugs", cost: "₹25,000" },
        { label: "Diagnostic Tests (Ultrasound/Blood)", cost: "₹20,000" },
        { label: "Surgeon & Anesthetist Fees", cost: "₹30,000" },
      ],
      insight: "Surgical intervention bills can wipe out an entire year of disciplined emergency savings in 48 hours.",
    },
    {
      title: "Example 3: Minor Heart Procedure",
      tag: "Critical Intervention",
      icon: HeartPulse,
      color: "rose",
      total: "₹4,30,000",
      items: [
        { label: "ICU Charges & Intensive Monitoring", cost: "₹90,000" },
        { label: "Procedure Cost & Stenting / Cath", cost: "₹2,20,000" },
        { label: "Cardiac Medicines & Injectables", cost: "₹40,000" },
        { label: "Diagnostics (Angio, ECG, Labs)", cost: "₹35,000" },
        { label: "Cardiologist Consultation & Follow-up", cost: "₹45,000" },
      ],
      insight: "Advanced cardiac procedures quickly exceed ₹4 Lakh, demonstrating the need for comprehensive ₹10L–₹50L covers.",
    },
  ];

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) {
      setCbError("Please enter both your name and 10-digit mobile number.");
      return;
    }
    if (cbPhone.replace(/\D/g, "").length < 10) {
      setCbError("Please enter a valid 10-digit phone number.");
      return;
    }
    setCbError("");
    setCbSubmitted(true);
  };

  const inclusions = [
    { label: "Hospitalization expenses", desc: "Covers inpatient hospital stays exceeding 24 hours" },
    { label: "ICU charges", desc: "Intensive care unit fees without arbitrary sublimits" },
    { label: "Room rent", desc: "Subject to policy terms; private single rooms" },
    { label: "Surgery costs", desc: "Operation theater, surgeon fees, and anesthesia" },
    { label: "Doctor consultation fees", desc: "Treating physicians and visiting specialist charges" },
    { label: "Diagnostic tests", desc: "Blood work, MRI, CT scans, and pathology during admission" },
    { label: "Medicines during hospitalization", desc: "All approved medications administered in hospital" },
    { label: "Ambulance charges", desc: "Emergency road ambulance coverage to the nearest hospital" },
    { label: "Day care procedures", desc: "Surgeries completed within 24 hours due to technological advances" },
    { label: "Pre-hospitalization expenses", desc: "Diagnostic tests and doctor consultations 30–60 days before admission" },
    { label: "Post-hospitalization expenses", desc: "Follow-up tests and medications 60–180 days after discharge" },
    { label: "Organ donor expenses", desc: "Hospitalization costs incurred by the organ donor (where applicable)" },
    { label: "Modern treatments", desc: "Robotic surgeries, stem cell therapy, and targeted treatments (if covered)" },
    { label: "Domiciliary treatment", desc: "Home treatment when hospital beds are unavailable (subject to conditions)" },
  ];

  const exclusions = [
    { label: "Cosmetic or aesthetic procedures", desc: "Unless reconstructive and medically necessary following an accident" },
    { label: "Experimental or unapproved treatments", desc: "Therapies not recognized by established medical councils" },
    { label: "Self-inflicted injuries", desc: "Harm resulting from intentional self-injury or hazardous adventure sports" },
    { label: "Treatments during applicable waiting periods", desc: "Pre-existing conditions usually have 1 to 3 years waiting periods" },
    { label: "Medical conditions specifically excluded", desc: "Congenital external diseases or conditions excluded by the policy" },
    { label: "Non-medical consumables", desc: "Gloves, sanitizers, and PPE items depending on policy riders" },
  ];

  return (
    <div className="min-h-screen font-sans text-text-primary bg-background relative overflow-x-hidden selection:bg-rose-500/20 selection:text-rose-500">
      {/* Dynamic Ambient Glow Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-rose-500/12 via-emerald-500/10 to-blue-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-rose-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] -right-[10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-6 font-mono">
          <Link href="/" className="hover:text-primary-custom transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-secondary/50" />
          <Link href="/services" className="hover:text-primary-custom transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5 text-text-secondary/50" />
          <span className="text-text-primary">Health Insurance</span>
        </nav>

        {/* ── 1. HERO SECTION ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Hero Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                Certified Health Insurance Advisory • 100% Unbiased
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-text-primary tracking-tight leading-[1.12]">
                Health Insurance: Protect Your Health Without Compromising Your Finances
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl font-bold font-display text-rose-600 dark:text-rose-400">
                Good Health Is Priceless. Quality Healthcare Doesn’t Have to Be Financially Overwhelming.
              </p>

              {/* Narrative */}
              <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                <p>
                  Life is full of unexpected moments. While we hope to stay healthy, illnesses, accidents, and medical emergencies rarely arrive with a warning.
                </p>
                <p>
                  A sudden hospitalization can bring more than emotional stress—it can also create a significant financial burden for you and your family.
                </p>
                <p className="font-semibold text-text-primary">
                  Health insurance helps reduce that burden by covering eligible medical expenses, allowing you to focus on recovery instead of worrying about hospital bills.
                </p>
                <p>
                  At <strong className="text-text-primary">InsurEdge</strong>, we believe choosing health insurance shouldn’t feel confusing or overwhelming. Our platform helps you understand health insurance in simple language and connects you with certified insurance experts who can guide you based on your unique needs.
                </p>
              </div>

              {/* Core Promises Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary bg-surface border border-border-custom px-3 py-2.5 rounded-xl">
                  <Check className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>No complicated jargon</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary bg-surface border border-border-custom px-3 py-2.5 rounded-xl">
                  <Check className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>No sales pressure</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary bg-surface border border-border-custom px-3 py-2.5 rounded-xl">
                  <Check className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Honest expert guidance</span>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#callback-form"
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm sm:text-base text-center transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartPulse className="h-5 w-5" />
                  <span>Find the Right Health Insurance</span>
                </a>
                <Link
                  href="/book-appointment?service=health"
                  className="px-6 py-4 rounded-full bg-surface border border-border-custom hover:border-rose-500/50 text-text-primary font-bold text-sm text-center transition-all hover:bg-surface/80 inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-rose-500" />
                  <span>Schedule Free Expert Call</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Interactive Assessment Form */}
            <div id="callback-form" className="lg:col-span-5 scroll-mt-28">
              <div className="bg-surface/90 backdrop-blur-xl border border-border-custom rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono">
                    Free Consultation
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-1">
                  Find the Right Health Insurance
                </h3>
                <p className="text-xs text-text-secondary mb-6">
                  Get a personalized policy comparison tailored to your family's age, medical history, and budget.
                </p>

                {cbSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-text-primary">
                      Consultation Request Received!
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      Thank you, <strong className="text-text-primary">{cbName}</strong>. A certified health insurance advisor will contact you at <strong className="text-text-primary">{cbPhone}</strong> within 2 hours.
                    </p>
                    <div className="text-[11px] text-text-secondary/70 font-mono pt-1">
                      Target: {cbCoverFor}
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 font-mono">
                        WHO ARE YOU PROTECTING?
                      </label>
                      <select
                        value={cbCoverFor}
                        onChange={(e) => setCbCoverFor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border-custom text-text-primary text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                      >
                        <option value="Self Only (Individual)">Self Only (Individual Plan)</option>
                        <option value="Family (Self + Spouse + Kids)">Family Floater (Self + Spouse + Kids)</option>
                        <option value="Parents / Senior Citizens">Parents / Senior Citizens (Age 55+)</option>
                        <option value="Super Top-Up / Extra Cover">Super Top-Up (Boost Existing Cover)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 font-mono">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Neha Sharma"
                        value={cbName}
                        onChange={(e) => setCbName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border-custom text-text-primary text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1.5 font-mono">
                        10-DIGIT MOBILE NUMBER
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border-custom bg-surface text-text-secondary text-xs sm:text-sm font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="98765 43210"
                          value={cbPhone}
                          onChange={(e) => setCbPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-r-xl bg-background border border-border-custom text-text-primary text-xs sm:text-sm focus:outline-none focus:border-rose-500 font-mono"
                        />
                      </div>
                    </div>

                    {cbError && (
                      <p className="text-xs text-rose-500 flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{cbError}</span>
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-rose-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Request Free Health Advisory Call</span>
                    </button>

                    <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-text-secondary/70">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        100% Unbiased
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-blue-500" />
                        &lt; 2-Hour SLA
                      </span>
                      <span>•</span>
                      <span>Zero Spam</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. WHAT IS HEALTH INSURANCE? ── */}
        <section id="what-is-health-insurance" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Fundamental Concept
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              What is Health Insurance?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Health insurance is a financial protection plan that helps cover eligible medical expenses arising from illnesses, injuries, surgeries, or hospitalization.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Instead of paying the entire hospital bill from your savings, your health insurance policy may cover eligible expenses according to the terms and conditions of your plan.
            </p>
          </div>

          {/* 11 Eligible Covered Expenses Grid */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary mb-1">
                Depending on the policy you choose, health insurance may cover expenses such as:
              </h3>
              <p className="text-xs text-text-secondary">
                Comprehensive policies protect you across the full patient care lifecycle:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { title: "Hospitalization costs", desc: "Inpatient room and hospital infrastructure costs", icon: Building2 },
                { title: "Room rent", desc: "Daily charges for normal and private hospital rooms", icon: Bed },
                { title: "ICU charges", desc: "Critical intensive care unit and life support fees", icon: Activity },
                { title: "Surgery expenses", desc: "Operation theater, surgeon, and surgical equipment", icon: Syringe },
                { title: "Doctor consultation fees", desc: "Visiting specialists, physicians, and rounds", icon: Stethoscope },
                { title: "Diagnostic tests", desc: "Blood panels, X-rays, MRI, CT scans, and pathology", icon: FileCheck },
                { title: "Medicines during hospitalization", desc: "Prescription drugs and IV supplies given during stay", icon: Pill },
                { title: "Day care procedures", desc: "Medical treatments completed in less than 24 hours", icon: Clock },
                { title: "Ambulance charges", desc: "Emergency road transit to the hospital facility", icon: Ambulance },
                { title: "Pre & post-hospitalization", desc: "Tests and medications before admission and after discharge", icon: Layers },
                { title: "Modern treatments", desc: "Robotic surgeries, stem cell therapies (where applicable)", icon: Sparkles },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-background border border-border-custom flex items-start gap-3 hover:border-rose-500/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Takeaway Banner */}
            <div className="mt-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs sm:text-sm text-text-secondary flex items-center gap-2.5">
              <Info className="h-4 w-4 text-rose-500 shrink-0" />
              <span>
                <strong>Important Note:</strong> The exact coverage varies from one policy to another, which is why understanding your options before buying is important.
              </span>
            </div>
          </div>
        </section>

        {/* ── 3. NEHA'S STORY: A REAL FAMILY EXPERIENCE ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="bg-gradient-to-br from-rose-500/5 via-surface to-background border border-rose-500/20 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-lg">
            <div className="max-w-3xl mb-8 space-y-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Real-Life Scenario
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-text-primary">
                Why Health Insurance Matters: A Story Many Families Can Relate To
              </h2>
            </div>

            {/* Story Card */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-8 space-y-6">
              {/* Profile Intro */}
              <div className="flex items-center gap-4 border-b border-border-custom pb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-display font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
                  N
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-text-primary">
                    Meet Neha
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    33 years old • Marketing Professional • Lives with husband &amp; 5-year-old son
                  </p>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                <p>
                  Like many young families, they believed they were healthy enough to postpone buying health insurance. After all, they rarely visited hospitals.
                </p>
                <p>
                  Then one monsoon season, Neha contracted severe dengue. What they expected to be a few days of rest at home quickly turned into an emergency hospitalization.
                </p>
                <p>
                  She spent four days in the hospital. Thankfully, she recovered well. But the final hospital bill came as an even bigger surprise:
                </p>

                {/* Bill Impact Stat Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-background border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">
                      4-Day Hospitalization Expense
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-text-primary">
                      Nearly ₹2.4 Lakh
                    </div>
                  </div>
                  <div className="text-xs text-text-secondary sm:max-w-xs">
                    Depleted emergency reserves built over years, forced them to postpone their family vacation, and delayed scheduled mutual fund investments.
                  </div>
                </div>

                <p>
                  A few weeks later, Neha said something that many families realize only after a medical emergency:
                </p>

                {/* Emotional Quote Callout */}
                <blockquote className="p-5 rounded-2xl bg-rose-500/10 border-l-4 border-rose-500 text-sm sm:text-base font-medium text-text-primary italic">
                  “The hospital bill wasn’t the hardest part. It was watching years of savings disappear in just a few days.”
                </blockquote>

                {/* Moral Takeaway */}
                <div className="pt-2 text-sm sm:text-base font-extrabold text-rose-600 dark:text-rose-400">
                  Health insurance isn’t just about paying hospital bills. It’s about protecting the money you’ve worked so hard to save.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. THE RISING COST OF HEALTHCARE ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="max-w-4xl mb-10 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Economic Reality
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              The Rising Cost of Healthcare
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Healthcare has improved significantly over the years. Hospitals today offer advanced technology, better diagnostics, minimally invasive surgeries, specialized treatments, and improved patient care.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              <strong className="text-text-primary">But these advancements also come with rising costs.</strong> A medical treatment that cost ₹1 lakh several years ago may cost considerably more today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* The 7 Compounding Costs */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-rose-500" />
                <span>Why Common Hospitalizations Become Expensive:</span>
              </h3>
              <p className="text-xs text-text-secondary">
                Medical inflation often rises faster than general inflation, compounding across multiple hospital line items:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-text-primary">
                {[
                  "Room charges & daily nursing supervision",
                  "Specialist doctor consultations & round charges",
                  "Advanced diagnostic tests (scans, MRI, blood panels)",
                  "Medicines, sterile disposables, and injectables",
                  "Surgical procedures & operation theater consumables",
                  "ICU care & continuous vital monitoring",
                  "Follow-up treatments & post-discharge medication",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assets at Risk */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  <span>Without Adequate Health Insurance:</span>
                </h3>
                <p className="text-xs text-text-secondary mb-4">
                  A single emergency hospitalization can severely disrupt your family's core financial foundations:
                </p>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Wallet className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Emergency Savings</div>
                      <div className="text-[11px] text-text-secondary">Hard-earned liquidity drained overnight</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Long-Term Investments</div>
                      <div className="text-[11px] text-text-secondary">Liquidating mutual funds or stocks prematurely</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-primary">Children’s Education &amp; Retirement</div>
                      <div className="text-[11px] text-text-secondary">Compromising milestones planned for decades</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border-custom text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Health insurance helps reduce this financial uncertainty completely.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. REAL HOSPITAL BILLS: UNDERSTANDING THE COST ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="max-w-3xl mb-8 space-y-3">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Itemized Cost Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-text-primary">
              Real Hospital Bills: Understanding the Cost of Medical Care
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              The following examples are for illustration only. Actual medical expenses vary based on the hospital, city, treatment, and individual medical condition.
            </p>
          </div>

          {/* Interactive Bill Selector Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {billExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedExample(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-display transition-all shrink-0 cursor-pointer border ${
                  selectedExample === idx
                    ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                    : "bg-surface border-border-custom text-text-secondary hover:text-text-primary"
                }`}
              >
                {ex.title.split(":")[0]}
              </button>
            ))}
          </div>

          {/* Selected Bill Card */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  {billExamples[selectedExample].tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  {billExamples[selectedExample].title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs font-mono text-text-secondary uppercase tracking-wider block">
                  Estimated Total Expense
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400">
                  {billExamples[selectedExample].total}
                </span>
              </div>
            </div>

            {/* Table of items */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                    <th className="py-2.5 px-3">Expense Category</th>
                    <th className="py-2.5 px-3 text-right">Approximate Cost</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                  {billExamples[selectedExample].items.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-background/50">
                      <td className="py-3 px-3 text-text-primary">{row.label}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-text-secondary">
                        {row.cost}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-rose-500/5 font-bold">
                    <td className="py-3.5 px-3 text-text-primary">Estimated Total</td>
                    <td className="py-3.5 px-3 text-right font-mono text-rose-600 dark:text-rose-400 text-base">
                      {billExamples[selectedExample].total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed italic border-t border-border-custom pt-4">
              💡 {billExamples[selectedExample].insight}
            </p>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-background border border-border-custom text-center">
            <p className="text-xs sm:text-sm font-semibold text-text-primary">
              These examples highlight why planning for healthcare costs is just as important as planning for other financial goals.
            </p>
          </div>
        </section>

        {/* ── 6. HOW HEALTH INSURANCE WORKS ── */}
        <section id="how-it-works" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Step-by-Step Overview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              How Health Insurance Works
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Health insurance may seem complicated at first, but the basic concept is straightforward.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Let’s understand it step by step.
            </p>
          </div>

          {/* 4 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Step 1 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  01
                </div>
                <h3 className="text-base font-bold font-display text-text-primary mb-2">
                  Choose a Suitable Health Insurance Policy
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Select a plan based on your age, family size, healthcare needs, budget, and desired coverage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-600 dark:text-rose-400">
                Tailored matching
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  02
                </div>
                <h3 className="text-base font-bold font-display text-text-primary mb-2">
                  Pay the Premium
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  You pay a premium—usually annually—to keep your policy active and your coverage continuously protected.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-blue-600 dark:text-blue-400">
                Annual / monthly mode
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  03
                </div>
                <h3 className="text-base font-bold font-display text-text-primary mb-2">
                  Stay Protected
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Once your policy becomes active, you’re covered according to its terms, conditions, waiting periods, and exclusions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                Continuous peace of mind
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/40 hover:-translate-y-1 transition-all group shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  04
                </div>
                <h3 className="text-base font-bold font-display text-text-primary mb-2">
                  Receive Medical Treatment
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  If you need hospitalization for a covered medical condition, your policy helps pay eligible medical expenses.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-purple-600 dark:text-purple-400">
                Cashless or Reimbursement
              </div>
            </div>
          </div>

          {/* ── Cashless vs Reimbursement Claims & Network Hospitals ── */}
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border-custom shadow-md space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                  Claims Settlement Process
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  Cashless vs Reimbursement Claims
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  One of the biggest advantages of modern health insurance is that it can help reduce financial stress during hospitalization. Depending on your policy and the hospital, claims are generally settled in two ways:
                </p>
              </div>

              {/* Two Column Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cashless Hospitalization Card */}
                <div className="bg-background border border-emerald-500/30 rounded-2xl p-6 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold font-display text-lg mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Cashless Hospitalization</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                      In a cashless claim, the insurer settles eligible medical expenses directly with the network hospital, according to the policy terms and conditions. You generally don’t need to pay the full hospital bill upfront for covered expenses.
                    </p>
                    <div className="space-y-2.5 text-xs text-text-secondary">
                      <div className="font-bold text-text-primary">Cashless claims are possible when:</div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>The hospital is part of the insurer’s network.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Policy conditions and waiting criteria are met.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Required pre-authorization approvals are completed.</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-border-custom text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    Direct insurer-to-hospital settlement
                  </div>
                </div>

                {/* Reimbursement Claims Card */}
                <div className="bg-background border border-blue-500/30 rounded-2xl p-6 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-bold font-display text-lg mb-3">
                      <FileCheck className="h-5 w-5" />
                      <span>Reimbursement Claims</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                      If treatment is taken at a non-network hospital, or if cashless settlement isn’t available, you may pay the hospital first and later submit eligible documents to the insurer for reimbursement according to the policy.
                    </p>
                    <div className="space-y-2.5 text-xs text-text-secondary">
                      <div className="font-bold text-text-primary">Reimbursement workflow requires:</div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Discharge summary, doctor notes, and treatment details.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Original invoices, pharmacy bills, and diagnostic lab reports.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>Timely submission for insurer claim assessment.</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-3 border-t border-border-custom text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    Pay upfront, submit documentation for reimbursement
                  </div>
                </div>
              </div>

              {/* Cashless vs Reimbursement Comparison Table */}
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary font-mono mb-3">
                  Cashless vs Reimbursement
                </h4>
                <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-2xl border border-border-custom shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[520px]">
                    <thead>
                      <tr className="bg-surface border-b border-border-custom">
                        <th className="p-3.5 sm:p-4 font-bold text-text-primary w-1/3">Aspect</th>
                        <th className="p-3.5 sm:p-4 font-bold text-emerald-600 dark:text-emerald-400 w-1/3">Cashless Claim</th>
                        <th className="p-3.5 sm:p-4 font-bold text-blue-600 dark:text-blue-400 w-1/3">Reimbursement Claim</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom bg-background">
                      <tr className="hover:bg-surface/50 transition-colors">
                        <td className="p-3.5 sm:p-4 font-semibold text-text-primary">Hospital Network</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Available at network hospitals</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Can be used at eligible non-network hospitals</td>
                      </tr>
                      <tr className="hover:bg-surface/50 transition-colors">
                        <td className="p-3.5 sm:p-4 font-semibold text-text-primary">Payment Settlement</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Insurer settles eligible expenses directly with the hospital</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Policyholder pays first and later submits a claim</td>
                      </tr>
                      <tr className="hover:bg-surface/50 transition-colors">
                        <td className="p-3.5 sm:p-4 font-semibold text-text-primary">Financial Burden</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Less immediate financial burden</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Requires documentation for reimbursement</td>
                      </tr>
                      <tr className="hover:bg-surface/50 transition-colors">
                        <td className="p-3.5 sm:p-4 font-semibold text-text-primary">Approval Terms</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Subject to policy terms and insurer approval</td>
                        <td className="p-3.5 sm:p-4 text-text-secondary">Subject to policy terms and claim assessment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 💡 Expert Tip Callout */}
              <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-1.5">
                    <span>💡 Expert Tip</span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    Before purchasing a health insurance policy, check whether your preferred hospitals are part of the insurer’s network. Access to quality healthcare is just as important as the amount of coverage you choose.
                  </p>
                </div>
              </div>

              {/* What Are Network Hospitals? */}
              <div className="pt-4 border-t border-border-custom space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold font-display text-text-primary">
                    What Are Network Hospitals?
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Insurance companies partner with hospitals to offer cashless treatment. These hospitals are known as <strong>network hospitals</strong>. Choosing a policy with a strong hospital network can make planned and emergency hospitalizations more convenient.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-background border border-border-custom space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                      <Home className="h-4 w-4" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-text-primary">Near Your Home</div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Availability of network hospitals near your home for rapid emergency admissions without commuting delays.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border-custom space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-text-primary">Near Your Workplace</div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Hospitals near your workplace for daytime medical assistance or routine specialist consults.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border-custom space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-text-primary">Specialist Centers</div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      Specialist hospitals relevant to your family’s specific healthcare needs (cardiac, oncology, pediatric).
                    </p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed italic">
                  A large hospital network can provide greater flexibility, but the quality and accessibility of hospitals are equally important.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. WHY HEALTH INSURANCE IS MORE THAN JUST HOSPITAL BILLS ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Beyond Medical Bills
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Why Health Insurance Is More Than Just Hospital Bills
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Many people think health insurance simply pays hospital expenses.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              In reality, it plays a much larger role in protecting your financial well-being. Here’s why:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Value 1: Protects Savings */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                  It Protects Your Savings
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  You’ve worked hard to build your savings for a home, your child’s education, retirement, a family vacation, or starting a business. A medical emergency shouldn’t force you to use that money. Health insurance helps preserve your savings for the goals you planned them for.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Wealth Preservation
              </div>
            </div>

            {/* Value 2: Financial Confidence */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                  It Gives You Financial Confidence
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Medical emergencies are stressful enough. Knowing you have financial support allows you to focus on recovery rather than worrying about treatment costs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                Zero Billing Anxiety
              </div>
            </div>

            {/* Value 3: Timely Medical Care */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                  It Encourages Timely Medical Care
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Sometimes people delay treatment because they’re worried about expenses. Health insurance can reduce that financial hesitation, helping you seek medical attention when it’s needed.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                No Hesitation in Emergencies
              </div>
            </div>

            {/* Value 4: Unexpected Emergencies */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                  It Helps During Unexpected Emergencies
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Accidents and illnesses don’t follow a schedule. Health insurance provides a financial safety net for situations that cannot always be predicted.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                24/7 Safety Net
              </div>
            </div>

            {/* Value 5: Supports Family */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 hover:border-rose-500/40 hover:-translate-y-1 transition-all group shadow-sm md:col-span-2 lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary mb-2.5">
                  It Supports Your Family
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  If a family member requires hospitalization, the financial impact affects everyone—not just the patient. Health insurance helps reduce that burden so your loved ones can focus on providing care and support.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border-custom text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">
                Multi-Generational Shield
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. TYPES OF HEALTH INSURANCE PLANS (FROM USER DOCUMENT) ── */}
        <section id="types-of-plans" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Plan Categories &amp; Options
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Types of Health Insurance Plans
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Health insurance isn’t a one-size-fits-all product.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              The right plan depends on your age, family size, health conditions, financial responsibilities, and future healthcare needs. Understanding the different types of health insurance plans can help you make a more informed decision before speaking with an insurance expert. Let’s explore the most common options.
            </p>
          </div>

          {/* 8 Plan Types Detailed Cards */}
          <div className="space-y-10 mb-16">
            {/* 1. Individual Health Insurance */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-sm hover:border-rose-500/40 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      Option 01
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                      1. Individual Health Insurance
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono w-fit">
                  Dedicated Sum Insured
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                <p className="text-sm sm:text-base text-text-primary font-medium">
                  An Individual Health Insurance plan covers a single person under the policy. Each insured person receives their own sum insured, which means the coverage is not shared with anyone else.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono mb-3">
                      Best Suited For:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>Young professionals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>Individuals living independently</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>First-time insurance buyers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>Self-employed professionals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        <span>People who prefer separate coverage for each family member</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono mb-3">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2 text-text-primary font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Dedicated sum insured</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Coverage tailored to one individual</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Easier to customize riders and benefits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>No sharing of benefits with family members</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Example Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary block font-semibold mb-1">
                  Example:
                </strong>
                Priya purchases an Individual Health Insurance policy with a sum insured of ₹10 lakh. If she requires hospitalization for a covered illness, eligible medical expenses are paid from her own ₹10 lakh cover. Her policy remains independent of anyone else’s healthcare expenses.
              </div>
            </div>

            {/* 2. Family Floater Health Insurance */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-sm hover:border-emerald-500/40 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Option 02
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                      2. Family Floater Health Insurance
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono w-fit">
                  Shared Sum Insured
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                <p className="text-sm sm:text-base text-text-primary font-medium">
                  A Family Floater plan covers multiple family members under one policy using a shared sum insured. Instead of purchasing separate policies for each family member, everyone is covered under a single plan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono mb-3">
                      Typically Covers:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>You (Primary Insured)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Your spouse</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Dependent children</span>
                      </li>
                      <li className="text-[11px] text-text-secondary/80 italic pt-1">
                        *(Some insurers may also allow parents or other family members, depending on the policy.)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono mb-3">
                      Best Suited For:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>Young families</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>Married couples</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>Parents with children</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>Families looking for cost-effective protection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Example Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed mb-6">
                <strong className="text-text-primary block font-semibold mb-1">
                  Example:
                </strong>
                A family purchases a ₹20 lakh Family Floater plan. If one member requires hospitalization and uses ₹4 lakh, the remaining shared coverage available for the rest of the family becomes ₹16 lakh for the policy year.
              </div>

              {/* Individual vs Family Floater Comparison Table */}
              <div className="p-5 sm:p-6 rounded-2xl bg-background/80 border border-border-custom">
                <h4 className="text-sm font-bold font-display text-text-primary mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-500" />
                  <span>Individual vs Family Floater Comparison</span>
                </h4>
                <div className="overflow-x-auto -mx-5 sm:mx-0">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                        <th className="py-2.5 px-3">Feature</th>
                        <th className="py-2.5 px-3 text-rose-600 dark:text-rose-400">Individual Plan</th>
                        <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">Family Floater Plan</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Number of People Covered</td>
                        <td className="py-3 px-3 text-text-secondary">One</td>
                        <td className="py-3 px-3 text-text-secondary">Multiple</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Sum Insured</td>
                        <td className="py-3 px-3 text-text-secondary">Separate for each person</td>
                        <td className="py-3 px-3 text-text-secondary">Shared among all insured members</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Premium</td>
                        <td className="py-3 px-3 text-text-secondary">Usually higher for multiple separate policies</td>
                        <td className="py-3 px-3 text-text-secondary">Often more economical for families</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Best For</td>
                        <td className="py-3 px-3 text-text-secondary">Individuals</td>
                        <td className="py-3 px-3 text-text-secondary">Families</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Flexibility</td>
                        <td className="py-3 px-3 text-text-secondary">High (independent claims)</td>
                        <td className="py-3 px-3 text-text-secondary">Shared coverage pool</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-border-custom text-xs text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">Which Should You Choose?</strong> An Individual plan may be suitable if you want separate coverage for each person or have family members with significantly different healthcare needs. A Family Floater plan may be a practical choice for younger families looking for comprehensive protection under one policy. The right choice depends on your family’s age, health profile, and healthcare requirements.
                </div>
              </div>
            </div>

            {/* 3. Senior Citizen Health Insurance */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-sm hover:border-amber-500/40 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Option 03
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                      3. Senior Citizen Health Insurance
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono w-fit">
                  Ages 60+
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                <p className="text-sm sm:text-base text-text-primary font-medium">
                  Healthcare needs often increase with age. Senior Citizen Health Insurance plans are designed specifically for older adults, typically aged 60 years and above (eligibility varies by insurer).
                </p>
                <p>
                  These plans may offer coverage for age-related medical conditions, though policy terms, waiting periods, co-payments, and exclusions often differ from standard health insurance plans.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono mb-3">
                      Best Suited For:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Parents</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Retired individuals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Senior citizens</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>Families looking to insure elderly parents</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono mb-3">
                      Key Things to Consider:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Waiting periods for pre-existing conditions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Co-payment clauses (10%–20% cost sharing)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Network hospitals with geriatric care</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Coverage limits &amp; room rent caps</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <span>Premium affordability upon renewals</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                  Since healthcare needs can vary significantly among senior citizens, comparing plans carefully is especially important.
                </div>
              </div>
            </div>

            {/* 4. Critical Illness Insurance */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-sm hover:border-purple-500/40 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-custom pb-6 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Option 04
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                      4. Critical Illness Insurance
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono w-fit">
                  Lump-Sum Benefit
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                <p className="text-sm sm:text-base text-text-primary font-medium">
                  Critical Illness Insurance is different from regular health insurance. Instead of reimbursing hospital bills, these plans generally provide a lump-sum benefit if you’re diagnosed with one of the covered critical illnesses and meet the policy conditions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary font-mono mb-3">
                      Common Covered Illnesses Include:
                    </h4>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Certain types of cancer</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Heart attack (Myocardial Infarction)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Stroke resulting in permanent symptoms</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Kidney failure requiring regular dialysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        <span>Major organ transplant</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono mb-3">
                      Lump-Sum Payout Can Be Used For:
                    </h4>
                    <ul className="space-y-2 text-text-primary font-medium">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-500 shrink-0" />
                        <span>Advanced specialized medical treatment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-500 shrink-0" />
                        <span>Monthly household running expenses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-500 shrink-0" />
                        <span>Loan repayments and EMIs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-purple-500 shrink-0" />
                        <span>Income replacement during extended recovery</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-text-primary">
                  <strong className="text-purple-600 dark:text-purple-400">Important:</strong> Critical Illness Insurance is generally intended to complement—not replace—a comprehensive health insurance policy.
                </div>
              </div>

              {/* Health Insurance vs Critical Illness Comparison Table */}
              <div className="p-5 sm:p-6 rounded-2xl bg-background/80 border border-border-custom">
                <h4 className="text-sm font-bold font-display text-text-primary mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-500" />
                  <span>Health Insurance vs Critical Illness Insurance</span>
                </h4>
                <div className="overflow-x-auto -mx-5 sm:mx-0">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                        <th className="py-2.5 px-3">Feature</th>
                        <th className="py-2.5 px-3 text-rose-600 dark:text-rose-400">Health Insurance</th>
                        <th className="py-2.5 px-3 text-purple-600 dark:text-purple-400">Critical Illness Insurance</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Coverage Type</td>
                        <td className="py-3 px-3 text-text-secondary">Covers eligible hospitalization expenses</td>
                        <td className="py-3 px-3 text-text-secondary">Pays a lump sum on diagnosis of covered critical illnesses</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Claim Frequency</td>
                        <td className="py-3 px-3 text-text-secondary">Can be used multiple times within policy conditions</td>
                        <td className="py-3 px-3 text-text-secondary">Benefit is typically paid once for a covered illness</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Suitability</td>
                        <td className="py-3 px-3 text-text-secondary">Suitable for routine hospitalization</td>
                        <td className="py-3 px-3 text-text-secondary">Suitable for major life-altering illnesses</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-text-primary">Financial Role</td>
                        <td className="py-3 px-3 text-text-secondary">Helps with hospital &amp; doctor medical expenses</td>
                        <td className="py-3 px-3 text-text-secondary">Provides financial flexibility beyond medical bills</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-secondary mt-3 italic">
                  Many people choose to have both, as they serve fundamentally different protective purposes.
                </p>
              </div>
            </div>

            {/* 5. Top-up Health Insurance & 6. Super Top-up Health Insurance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top-up */}
              <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <PlusCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Option 05
                      </span>
                      <h3 className="text-lg font-bold font-display text-text-primary">
                        5. Top-up Health Insurance
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    A Top-up Health Insurance plan provides additional coverage once your medical expenses exceed a specified deductible. Think of it as an extra layer of financial protection.
                  </p>

                  <div className="p-4 rounded-xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed space-y-1">
                    <strong className="text-text-primary block font-semibold mb-1">Example:</strong>
                    <div>• Base Health Insurance: ₹10 lakh</div>
                    <div>• Top-up Plan: ₹20 lakh</div>
                    <div>• Deductible: ₹10 lakh</div>
                    <p className="pt-2 text-text-primary">
                      If your eligible single hospitalization expenses exceed ₹10 lakh, the Top-up plan begins contributing according to its terms. Top-up plans offer higher overall coverage at a relatively affordable premium.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-xs font-mono text-blue-600 dark:text-blue-400">
                  Deductible per single claim
                </div>
              </div>

              {/* Super Top-up */}
              <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-teal-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        Option 06
                      </span>
                      <h3 className="text-lg font-bold font-display text-text-primary">
                        6. Super Top-up Health Insurance
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    A Super Top-up plan works similarly to a Top-up plan but considers the <strong className="text-text-primary">total eligible medical expenses accumulated during the policy year</strong> rather than a single hospitalization.
                  </p>

                  <div className="p-4 rounded-xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed space-y-1">
                    <strong className="text-text-primary block font-semibold mb-1">Best Suited For:</strong>
                    <div>• Families seeking higher overall coverage (e.g. ₹50L or ₹1 Cr cover)</div>
                    <div>• Individuals concerned about rising healthcare costs</div>
                    <div>• People who already have a base employer or personal policy</div>
                  </div>

                  <p className="text-xs text-text-secondary">
                    This distinction makes Super Top-up plans particularly useful for people who may face multiple hospitalizations within the same year.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-xs font-mono text-teal-600 dark:text-teal-400">
                  Cumulative annual deductible
                </div>
              </div>
            </div>

            {/* Top-up vs Super Top-up Table */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border-custom">
              <h4 className="text-sm font-bold font-display text-text-primary mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                <span>Top-up vs Super Top-up Comparison</span>
              </h4>
              <div className="overflow-x-auto -mx-5 sm:mx-0">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                      <th className="py-2.5 px-3">Feature</th>
                      <th className="py-2.5 px-3 text-blue-600 dark:text-blue-400">Top-up</th>
                      <th className="py-2.5 px-3 text-teal-600 dark:text-teal-400">Super Top-up</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Deductible applies to</td>
                      <td className="py-3 px-3 text-text-secondary">A single hospitalization</td>
                      <td className="py-3 px-3 text-text-secondary">Total eligible hospitalization expenses during the policy year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Suitable for</td>
                      <td className="py-3 px-3 text-text-secondary">One major hospitalization</td>
                      <td className="py-3 px-3 text-text-secondary">Multiple hospitalizations in a year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Purpose</td>
                      <td className="py-3 px-3 text-text-secondary">Additional protection</td>
                      <td className="py-3 px-3 text-text-secondary">Broader long-term financial protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7. Personal Accident Insurance & 8. Maternity Health Insurance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Accident Insurance */}
              <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Car className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        Option 07
                      </span>
                      <h3 className="text-lg font-bold font-display text-text-primary">
                        7. Personal Accident Insurance
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Health insurance and Personal Accident Insurance are often confused, but they serve different purposes. Personal Accident Insurance provides financial protection against injuries resulting from accidents.
                  </p>

                  <div className="p-4 rounded-xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed space-y-1.5">
                    <strong className="text-text-primary block font-semibold mb-1">Key Benefits:</strong>
                    <div>• Accidental death benefit (100% sum insured to nominee)</div>
                    <div>• Permanent total disability (PTD)</div>
                    <div>• Permanent partial disability (PPD)</div>
                    <div>• Temporary total disability (weekly cash allowance)</div>
                    <div>• Educational benefit for children &amp; ambulance expenses</div>
                  </div>

                  <div className="text-xs text-text-secondary">
                    <strong className="text-text-primary block mb-1">Who Should Consider It?</strong>
                    Salaried professionals, self-employed, business owners, frequent commuters/travelers, and individuals in higher-risk occupations.
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  Accident-specific financial security
                </div>
              </div>

              {/* Maternity Health Insurance */}
              <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-pink-500/40 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Baby className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                        Option 08
                      </span>
                      <h3 className="text-lg font-bold font-display text-text-primary">
                        8. Maternity Health Insurance
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Planning to start or grow your family? Some health insurance plans include maternity benefits or offer them as optional add-on features.
                  </p>

                  <div className="p-4 rounded-xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed space-y-1.5">
                    <strong className="text-text-primary block font-semibold mb-1">Covered Eligible Expenses:</strong>
                    <div>• Childbirth (normal delivery &amp; C-section)</div>
                    <div>• Hospitalization during delivery</div>
                    <div>• Certain newborn medical expenses &amp; vaccinations</div>
                    <div>• Pre-natal and delivery-related clinical procedures</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-800 dark:text-pink-300">
                    <strong>Important:</strong> Most maternity benefits are subject to waiting periods (typically 9 months to 3 years). If you’re planning a family in the future, it’s worth exploring these options well in advance.
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-custom text-xs font-mono text-pink-600 dark:text-pink-400">
                  Family planning protection
                </div>
              </div>
            </div>

            {/* Health Insurance vs Personal Accident Table */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-border-custom">
              <h4 className="text-sm font-bold font-display text-text-primary mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-500" />
                <span>Health Insurance vs Personal Accident Insurance</span>
              </h4>
              <div className="overflow-x-auto -mx-5 sm:mx-0">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                      <th className="py-2.5 px-3">Feature</th>
                      <th className="py-2.5 px-3 text-rose-600 dark:text-rose-400">Health Insurance</th>
                      <th className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400">Personal Accident Insurance</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Scope of Protection</td>
                      <td className="py-3 px-3 text-text-secondary">Covers eligible medical expenses due to illnesses and injuries</td>
                      <td className="py-3 px-3 text-text-secondary">Focuses on financial protection against accidental injuries and disability</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Trigger Event</td>
                      <td className="py-3 px-3 text-text-secondary">Includes hospitalization for covered illnesses</td>
                      <td className="py-3 px-3 text-text-secondary">Primarily covers accident-related events</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold text-text-primary">Nature of Plan</td>
                      <td className="py-3 px-3 text-text-secondary">Broad healthcare coverage</td>
                      <td className="py-3 px-3 text-text-secondary">Accident-specific protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-text-secondary mt-3 italic">
                Many people choose both to create a more comprehensive financial safety net.
              </p>
            </div>
          </div>

          {/* ── WHICH HEALTH INSURANCE PLAN IS RIGHT FOR YOU? ── */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-16 shadow-lg">
            <div className="max-w-3xl mb-8 space-y-3">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Quick Selection Guide
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Which Health Insurance Plan Is Right for You?
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Every stage of life brings different healthcare needs. Here’s a simple guide:
              </p>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0 mb-6">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-border-custom text-xs font-mono font-bold uppercase text-text-secondary">
                    <th className="py-3 px-4">If You Are…</th>
                    <th className="py-3 px-4 text-rose-600 dark:text-rose-400">You May Consider Exploring</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm divide-y divide-border-custom">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Starting your career</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Individual Health Insurance</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Newly married</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Individual or Family Floater</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Parents with young children</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Family Floater</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Caring for elderly parents</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Senior Citizen Health Insurance</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Looking for additional protection</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Top-up or Super Top-up</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Concerned about major illnesses</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Critical Illness Insurance</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Wanting accident-specific protection</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Personal Accident Insurance</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-text-primary">Planning a family</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-text-secondary">Health Insurance with Maternity Benefits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-text-secondary italic">
              Remember, these are general examples. The right choice depends on your personal circumstances and should be evaluated carefully.
            </p>
          </div>

          {/* ── HEALTH INSURANCE THROUGH DIFFERENT LIFE STAGES ── */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-16 shadow-lg">
            <div className="max-w-3xl mb-10 space-y-3">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Lifecycle Roadmap
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Health Insurance Through Different Life Stages
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your healthcare needs change as your life changes. Here is how your policy should evolve over time:
              </p>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border-custom before:hidden sm:before:block">
              {/* Stage 1: 20s */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-rose-500/30 bg-surface z-10">
                  20s
                </div>
                <div className="flex-1 bg-background border border-border-custom rounded-2xl p-5 hover:border-rose-500/40 transition-colors">
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    In Your 20s
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Buy your first health insurance policy.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Lock in coverage while you’re young, healthy, and premiums are lowest.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Build a habit of continuous insurance coverage and exhaust waiting periods early.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stage 2: 30s */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-blue-500/30 bg-surface z-10">
                  30s
                </div>
                <div className="flex-1 bg-background border border-border-custom rounded-2xl p-5 hover:border-blue-500/40 transition-colors">
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    In Your 30s
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>Get married and combine coverage.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>Review whether a Family Floater plan is suitable.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>Increase your sum insured if your family responsibilities grow.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stage 3: Late 30s & 40s */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-teal-500/30 bg-surface z-10">
                  40s
                </div>
                <div className="flex-1 bg-background border border-border-custom rounded-2xl p-5 hover:border-teal-500/40 transition-colors">
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    In Your Late 30s and 40s
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>Plan for growing children’s healthcare and dental needs.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>Consider significantly higher overall coverage (₹25L–₹50L).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>Explore cost-effective Top-up or Super Top-up plans.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>Evaluate Critical Illness protection against lifestyle ailments.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stage 4: 50s */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-purple-500/30 bg-surface z-10">
                  50s
                </div>
                <div className="flex-1 bg-background border border-border-custom rounded-2xl p-5 hover:border-purple-500/40 transition-colors">
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    In Your 50s
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>Review your existing policy regularly for room rent caps or deductions.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>Ensure your coverage keeps pace with rising medical inflation.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                      <span>Reassess healthcare needs based on lifestyle changes and chronic conditions.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stage 5: 60s & Beyond */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-amber-500/30 bg-surface z-10">
                  60+
                </div>
                <div className="flex-1 bg-background border border-border-custom rounded-2xl p-5 hover:border-amber-500/40 transition-colors">
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    In Your 60s and Beyond
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>Continue maintaining health insurance without breaks, if possible.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>Review coverage for age-related healthcare needs (joint replacements, cardiology).</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>Understand policy renewability, co-payments, and waiting period implications.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Philosophy Banner */}
            <div className="mt-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
              <p className="text-sm sm:text-base font-bold text-text-primary">
                Health insurance isn’t a purchase you make once and forget. It should evolve as your life and healthcare needs evolve.
              </p>
            </div>
          </div>

          {/* 💡 EXPERT TIP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h4>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  Don’t choose a health insurance plan simply because a friend or colleague has it. The right policy depends on your age, family size, health conditions, budget, and future healthcare needs. A plan that’s ideal for one family may not be the best fit for another.
                </p>
              </div>
            </div>
          </div>

          {/* NOT SURE WHICH PLAN IS RIGHT FOR YOU? CALLOUT BANNER */}
          <div className="p-6 sm:p-10 rounded-3xl bg-surface border border-border-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Personalized Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                Not Sure Which Plan Is Right for You?
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                With so many policy types, features, and insurers available, it’s natural to feel uncertain. That’s where expert guidance can make all the difference.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                At <strong className="text-text-primary">InsurEdge</strong>, we help you understand the options and connect you with certified insurance experts who can explain policy features in simple language, compare plans from multiple insurers, and help you identify coverage that aligns with your healthcare needs and financial goals.
              </p>
            </div>
            <a
              href="#callback-form"
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 shrink-0 inline-flex items-center gap-2 cursor-pointer"
            >
              <HeartPulse className="h-4 w-4" />
              <span>Find the Right Health Insurance</span>
            </a>
          </div>
        </section>

        {/* ── 9. HOW MUCH HEALTH INSURANCE COVER DO YOU NEED? ── */}
        <section id="how-much-cover" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Coverage Sizing Guide
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              How Much Health Insurance Cover Do You Need?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              One of the most common questions people ask is: <strong className="text-text-primary">“How much health insurance is enough?”</strong>
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              The honest answer is that there isn’t a single amount that’s right for everyone. The ideal health insurance cover depends on several factors, including your age, where you live, your family size, your lifestyle, existing medical conditions, and the quality of healthcare you want to access.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium text-text-primary">
              Rather than choosing the lowest premium or the highest sum insured, it’s better to select coverage that reflects your actual healthcare needs.
            </p>
          </div>

          {/* Factors That Influence the Right Coverage - Interactive 7 Questions */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-10 shadow-lg">
            <div className="max-w-3xl mb-8 space-y-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Self-Assessment Framework
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                Factors That Influence the Right Coverage
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Before deciding on a policy, consider these critical questions. Click any question below to see why it matters for your sum insured:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  q: "How many family members need coverage?",
                  detail: "Single individuals can comfortably start with ₹5L–₹10L individual covers. Couples and young families generally require ₹15L–₹25L+ floaters to ensure coverage isn't depleted by a single admission.",
                },
                {
                  id: 2,
                  q: "Do you live in a metro city where healthcare costs are higher?",
                  detail: "Private hospital room rents and surgical packages in Tier-1 metros (Delhi NCR, Mumbai, Bengaluru) are 40%–60% higher than non-metros, requiring a minimum ₹15L–₹25L base.",
                },
                {
                  id: 3,
                  q: "Do you have aging parents who may require frequent care?",
                  detail: "Senior parents often face recurring age-related treatments. Placing them on a separate Senior Citizen plan protects your primary family floater's No Claim Bonus.",
                },
                {
                  id: 4,
                  q: "Do you already have health insurance through your employer?",
                  detail: "Employer group covers are valuable but usually capped at ₹3L–₹5L and terminate if you switch jobs or retire. A personal base policy or Super Top-up guarantees lifelong security.",
                },
                {
                  id: 5,
                  q: "Do you have sufficient emergency savings?",
                  detail: "If liquid cash is modest, higher health insurance cover shields your hard-earned mutual fund investments and family savings from sudden medical liquidation.",
                },
                {
                  id: 6,
                  q: "Are there any existing medical conditions in your family?",
                  detail: "Pre-existing ailments (diabetes, hypertension) require policies with shorter waiting periods (1–2 years) and no restrictive room-rent or treatment sub-limits.",
                },
                {
                  id: 7,
                  q: "Would you prefer treatment at private hospitals?",
                  detail: "Top private multi-specialty chains require zero room rent capping policies with direct cashless empaneled billing.",
                },
              ].map((item) => {
                const isOpen = activeQuestion === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveQuestion(isOpen ? null : item.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isOpen
                        ? "bg-rose-500/5 border-rose-500 shadow-md"
                        : "bg-background border-border-custom hover:border-rose-500/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {item.id}
                        </span>
                        <div className="font-bold text-xs sm:text-sm text-text-primary">
                          {item.q}
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-text-secondary shrink-0 transition-transform ${
                          isOpen ? "rotate-90 text-rose-500" : ""
                        }`}
                      />
                    </div>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-border-custom text-xs text-text-secondary leading-relaxed"
                      >
                        {item.detail}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-text-secondary italic">
              The answers to these questions help determine the level of protection that may be appropriate for your situation.
            </p>
          </div>

          {/* General Coverage Examples Profile Table */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-8 shadow-lg">
            <div className="max-w-3xl mb-6 space-y-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Illustrative Scenarios
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                General Coverage Examples
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                These examples are illustrative only and should not be treated as recommendations:
              </p>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-2xl border border-border-custom shadow-sm mb-6">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[540px]">
                <thead>
                  <tr className="bg-surface border-b border-border-custom">
                    <th className="p-4 font-bold text-text-primary w-1/3">Profile</th>
                    <th className="p-4 font-bold text-text-primary w-2/3">Things to Consider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom bg-background">
                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-bold text-text-primary flex items-center gap-2">
                      <User className="h-4 w-4 text-rose-500" />
                      <span>Young individual</span>
                    </td>
                    <td className="p-4 text-text-secondary leading-relaxed">
                      Existing employer cover, future healthcare needs, city of residence
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-bold text-text-primary flex items-center gap-2">
                      <HeartHandshake className="h-4 w-4 text-pink-500" />
                      <span>Married couple</span>
                    </td>
                    <td className="p-4 text-text-secondary leading-relaxed">
                      Family planning, shared healthcare expenses, long-term financial goals
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-bold text-text-primary flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>Family with children</span>
                    </td>
                    <td className="p-4 text-text-secondary leading-relaxed">
                      Children’s healthcare, inflation, rising hospitalization costs
                    </td>
                  </tr>
                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="p-4 font-bold text-text-primary flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-amber-500" />
                      <span>Senior citizens</span>
                    </td>
                    <td className="p-4 text-text-secondary leading-relaxed">
                      Age-related healthcare needs, existing medical conditions, policy features
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border-custom text-center">
              <p className="text-xs sm:text-sm font-semibold text-text-primary">
                Every family is different. The best way to determine suitable coverage is to discuss your healthcare needs with a certified insurance expert.
              </p>
            </div>
          </div>

          {/* 💡 EXPERT TIP: 5-10 YEAR INFLATION */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  Healthcare costs don’t remain the same year after year. When choosing your coverage, think about what treatment may cost five or ten years from now—not just today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. UNDERSTANDING WAITING PERIODS & PRE-EXISTING DISEASES ── */}
        <section id="waiting-periods" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Policy Timing &amp; Eligibility
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Understanding Waiting Periods
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              One of the most misunderstood aspects of health insurance is the waiting period.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Many people assume that every medical condition is covered immediately after buying a policy. That’s not always the case.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              A <strong>waiting period</strong> is the time you must wait before certain benefits become available under your policy. Different insurers apply different waiting periods, so always read the policy wording carefully.
            </p>
          </div>

          {/* 4 Common Types of Waiting Periods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Type 1 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  Initial Waiting Period
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Many health insurance policies have an initial waiting period (typically 30 days, except for accidents) before certain claims become eligible.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-text-secondary">
                Accidents covered from Day 1
              </div>
            </div>

            {/* Type 2 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  Pre-existing Diseases Period
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  If you already have a medical condition before purchasing the policy, coverage for that condition usually begins only after completing the specified waiting period (1–3 years) mentioned in the policy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-text-secondary">
                Continuous coverage required
              </div>
            </div>

            {/* Type 3 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  Disease-Specific Waiting Period
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Some illnesses and slow-developing treatments (such as cataract, hernia, joint replacements, and kidney stones) may have separate waiting periods (typically 2 years) depending on the insurer and policy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-text-secondary">
                Specific medical conditions
              </div>
            </div>

            {/* Type 4 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <h4 className="text-base font-bold font-display text-text-primary">
                  Maternity Waiting Period
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Health insurance plans that include maternity benefits often require a waiting period (ranging from 9 months to 36 months) before maternity-related claims become eligible.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-text-secondary">
                Plan ahead for family
              </div>
            </div>
          </div>

          {/* Why Waiting Periods Matter */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 mb-8 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-3">
              Why Waiting Periods Matter
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
              Understanding waiting periods before purchasing a policy helps you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-text-primary">Set realistic expectations</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-text-primary">Compare policies more effectively</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-text-primary">Avoid surprises during claims</span>
              </div>
              <div className="p-4 rounded-xl bg-background border border-border-custom flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-text-primary">Plan healthcare expenses better</span>
              </div>
            </div>
          </div>

          {/* 💡 EXPERT TIP: BUY BEFORE DIAGNOSIS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  Health insurance works best when purchased before you need medical treatment. Buying a policy after a diagnosis may mean certain conditions are subject to waiting periods or other policy terms.
                </p>
              </div>
            </div>
          </div>

          {/* What Are Pre-existing Diseases? & Honest Disclosure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PED Definitions & Examples */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block mb-2">
                  Medical Context
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-3">
                  What Are Pre-existing Diseases?
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  A <strong>pre-existing disease (PED)</strong> is generally a medical condition, illness, injury, or health issue that existed before purchasing your health insurance policy.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-bold text-text-primary">Examples may include:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border-custom">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Diabetes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border-custom">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>High blood pressure</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border-custom">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Thyroid disorders</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border-custom">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Asthma</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border-custom sm:col-span-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>Heart conditions</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-text-secondary italic pt-3 border-t border-border-custom">
                * Each insurer defines pre-existing diseases according to its policy wording.
              </div>
            </div>

            {/* Why Honest Disclosure Is Important */}
            <div className="bg-surface border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block mb-2">
                  Claim Protection
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary mb-3">
                  Why Honest Disclosure Is Important
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  When applying for health insurance, always honestly disclose:
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    "Existing illnesses and ongoing symptoms",
                    "Previous surgeries and hospital admissions",
                    "Ongoing medications and regular prescriptions",
                    "Complete family medical history",
                    "Lifestyle habits (smoking, alcohol) if requested",
                  ].map((disc, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-text-primary">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{disc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-text-primary leading-relaxed font-semibold">
                Providing complete and accurate information helps reduce the possibility of claim-related disputes later. Being transparent protects both you and your family.
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. CRUCIAL POLICY FEATURES & FINE PRINT ── */}
        <section id="policy-features" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              The Fine Print
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Critical Policy Clauses You Must Know
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Health insurance policies have specific clauses that directly dictate your out-of-pocket expenses during a hospital claim.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Evaluating these four core clauses before buying guarantees there are no unpleasant billing surprises when you need medical care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Clause 1: Room Rent Limits */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Bed className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      Understanding Room Rent Limits
                    </h3>
                    <div className="text-xs text-text-secondary font-mono">Room Eligibility &amp; Sublimits</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Some health insurance policies specify limits on the type or cost of hospital room that can be chosen. For example, a policy may allow:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 font-bold" />
                    <span><strong>Any room category:</strong> Full freedom with zero room-rent capping.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-blue-500 shrink-0 font-bold" />
                    <span><strong>A private single room:</strong> Up to private AC room category.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 font-bold" />
                    <span><strong>A room up to a specified daily limit:</strong> e.g., 1% of Sum Insured/day.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-text-primary leading-relaxed font-medium">
                  <strong>The Proportional Deduction Risk:</strong> Choosing a room beyond the permitted limit may affect how all associated surgical, nursing, and doctor fees are calculated under the policy. Always understand the room eligibility mentioned in your policy before purchasing.
                </div>
              </div>
            </div>

            {/* Clause 2: What Is Co-payment? (With Interactive Calculator) */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      What Is Co-payment?
                    </h3>
                    <div className="text-xs text-text-secondary font-mono">Shared Financial Obligation</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  A <strong>co-payment</strong> (often called co-pay) is the portion of eligible medical expenses that the policyholder agrees to pay, while the insurer pays the remaining eligible amount according to the policy.
                </p>

                {/* Interactive Co-Payment Example Box */}
                <div className="p-4 rounded-2xl bg-background border border-border-custom space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-text-primary">Claim Example:</span>
                    <span className="font-mono font-bold text-rose-500">₹2,00,000</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-secondary">Co-pay clause:</span>
                    <div className="flex gap-1.5">
                      {[0, 10, 20].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => setCopayPercent(pct)}
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            copayPercent === pct
                              ? "bg-rose-500 text-white"
                              : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border-custom text-xs">
                    <div className="p-2.5 rounded-lg bg-surface border border-border-custom">
                      <div className="text-[11px] text-text-secondary">You Pay (Co-pay)</div>
                      <div className="text-sm font-extrabold font-mono text-rose-600 dark:text-rose-400">
                        ₹{((200000 * copayPercent) / 100).toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface border border-border-custom">
                      <div className="text-[11px] text-text-secondary">Insurer Pays</div>
                      <div className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                        ₹{(200000 - (200000 * copayPercent) / 100).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  <em>Example:</em> If your policy has a <strong>10% co-payment clause</strong> and an eligible claim is ₹2 lakh, you may be responsible for paying ₹20,000, while the remaining eligible amount (₹1,80,000) is handled according to the policy terms.
                </p>

                <p className="text-xs text-text-secondary font-medium">
                  Not all health insurance plans include co-payment clauses, so it’s important to compare this feature while evaluating policies.
                </p>
              </div>
            </div>

            {/* Clause 3: What Is a Restoration Benefit? */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      What Is a Restoration Benefit?
                    </h3>
                    <div className="text-xs text-text-secondary font-mono">Automatic Sum Insured Refill</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Some health insurance policies offer a <strong>Restoration Benefit</strong>. This feature restores the sum insured after it has been exhausted under specified conditions during the policy year.
                </p>

                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>The exact rules (same illness vs unrelated illness) vary by insurer.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Restoration can be especially useful for families where more than one member may require hospitalization during the same policy year.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Ensures your family isn't left unprotected for the remaining months of the policy year.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-text-primary">
                  Essential feature to look for in Family Floater policies.
                </div>
              </div>
            </div>

            {/* Clause 4: What Is a No Claim Bonus (NCB)? */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      What Is a No Claim Bonus (NCB)?
                    </h3>
                    <div className="text-xs text-text-secondary font-mono">Rewards for Healthy Claim-Free Years</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Many insurers reward policyholders for claim-free years through a <strong>No Claim Bonus (NCB)</strong>. Depending on the policy, this benefit may:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-purple-500 shrink-0" />
                    <span><strong>Increase the sum insured:</strong> Multiplies your cover by 10% to 50% per claim-free year (up to 100%–500%) at zero extra premium.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-purple-500 shrink-0" />
                    <span><strong>Reduce the premium:</strong> Discounts the annual renewal premium payable.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border-custom flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-purple-500 shrink-0" />
                    <span><strong>Offer another reward:</strong> Health checkup vouchers or wellness credits specified in the policy.</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed font-medium">
                  The structure of No Claim Bonus differs across insurers, making it an important factor to compare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. UNDERSTANDING POLICY EXCLUSIONS (WHAT IS COVERED VS NOT COVERED) ── */}
        <section id="inclusions-exclusions" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Policy Clarity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Understanding Policy Exclusions
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Every health insurance policy covers certain medical expenses and excludes others.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Understanding exclusions is just as important as understanding benefits. Knowing both before buying sets realistic expectations and eliminates surprises during claims.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Inclusions Card */}
            <div className="bg-surface border border-emerald-500/30 rounded-3xl p-6 sm:p-8 relative shadow-lg">
              <div className="flex items-center gap-2.5 mb-6 text-emerald-600 dark:text-emerald-400 font-display font-extrabold text-xl">
                <CheckCircle2 className="h-6 w-6" />
                <span>What Does Health Insurance Usually Cover?</span>
              </div>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                Coverage varies between insurers and policies, but many comprehensive health insurance plans may include eligible expenses such as:
              </p>

              <div className="space-y-3.5">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-500/5 transition-colors">
                    <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-text-primary">{item.label}</div>
                      <div className="text-[11px] text-text-secondary leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border-custom text-[11px] text-text-secondary italic">
                * Always review the policy wording carefully to understand exactly what is included.
              </div>
            </div>

            {/* Exclusions Card */}
            <div className="bg-surface border border-rose-500/30 rounded-3xl p-6 sm:p-8 relative shadow-lg">
              <div className="flex items-center gap-2.5 mb-6 text-rose-500 font-display font-extrabold text-xl">
                <X className="h-6 w-6" />
                <span>Common Policy Exclusions</span>
              </div>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                Every health insurance policy contains specific exclusions. Common exclusions may include:
              </p>

              <div className="space-y-3.5">
                {exclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-rose-500/5 transition-colors">
                    <X className="h-4 w-4 text-rose-500 font-bold shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-text-primary">{item.label}</div>
                      <div className="text-[11px] text-text-secondary leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-background border border-border-custom text-xs text-text-secondary leading-relaxed space-y-2">
                <p className="font-semibold text-text-primary">
                  Always read the policy wording carefully before purchasing. If anything seems unclear, ask questions.
                </p>
                <p className="text-[11px]">
                  Pre-existing conditions like diabetes or hypertension usually require continuous coverage for 1 to 3 years before becoming claim-eligible.
                </p>
              </div>
            </div>
          </div>

          {/* 💡 EXPERT TIP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  Don’t evaluate a health insurance policy based only on its premium. A policy with a slightly higher premium may provide broader coverage, fewer restrictions, better claim support, or features that could make a meaningful difference when you actually need medical care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 13. COMMON MISTAKES PEOPLE MAKE WHILE BUYING HEALTH INSURANCE ── */}
        <section id="common-mistakes" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Buyer Awareness
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Common Mistakes People Make While Buying Health Insurance
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Choosing the right health insurance policy requires more than comparing premiums.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Avoid these 7 common pitfalls to ensure your policy protects you when it matters most:
            </p>
          </div>

          {/* 7 Mistakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Mistake 1 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Buying the Cheapest Policy Without Comparing Features
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  A lower premium may also mean lower coverage, more restrictions, higher out-of-pocket expenses, and limited features. Focus on overall value—not just price.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Prioritize comprehensive value
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Delaying Health Insurance
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Many people postpone buying health insurance because they’re young and healthy. Unfortunately, age and newly diagnosed medical conditions can affect eligibility, premiums, and waiting periods. Buying earlier often provides greater flexibility.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Buy before health issues occur
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Ignoring Waiting Periods
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Waiting periods influence when certain benefits become available. Understanding them before purchase helps avoid disappointment and unexpected out-of-pocket expenses later.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Review waiting clauses early
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  04
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Choosing Inadequate Coverage
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Healthcare costs continue to rise rapidly. A policy that seems sufficient today (e.g. ₹3L) may not adequately protect you against major hospital bills in the future. Review your coverage periodically as your life changes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Account for medical inflation
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  05
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Not Reading the Policy Document
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Every policy has terms, conditions, exclusions, room rent limits, and waiting periods. Taking the time to understand these details can help you make a better-informed decision.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Understand terms and conditions
              </div>
            </div>

            {/* Mistake 6 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  06
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Not Disclosing Medical History
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Providing incomplete or inaccurate information can create complications or outright rejection during claims. Always answer application questions honestly and transparently.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Honesty prevents claim disputes
              </div>
            </div>

            {/* Mistake 7 */}
            <div className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm md:col-span-2 lg:col-span-3">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-mono font-bold text-sm">
                  07
                </div>
                <h3 className="text-base font-bold font-display text-text-primary">
                  Relying Only on Employer Health Insurance
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Employer-provided coverage is valuable, but it may not always be enough. Coverage ends if you change jobs or retire, and the sum insured may not meet your family’s long-term healthcare needs. A personal health insurance policy can provide continuity and additional protection throughout your lifetime.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border-custom text-[11px] font-mono text-rose-500">
                Personal cover ensures continuous lifelong protection
              </div>
            </div>
          </div>

          {/* 💡 EXPERT TIP: LONG-TERM FINANCIAL DECISION */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  Think of health insurance as a long-term financial decision, not an annual expense. Choosing the right policy today can help protect both your health and your savings for years to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 14. HEALTH INSURANCE MYTHS VS FACTS ── */}
        <section id="myths-vs-facts" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Busting Misconceptions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Health Insurance Myths vs Facts
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Health insurance is one of the most misunderstood financial products.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Many people delay buying a policy—or choose the wrong one—because of common misconceptions. Let’s separate myth from reality:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mythsAndFacts.map((item) => (
              <div
                key={item.id}
                className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-7 shadow-sm hover:border-rose-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Myth Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      MYTH #{item.id}
                    </span>
                    <span className="text-[11px] text-text-secondary font-mono">{item.category}</span>
                  </div>
                  <h4 className="text-base font-bold font-display text-rose-600 dark:text-rose-400 mb-4 leading-snug">
                    {item.myth}
                  </h4>

                  {/* Fact Block */}
                  <div className="p-4 rounded-2xl bg-background border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>THE REALITY (FACT)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 15. WHICH HEALTH INSURANCE PLAN MAY SUIT YOUR SITUATION? ── */}
        <section id="suit-your-situation" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Life-Stage Personalization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Which Health Insurance Plan May Suit Your Situation?
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Every person’s healthcare needs are different.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              The examples below are designed to help you understand which type of health insurance you may want to explore based on your current stage of life:
            </p>
          </div>

          {/* Interactive Persona Tabs */}
          <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-10 shadow-lg mb-8">
            {/* Situation Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 -mx-2 px-2 no-scrollbar">
              {situations.map((sit, idx) => {
                const IconComponent = sit.icon;
                const isActive = selectedSituation === idx;
                return (
                  <button
                    key={sit.id}
                    onClick={() => setSelectedSituation(idx)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 shrink-0 transition-all ${
                      isActive
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                        : "bg-background border border-border-custom text-text-secondary hover:text-text-primary hover:border-border-custom/80"
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 ${isActive ? "text-white" : "text-rose-500"}`} />
                    <span>{sit.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Situation Content Card */}
            <div className="bg-background border border-border-custom rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                    Selected Profile
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                    {situations[selectedSituation].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary">
                    {situations[selectedSituation].subtitle}
                  </p>
                </div>
                <a
                  href="#callback-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("callback-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 font-bold text-xs sm:text-sm transition-all shrink-0 text-center"
                >
                  Discuss This Profile →
                </a>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-secondary font-mono mb-4">
                  Recommended Coverage You May Want to Consider:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {situations[selectedSituation].consider.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border-custom">
                      <Check className="h-4 w-4 text-emerald-500 font-bold shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-text-primary font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs sm:text-sm text-text-primary leading-relaxed font-semibold">
                  💡 Strategy Note: {situations[selectedSituation].insight}
                </div>
              </div>
            </div>
          </div>

          {/* 💡 EXPERT TIP: LIFE STAGE ALIGNMENT */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-background border border-amber-500/30 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
                  <span>💡 Expert Tip</span>
                </h3>
                <p className="text-xs sm:text-sm text-text-primary leading-relaxed font-medium">
                  The right health insurance plan depends on your life stage—not someone else’s recommendation. Review your coverage whenever major life events occur, such as marriage, parenthood, purchasing a home, or starting a business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 16. WHY PEOPLE TRUST OUR PLATFORM & NO-SPAM PROMISE ── */}
        <section id="why-trust-us" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Ethical Advisory
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Why People Trust Our Platform
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Choosing health insurance is an important financial decision.
            </p>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Our goal isn’t to convince you to buy a policy. Our goal is to help you understand your options so you can make an informed decision with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Pillar 1 */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-rose-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary">
                  We Explain Insurance in Simple Language
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Insurance doesn’t have to be confusing. We break down complex policy terms into clear, easy-to-understand explanations so you know exactly what you’re comparing.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary">
                  Certified Insurance Experts
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  When you need personalized guidance, we connect you with certified insurance experts who can answer your questions and explain suitable options based on your needs. No scripts. No rushed conversations. Just thoughtful guidance.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary">
                  We Compare Multiple Insurers
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Every insurer offers different features, waiting periods, network hospitals, and benefits. Instead of focusing on a single company, we help you compare multiple options so you can make an informed decision.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-surface border border-border-custom rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-purple-500/40 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-text-primary">
                  Recommendations Based on Your Needs
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Your age, family size, budget, health history, and financial goals all matter. That’s why we believe recommendations should be personalized—not generic.
                </p>
              </div>
            </div>

            {/* Pillar 5: No Spam Promise */}
            <div className="bg-surface border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      Our No-Spam Promise
                    </h3>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                      Zero Telemarketing • 100% Privacy Respected
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We understand how frustrating repeated sales calls can be. When you contact us:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-text-primary">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 font-bold" />
                    <span>We respect your privacy.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 font-bold" />
                    <span>Your information is handled responsibly.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 font-bold" />
                    <span>We don’t believe in aggressive sales tactics.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 font-bold" />
                    <span>We focus on answering your questions first.</span>
                  </div>
                </div>

                <div className="pt-2 text-xs font-semibold text-text-primary">
                  Building trust is more important than generating a quick sale.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 17. HOW WE HELP YOU (6-STEP JOURNEY) & LIFETIME CLAIM ASSISTANCE ── */}
        <section id="how-we-help" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Clear Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              How We Help You
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Our role is simple: We make health insurance easier to understand.
            </p>
          </div>

          {/* 6 Step Progression */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: "01",
                title: "Tell Us About Yourself",
                desc: "We’ll understand your family size, healthcare needs, budget, and any existing coverage you hold.",
              },
              {
                step: "02",
                title: "Connect with an Expert",
                desc: "We’ll match you with a certified, unbiased health insurance professional suited to your requirements.",
              },
              {
                step: "03",
                title: "Understand Suitable Options",
                desc: "The expert will explain suitable policies from multiple insurers in clear, simple language without jargon.",
              },
              {
                step: "04",
                title: "Compare Without Pressure",
                desc: "You’ll understand the subtle differences in room rents, waiting periods, and NCB before making any decision.",
              },
              {
                step: "05",
                title: "Guided Application Process",
                desc: "If you choose to proceed, the advisor guides you through medical disclosures and accurate policy issuance.",
              },
              {
                step: "06",
                title: "Continuous Ongoing Support",
                desc: "Need help later? We’re here to assist you throughout your multi-year insurance journey.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-surface border border-border-custom rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono font-bold text-sm flex items-center justify-center mb-4">
                    {st.step}
                  </div>
                  <h4 className="text-base font-bold font-display text-text-primary mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Lifetime Claim Assistance Card */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-surface to-background border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="max-w-3xl mb-8 space-y-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono block">
                Post-Purchase Commitment
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-text-primary">
                Lifetime Claim Assistance
              </h3>
              <p className="text-base font-bold text-text-primary leading-relaxed">
                Buying a health insurance policy is only the beginning. Understanding how to use it during a medical emergency is equally important.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                While claims are processed and settled directly by the insurer, our goal is to help you navigate the process by connecting you with the appropriate support and helping you understand the steps involved.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-1.5">
                <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Cashless Process Guidance</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Step-by-step assistance with hospital TPA desk authorization forms and pre-authorization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-1.5">
                <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Preparing Required Documents</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Checklist of doctor notes, pharmacy invoices, discharge summaries, and lab reports.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-1.5">
                <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>General Claim Queries</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Clarification on deduction queries, room rent sublimits, and co-payment obligations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-1.5">
                <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Policy-Related Clarification</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Helping you understand exclusions, restoration criteria, and pre/post hospitalization claims.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background border border-border-custom space-y-1.5 sm:col-span-2">
                <div className="text-xs sm:text-sm font-bold text-text-primary flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Connecting with Your Advisor</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Direct connection with your certified advisor to intervene if claim status tracking stalls.
                </p>
              </div>
            </div>

            <p className="text-xs font-semibold text-text-primary text-center">
              Our aim is to ensure you’re not left figuring everything out on your own during a stressful time.
            </p>
          </div>
        </section>

        {/* ── 18. COMPREHENSIVE FREQUENTLY ASKED QUESTIONS (25 FAQS) ── */}
        <section id="faqs" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-10 space-y-4">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
              Everything You Need to Know
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              Clear, definitive answers to 25 of the most common questions people ask before buying health insurance.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
              {["All", "Basics", "Policies & Types", "Claims & Hospitals", "Costs & Clauses"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    faqCategory === cat
                      ? "bg-rose-500 text-white shadow-sm"
                      : "bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search 25 questions..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border-custom text-xs focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {faqData
              .filter((item) => {
                const matchCategory = faqCategory === "All" || item.cat === faqCategory;
                const matchSearch =
                  item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                  item.a.toLowerCase().includes(faqSearch.toLowerCase());
                return matchCategory && matchSearch;
              })
              .map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "bg-surface border-rose-500/50 shadow-md"
                        : "bg-surface/50 border-border-custom hover:border-border-custom/80"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {faq.id}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-text-primary">
                          {faq.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-text-secondary shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-rose-500" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-custom/50 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

        {/* ── 19. LEARN MORE ABOUT HEALTH INSURANCE (COMING SOON) ── */}
        <section id="guides-library" className="mb-20 sm:mb-28 text-left scroll-mt-24">
          <div className="max-w-4xl mb-12 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Resource Library
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
              Learn More About Health Insurance
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
              We’ll soon publish detailed, deep-dive educational guides on these 10 essential topics:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-surface border border-border-custom rounded-2xl p-5 flex flex-col justify-between hover:border-rose-500/30 transition-all shadow-sm group"
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      {guide.tag}
                    </span>
                    <BookOpen className="h-4 w-4 text-text-secondary group-hover:text-rose-500 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold font-display text-text-primary leading-snug">
                    {guide.title}
                  </h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {guide.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-text-secondary/70 italic border-t border-border-custom pt-2.5">
                  Publishing in Knowledge Hub soon
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 20. READY TO FIND THE RIGHT HEALTH INSURANCE? (FINAL CTAS) ── */}
        <section className="mb-20 sm:mb-28 text-left">
          <div className="bg-gradient-to-br from-rose-500/10 via-surface to-background border border-rose-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
            {/* Background Ambient Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10 space-y-4">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest font-mono block">
                Take the Next Step
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-text-primary tracking-tight leading-[1.15]">
                Ready to Find the Right Health Insurance?
              </h2>
              <p className="text-base sm:text-lg font-bold text-text-primary leading-relaxed">
                Health insurance isn’t just another financial product. It’s a way to protect your savings, support your family, and access quality healthcare with greater financial confidence.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Whether you’re buying your first policy, reviewing your current coverage, or simply looking for guidance, we’re here to make the process easier.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-semibold text-text-primary">
                Our platform connects you with certified insurance experts who can explain your options, answer your questions, and help you compare plans from multiple insurers—so you can make an informed decision.
              </p>
            </div>

            {/* 3 Call to Action Pathways */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Path 1: Find the Right Health Insurance */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-rose-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Find the Right Health Insurance
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Filter 20+ insurer plans by room rent limits, pre-existing disease terms, and hospital network sizes.
                  </p>
                </div>
                <a
                  href="#callback-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("callback-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs sm:text-sm text-center transition-all block shadow-md shadow-rose-500/20 cursor-pointer"
                >
                  Find Right Health Plan →
                </a>
              </div>

              {/* Path 2: Talk to a Certified Insurance Expert */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Talk to a Certified Expert
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Schedule a 1-on-1 audio or video session with a certified insurance advisor at a time convenient for you.
                  </p>
                </div>
                <Link
                  href="/book-appointment?service=health"
                  className="w-full py-3 rounded-xl bg-surface border border-border-custom hover:border-rose-500/50 text-text-primary font-bold text-xs sm:text-sm text-center transition-all block hover:bg-surface/80"
                >
                  Talk to an Expert →
                </Link>
              </div>

              {/* Path 3: Request a Callback */}
              <div className="bg-surface border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl transition-all group">
                <div className="space-y-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-text-primary">
                    Request a Callback
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Short on time? Simply provide your number and a certified advisor will phone you back within 2 hours.
                  </p>
                </div>
                <a
                  href="#callback-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("callback-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-xl bg-background border border-border-custom hover:border-emerald-500/50 text-text-primary font-bold text-xs sm:text-sm text-center transition-all block hover:bg-surface/80 cursor-pointer"
                >
                  Request a Callback →
                </a>
              </div>
            </div>

            {/* Closing Slogan Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-1">
              <p className="text-base sm:text-lg font-extrabold font-display text-rose-600 dark:text-rose-400">
                Clear advice. No pressure. No spam. Just informed decisions.
              </p>
              <p className="text-xs text-text-secondary">
                Protect your health. Preserve your savings. Secure your family’s future with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ── 10. FINAL STATS & REGULATORY DISCLAIMER ── */}
        <section className="border-t border-border-custom pt-10 text-left space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-center">
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-rose-500">10,000+</div>
              <div className="text-xs text-text-secondary mt-0.5">Cashless Hospitals</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-rose-500">₹25,000+</div>
              <div className="text-xs text-text-secondary mt-0.5">Tax Benefit (Sec 80D)</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-rose-500">98.5%</div>
              <div className="text-xs text-text-secondary mt-0.5">Partner Settlement Ratio</div>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border-custom">
              <div className="text-xl sm:text-2xl font-extrabold font-mono text-rose-500">&lt; 2 Hrs</div>
              <div className="text-xs text-text-secondary mt-0.5">Advisory SLA</div>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-text-secondary/70 leading-relaxed font-sans">
            <strong>Regulatory &amp; Statutory Disclaimer:</strong> Health insurance is a financial protection contract subject to the terms, conditions, waiting periods, sublimits, and exclusions outlined in the respective policy wording. InsurEdge is an unbiased discovery and consumer education platform connecting individuals with certified insurance professionals. We do not underwrite insurance or process claim settlements directly.
          </p>
        </section>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR (for phone responsiveness) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border-custom px-4 py-3 flex items-center justify-between gap-3 md:hidden shadow-2xl">
        <a
          href="#callback-form"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("callback-form")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 py-2.5 px-3 rounded-full bg-background border border-border-custom text-text-primary font-bold text-xs text-center flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="h-3.5 w-3.5 text-rose-500" />
          <span>Quick Callback</span>
        </a>
        <Link
          href="/book-appointment?service=health"
          className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20"
        >
          <HeartPulse className="h-3.5 w-3.5" />
          <span>Find Right Plan</span>
        </Link>
      </div>
    </div>
  );
}
