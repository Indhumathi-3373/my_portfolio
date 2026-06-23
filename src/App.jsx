import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Mail, MapPin, Code, Database, Sparkles, 
  Cpu, Send, Star, MessageSquare, ArrowRight, CheckCircle2,
  TrendingUp, Layers, Compass, Phone, Award, BookOpen
} from 'lucide-react';

const Github = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import Navbar from './components/Navbar';
import ParallaxSection from './components/ParallaxSection';
import Dashboard from './components/Dashboard';
import { storage } from './utils/storage';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  // Dynamic Content State
  const [projects, setProjects] = useState([]);
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Forms State
  const [feedbackForm, setFeedbackForm] = useState({ name: '', role: '', company: '', comment: '' });
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    refreshData();
    setIsAdminLoggedIn(sessionStorage.getItem('indhu_admin_logged_in') === 'true');
  }, []);

  const refreshData = () => {
    setProjects(storage.getProjects());
    setApprovedFeedbacks(storage.getFeedback().filter(f => f.approved));
  };

  const handleAdminAuthChange = (status) => {
    setIsAdminLoggedIn(status);
    refreshData();
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.comment) return;
    storage.addFeedback(feedbackForm);
    setFeedbackForm({ name: '', role: '', company: '', comment: '' });
    setFeedbackStatus('success');
    setTimeout(() => setFeedbackStatus(''), 5000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    storage.addMessage(contactForm);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setContactStatus('success');
    setTimeout(() => setContactStatus(''), 5000);
  };

  const categories = ['All', 'Frontend', 'Full Stack', 'AI & Data'];
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const skillsList = [
    "Java", "JavaScript", "Data Structures & Algorithms (DSA)", "OOP", "Node.js", "Express.js",
    "MongoDB", "RESTful APIs", "Webhooks", "Axios", "Session-Based Auth", "OpenAI API",
    "Gemini API", "NVIDIA", "Git", "GitHub", "Postman", "Vercel", "Multer"
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 bg-grid-pattern text-slate-300 antialiased overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="neon-orb w-[600px] h-[600px] bg-indigo-500/10 top-[-200px] left-[-200px] z-0" />
      <div className="neon-orb w-[600px] h-[600px] bg-purple-500/10 bottom-[20%] right-[-200px] z-0" />

      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        isAdminLoggedIn={isAdminLoggedIn} 
      />

      {/* --- CINEMATIC PARALLAX HERO --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        
        {/* Parallax Floating Ambient Background Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <ParallaxSection speed={0.12} className="absolute top-[15%] left-[8%] w-3 h-3 bg-indigo-500/30 rounded-full blur-[1px]" />
          <ParallaxSection speed={-0.08} className="absolute top-[50%] left-[4%] w-5 h-5 bg-purple-500/20 rounded-full blur-[2px]" />
          <ParallaxSection speed={0.22} className="absolute top-[25%] right-[12%] w-4 h-4 bg-indigo-400/20 rounded-full blur-[1px]" />
          <ParallaxSection speed={-0.15} className="absolute top-[70%] right-[6%] w-3 h-3 bg-purple-400/30 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
          {/* Left Side: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold w-fit">
              <Sparkles size={12} className="animate-spin [animation-duration:8s]" />
              <span>Aspiring Full Stack Developer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-gradient">Indhumathi C</span>. <br />
              I build web apps and integrations.
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
              I am a Computer Science undergraduate student who enjoys building full-stack applications and AI-driven workflow tools. I focus on writing straightforward, reliable code and creating practical web solutions.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 w-full">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold transition-all duration-300 group cursor-pointer text-sm shadow-lg shadow-white/5"
              >
                <span>View My Projects</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-800 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 hover:text-white font-semibold transition-all duration-300 cursor-pointer text-sm"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Right Side: Portrait Image & Interactive Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[450px]">
            
            {/* Background Glow Behind Portrait */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl opacity-60 z-0" />
            
            {/* The Framed Portrait */}
            <div className="relative w-72 h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950/80 z-10 group transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="/profile.jpg" 
                alt="Indhumathi Portrait" 
                className="w-full h-full object-cover opacity-90 transition-all duration-700 relative z-10"
              />
              {/* Subtle glass overlay inside frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-60 z-20 pointer-events-none" />
              <div className="absolute inset-0 border border-white/5 rounded-2xl z-30 pointer-events-none" />
            </div>

            {/* Parallax Floating Badges */}
            
            {/* Badge 1: React / Node.js */}
            <ParallaxSection 
              speed={0.15} 
              className="absolute top-[15%] left-[0%] z-20"
            >
              <div className="glass-light px-4 py-2 rounded-xl border border-white/10 shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-semibold text-white font-mono">React / Node.js</span>
              </div>
            </ParallaxSection>

            {/* Badge 2: Java & DSA */}
            <ParallaxSection 
              speed={-0.1} 
              className="absolute bottom-[20%] right-[-5%] z-20"
            >
              <div className="glass-light px-4 py-2 rounded-xl border border-white/10 shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-white font-mono">Java & DSA</span>
              </div>
            </ParallaxSection>

            {/* Badge 3: OpenAI / Gemini */}
            <ParallaxSection 
              speed={0.2} 
              className="absolute bottom-[8%] left-[5%] z-20"
            >
              <div className="glass-light px-4 py-2.5 rounded-xl border border-white/10 shadow-xl flex flex-col items-start backdrop-blur-md">
                <span className="text-xs font-extrabold text-white leading-none">OpenAI / Gemini</span>
                <span className="text-[9px] text-slate-400 mt-0.5">AI Integrations</span>
              </div>
            </ParallaxSection>

            {/* Badge 4: Location */}
            <ParallaxSection 
              speed={-0.05} 
              className="absolute top-[8%] right-[5%] z-20"
            >
              <div className="glass-light px-3.5 py-1.5 rounded-full border border-white/10 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                <MapPin size={10} className="text-indigo-400" />
                <span className="text-[10px] font-semibold text-slate-300">Erode, India</span>
              </div>
            </ParallaxSection>

          </div>

        </div>

        {/* Scroll Down Mouse Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 select-none z-10 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase opacity-60">Scroll Down</span>
          <div className="w-5 h-8 border border-slate-800 rounded-full p-1 flex justify-center">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-indigo-400 rounded-full"
            />
          </div>
        </div>

      </section>

      {/* --- DEDICATED ABOUT BENTO GRID --- */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-900/60 relative z-10">
        
        <div className="text-left mb-16 space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">About Me</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">Overview</h2>
        </div>

        <div className="bento-grid">
          
          {/* Card 1: Biography */}
          <div className="bento-card col-span-12 lg:col-span-8 p-8 md:p-10 flex flex-col justify-between items-start text-left min-h-[260px]">
            <div className="space-y-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
                <Compass size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Who I Am</h3>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                I am a Computer Science undergraduate student at Shree Venkateshwara Hi-Tech Engineering College. I have a strong interest in building full-stack applications and integrating AI models (like OpenAI and Gemini) to automate workflows.
              </p>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                I focus on writing clean code, solving algorithmic problems, and developing secure backends with session authentication and structured databases.
              </p>
            </div>
          </div>

          {/* Card 2: Education Timeline */}
          <div className="bento-card col-span-12 lg:col-span-4 p-8 md:p-10 flex flex-col justify-between items-start text-left min-h-[260px]">
            <div className="space-y-4 w-full">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-white">B.E. Computer Science & Eng.</h4>
                  <p className="text-xs text-slate-400">Shree Venkateshwara Hi-Tech Engineering College</p>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">2023 - 2027 | CGPA: 8.78</p>
                </div>
                <div className="border-t border-slate-900/60 pt-2">
                  <h4 className="text-sm font-semibold text-white">Higher Secondary Certificate</h4>
                  <p className="text-xs text-slate-400">Komarappa Sengunthar School</p>
                  <p className="text-xs text-indigo-400 font-mono mt-0.5">Passed: 2023 | Marks: 77.66%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Skills list */}
          <div className="bento-card col-span-12 md:col-span-6 p-8 flex flex-col justify-between items-start text-left min-h-[260px]">
            <div className="space-y-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Skills & Concepts</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-400 font-light">
                <div>
                  <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-0.5">Languages & Concepts</span>
                  <span>Java, JavaScript, DSA, OOP</span>
                </div>
                <div>
                  <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-0.5">Backend & DB</span>
                  <span>Node.js, Express.js, MongoDB</span>
                </div>
                <div className="mt-2">
                  <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-0.5">APIs & AI</span>
                  <span>REST APIs, Webhooks, OpenAI/Gemini</span>
                </div>
                <div className="mt-2">
                  <span className="block font-semibold text-white text-[11px] uppercase tracking-wider mb-0.5">Tools & Platforms</span>
                  <span>Git, GitHub, Postman, Vercel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Certifications & Coding Profiles */}
          <div className="bento-card col-span-12 md:col-span-6 p-8 flex flex-col justify-between items-start text-left min-h-[260px]">
            <div className="space-y-4 w-full">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 w-fit">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications & Code</h3>
              <div className="space-y-3.5 text-xs text-slate-400 font-light w-full">
                <div>
                  <h4 className="font-semibold text-white">NPTEL – Programming in Java (2025)</h4>
                  <p className="text-[10px] text-indigo-400 font-mono">Credential ID: NPTEL25CS57S1245101433</p>
                </div>
                <div className="border-t border-slate-900/60 pt-2">
                  <h4 className="font-semibold text-white">HackerRank Certified Java (Basic) (2026)</h4>
                  <p className="text-[10px] text-indigo-400 font-mono">HackerRank Profile Verified</p>
                </div>
                <div className="border-t border-slate-900/60 pt-2 flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  <span>LeetCode: Consistent Solver</span>
                  <span>GitHub: Active Repository Developer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Status & Location */}
          <div className="bento-card col-span-12 md:col-span-6 p-6 flex flex-col justify-between text-left min-h-[160px]">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
              <MapPin size={20} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 relative">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="w-2 h-2 bg-emerald-500 rounded-full absolute" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider ml-1">Available for Roles</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">Erode, India</h4>
              <p className="text-[10px] text-slate-500">Open to entry-level software development and full stack developer roles</p>
            </div>
          </div>

          {/* Card 6: Scrolling tech track */}
          <div className="bento-card col-span-12 md:col-span-6 p-6 flex flex-col justify-between text-left min-h-[160px] overflow-hidden">
            <div>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit mb-3">
                <Code size={20} />
              </div>
              <h4 className="font-bold text-white text-sm">Tech Stack</h4>
              <p className="text-xs text-slate-500 mt-0.5">Quick list of tools in my daily workflow</p>
            </div>
            
            {/* Infinite Marquee Track */}
            <div className="relative w-full overflow-hidden py-3 border-t border-slate-900/50 mt-3">
              <div className="marquee-track gap-3">
                {skillsList.map((skill, idx) => (
                  <span key={`s1-${idx}`} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-900 text-xs font-semibold text-slate-300 whitespace-nowrap">
                    {skill}
                  </span>
                ))}
                {skillsList.map((skill, idx) => (
                  <span key={`s2-${idx}`} className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-900 text-xs font-semibold text-slate-300 whitespace-nowrap">
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Fade Overlays */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#07080a] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#07080a] to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 border-t border-slate-900 bg-[#08090d]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">Projects</h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">Some of the web applications and tools I've built recently.</p>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                      : 'border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies alternating vertical strips */}
          <div className="space-y-4">
            {filteredProjects.map((project, index) => {
              const itemNumber = String(index + 1).padStart(2, '0');
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={project.id} 
                  className="case-study-strip p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 text-left"
                >
                  {/* Left Metadata & Info */}
                  <div className={`flex-1 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl md:text-5xl font-display font-light text-slate-800 tracking-tight">
                        {itemNumber}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Tech tag cluster */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold text-slate-300 bg-slate-900/60 border border-slate-850 px-2.5 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-4 pt-4">
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-indigo-400 transition"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
                      >
                        <Github size={14} />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Image Mockup */}
                  <div className={`flex-1 w-full max-w-xl ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-slate-950 aspect-video group/img">
                      
                      {/* Browser Header Bar */}
                      <div className="bg-slate-900/60 px-4 py-2.5 border-b border-white/5 flex items-center gap-1.5 relative z-20">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                        <div className="text-[10px] text-slate-500 mx-auto select-none font-mono tracking-tight">www.demo.local</div>
                      </div>

                      {/* Cover Photo */}
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-[1.01] transition-all duration-500"
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16 text-left">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Reviews</span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">Feedback</h2>
              <p className="text-sm text-slate-400 leading-relaxed font-light">What evaluations or reviews project teammates and evaluators have left.</p>
            </div>
            
            <div className="lg:col-span-6 flex justify-start lg:justify-end">
              <a 
                href="#leave-feedback" 
                className="px-5 py-2.5 rounded-full border border-slate-800 hover:border-slate-600 bg-slate-900/30 hover:bg-slate-900/60 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Leave a Review
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {approvedFeedbacks.length > 0 ? (
              approvedFeedbacks.map((fb, idx) => {
                const isSpanTwo = idx === 0;
                
                return (
                  <div 
                    key={fb.id} 
                    className={`p-6 md:p-8 bg-slate-900/20 border border-slate-900 rounded-2xl glass-light flex flex-col justify-between relative ${
                      isSpanTwo ? 'md:col-span-2' : 'col-span-1'
                    }`}
                  >
                    <div className="absolute top-6 right-6 text-indigo-500/10">
                      <MessageSquare size={36} />
                    </div>
                    
                    <p className="text-sm md:text-base text-slate-300 italic relative z-10 leading-relaxed font-light">
                      "{fb.comment}"
                    </p>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-900/50">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-display font-extrabold text-sm">
                        {fb.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none">{fb.name}</h4>
                        <span className="text-[11px] text-slate-500 mt-1 block">{fb.role} @ {fb.company}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500 italic text-sm col-span-3 text-center">No reviews approved yet. Submit yours below!</p>
            )}
          </div>

          {/* Testimonial Form anchor */}
          <div id="leave-feedback" className="mt-16 max-w-xl mx-auto bg-slate-900/20 border border-slate-900 p-8 rounded-3xl glass text-left animate-fade-in">
            <h3 className="text-lg font-bold text-white mb-1">Leave Feedback</h3>
            <p className="text-xs text-slate-400 mb-6">Your submission will be reviewed before appearing on the site.</p>

            {feedbackStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Review submitted! Pending approval.</span>
              </div>
            )}

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                  placeholder="e.g. David"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role/Title</label>
                  <input
                    type="text"
                    value={feedbackForm.role}
                    onChange={(e) => setFeedbackForm({...feedbackForm, role: e.target.value})}
                    placeholder="e.g. Developer"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Company</label>
                  <input
                    type="text"
                    value={feedbackForm.company}
                    onChange={(e) => setFeedbackForm({...feedbackForm, company: e.target.value})}
                    placeholder="e.g. Startup"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Review</label>
                <textarea
                  required
                  rows={3}
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                  placeholder="Describe your experience working together..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-indigo-600/15 cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center flex flex-col items-center space-y-2 mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Connect</span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">Let's Talk</h2>
          <p className="text-sm text-slate-400 max-w-md">Have a project in mind or want to work together? Feel free to reach out.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Left */}
          <div className="md:col-span-5 bg-slate-900/10 border border-slate-900 p-8 rounded-3xl text-left flex flex-col justify-between glass-light">
            <div className="space-y-6">
              <h3 className="font-bold text-white text-lg">Contact Details</h3>
              
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 leading-none">Email</h4>
                  <a href="mailto:indhumathi93428@gmail.com" className="text-sm text-slate-300 hover:text-white transition mt-1 block">
                    indhumathi93428@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 leading-none">Location</h4>
                  <span className="text-sm text-slate-300 mt-1 block">Erode, India</span>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="pt-8 border-t border-slate-900 mt-8">
              <h4 className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Social Links</h4>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/indhumathi-3373" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-2.5 w-10 h-10 rounded-full bg-slate-950 border border-slate-900 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition cursor-pointer"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://linkedin.com/in/indhumathi-c" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-2.5 w-10 h-10 rounded-full bg-slate-950 border border-slate-900 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition cursor-pointer"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="md:col-span-7 bg-slate-900/20 border border-slate-900 p-8 rounded-3xl glass text-left">
            {contactStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Message sent! I will get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="e.g. John"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="e.g. john@domain.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="e.g. Collaboration Proposal"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Enter details of your message..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-900 rounded-lg text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send size={14} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-900 text-center text-xs text-slate-600 bg-[#08090d]">
        <p>© {new Date().getFullYear()} Indhumathi C. All rights reserved.</p>
        <p className="mt-1">Built with React and Tailwind CSS.</p>
      </footer>

      {/* --- ADMIN PANEL OVERLAY DASHBOARD --- */}
      <AnimatePresence>
        {isAdminOpen && (
          <Dashboard 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
            onAuthChange={handleAdminAuthChange} 
            onDataChange={refreshData}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
