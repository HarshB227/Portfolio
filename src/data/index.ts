export const skills = [
  {
    icon: '🤖', name: 'Generative AI', width: 88,
    tags: ['GANs', 'Transformers', 'LLMs', 'Fine-Tuning', 'Prompt Engineering', 'Hugging Face'],
  },
  {
    icon: '🧠', name: 'Machine Learning & NLP', width: 85,
    tags: ['scikit-learn', 'XGBoost', 'Deep Learning', 'NLP', 'GCN', 'Feature Engineering'],
  },
  {
    icon: '⚡', name: 'Python & Frameworks', width: 90,
    tags: ['PyTorch', 'TensorFlow', 'FastAPI', 'Streamlit', 'PyTorch Geometric'],
  },
  {
    icon: '📊', name: 'Data Analysis', width: 87,
    tags: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'SQL', 'Big Data Analytics'],
  },
  {
    icon: '🛡️', name: 'Cybersecurity', width: 88,
    tags: ['Trend Micro', 'Firewall Config', 'Risk Assessment', 'Vuln Analysis', 'RBAC'],
  },
  {
    icon: '🌐', name: 'Networking', width: 90,
    tags: ['TCP/IP', 'OSPF', 'VLAN', 'DHCP', 'DNS', 'Wireshark'],
  },
  {
    icon: '☁️', name: 'Cloud & DevOps', width: 80,
    tags: ['Google Cloud', 'AWS', 'Compute Engine', 'IAM', 'Git', 'GitHub'],
  },
  {
    icon: '💻', name: 'Programming Languages', width: 85,
    tags: ['Python', 'SQL', 'JavaScript', 'Java', 'Bash', 'PowerShell'],
  },
];

export const projects = [
  {
    title: 'Transformer-based GAN for Controllable Music Generation',
    badge: 'MSc Project · 2025–2026',
    stack: 'Python · PyTorch · Hugging Face Transformers · GANs · MIDI',
    github: 'https://github.com/HarshB227/Transformer-based-GANs',
    wip: false,
    bullets: [
      'Designed and trained a hybrid GAN/Transformer architecture for symbolic music generation, trained on 10,000+ MIDI samples with conditional inputs for genre, tempo, and mood.',
      'Fine-tuned the Transformer generator and adversarial discriminator over 50+ epochs; evaluated with quantitative metrics and listening tests across 15+ users.',
      'Implemented conditional generation pipeline enabling control over melody, rhythm, and instrumentation.',
    ],
  },
  {
    title: 'Hybrid Crypto Risk & Scam Detection System',
    badge: 'MSc Project · In Progress',
    stack: 'Python · XGBoost · GCN · FastAPI · Streamlit · Blockchain APIs',
    github: 'https://github.com/HarshB227/Hybrid-Crypto-RIsk-and-Scam-Detection',
    wip: true,
    bullets: [
      'Built a deployed ML pipeline combining XGBoost (30+ engineered features), 2-layer GCN, graph risk propagation, Louvain community detection, and NLP to flag fraudulent wallets on Bitcoin & Ethereum.',
      'Engineered a FastAPI backend and Streamlit dashboard returning explainable risk scores for any wallet address in under 2 seconds.',
      'Targeted 90%+ detection accuracy across HIGH / MEDIUM / LOW risk tiers with score fusion from 4 weighted ML components.',
    ],
  },
  {
    title: 'Machine Learning Prediction Tool',
    badge: 'MSc Project · 2025',
    stack: 'Python · scikit-learn · Pandas · NumPy · Matplotlib',
    github: 'https://github.com/HarshB227/Stanford-Bird-Classifier',
    wip: false,
    bullets: [
      'Built an end-to-end supervised ML pipeline achieving 88% accuracy after model selection and hyperparameter tuning.',
      'Performed EDA, feature engineering, and benchmarked 6+ algorithms across regression and classification tasks.',
      'Validated performance with 5-fold cross-validation to ensure robust generalisation to unseen data.',
    ],
  },
  {
    title: 'Multi-Agent Systems Lab',
    badge: 'MSc Research · 2025–2026',
    stack: 'Python · Multi-Agent Systems · Reinforcement Learning · AI',
    github: 'https://github.com/HarshB227/Multi_Agent_Systems_Lab',
    wip: false,
    bullets: [
      'Explored multi-agent reinforcement learning and autonomous agent coordination as part of MSc coursework research.',
      'Implemented and compared coordination strategies between agents in simulated environments.',
    ],
  },
];

export const experience = [
  {
    icon: '💼',
    role: 'Desktop Support Engineer',
    company: 'Sol Spot Pvt Ltd',
    date: 'May 2024 – Dec 2024',
    bullets: [
      'Automated routine maintenance and patch management across 80+ workstations and 10+ servers using Bash and PowerShell, reducing manual workload by 40%.',
      'Provided Tier-2 technical support to 80+ end users, resolving 95% of tickets within SLA.',
      'Deployed and managed Trend Micro Endpoint Security, reducing malware-related incidents by 60%.',
      'Configured firewalls, security protocols, and RBAC for 5+ departments, hardening security posture.',
      'Conducted monthly security risk assessments and vulnerability testing.',
    ],
  },
  {
    icon: '🔐',
    role: 'Network Security Engineer',
    company: 'Ashtech Pvt Ltd · Internship',
    date: 'Sep 2023 – Feb 2024',
    bullets: [
      'Configured and administered Windows and Linux servers across 50+ endpoints, achieving 99% uptime on critical services.',
      'Applied 30+ security patches to enhance system stability, security compliance, and network resilience.',
      'Implemented user access controls and network permission policies for 3+ departments.',
      'Completed 100% of scheduled system maintenance and patch management updates on time.',
    ],
  },
];

export const education = [
  {
    emoji: '🎓',
    degree: 'Master of Science — Data Science',
    uni: 'University of Roehampton, London, UK',
    year: '2025 – 2026',
    badge: '🎓 Expected May 2026',
  },
  {
    emoji: '🏛️',
    degree: 'Bachelor of Science — Information Technology',
    uni: 'Ganpat University, India',
    year: '2021 – 2024',
    badge: '⭐ CGPA: 9.27 / 10',
  },
];

export const certifications = [
  { icon: '🤖', name: 'AWS Fundamentals of Generative AI',       issuer: 'Amazon Web Services · May 2026' },
  { icon: '🐍', name: 'Complete 2026 Python Bootcamp',            issuer: 'Udemy · May 2026' },
  { icon: '☁️', name: 'Architecting with Compute Engine',         issuer: 'Google Cloud · Coursera · 2024' },
  { icon: '🔵', name: 'Vision One Certification',                 issuer: 'Trend Micro · 2024' },
  { icon: '🌐', name: 'CCNA: Routing and Switching',              issuer: 'Cisco Networking Academy · 2023' },
  { icon: '🛡️', name: 'Network Security Fundamentals',            issuer: 'Cisco Networking Academy · 2023' },
  { icon: '🔐', name: 'Introduction to Cybersecurity',            issuer: 'Cisco Networking Academy · 2023' },
  { icon: '🏆', name: 'Fortinet NSE 1 & NSE 2',                  issuer: 'Fortinet Network Security Expert · 2023' },
];
