"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, PhoneCall, Sparkles, User, ShieldAlert, ArrowRight, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user" | "system";
  text: string;
  timestamp: string;
}

// RAG Knowledge Base - Verified InsurEdge Policies
interface KnowledgeEntry {
  keywords: string[];
  response: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ["80d", "tax", "health tax", "limit", "deduction"],
    response: "Under Section 80D of the Income Tax Act, you can deduct up to ₹25,000 annually for health premiums (self, spouse, children). If paying for senior citizen parents (above 60), you can deduct an additional ₹50,000, bringing the total maximum deduction limit to ₹75,000.",
  },
  {
    keywords: ["80c", "term tax", "life tax"],
    response: "Term insurance premiums qualify for tax deductions up to ₹1.5 Lakhs annually under Section 80C of the Income Tax Act. Maturity payouts of pure term plans are also tax-exempt under Section 10(10D) subject to regulations.",
  },
  {
    keywords: ["port", "switch", "portability", "transfer"],
    response: "Health insurance portability allows transferring your policy to another insurer while retaining waiting period credits and No-Claim Bonuses (NCB). Propose portability at least 45 days before your policy renewal date.",
  },
  {
    keywords: ["sip", "lumpsum", "mutual fund", "invest", "equity"],
    response: "A Systematic Investment Plan (SIP) is generally recommended over a lumpsum for retail mutual funds. It averages purchase costs (rupee cost averaging) and reduces risk during market corrections.",
  },
  {
    keywords: ["rider", "critical illness", "accidental", "waiver"],
    response: "Riders are additional protection clauses. A Critical Illness rider pays out a lumpsum on cancer or heart diagnosis. Accidental Death riders pay out double sum benefits. Premium Waivers disable future premium charges if you suffer critical disabilities.",
  },
  {
    keywords: ["term cover", "life cover", "how much cover", "sum assured"],
    response: "InsurEdge recommends a pure term life cover equal to 15 to 20 times your annual income. For example, if you earn ₹10 Lakhs/year, aim for a sum assured of ₹1.5 Crore to ₹2 Crores to secure dependents.",
  },
  {
    keywords: ["room rent", "icu sublimit", "room limit"],
    response: "We audit policies to ensure they have no room rent sublimits. Traditional policies restrict room rent to 1% of the sum assured, causing massive proportional deduction billing errors during claims. Always choose 'No Limit' private room options.",
  },
  {
    keywords: ["claim", "cashless", "settlement", "hospitalized"],
    response: "In cashless claims, hospital TPAs file directly to insurers. InsurEdge provides a 24/7 claim assistance handler to verify codes. Call our claim line at 1800-419-5920. For reimbursement claims, submit all receipts to our Doc Vault within 30 days.",
  },
  {
    keywords: ["book", "appointment", "consult", "call advisor", "talk to expert"],
    response: "You can book a free 1-on-1 video consultation with our certified advisors. Head to our directory page (/experts) or complete the Onboarding Quiz on the home page to get matched automatically.",
  },
  {
    keywords: ["renew", "renewal", "grace period"],
    response: "Most health policies offer a 30-day grace period for renewals. Note that medical cover is inactive during grace periods. Renew on time to prevent losing your No-Claim waiting period credits.",
  },
];

const QUICK_PROMPTS = [
  "What is the 80D tax limit?",
  "How do I port health policies?",
  "Is a term rider worth it?",
  "Cashless claim steps",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHandoff, setIsHandoff] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ie_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          id: "1",
          sender: "bot",
          text: "Hello! I am Aditya, your InsurEdge virtual advisor. Ask me anything about Term policies, Section 80D, Claims tracking, or SIP investments.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, []);

  // Save chat history to localStorage
  const saveHistory = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem("ie_chat_history", JSON.stringify(newMsgs));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // RAG Search Algorithm
  const findRAGResponse = (query: string): string | null => {
    const tokens = query.toLowerCase().split(/\s+/);
    let bestMatch: KnowledgeEntry | null = null;
    let maxMatches = 0;

    for (const entry of KNOWLEDGE_BASE) {
      let matches = 0;
      for (const token of tokens) {
        // match keywords
        const found = entry.keywords.some(
          (kw) => kw.includes(token) || token.includes(kw)
        );
        if (found) matches++;
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = entry;
      }
    }

    // Require at least one good token match to avoid bad guesses
    return maxMatches > 0 && bestMatch ? bestMatch.response : null;
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: textToSend,
      timestamp,
    };

    const updated = [...messages, userMsg];
    saveHistory(updated);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponseText = "";
      let triggerHandoff = false;

      if (isHandoff) {
        botResponseText = "Understood. Our Claim Advocate is review checking your chat transcripts. We will reach you on phone shortly.";
      } else {
        const match = findRAGResponse(textToSend);
        if (match) {
          botResponseText = match;
        } else {
          // If no RAG match is found, trigger human advisor escalation rules
          botResponseText = "I don't have verified records on this query. To prevent speculative advice, I am routing this request to our certified Claims & Advisory Desk. Would you like to connect with a human expert?";
          triggerHandoff = true;
        }
      }

      const botMsg: Message = {
        id: Math.random().toString(36).substring(7),
        sender: "bot",
        text: botResponseText,
        timestamp,
      };

      const nextMsgs = [...updated, botMsg];

      if (triggerHandoff) {
        setIsHandoff(true);
        nextMsgs.push({
          id: "sys-handoff",
          sender: "system",
          text: "System Routing: Connecting to Claim Desk Advocate... Est. Wait: < 3 mins",
          timestamp,
        });
      }

      saveHistory(nextMsgs);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    const defaultMsg: Message[] = [
      {
        id: "1",
        sender: "bot",
        text: "Hello! I am Aditya, your InsurEdge virtual advisor. Ask me anything about Term policies, Section 80D, Claims tracking, or SIP investments.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
    setIsHandoff(false);
    saveHistory(defaultMsg);
  };

  return (
    <>
      {/* Floating Action Buttons Group */}
      <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-3 sm:bottom-6 sm:right-6 xl:bottom-6 xl:right-6 flex flex-col items-center space-y-3 z-40 font-sans">
        {/* WhatsApp Redirection Button */}
        <motion.a
          href="https://wa.me/9118004195920?text=Hi%20InsurEdge%2C%20I%20would%20like%20to%20get%20unbiased%20advice%20on%20my%20insurance."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-3.5 rounded-full shadow-lg shadow-emerald-500/25 flex items-center justify-center cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 min-w-[48px] min-h-[48px]"
          aria-label="Chat with advisor on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.453.993 6.01.993 1.587 5.363 1.584 10.793c-.001 1.693.447 3.344 1.3 4.8l-.996 3.633 3.759-.979zm12.308-5.328c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        </motion.a>

        {/* AI Chat Widget Toggle */}
        <motion.button
          suppressHydrationWarning
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="bg-primary-custom hover:opacity-95 active:scale-95 text-white p-3.5 rounded-full shadow-lg shadow-primary-custom/25 flex items-center justify-center cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary-custom min-w-[48px] min-h-[48px]"
          aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* AI Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            role="dialog"
            aria-label="InsurEdge Virtual Advisor"
            className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-2 sm:right-6 sm:bottom-24 w-[calc(100vw-1rem)] sm:w-96 max-w-full bg-surface border border-border-custom rounded-3xl shadow-2xl overflow-hidden z-40 flex flex-col h-[500px] max-h-[calc(100dvh-120px)] transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-background/80 px-6 py-4 flex items-center justify-between border-b border-border-custom backdrop-blur-md">
              <div className="flex items-center space-x-3 text-left">
                <div className="bg-primary-custom/12 p-2 rounded-xl text-primary-custom">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold font-display text-sm leading-tight">
                    Aditya — InsurEdge AI
                  </h4>
                  <span className="text-[10px] text-accent-custom font-sans font-medium flex items-center">
                    <span className="w-1.5 h-1.5 bg-accent-custom rounded-full inline-block mr-1.5 animate-pulse"></span>
                    Verified Knowledge Base
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  suppressHydrationWarning
                  onClick={handleClearChat}
                  className="text-[10px] font-bold text-text-secondary hover:text-text-primary bg-background border border-border-custom px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar bg-background/25">
              {messages.map((msg) => {
                if (msg.sender === "system") {
                  return (
                    <div key={msg.id} className="p-3 bg-primary-custom/5 border border-primary-custom/15 rounded-xl flex items-start gap-2 text-[10px] text-text-secondary max-w-[90%] mx-auto text-left">
                      <UserCheck className="h-4.5 w-4.5 text-primary-custom shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-text-primary block">Human Escalation Triggered</span>
                        <p className="mt-0.5">{msg.text}</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2.5 max-w-[85%] text-left ${
                      msg.sender === "user" ? "ml-auto flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 p-1.5 rounded-lg text-white ${
                        msg.sender === "bot" ? "bg-surface border border-border-custom text-primary-custom" : "bg-primary-custom"
                      }`}
                    >
                      {msg.sender === "bot" ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                          msg.sender === "bot"
                            ? "bg-surface text-text-primary rounded-tl-none border border-border-custom"
                            : "bg-primary-custom text-white rounded-tr-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-text-secondary block mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start space-x-2.5 max-w-[80%] text-left">
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-surface border border-border-custom text-primary-custom">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div className="p-3.5 bg-surface rounded-2xl rounded-tl-none border border-border-custom shadow-sm">
                    <div className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {!isHandoff && (
              <div className="p-3 bg-surface border-t border-border-custom flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    suppressHydrationWarning
                    key={prompt}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    className="min-h-[32px] bg-background hover:bg-background/80 active:scale-95 text-text-primary text-[10px] font-semibold py-1.5 px-3 rounded-full border border-border-custom cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary-custom"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 bg-surface border-t border-border-custom flex items-center space-x-2"
            >
              <input
                suppressHydrationWarning
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isHandoff ? "Type phone number or email..." : "Ask about 80D limits, term covers..."}
                className="flex-1 bg-background text-xs min-h-[44px] py-2 px-4 rounded-xl border border-border-custom focus:outline-none focus:ring-2 focus:ring-primary-custom text-text-primary"
              />
              <button
                suppressHydrationWarning
                type="submit"
                aria-label="Send message"
                className="min-w-[44px] min-h-[44px] bg-primary-custom text-white rounded-xl cursor-pointer hover:opacity-95 active:scale-95 flex items-center justify-center transition-all focus-visible:ring-2 focus-visible:ring-primary-custom shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
