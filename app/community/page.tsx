"use client";

import React, { useState } from "react";
import { MessageSquare, Heart, MessageCircle, Eye, Search, AlertCircle, ArrowUpCircle, Plus, Send, ChevronRight, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  category: string;
  author: string;
  content: string;
  likes: number;
  repliesCount: number;
  views: number;
  hasExpertAnswer: boolean;
  replies: Array<{ author: string; content: string; date: string; isExpert: boolean }>;
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Does HDFC Optima Secure really pay for all single private rooms?",
    category: "Health Insurance",
    author: "Rohan_Mehta",
    content: "I'm reading the brochure and it says 'Optima Secure room rent cap is single private room'. Does this cover suite rooms if there is no other private room available? Or do I pay the difference?",
    likes: 24,
    repliesCount: 3,
    views: 412,
    hasExpertAnswer: true,
    replies: [
      {
        author: "Karan Johar (Expert Advisor)",
        content: "If you select a suite room, HDFC Ergo will execute a proportional deduction for all treatment costs, not just the room rent. Standard single private room means standard private AC room. Avoid upgrading to suites unless it is explicitly a suite-cover policy.",
        date: "2 hours ago",
        isExpert: true,
      },
      {
        author: "Sanjay_K",
        content: "I faced this. They only paid for the standard room rate and deducted the extra from my claim.",
        date: "1 hour ago",
        isExpert: false,
      }
    ]
  },
  {
    id: 2,
    title: "LIC Tech Term vs ICICI iProtect Smart - Which is better for a 32-year-old?",
    category: "Term Insurance",
    author: "Neha_G",
    content: "I am a non-smoker, 32M, looking for a 1.5 Cr cover till age 60. LIC is charging slightly higher premium. Is the LIC brand value worth paying the premium difference?",
    likes: 18,
    repliesCount: 2,
    views: 289,
    hasExpertAnswer: true,
    replies: [
      {
        author: "Priya Menon (Claims Expert)",
        content: "LIC Tech Term is a pure online product and has an excellent claim settlement history. However, ICICI iProtect is also very robust and offers a cheaper terminal illness cover. I recommend going with ICICI and adding the Critical Illness rider rather than paying more for the LIC brand.",
        date: "1 day ago",
        isExpert: true,
      }
    ]
  }
];

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [newQuestionCategory, setNewQuestionCategory] = useState("Health");
  const [showForm, setShowForm] = useState(false);
  const [newReplyText, setNewReplyText] = useState("");

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: posts.length + 1,
      title: newQuestionTitle,
      category: newQuestionCategory + " Insurance",
      author: "Guest_User",
      content: newQuestionContent,
      likes: 0,
      repliesCount: 0,
      views: 1,
      hasExpertAnswer: false,
      replies: [],
    };
    setPosts([newPost, ...posts]);
    setNewQuestionTitle("");
    setNewQuestionContent("");
    setShowForm(false);
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim() || !selectedPost) return;

    const updatedReplies = [
      ...selectedPost.replies,
      {
        author: "You (User)",
        content: newReplyText,
        date: "Just now",
        isExpert: false,
      }
    ];

    const updatedPosts = posts.map(p => 
      p.id === selectedPost.id 
        ? { ...p, replies: updatedReplies, repliesCount: updatedReplies.length }
        : p
    );

    setPosts(updatedPosts);
    setSelectedPost({
      ...selectedPost,
      replies: updatedReplies,
      repliesCount: updatedReplies.length
    });
    setNewReplyText("");
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
            <span className="text-text-primary">Community</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
            <div className="text-left space-y-1">
              <h1 className="text-3xl md:text-4xl font-poppins font-extrabold font-display leading-tight">
                Ask the <span className="bg-gradient-to-r from-primary-custom to-[#8B5CF6] bg-clip-text text-transparent">Community</span>
              </h1>
              <p className="text-sm text-text-secondary">Share experiences, clarify doubts, and learn from verified experts.</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary-custom text-xs font-bold rounded-xl cursor-pointer py-2.5 px-5 shadow-md shrink-0"
            >
              <Plus size={16} /> Ask Question
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative z-10 py-12 flex-grow font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6 text-left">
              {/* Search Bar */}
              <div className="bg-surface border border-border-custom p-3 rounded-2xl flex items-center gap-2">
                <Search size={18} className="text-text-secondary ml-1" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-xs font-sans text-text-primary placeholder-text-secondary" 
                  placeholder="Search questions..." 
                />
              </div>

              {/* Rules Widget */}
              <div className="bg-[#111827] border border-border-custom rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-primary-custom font-bold text-sm font-display">
                  <AlertCircle size={18} /> Forum Guidelines
                </div>
                <ul className="text-[11px] text-text-secondary space-y-2 list-disc pl-4 leading-relaxed font-sans">
                  <li>Keep discussions respectful and relevant to financial planning.</li>
                  <li>Do not share sensitive policy documents containing personal data.</li>
                  <li>Always verify claims information with our official experts before committing.</li>
                </ul>
              </div>
            </div>

            {/* Discussion Feed */}
            <div className="lg:col-span-8 space-y-6 text-left">
              
              {/* Ask Question overlay */}
              <AnimatePresence>
                {showForm && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-surface p-6 rounded-3xl border border-primary-custom/30 shadow-md space-y-4"
                  >
                    <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs font-semibold">
                      <div className="flex justify-between items-center pb-2 border-b border-border-custom">
                        <h3 className="text-sm font-bold font-display text-text-primary">Post a New Topic</h3>
                        <button type="button" onClick={() => setShowForm(false)} className="text-text-secondary hover:text-text-primary"><X size={18} /></button>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-text-secondary">Topic Title</label>
                        <input 
                          type="text" 
                          required 
                          value={newQuestionTitle}
                          onChange={(e) => setNewQuestionTitle(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-custom text-text-primary font-sans"
                          placeholder="e.g. Can my health plan premium increase after a claim?" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-text-secondary">Category</label>
                        <select 
                          value={newQuestionCategory}
                          onChange={(e) => setNewQuestionCategory(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-2.5 text-xs outline-none text-text-primary cursor-pointer font-medium"
                        >
                          <option>Health</option>
                          <option>Term</option>
                          <option>Mutual Funds</option>
                          <option>Claims</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-text-secondary">Message Details</label>
                        <textarea 
                          required 
                          rows={4}
                          value={newQuestionContent}
                          onChange={(e) => setNewQuestionContent(e.target.value)}
                          className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-custom text-text-primary resize-none font-sans"
                          placeholder="Provide details about family structure or quotes..."
                        ></textarea>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="btn-primary-custom py-2 px-5 text-xs font-bold rounded-xl">Post Question</button>
                        <button 
                          type="button" 
                          onClick={() => setShowForm(false)} 
                          className="px-5 py-2 border border-border-custom hover:bg-background text-text-secondary rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feed Card List */}
              {selectedPost ? (
                /* Thread Detail View */
                <div className="space-y-6">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-xs text-primary-custom font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    &larr; Back to discussions
                  </button>

                  <div className="bg-surface p-6 rounded-3xl border border-border-custom space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                      <span className="bg-primary-custom/10 text-primary-custom border border-primary-custom/20 px-2.5 py-0.5 rounded-full font-mono uppercase text-[9px]">{selectedPost.category}</span>
                      <span>Asked by @{selectedPost.author}</span>
                    </div>

                    <h2 className="text-xl font-bold font-display text-text-primary leading-tight">{selectedPost.title}</h2>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-line">{selectedPost.content}</p>
                  </div>

                  {/* Replies List */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-text-primary text-base">Replies ({selectedPost.replies.length})</h3>
                    
                    {selectedPost.replies.map((reply, index) => (
                      <div 
                        key={index}
                        className={`p-5 rounded-2xl border ${
                          reply.isExpert 
                            ? "bg-primary-custom/5 border-primary-custom/30 text-text-primary" 
                            : "bg-surface border-border-custom"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2 text-xs">
                          <span className={`font-bold flex items-center gap-1.5 ${reply.isExpert ? "text-primary-custom" : "text-text-primary"}`}>
                            <User size={14} /> {reply.author}
                          </span>
                          <span className="text-[10px] text-text-secondary font-semibold font-sans">{reply.date}</span>
                        </div>
                        <p className="text-text-secondary text-xs leading-relaxed font-sans">{reply.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Reply Form */}
                  <form onSubmit={handleAddReply} className="bg-surface p-5 rounded-2xl border border-border-custom space-y-4">
                    <h4 className="font-bold font-display text-text-primary text-sm">Add Your Reply</h4>
                    <textarea 
                      required 
                      rows={3} 
                      value={newReplyText}
                      onChange={(e) => setNewReplyText(e.target.value)}
                      className="w-full bg-background border border-border-custom rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-custom text-text-primary resize-none font-sans" 
                      placeholder="Write your answer..."
                    ></textarea>
                    <button type="submit" className="btn-primary-custom py-2.5 px-5 text-xs font-bold rounded-xl flex items-center gap-1">
                      Send Reply <Send size={12} />
                    </button>
                  </form>
                </div>
              ) : (
                /* Overview List View */
                filteredPosts.map(post => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-surface p-5 rounded-3xl border border-border-custom hover:border-primary-custom/30 transition-all duration-300 cursor-pointer space-y-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-primary-custom/10 text-primary-custom border border-primary-custom/25 px-2.5 py-0.5 rounded-full font-mono uppercase text-[9px]">{post.category}</span>
                      <span className="text-text-secondary">Asked by @{post.author}</span>
                    </div>

                    <h3 className="text-base font-bold font-display text-text-primary leading-snug">{post.title}</h3>
                    
                    {post.hasExpertAnswer && (
                      <div className="bg-accent-custom/12 text-accent-custom border border-accent-custom/20 text-[9px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 font-mono uppercase">
                        <MessageCircle size={12} /> Expert Answered
                      </div>
                    )}

                    <div className="flex items-center gap-5 pt-3 border-t border-border-custom text-[10px] text-text-secondary font-mono">
                      <span className="flex items-center gap-1"><Heart size={12} /> {post.likes} Likes</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.repliesCount} Replies</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {post.views} Views</span>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
