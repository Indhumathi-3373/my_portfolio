import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { 
  X, LogOut, Plus, Edit2, Trash2, Check, Star, ShieldAlert,
  Mail, MessageSquare, Briefcase, Key, Eye, EyeOff, ExternalLink
} from 'lucide-react';

export default function Dashboard({ isOpen, onClose, onAuthChange, onDataChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data State
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [messages, setMessages] = useState([]);

  // CRUD Edit State
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    image: '',
    tags: '',
    liveLink: '',
    githubLink: ''
  });

  // Load state from local storage on mount/auth change
  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('indhu_admin_logged_in') === 'true';
    setIsLoggedIn(loggedInStatus);
    if (loggedInStatus) {
      loadData();
    }
  }, []);

  const loadData = () => {
    setProjects(storage.getProjects());
    setFeedbacks(storage.getFeedback());
    setMessages(storage.getMessages());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = import.meta.env.VITE_ADMIN;
const pass = import.meta.env.VITE_PASS;
    if (username === admin && password === pass ) {
      sessionStorage.setItem('indhu_admin_logged_in', 'true');
      setIsLoggedIn(true);
      setAuthError('');
      loadData();
      onAuthChange(true);
    } else {
      setAuthError('Invalid username or password. Try again');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('indhu_admin_logged_in');
    setIsLoggedIn(false);
    onAuthChange(false);
  };

  // --- PROJECTS HANDLERS ---
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      category: 'Full Stack',
      image: '',
      tags: '',
      liveLink: '',
      githubLink: ''
    });
    setShowProjectModal(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      category: proj.category,
      image: proj.image,
      tags: proj.tags.join(', '),
      liveLink: proj.liveLink,
      githubLink: proj.githubLink
    });
    setShowProjectModal(true);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    // Convert comma separated tags to array
    const tagArray = projectForm.tags
      ? projectForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    const defaultImages = [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"
    ];

    const payload = {
      id: editingProject ? editingProject.id : null,
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      image: projectForm.image || defaultImages[Math.floor(Math.random() * defaultImages.length)],
      tags: tagArray,
      liveLink: projectForm.liveLink || '#',
      githubLink: projectForm.githubLink || '#'
    };

    storage.saveProject(payload);
    setShowProjectModal(false);
    loadData();
    if (onDataChange) onDataChange();
  };

  const handleDeleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      storage.deleteProject(id);
      loadData();
      if (onDataChange) onDataChange();
    }
  };

  // --- FEEDBACK HANDLERS ---
  const handleToggleFeedback = (id) => {
    storage.toggleFeedbackApproval(id);
    loadData();
    if (onDataChange) onDataChange();
  };

  const handleDeleteFeedback = (id) => {
    if (confirm('Delete this testimonial feedback?')) {
      storage.deleteFeedback(id);
      loadData();
      if (onDataChange) onDataChange();
    }
  };

  // --- MESSAGE HANDLERS ---
  const handleToggleMessageRead = (id, currentRead) => {
    storage.markMessageRead(id, !currentRead);
    loadData();
  };

  const handleDeleteMessage = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      storage.deleteMessage(id);
      loadData();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      
      {/* Main Admin Card */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Close Header */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* --- LOGIN SCREEN --- */}
        {!isLoggedIn ? (
          <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-md bg-slate-950/40 border border-slate-800 p-8 rounded-2xl shadow-xl glass">
              <div className="flex flex-col items-center mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400 border border-indigo-500/20 mb-3">
                  <ShieldAlert size={28} />
                </div>
                <h2 className="text-2xl font-display font-bold text-white text-center">Admin Access</h2>
                <p className="text-sm text-slate-400 text-center mt-1">Provide credentials to manage portfolio items</p>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter ID"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  Authenticate
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* --- DASHBOARD SCREEN --- */
          <>
            {/* Admin Header */}
            <div className="bg-slate-950/60 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-lg font-display font-bold text-white">Console Board</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">Active</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 hidden sm:inline">Signed in as <strong>admin</strong></span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-xs font-semibold transition cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Sub-Layout Tabs */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Sidebar Tabs */}
              <div className="w-48 bg-slate-950/40 border-r border-slate-800 flex flex-col p-4 space-y-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    activeTab === 'projects' 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Briefcase size={16} />
                  <span>Projects</span>
                </button>

                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    activeTab === 'feedback' 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Star size={16} />
                  <span>Testimonials</span>
                  {feedbacks.filter(f => !f.approved).length > 0 && (
                    <span className="ml-auto w-2 h-2 bg-amber-500 rounded-full" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    activeTab === 'messages' 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Mail size={16} />
                  <span>Messages</span>
                  {messages.filter(m => !m.read).length > 0 && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                      {messages.filter(m => !m.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Tab Display Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-900/40">
                
                {/* 1. PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">Portfolio Projects</h3>
                        <p className="text-xs text-slate-400 mt-1">Manage, add, or edit showcased work items</p>
                      </div>
                      <button
                        onClick={handleOpenAddProject}
                        className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-indigo-600/15 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Project</span>
                      </button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((proj) => (
                        <div key={proj.id} className="p-4 bg-slate-950/30 border border-slate-800 rounded-xl flex items-start gap-4">
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-16 h-16 object-cover rounded-lg border border-slate-800"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                              {proj.category}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1 truncate">{proj.title}</h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                            
                            <div className="flex items-center gap-3 mt-3">
                              <button
                                onClick={() => handleOpenEditProject(proj)}
                                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
                              >
                                <Edit2 size={12} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="text-xs text-red-500/80 hover:text-red-400 flex items-center gap-1 transition cursor-pointer"
                              >
                                <Trash2 size={12} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. TESTIMONIALS TAB */}
                {activeTab === 'feedback' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white">Testimonial Feedback</h3>
                      <p className="text-xs text-slate-400 mt-1">Approve feedback forms or delete testimonials</p>
                    </div>

                    <div className="space-y-4">
                      {feedbacks.map((fb) => (
                        <div 
                          key={fb.id} 
                          className={`p-4 bg-slate-950/30 border rounded-xl flex justify-between items-start gap-4 transition-all duration-300 ${
                            fb.approved ? 'border-slate-800' : 'border-amber-500/30 bg-amber-500/[0.01]'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">{fb.name}</span>
                              <span className="text-slate-400 text-xs">{fb.role} @ {fb.company}</span>
                              
                              {!fb.approved && (
                                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                  Pending Moderation
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-300 italic mt-2">"{fb.comment}"</p>
                            <span className="text-[10px] text-slate-500 block mt-2">Submitted on {new Date(fb.createdAt).toLocaleDateString()}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleFeedback(fb.id)}
                              className={`p-2 rounded-lg border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                fb.approved 
                                  ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300' 
                                  : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                              title={fb.approved ? "Revoke Approval" : "Approve Testimonial"}
                            >
                              {fb.approved ? <EyeOff size={14} /> : <Check size={14} />}
                              <span>{fb.approved ? 'Hide' : 'Approve'}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteFeedback(fb.id)}
                              className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                              title="Delete Testimonial"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MESSAGES TAB */}
                {activeTab === 'messages' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white">Contact Messages</h3>
                      <p className="text-xs text-slate-400 mt-1">View inbox enquiries submitted by visitors</p>
                    </div>

                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`p-5 bg-slate-950/30 border rounded-xl flex flex-col sm:flex-row justify-between items-start gap-4 transition ${
                            msg.read ? 'border-slate-800 opacity-75' : 'border-indigo-500/30 bg-indigo-500/[0.01]'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-white text-sm">{msg.name}</span>
                              <a href={`mailto:${msg.email}`} className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                                {msg.email}
                              </a>
                              <span className="text-slate-500 text-xs">• {new Date(msg.createdAt).toLocaleString()}</span>
                            </div>
                            
                            <h4 className="text-xs font-bold text-slate-200 mt-2">Subject: {msg.subject}</h4>
                            <p className="text-xs text-slate-300 mt-2 bg-slate-900/50 p-3 rounded border border-slate-800/40 whitespace-pre-wrap">{msg.message}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleMessageRead(msg.id, msg.read)}
                              className={`p-2 rounded-lg border text-xs font-semibold transition flex items-center gap-1 cursor-pointer ${
                                msg.read 
                                  ? 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white' 
                                  : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
                              }`}
                            >
                              {msg.read ? <EyeOff size={14} /> : <Eye size={14} />}
                              <span>{msg.read ? 'Mark Unread' : 'Mark Read'}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </>
        )}

      </div>

      {/* --- ADD/EDIT PROJECT MODAL --- */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowProjectModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-display font-bold text-white mb-4">
              {editingProject ? 'Edit Portfolio Project' : 'Create New Project'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  placeholder="e.g. AetherCloud Dashboard"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  placeholder="Describe your project, functionalities, stack details, etc."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI & Data">AI & Data</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Image URL</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({...projectForm, image: e.target.value})}
                    placeholder="Leave blank for random"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                  placeholder="React, Tailwind, Node.js"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-lg shadow-indigo-600/15 cursor-pointer"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
