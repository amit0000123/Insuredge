"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
            <span className="text-text-primary">Contact Us</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Get in <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-base text-text-secondary max-w-xl mx-auto font-sans leading-relaxed">
            Have questions? Want to decode a policy? We are here to help you make the right choice.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-bold text-text-primary">Unbiased Support Desk</h2>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                  Our team of unbiased insurance experts is ready to assist you. Whether you need a fresh recommendation or want us to decode an existing policy, reach out today.
                </p>
              </div>

              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-custom/12 p-3 rounded-xl text-primary-custom shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-text-primary text-sm">Our Office</h3>
                    <p className="text-text-secondary mt-1 leading-relaxed">123 InsurTech Valley, Tech Park,<br/>Mumbai, India 400001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary-custom/12 p-3 rounded-xl text-primary-custom shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-text-primary text-sm">Call Us</h3>
                    <p className="text-text-secondary mt-1 leading-relaxed">+91 1800-419-5920<br/><span className="text-[10px] text-text-secondary font-semibold">Mon-Sat, 9am to 7pm (Emergency claims 24/7)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary-custom/12 p-3 rounded-xl text-primary-custom shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-text-primary text-sm">Email Us</h3>
                    <p className="text-text-secondary mt-1 leading-relaxed">support@insuredge.com</p>
                  </div>
                </div>
              </div>

              {/* Decode Widget Promo */}
              <div className="bg-[#111827] border border-border-custom p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <FileText size={120} />
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">Have a Quote Already?</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Upload your policy document or aggregator quote. Our experts will audit the fine print, checking for hidden room-rent limits, copays, and exclusions.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl shadow-sm text-left">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4 text-xs font-semibold"
                  >
                    <div className="w-16 h-16 bg-accent-custom/12 text-accent-custom border border-accent-custom/25 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-text-primary">Message Received!</h3>
                    <p className="text-text-secondary max-w-sm leading-relaxed">
                      Thank you. An unbiased financial planner has been allocated to review your queries. Expect a response in under 2 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border border-border-custom hover:bg-background text-text-secondary hover:text-text-primary rounded-xl font-bold transition-all cursor-pointer mt-4"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-text-secondary">First Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-text-secondary">Last Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-text-secondary">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-text-secondary">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-text-secondary">How can we help?</label>
                      <select className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-primary-custom text-text-primary font-medium cursor-pointer">
                        <option>I need help finding a plan</option>
                        <option>I want you to decode my existing policy</option>
                        <option>I need help with a claims dispute</option>
                        <option>Other inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-text-secondary">Message</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans resize-none"
                        placeholder="Tell us more about your requirements..."
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full btn-primary-custom justify-center py-3 rounded-xl font-bold mt-2 shadow-md">
                      Send Message <Send size={14} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
