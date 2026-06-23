const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "Flowz – AI Powered Workflow Automation Tool",
    description: "Developed a no-code automation tool that generates workflows from natural language prompts. Features a visual node-based system with real-time execution and API integrations.",
    category: "AI & Data",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["React.js", "Node.js", "MongoDB", "REST APIs", "OpenAI API", "Gemini API"],
    liveLink: "https://flowz-agent.vercel.app",
    githubLink: "https://github.com/indhumathi-3373"
  },
  {
    id: "p2",
    title: "Walpsto – Personal Wallet Web App",
    description: "Developed a full-stack personal wallet web app with session-authenticated private diary entries, document storage, and an admin feedback stats dashboard.",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Express-Session", "Multer"],
    liveLink: "https://walpsto.vercel.app",
    githubLink: "https://github.com/indhumathi-3373"
  }
];

const DEFAULT_FEEDBACK = [
  {
    id: "f1",
    name: "Dev Team Member",
    role: "Full Stack Developer",
    company: "CSE Project Group",
    comment: "Indhumathi's work on Flowz made the visual node builder extremely intuitive. Her integration of the OpenAI API and state handling was clean and robust.",
    approved: true,
    createdAt: "2026-06-05T10:00:00Z"
  },
  {
    id: "f2",
    name: "Project Evaluator",
    role: "Professor",
    company: "Engineering Department",
    comment: "The Walpsto application showed great understanding of session-based authentication and secure document storage. A well-designed student portfolio project.",
    approved: true,
    createdAt: "2026-06-06T14:30:00Z"
  }
];

const DEFAULT_MESSAGES = [
  {
    id: "m1",
    name: "Recruiter",
    email: "hire@techcorp.com",
    subject: "Developer Role Inquiry",
    message: "Hi Indhumathi, I saw your Flowz project. Let's schedule a call to discuss full-stack opportunities.",
    read: false,
    createdAt: "2026-06-08T11:45:00Z"
  }
];

// Initialize localStorage keys if they don't exist
const initStorage = () => {
  // Clear old storage if it contains old mock data
  const existing = localStorage.getItem("indhu_projects");
  if (existing && existing.includes("AetherCloud")) {
    localStorage.removeItem("indhu_projects");
    localStorage.removeItem("indhu_feedback");
    localStorage.removeItem("indhu_messages");
  }

  if (!localStorage.getItem("indhu_projects")) {
    localStorage.setItem("indhu_projects", JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem("indhu_feedback")) {
    localStorage.setItem("indhu_feedback", JSON.stringify(DEFAULT_FEEDBACK));
  }
  if (!localStorage.getItem("indhu_messages")) {
    localStorage.setItem("indhu_messages", JSON.stringify(DEFAULT_MESSAGES));
  }
};

initStorage();

export const storage = {
  // PROJECTS CRUD
  getProjects: () => {
    initStorage();
    return JSON.parse(localStorage.getItem("indhu_projects"));
  },
  saveProject: (project) => {
    initStorage();
    const projects = storage.getProjects();
    if (project.id) {
      // Edit
      const index = projects.findIndex(p => p.id === project.id);
      if (index !== -1) projects[index] = project;
    } else {
      // Create
      project.id = "p_" + Date.now();
      projects.push(project);
    }
    localStorage.setItem("indhu_projects", JSON.stringify(projects));
    return project;
  },
  deleteProject: (id) => {
    initStorage();
    let projects = storage.getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem("indhu_projects", JSON.stringify(projects));
  },

  // FEEDBACK MODERATION
  getFeedback: () => {
    initStorage();
    return JSON.parse(localStorage.getItem("indhu_feedback"));
  },
  addFeedback: (feedback) => {
    initStorage();
    const list = storage.getFeedback();
    const newItem = {
      id: "f_" + Date.now(),
      name: feedback.name,
      role: feedback.role || "Visitor",
      company: feedback.company || "Guest",
      comment: feedback.comment,
      approved: false, // Moderated by default
      createdAt: new Date().toISOString()
    };
    list.push(newItem);
    localStorage.setItem("indhu_feedback", JSON.stringify(list));
    return newItem;
  },
  toggleFeedbackApproval: (id) => {
    initStorage();
    const list = storage.getFeedback();
    const index = list.findIndex(f => f.id === id);
    if (index !== -1) {
      list[index].approved = !list[index].approved;
      localStorage.setItem("indhu_feedback", JSON.stringify(list));
    }
  },
  deleteFeedback: (id) => {
    initStorage();
    let list = storage.getFeedback();
    list = list.filter(f => f.id !== id);
    localStorage.setItem("indhu_feedback", JSON.stringify(list));
  },

  // MESSAGES
  getMessages: () => {
    initStorage();
    return JSON.parse(localStorage.getItem("indhu_messages"));
  },
  addMessage: (msg) => {
    initStorage();
    const list = storage.getMessages();
    const newItem = {
      id: "m_" + Date.now(),
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      read: false,
      createdAt: new Date().toISOString()
    };
    list.push(newItem);
    localStorage.setItem("indhu_messages", JSON.stringify(list));
    return newItem;
  },
  markMessageRead: (id, readStatus = true) => {
    initStorage();
    const list = storage.getMessages();
    const index = list.findIndex(m => m.id === id);
    if (index !== -1) {
      list[index].read = readStatus;
      localStorage.setItem("indhu_messages", JSON.stringify(list));
    }
  },
  deleteMessage: (id) => {
    initStorage();
    let list = storage.getMessages();
    list = list.filter(m => m.id !== id);
    localStorage.setItem("indhu_messages", JSON.stringify(list));
  }
};
