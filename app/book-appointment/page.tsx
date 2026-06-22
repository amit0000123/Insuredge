"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookAppointmentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTopic("");
    setDate("");
    setTimeSlot("");
    setDescription("");
  };

  const timeSlots = [
    "10:00 AM – 10:30 AM",
    "11:30 AM – 12:00 PM",
    "02:00 PM – 02:30 PM",
    "03:30 PM – 04:00 PM",
    "05:00 PM – 05:30 PM",
  ];

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !topic || !date || !timeSlot) return;
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-text-primary">Book Appointment</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold font-display leading-tight">
            Schedule a Free <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Consultation</span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 session with a certified financial advisor. We&apos;ll review your needs and give you honest, unbiased guidance.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 py-12 flex-grow">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column Information */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-accent-custom/10 text-accent-custom text-xs font-bold px-3 py-1.5 rounded-full border border-accent-custom/25 w-fit font-mono uppercase">
                  <CheckCircle2 size={12} />
                  <span>Free · No Obligation</span>
                </div>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans">
                  Schedule a private video call or voice consultation with one of our licensed experts. Absolutely zero sales calls or insurance steering.
                </p>
              </div>

              {/* What to expect card */}
              <div className="bg-surface border border-border-custom rounded-3xl p-6 space-y-5">
                <h3 className="font-display font-bold text-text-primary text-base">
                  What to Expect on the Call
                </h3>
                <ul className="space-y-4 text-xs text-text-secondary leading-relaxed font-sans">
                  <li className="flex items-start space-x-3">
                    <div className="bg-primary-custom/12 text-primary-custom p-1.5 rounded-lg text-xs font-bold leading-none shrink-0 mt-0.5">30</div>
                    <span>
                      <strong className="text-text-primary font-bold">30-Minute Custom Review:</strong> Walk through your current policies or get a tailored blueprint.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-primary-custom/12 text-primary-custom p-1.5 rounded-lg text-xs font-bold leading-none shrink-0 mt-0.5">0</div>
                    <span>
                      <strong className="text-text-primary font-bold">Zero commission bias:</strong> Recommendations are strictly data-backed and IRDAI compliant.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-primary-custom/12 text-primary-custom p-1.5 rounded-lg text-xs font-bold leading-none shrink-0 mt-0.5">X</div>
                    <span>
                      <strong className="text-text-primary font-bold">Anti-Spam Shield:</strong> Your contact details are never leaked to external agent grids.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Certification Badge */}
              <div className="bg-primary-custom/5 border border-primary-custom/15 rounded-2xl p-5 flex items-center space-x-4">
                <div className="bg-surface border border-border-custom text-primary-custom p-2 rounded-xl shrink-0">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div className="text-[11px] text-text-secondary leading-normal">
                  Advisors are fully IRDAI certified (Licence: DB-9988-26) and SEBI registered. Absolute regulatory accountability.
                </div>
              </div>
            </div>

            {/* Right Column Form Box */}
            <div className="lg:col-span-7 bg-surface rounded-[2.5rem] p-6 sm:p-8 border border-border-custom shadow-sm text-left">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <form onSubmit={handleBook} className="space-y-4 text-xs font-semibold">
                    <h3 className="text-base font-bold font-display text-text-primary pb-3 border-b border-border-custom">
                      Schedule Your Session
                    </h3>

                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="text-text-secondary">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email input */}
                      <div className="space-y-1">
                        <label className="text-text-secondary">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1">
                        <label className="text-text-secondary">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Topic Dropdown */}
                      <div className="space-y-1">
                        <label className="text-text-secondary">Topic of Interest</label>
                        <select
                          required
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-xs outline-none text-text-primary cursor-pointer font-medium"
                        >
                          <option value="">Select a Topic</option>
                          <option value="term">Term Insurance Review</option>
                          <option value="health">Health Insurance Portability / Advice</option>
                          <option value="mutual">Mutual Funds / SIP Setup</option>
                          <option value="savings">Tax-Free Savings Plans</option>
                          <option value="claims">Claim Settlement Assistance</option>
                        </select>
                      </div>

                      {/* Date Picker */}
                      <div className="space-y-1">
                        <label className="text-text-secondary">Preferred Date</label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2 text-xs outline-none text-text-primary cursor-pointer font-medium"
                        />
                      </div>
                    </div>

                    {/* Time Slots grid */}
                    <div className="space-y-2 pt-2">
                      <label className="text-text-secondary">Select Available Slot</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                        {timeSlots.map((slot) => {
                          const isSelected = timeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setTimeSlot(slot)}
                              className={`p-2.5 text-center rounded-xl border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-primary-custom text-white border-primary-custom shadow-md shadow-primary-custom/10"
                                  : "bg-background border-border-custom text-text-secondary hover:text-text-primary"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes description */}
                    <div className="space-y-1">
                      <label className="text-text-secondary">Additional Notes (Optional)</label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Details about existing policies..."
                        className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary-custom justify-center py-3.5 rounded-xl font-bold mt-2 shadow-md"
                    >
                      {loading ? (
                        <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <span>Schedule Now</span>
                          <Calendar className="h-4.5 w-4.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 space-y-6 text-xs font-semibold"
                  >
                    <div className="w-16 h-16 bg-accent-custom/12 text-accent-custom border border-accent-custom/25 rounded-full flex items-center justify-center mx-auto">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display text-text-primary">Consultation Scheduled!</h3>
                      <div className="bg-background border border-border-custom rounded-2xl p-4 max-w-sm mx-auto text-[11px] text-text-secondary text-left space-y-2 mt-4">
                        <div className="flex justify-between">
                          <span>Advisor:</span>
                          <strong className="text-text-primary">Certified InsurEdge Specialist</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Date &amp; Time:</span>
                          <strong className="text-text-primary">{date} | {timeSlot}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Mode:</span>
                          <strong className="text-text-primary">Google Meet / Phone Call</strong>
                        </div>
                      </div>
                      <p className="text-text-secondary font-sans text-xs max-w-sm mx-auto leading-relaxed pt-4">
                        A meeting link and confirmation code have been sent to <span className="font-bold text-primary-custom">{email}</span>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        handleReset();
                      }}
                      className="px-5 py-2 border border-border-custom hover:bg-background text-text-secondary hover:text-text-primary rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      Schedule Another Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
