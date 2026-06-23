import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onOpenAdmin, isAdminLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-slate-950/70 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center space-x-2 text-2xl font-display font-extrabold tracking-wider group">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-[length:200%_auto] bg-clip-text text-transparent group-hover:bg-[100%_center] transition-all duration-500">
            INDHUMATHI
          </span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          
          {/* Admin Panel Access Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 hover:border-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-indigo-500/5 cursor-pointer"
          >
            {isAdminLoggedIn ? (
              <>
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <Shield size={14} />
                <span>Admin Login</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all cursor-pointer"
            aria-label="Admin Portal"
          >
            <Shield size={16} />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-b border-white/5 py-6 px-6 flex flex-col space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-white py-2 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
