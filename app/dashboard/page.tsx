"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, HeartPulse, User, Calendar, Upload, FileText, Download, ShieldAlert, CheckCircle, Trash2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentFile {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"policies" | "appointments" | "vault">("policies");
  
  // Vault State
  const [vaultDocs, setVaultDocs] = useState<DocumentFile[]>([
    { id: "d1", name: "HDFC_OptimaSecure_Schedule.pdf", size: "1.4 MB", date: "June 10, 2026", type: "pdf" },
    { id: "d2", name: "Medical_Test_Report_30Y.pdf", size: "850 KB", date: "June 12, 2026", type: "pdf" },
  ]);

  const [dragActive, setDragActive] = useState(false);

  // Handle mock file upload
  const handleFileUpload = (fileName: string) => {
    const newDoc: DocumentFile = {
      id: "d" + (vaultDocs.length + 1),
      name: fileName,
      size: `${(Math.random() * 2 + 0.1).toFixed(1)} MB`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      type: "pdf",
    };
    setVaultDocs((prev) => [newDoc, ...prev]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0].name);
    }
  };

  const handleDeleteDoc = (id: string) => {
    setVaultDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen text-text-primary transition-colors duration-300">
      <div className="mesh" />

      {/* Profile summary banner */}
      <section className="relative z-10 py-12 border-b border-border-custom bg-surface/30 font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-custom to-[#8B5CF6] border-2 border-border-custom flex items-center justify-center font-display font-extrabold text-xl text-white">
                JD
              </div>
              <div className="space-y-1">
                <h1 className="font-display text-2xl font-bold">John Doe</h1>
                <p className="text-xs text-text-secondary">Premium Client · Member since June 2026</p>
              </div>
            </div>

            <div className="flex gap-4 text-xs font-semibold">
              <div className="bg-background border border-border-custom px-4 py-3 rounded-2xl text-center">
                <span className="text-[10px] text-text-secondary block mb-0.5">Insurance Health Score</span>
                <span className="text-lg font-bold text-accent-custom">80/100</span>
              </div>
              <div className="bg-background border border-border-custom px-4 py-3 rounded-2xl text-center">
                <span className="text-[10px] text-text-secondary block mb-0.5">Active Cover Limit</span>
                <span className="text-lg font-bold text-text-primary">₹2 Crores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main dashboard navigation & panel */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Side Tabs Nav */}
            <div className="lg:col-span-3 bg-surface border border-border-custom p-4 rounded-3xl flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("policies")}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "policies"
                    ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background"
                }`}
              >
                <ShieldCheck size={18} /> Active Policies
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "appointments"
                    ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background"
                }`}
              >
                <Calendar size={18} /> Advisory Bookings
              </button>
              <button
                onClick={() => setActiveTab("vault")}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "vault"
                    ? "bg-primary-custom text-white shadow-md shadow-primary-custom/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background"
                }`}
              >
                <KeyRound size={18} /> Secure Document Vault
              </button>
            </div>

            {/* Right Column: Tab Panels */}
            <div className="lg:col-span-9 bg-surface border border-border-custom p-6 sm:p-8 rounded-3xl min-h-[400px]">
              <AnimatePresence mode="wait">
                
                {/* POLICIES TAB */}
                {activeTab === "policies" && (
                  <motion.div
                    key="policies"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-border-custom pb-4">
                      <h3 className="font-display font-bold text-lg text-text-primary">Your Insured Covers</h3>
                      <p className="text-xs text-text-secondary mt-0.5">Click download schedules to access policy sheets.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Policy 1 */}
                      <div className="p-5 border border-border-custom bg-background/50 rounded-2xl space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-custom/12 rounded-xl flex items-center justify-center text-primary-custom">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-text-primary">Click2Protect Term Cover</h4>
                              <p className="text-[10px] text-text-secondary font-semibold">HDFC Life · Policy #TD-948294</p>
                            </div>
                          </div>
                          <span className="bg-accent-custom/12 text-accent-custom border border-accent-custom/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-text-secondary block">Sum Assured Cover</span>
                            <strong className="text-text-primary font-bold">₹1.5 Crores</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-text-secondary block">Next Premium due</span>
                            <strong className="text-text-primary font-bold">July 10, 2026</strong>
                          </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-surface hover:bg-background border border-border-custom rounded-xl text-xs font-bold text-text-primary transition-all cursor-pointer">
                          <Download size={14} /> Download Policy PDF
                        </button>
                      </div>

                      {/* Policy 2 */}
                      <div className="p-5 border border-border-custom bg-background/50 rounded-2xl space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent-custom/12 rounded-xl flex items-center justify-center text-accent-custom">
                              <HeartPulse size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-text-primary">Optima Secure Health Cover</h4>
                              <p className="text-[10px] text-text-secondary font-semibold">HDFC ERGO · Policy #HD-492049</p>
                            </div>
                          </div>
                          <span className="bg-accent-custom/12 text-accent-custom border border-accent-custom/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-text-secondary block">Sum Assured Cover</span>
                            <strong className="text-text-primary font-bold">₹10 Lakhs</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-text-secondary block">Next Premium due</span>
                            <strong className="text-text-primary font-bold">June 28, 2026</strong>
                          </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-surface hover:bg-background border border-border-custom rounded-xl text-xs font-bold text-text-primary transition-all cursor-pointer">
                          <Download size={14} /> Download Policy PDF
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* APPOINTMENTS TAB */}
                {activeTab === "appointments" && (
                  <motion.div
                    key="appointments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-border-custom pb-4">
                      <h3 className="font-display font-bold text-lg text-text-primary">Scheduled Consultations</h3>
                      <p className="text-xs text-text-secondary mt-0.5">Advisors will reach out at the scheduled slot via video call/phone.</p>
                    </div>

                    <div className="space-y-3">
                      {/* Booking Item */}
                      <div className="p-4 border border-border-custom bg-background/50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-custom/10 border border-border-custom rounded-xl flex items-center justify-center font-bold text-primary-custom">
                            VM
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-text-primary">Term Insurance Optimization</h4>
                            <p className="text-[10px] text-text-secondary font-semibold">with Vikram Mehta (Senior Advisor)</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="text-left sm:text-right font-mono">
                            <span className="text-[10px] text-text-secondary block">Date &amp; Slot</span>
                            <span className="font-bold text-text-primary">June 22, 2026 at 10:30 AM</span>
                          </div>
                          <span className="bg-primary-custom/10 text-primary-custom border border-primary-custom/25 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[9px]">Scheduled</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* VAULT TAB */}
                {activeTab === "vault" && (
                  <motion.div
                    key="vault"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-border-custom pb-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-display font-bold text-lg text-text-primary">Secure Document Vault</h3>
                        <p className="text-xs text-text-secondary mt-0.5">Secure, AES-256 encrypted storage for policy schedules and records.</p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1 bg-accent-custom/10 text-accent-custom border border-accent-custom/25 px-2.5 py-1 rounded-full text-[9px] font-bold font-mono">
                        <CheckCircle size={10} /> ISO-27001 Certified
                      </span>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-3 transition-colors ${
                        dragActive ? "border-primary-custom bg-primary-custom/5" : "border-border-custom hover:bg-background/20"
                      }`}
                    >
                      <Upload className={`h-8 w-8 ${dragActive ? "text-primary-custom" : "text-text-secondary"}`} />
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-text-primary block">Drag &amp; drop policy schedules or medical tests</span>
                        <span className="text-[10px] text-text-secondary block">Max size 10MB (PDF, PNG, JPG supported)</span>
                      </div>
                      <label className="px-4 py-2 border border-border-custom hover:border-text-primary hover:bg-background text-text-secondary hover:text-text-primary rounded-xl text-[10px] font-bold transition-all cursor-pointer">
                        Select File
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Files List */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Vault Files ({vaultDocs.length})</h4>
                      
                      <div className="divide-y divide-border-custom bg-background/30 border border-border-custom rounded-2xl overflow-hidden">
                        {vaultDocs.map((doc) => (
                          <div key={doc.id} className="p-4 flex justify-between items-center text-xs">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary-custom shrink-0" />
                              <div>
                                <span className="font-bold text-text-primary block max-w-[200px] sm:max-w-md truncate">{doc.name}</span>
                                <span className="text-[10px] text-text-secondary font-semibold font-mono">{doc.size} · Uploaded {doc.date}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteDoc(doc.id)}
                              className="p-2 text-text-secondary hover:text-red-500 rounded-full hover:bg-background transition-colors cursor-pointer"
                              aria-label="Delete document"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
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
