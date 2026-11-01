// =============================================================================
// YOJITH.exe — CORE DATA CONFIGURATION
// Configured with GitHub: yojith551
// =============================================================================

export const PORTFOLIO_DATA = {
  profile: {
    name: "Yojith Thati",
    systemName: "YOJITH.exe",
    tagline: "Building my future, one line of code at a time.",
    heroGreeting: "Hey, I'm Yojith.",
    roles: [
      "Aspiring Software Engineer",
      "B.Tech Student @ NST Pune",
      "Full-Stack & Systems Explorer",
      "AI & Data Science Enthusiast",
      "Future Tech Innovator"
    ],
    heroQuote: "Every great journey starts with a single step. Mine starts with a single line of code.",
    institution: "Newton School of Technology, Pune",
    degree: "B.Tech in Computer Science & Artificial Intelligence",
    batch: "2024 - 2028 (First-Year Student)",
    level: 1,
    levelTitle: "First-Year Developer",
    currentXP: 1850,
    nextLevelXP: 3000,
    status: "ONLINE // SYSTEM ACTIVE",
    location: "Pune, Maharashtra, India",
    githubUsername: "yojith551",
    
    // Origin Story Narrative
    originStory: [
      "I'm a computer science student who believes that true mastery in technology is forged by building real-world software from first principles.",
      "From solving algorithmic challenges to architecting responsive web apps and experimenting with modern backend stacks, I'm relentlessly learning, iterating, and pushing limits.",
      "My journey is just beginning, but my vision is crystal clear.",
      "I aim to engineer high-impact distributed systems, contribute to transformative open-source projects, and build technology that empowers thousands across the globe."
    ],

    // Stats Matrix (0 - 100)
    stats: [
      { name: "Python Core & Scripting", value: 85, icon: "Code", color: "from-cyan-500 to-blue-500" },
      { name: "Problem Solving & Logic", value: 80, icon: "Cpu", color: "from-purple-500 to-indigo-500" },
      { name: "Consistency & Iron Grit", value: 95, icon: "Flame", color: "from-emerald-400 to-teal-500" },
      { name: "System Architecture", value: 75, icon: "Layers", color: "from-amber-400 to-orange-500" },
      { name: "Curiosity & Innovation", value: 98, icon: "Sparkles", color: "from-fuchsia-500 to-pink-500" },
      { name: "Git & Version Control", value: 82, icon: "GitBranch", color: "from-sky-400 to-cyan-500" },
    ],

    // Unlocked Character Traits / Perks
    perks: [
      { id: "perk_builder", name: "Builder Mindset", description: "Learns through hands-on code execution, rapid prototyping, and shipping real features." },
      { id: "perk_deepwork", name: "Deep Focus Mode", description: "Sustained high-velocity problem-solving during intensive engineering sprints." },
      { id: "perk_gym", name: "Iron Discipline", description: "Believes progressive overload and daily habits beat short-term motivation every time." },
      { id: "perk_open_source", name: "Open Source Aspirant", description: "Dedicated to lowering the barrier for new developers through FirstPR." },
    ],

    // Active Quests
    activeQuests: [
      { title: "Master Data Structures & Big-O Analysis", progress: 60, status: "IN PROGRESS" },
      { title: "Scale FirstPR Open Source Platform", progress: 75, status: "ACTIVE DEVELOPMENT" },
      { title: "Advance in C++ & Modern Systems Programming", progress: 50, status: "IN PROGRESS" },
      { title: "Compete in National Hackathons 2026", progress: 85, status: "COMBAT READY" }
    ]
  },

  // =============================================================================
  // MY WORLD MAP (Passions)
  // =============================================================================
  worlds: [
    {
      id: "code-city",
      name: "CODE CITY",
      subtitle: "The Engineering Nexus",
      themeColor: "cyan",
      accent: "#00f0ff",
      icon: "Terminal",
      quote: "Every problem is a new opportunity to think, experiment, and create.",
      description: "The central matrix where raw logic transforms into scalable software. From mastering Python algorithms and C++ performance to crafting modern web interfaces and managing git trees, this is where my journey as an engineer accelerates.",
      highlights: [
        "Clean, production-ready Python logic & scripts",
        "Algorithmic problem-solving & optimization",
        "Modern reactive frontends with React & Vite",
        "Git & GitHub collaboration workflows (@yojith551)",
        "Foundations of computer systems and memory"
      ],
      stats: { "Lines Written": "20,000+", "Bugs Squashed": "500+", "Uptime": "99.9%" },
      tag: "CORE DISCIPLINE"
    },
    {
      id: "ai-nexus",
      name: "AI & SYSTEMS NEXUS",
      subtitle: "The Frontier of Intelligent Computation",
      themeColor: "emerald",
      accent: "#00ff9d",
      icon: "Cpu",
      quote: "The best way to predict the future of computing is to engineer it.",
      description: "Exploring the convergence of artificial intelligence, autonomous agent workflows, neural architectures, and data engineering. Understanding how machine learning algorithms scale to solve real human problems.",
      highlights: [
        "LLM integrations and autonomous workflows",
        "Data analysis and algorithmic predictions",
        "Exploring neural models & PyTorch fundamentals",
        "Computational efficiency & scalable pipelines",
        "Future-proof AI application design"
      ],
      stats: { "Focus Area": "Applied AI", "Curiosity": "Limitless", "Status": "Active Study" },
      tag: "EMERGING TECH"
    },
    {
      id: "fitness-zone",
      name: "FITNESS ZONE",
      subtitle: "The Crucible of Physical & Mental Resilience",
      themeColor: "purple",
      accent: "#a855f7",
      icon: "Dumbbell",
      quote: "Consistency beats motivation. Every day is an opportunity to become better.",
      description: "Progress in engineering mirrors progress in the gym: progressive overload, relentless consistency, and showing up regardless of distractions. The discipline forged under the barbell fuels marathon coding and debugging sessions.",
      highlights: [
        "Strength training & progressive overload",
        "Physical stamina for sustained cognitive output",
        "Structured discipline & nutrition routines",
        "Mental endurance through fatigue & stress",
        "Continuous personal growth as a lifelong habit"
      ],
      stats: { "Gym Consistency": "5-6 Days/Wk", "Discipline": "Ironclad", "Mindset": "Progressive" },
      tag: "LIFESTYLE & GRIT"
    },
    {
      id: "cinema-universe",
      name: "CINEMA UNIVERSE",
      subtitle: "The Theater of Imagination & Storytelling",
      themeColor: "pink",
      accent: "#ec4899",
      icon: "Film",
      quote: "I enjoy exploring different stories, characters, and worlds through cinema.",
      description: "Cinema is masterclass visual storytelling, pacing, and human perspective. Examining how legendary directors construct cyberpunk atmospheres and tense narratives directly inspires my approach to intuitive, memorable UI/UX design.",
      highlights: [
        "Sci-Fi & Cyberpunk worldbuilding (Blade Runner, Interstellar)",
        "Complex narrative pacing & character arcs",
        "Cinematography, sound design & visual atmosphere",
        "Inspiration for interactive futuristic software experiences",
        "Wide perspectives on technology's impact on society"
      ],
      stats: { "Favorite Genre": "Sci-Fi / Thriller", "Aesthetic": "Cyberpunk", "Inspiration": "High" },
      tag: "CREATIVE PERSPECTIVE"
    }
  ],

  // =============================================================================
  // SKILL TREE (RPG Progression)
  // =============================================================================
  skillTree: {
    categories: [
      {
        id: "unlocked",
        title: "UNLOCKED // ACTIVE ARSENAL",
        badge: "Active Mastery",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
        skills: [
          {
            id: "python",
            name: "Python Fundamentals & OOP",
            status: "unlocked",
            level: "Proficient Core",
            xpValue: "+350 XP",
            description: "Writing clean, modular scripts, object-oriented design, standard library utilities, and automated solvers.",
            tags: ["OOP", "Functions", "File I/O", "Modules"]
          },
          {
            id: "problem-solving",
            name: "Problem-Solving & Logic",
            status: "unlocked",
            level: "Active Daily Practice",
            xpValue: "+300 XP",
            description: "Deconstructing complex logical hurdles into clean, step-by-step algorithms with edge-case handling.",
            tags: ["Logic", "Dry Runs", "Edge Cases", "Optimization"]
          },
          {
            id: "basic-ds",
            name: "Data Structures Foundations",
            status: "unlocked",
            level: "Hands-on Mastery",
            xpValue: "+280 XP",
            description: "Arrays, lists, hash maps/dictionaries, tuples, sets, stack/queue paradigms, and slice mechanics.",
            tags: ["Hash Maps", "Arrays", "Sets", "Tuples"]
          },
          {
            id: "git-github",
            name: "Git & GitHub Workflow",
            status: "unlocked",
            level: "Daily Workflow (@yojith551)",
            xpValue: "+250 XP",
            description: "Version control, branching, committing, pull requests, resolving merge conflicts, and open collaboration.",
            tags: ["Branches", "Commits", "PRs", "GitHub"]
          },
          {
            id: "cli",
            name: "Terminal & Shell Navigation",
            status: "unlocked",
            level: "Comfortable",
            xpValue: "+200 XP",
            description: "Navigating Unix/Linux environments, package management, shell scripts, and dev tools.",
            tags: ["Bash/Zsh", "Navigation", "NPM", "Vim Basics"]
          }
        ]
      },
      {
        id: "learning",
        title: "CURRENTLY LEVELING UP // LEARNING",
        badge: "In Training",
        color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20",
        skills: [
          {
            id: "cpp",
            name: "C++ & Systems Programming",
            status: "learning",
            level: "Active Practice",
            xpValue: "+450 XP (In Progress)",
            description: "Memory allocation, pointers, fast execution, STL containers, and competitive programming foundations.",
            tags: ["Pointers", "STL", "Memory", "Speed"]
          },
          {
            id: "javascript",
            name: "Modern JavaScript (ES6+)",
            status: "learning",
            level: "Active Practice",
            xpValue: "+400 XP (In Progress)",
            description: "Async/await, promises, functional methods, event loop, and dynamic client-side interactions.",
            tags: ["Async/Await", "Promises", "ES6+", "DOM"]
          },
          {
            id: "react",
            name: "React & Modern UI Systems",
            status: "learning",
            level: "Building Applications",
            xpValue: "+480 XP (In Progress)",
            description: "Component lifecycle, modern hooks (useState, useEffect, useMemo), state flow, and Vite tooling.",
            tags: ["Hooks", "Components", "Tailwind", "Vite"]
          },
          {
            id: "dsa",
            name: "Data Structures & Algorithms",
            status: "learning",
            level: "Rigorous Study",
            xpValue: "+500 XP (In Progress)",
            description: "Linked lists, trees, binary search, sorting algorithms, dynamic programming, and Big-O efficiency.",
            tags: ["Big-O", "Trees", "Sorting", "Graphs"]
          }
        ]
      },
      {
        id: "future",
        title: "LOCKED HORIZONS // FUTURE UNLOCKS",
        badge: "Roadmap Quest",
        color: "text-purple-400 border-purple-500/30 bg-purple-950/20",
        skills: [
          {
            id: "fullstack",
            name: "Full-Stack Distributed Systems",
            status: "locked",
            level: "Level 3 Unlock",
            xpValue: "Req. 5000 XP",
            description: "Scalable backend architecture, PostgreSQL/MongoDB, caching layers (Redis), and secure authentication.",
            tags: ["Node.js", "FastAPI", "PostgreSQL", "APIs"]
          },
          {
            id: "ai",
            name: "Artificial Intelligence & LLMs",
            status: "locked",
            level: "Level 4 Unlock",
            xpValue: "Req. 7500 XP",
            description: "Autonomous agents, neural networks, retrieval-augmented generation (RAG), and model fine-tuning.",
            tags: ["LLMs", "RAG", "Agent Systems", "Neural Nets"]
          },
          {
            id: "cloud-devops",
            name: "Cloud Architecture & DevOps",
            status: "locked",
            level: "Level 5 Unlock",
            xpValue: "Req. 10000 XP",
            description: "Docker containerization, Kubernetes, CI/CD pipelines, cloud deployment, and fault-tolerant architectures.",
            tags: ["Docker", "K8s", "CI/CD", "AWS/GCP"]
          }
        ]
      }
    ]
  },

  // =============================================================================
  // PROJECTS (My Inventory)
  // Clean, focused showcase of functional projects
  // =============================================================================
  projects: [
    {
      id: "road-to-future",
      title: "Road to the Future 3D",
      codename: "GAME-EXE-01",
      tagline: "High-octane 3D motorcycle highway runner inspired by Traffic Rider.",
      description: "An arcade-grade 3D motorcycle racing simulation built directly into this portfolio using canvas perspective mathematics. Weave through moving cyber traffic (cars, trucks, speeders), pick up knowledge orbs, and test your split-second reflexes at 200+ km/h.",
      techStack: ["HTML5 Canvas", "3D Perspective Math", "Web Audio API", "React"],
      status: "PLAYABLE RIGHT NOW",
      rarity: "FLAGSHIP SIMULATION",
      featured: true,
      githubUrl: "https://github.com/yojith551",
      liveUrl: "#game",
      highlights: [
        "Pseudo-3D perspective highway with dynamic curving roads and neon city horizon",
        "Realistic Traffic Rider style AI traffic (sedans, cyber trucks, speeding bikes)",
        "Cockpit HUD with analog/digital speedometer, RPM, boost thrusters, and sound engine",
        "Dynamic day/night cyberpunk lighting, collectible knowledge orbs, and high score tracking"
      ]
    },
    {
      id: "firstpr",
      title: "FirstPR — Open Source Discovery",
      codename: "QUEST-OSS-02",
      tagline: "Making the first step into open source frictionless for new developers.",
      description: "A specialized platform engineered to help beginner developers discover curated 'good first issue' opportunities across high-quality GitHub repositories, complete with step-by-step guidance on branching, pull requests, and open-source etiquette.",
      techStack: ["React", "Vite", "Tailwind CSS", "GitHub REST API"],
      status: "ACTIVE PROJECT",
      rarity: "OPEN SOURCE",
      featured: true,
      githubUrl: "https://github.com/yojith551/FirstPR",
      liveUrl: "https://github.com/yojith551/FirstPR",
      highlights: [
        "Curated real-time feed for beginner-friendly GitHub issue tickets",
        "Interactive lifecycle visualization: Fork -> Branch -> Commit -> PR",
        "Clean, responsive cyberpunk-inspired developer interface",
        "Empowers university freshmen to make verified open-source contributions"
      ]
    }
  ],

  // =============================================================================
  // MY MISSION (The Future I'm Building)
  // =============================================================================
  missions: {
    title: "MISSION: BUILD SOMETHING THAT MATTERS",
    subtitle: "Strategic progression directives from first-year foundation milestones to global tech impact.",
    shortTerm: [
      {
        id: "st-1",
        title: "Master Core Programming & Algorithmic Intuition",
        desc: "Build absolute fluency in Python and C++, writing high-performance, modular code with intuition for edge cases.",
        status: "IN PROGRESS",
        progress: 80,
        targetDate: "Year 1"
      },
      {
        id: "st-2",
        title: "Scale Open-Source Impact via @yojith551",
        desc: "Make continuous, meaningful contributions to open-source software and scale FirstPR to help hundreds of freshmen developers.",
        status: "ACTIVE FOCUS",
        progress: 65,
        targetDate: "Year 1-2"
      },
      {
        id: "st-3",
        title: "Deploy Real-World Full-Stack Platforms",
        desc: "Move beyond toy code to engineer and host production-grade web applications that solve tangible problems.",
        status: "ACTIVE FOCUS",
        progress: 70,
        targetDate: "Year 1-2"
      },
      {
        id: "st-4",
        title: "Win & Lead in Collegiate Hackathons",
        desc: "Form high-synergy engineering teams to ideate, prototype, and ship innovative software under 36-hour sprints.",
        status: "PREPARING",
        progress: 55,
        targetDate: "Upcoming 2026"
      }
    ],
    longTerm: [
      {
        id: "lt-1",
        title: "Become a Senior Full-Stack & Systems Engineer",
        desc: "Architect resilient microservices, low-latency APIs, distributed data pipelines, and responsive client systems.",
        status: "LONG TERM",
        milestone: "MILESTONE 01"
      },
      {
        id: "lt-2",
        title: "Engineer Transformative AI-Powered Software",
        desc: "Build software that harnesses modern neural computing to solve critical societal and productivity bottlenecks.",
        status: "LONG TERM",
        milestone: "MILESTONE 02"
      },
      {
        id: "lt-3",
        title: "Pursue Roles at Leading Global Technology Companies",
        desc: "Collaborate with world-class engineers, mastering industry standards in high-concurrency systems.",
        status: "LONG TERM",
        milestone: "MILESTONE 03"
      },
      {
        id: "lt-4",
        title: "Build an International Career Without Borders",
        desc: "Expand horizons globally, contributing to software ecosystems that impact users across continents.",
        status: "NORTH STAR",
        milestone: "NORTH STAR"
      }
    ]
  },

  // =============================================================================
  // CONTACT & MISSION CONTROL
  // =============================================================================
  contact: {
    title: "MISSION CONTROL",
    tagline: "Have an interesting project, idea, or opportunity? Let's build something together.",
    email: "yojith551@gmail.com",
    location: "Newton School of Technology, Pune, India",
    availability: "Available for Software Internships, Open Source & Tech Collabs",
    socials: [
      { name: "GitHub", url: "https://github.com/yojith551", username: "@yojith551", icon: "Github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/yojith-thati", username: "yojith-thati", icon: "Linkedin" },
      { name: "Email", url: "mailto:yojith551@gmail.com", username: "yojith551@gmail.com", icon: "Mail" }
    ],
    resume: {
      filename: "Yojith_Thati_Resume.pdf",
      lastUpdated: "2026",
      summary: "First-Year B.Tech Student at Newton School of Technology, Pune. Passionate about Python, Web Development, DSA, and Open Source."
    }
  },

  // =============================================================================
  // EASTER EGGS & ACHIEVEMENTS DEFINITIONS
  // =============================================================================
  achievements: [
    { id: "first_explorer", title: "First Explorer", description: "Initiated the journey through the YOJITH.exe digital universe.", icon: "Compass" },
    { id: "code_collector", title: "Code Collector", description: "Inspected the complete RPG Skill Tree nodes.", icon: "FolderCode" },
    { id: "traffic_rider", title: "Traffic Rider Ace", description: "Accelerated past 600m in the 3D motorcycle highway runner.", icon: "Bike" },
    { id: "future_builder", title: "Future Builder", description: "Explored the long-term mission directives and vision.", icon: "Rocket" },
    { id: "terminal_hacker", title: "Terminal Hacker", description: "Executed custom commands in the interactive system terminal.", icon: "Terminal" },
    { id: "konami_master", title: "Konami Legend", description: "Unlocked the secret Developer God Mode via Konami code.", icon: "Zap" }
  ]
};
