/* =========================================================================
   data.js — everything you might want to edit lives in this file.
   Add an event, change an instructional area, adjust a weight: it all
   happens here. app.js never needs to be touched to update content.

   NOTE: instructional areas follow DECA's published exam blueprints.
   Verify against the current DECA Guide each season and edit below.
   ========================================================================= */

/* ---- Instructional areas per exam -------------------------------------
   weight = relative share of the exam. 3 = heaviest, 1 = lightest.
   The planner gives heavier areas more study sessions.               */

const EXAMS = {
  bac: {
    name: "Business Administration Core",
    note: "The core exam every Principles competitor takes.",
    areas: [
      { name: "Business Law", weight: 1 },
      { name: "Communications", weight: 2 },
      { name: "Customer Relations", weight: 1 },
      { name: "Economics", weight: 2 },
      { name: "Emotional Intelligence", weight: 3 },
      { name: "Entrepreneurship", weight: 1 },
      { name: "Financial Analysis", weight: 2 },
      { name: "Human Resources Management", weight: 1 },
      { name: "Information Management", weight: 2 },
      { name: "Marketing", weight: 1 },
      { name: "Operations", weight: 2 },
      { name: "Professional Development", weight: 2 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  mkt: {
    name: "Marketing Cluster Exam",
    note: "Core areas plus the seven marketing functions.",
    areas: [
      { name: "Business Law", weight: 1 },
      { name: "Channel Management", weight: 1 },
      { name: "Communications", weight: 1 },
      { name: "Customer Relations", weight: 1 },
      { name: "Economics", weight: 1 },
      { name: "Emotional Intelligence", weight: 2 },
      { name: "Financial Analysis", weight: 1 },
      { name: "Human Resources Management", weight: 1 },
      { name: "Information Management", weight: 1 },
      { name: "Market Planning", weight: 1 },
      { name: "Marketing-Information Management", weight: 2 },
      { name: "Operations", weight: 1 },
      { name: "Pricing", weight: 1 },
      { name: "Product/Service Management", weight: 2 },
      { name: "Professional Development", weight: 2 },
      { name: "Promotion", weight: 2 },
      { name: "Selling", weight: 1 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  fin: {
    name: "Finance Cluster Exam",
    note: "Core areas plus financial analysis, compliance and risk.",
    areas: [
      { name: "Business Law", weight: 1 },
      { name: "Communications", weight: 1 },
      { name: "Compliance", weight: 1 },
      { name: "Customer Relations", weight: 1 },
      { name: "Economics", weight: 1 },
      { name: "Emotional Intelligence", weight: 2 },
      { name: "Financial Analysis", weight: 3 },
      { name: "Financial-Information Management", weight: 2 },
      { name: "Human Resources Management", weight: 1 },
      { name: "Information Management", weight: 1 },
      { name: "Marketing", weight: 1 },
      { name: "Operations", weight: 1 },
      { name: "Professional Development", weight: 2 },
      { name: "Risk Management", weight: 1 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  hat: {
    name: "Hospitality & Tourism Cluster Exam",
    note: "Core areas plus service, quality and destination management.",
    areas: [
      { name: "Business Law", weight: 1 },
      { name: "Communications", weight: 1 },
      { name: "Customer Relations", weight: 2 },
      { name: "Economics", weight: 1 },
      { name: "Emotional Intelligence", weight: 2 },
      { name: "Financial Analysis", weight: 1 },
      { name: "Human Resources Management", weight: 1 },
      { name: "Information Management", weight: 1 },
      { name: "Market Planning", weight: 1 },
      { name: "Marketing-Information Management", weight: 1 },
      { name: "Operations", weight: 2 },
      { name: "Product/Service Management", weight: 2 },
      { name: "Professional Development", weight: 2 },
      { name: "Promotion", weight: 1 },
      { name: "Quality Management", weight: 1 },
      { name: "Risk Management", weight: 1 },
      { name: "Selling", weight: 1 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  bma: {
    name: "Business Management & Administration Cluster Exam",
    note: "Core areas plus project, knowledge and quality management.",
    areas: [
      { name: "Business Law", weight: 2 },
      { name: "Communications", weight: 2 },
      { name: "Customer Relations", weight: 1 },
      { name: "Economics", weight: 1 },
      { name: "Emotional Intelligence", weight: 3 },
      { name: "Financial Analysis", weight: 1 },
      { name: "Human Resources Management", weight: 2 },
      { name: "Information Management", weight: 2 },
      { name: "Knowledge Management", weight: 1 },
      { name: "Operations", weight: 2 },
      { name: "Professional Development", weight: 2 },
      { name: "Project Management", weight: 1 },
      { name: "Quality Management", weight: 1 },
      { name: "Risk Management", weight: 1 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  ent: {
    name: "Entrepreneurship Cluster Exam",
    note: "Core areas plus venture planning and financing.",
    areas: [
      { name: "Business Law", weight: 1 },
      { name: "Channel Management", weight: 1 },
      { name: "Communications", weight: 1 },
      { name: "Customer Relations", weight: 1 },
      { name: "Economics", weight: 1 },
      { name: "Emotional Intelligence", weight: 2 },
      { name: "Entrepreneurship", weight: 3 },
      { name: "Financial Analysis", weight: 2 },
      { name: "Human Resources Management", weight: 1 },
      { name: "Information Management", weight: 1 },
      { name: "Market Planning", weight: 2 },
      { name: "Operations", weight: 1 },
      { name: "Pricing", weight: 1 },
      { name: "Product/Service Management", weight: 1 },
      { name: "Professional Development", weight: 1 },
      { name: "Promotion", weight: 1 },
      { name: "Risk Management", weight: 1 },
      { name: "Selling", weight: 1 },
      { name: "Strategic Management", weight: 1 }
    ]
  },
  pfl: {
    name: "Personal Financial Literacy Exam",
    note: "Money management for an individual, not a business.",
    areas: [
      { name: "Earning Income", weight: 2 },
      { name: "Spending", weight: 2 },
      { name: "Saving", weight: 2 },
      { name: "Investing", weight: 2 },
      { name: "Managing Credit", weight: 3 },
      { name: "Managing Risk", weight: 2 },
      { name: "Financial Analysis", weight: 1 },
      { name: "Professional Development", weight: 1 }
    ]
  }
};

/* ---- Role-play events -------------------------------------------------
   exam    : which cluster exam the event uses
   format  : how the role-play runs (shown on the plan)
   pis     : how many performance indicators the judge scores
   focus   : instructional areas the PIs usually come from            */

const ROLEPLAYS = [
  // Principles events (first-year members)
  { code: "PBM", name: "Principles of Business Management and Administration", exam: "bac", group: "Principles", format: "1 role-play, 10 min prep", pis: 4, focus: ["Emotional Intelligence", "Operations", "Professional Development", "Information Management"] },
  { code: "PFN", name: "Principles of Finance", exam: "bac", group: "Principles", format: "1 role-play, 10 min prep", pis: 4, focus: ["Financial Analysis", "Emotional Intelligence", "Customer Relations", "Professional Development"] },
  { code: "PHT", name: "Principles of Hospitality and Tourism", exam: "bac", group: "Principles", format: "1 role-play, 10 min prep", pis: 4, focus: ["Customer Relations", "Emotional Intelligence", "Operations", "Professional Development"] },
  { code: "PMK", name: "Principles of Marketing", exam: "bac", group: "Principles", format: "1 role-play, 10 min prep", pis: 4, focus: ["Marketing", "Promotion", "Selling", "Emotional Intelligence"] },

  // Individual series
  { code: "ACT", name: "Accounting Applications Series", exam: "fin", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Financial Analysis", "Financial-Information Management", "Compliance", "Professional Development"] },
  { code: "AAM", name: "Apparel and Accessories Marketing Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Product/Service Management", "Promotion", "Selling", "Customer Relations"] },
  { code: "ASM", name: "Automotive Services Marketing Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Customer Relations", "Selling", "Product/Service Management", "Operations"] },
  { code: "BFS", name: "Business Finance Series", exam: "fin", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Financial Analysis", "Risk Management", "Financial-Information Management", "Customer Relations"] },
  { code: "BSM", name: "Business Services Marketing Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Selling", "Customer Relations", "Product/Service Management", "Promotion"] },
  { code: "ENT", name: "Entrepreneurship Series", exam: "ent", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Entrepreneurship", "Market Planning", "Financial Analysis", "Strategic Management"] },
  { code: "FMS", name: "Food Marketing Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Product/Service Management", "Pricing", "Promotion", "Operations"] },
  { code: "HLM", name: "Hotel and Lodging Management Series", exam: "hat", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Customer Relations", "Operations", "Quality Management", "Emotional Intelligence"] },
  { code: "HRM", name: "Human Resources Management Series", exam: "bma", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Human Resources Management", "Emotional Intelligence", "Communications", "Business Law"] },
  { code: "MCS", name: "Marketing Communications Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Promotion", "Marketing-Information Management", "Communications", "Product/Service Management"] },
  { code: "QSRM", name: "Quick Serve Restaurant Management Series", exam: "hat", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Operations", "Customer Relations", "Human Resources Management", "Quality Management"] },
  { code: "RFSM", name: "Restaurant and Food Service Management Series", exam: "hat", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Operations", "Customer Relations", "Financial Analysis", "Quality Management"] },
  { code: "RMS", name: "Retail Merchandising Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Product/Service Management", "Selling", "Promotion", "Operations"] },
  { code: "SEM", name: "Sports and Entertainment Marketing Series", exam: "mkt", group: "Individual Series", format: "2 role-plays, 10 min prep each", pis: 5, focus: ["Promotion", "Marketing-Information Management", "Product/Service Management", "Selling"] },

  // Personal financial literacy
  { code: "PFL", name: "Personal Financial Literacy", exam: "pfl", group: "Individual", format: "1 role-play, 10 min prep", pis: 5, focus: ["Managing Credit", "Saving", "Investing", "Spending"] },

  // Team decision making
  { code: "BLTDM", name: "Business Law and Ethics Team Decision Making", exam: "bma", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Business Law", "Emotional Intelligence", "Communications", "Risk Management"] },
  { code: "BTDM", name: "Buying and Merchandising Team Decision Making", exam: "mkt", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Product/Service Management", "Pricing", "Channel Management", "Operations"] },
  { code: "ETDM", name: "Entrepreneurship Team Decision Making", exam: "ent", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Entrepreneurship", "Market Planning", "Financial Analysis", "Strategic Management"] },
  { code: "FTDM", name: "Financial Services Team Decision Making", exam: "fin", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Financial Analysis", "Customer Relations", "Risk Management", "Compliance"] },
  { code: "HTDM", name: "Hospitality Services Team Decision Making", exam: "hat", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Customer Relations", "Operations", "Quality Management", "Promotion"] },
  { code: "MTDM", name: "Marketing Management Team Decision Making", exam: "mkt", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Market Planning", "Promotion", "Pricing", "Marketing-Information Management"] },
  { code: "STDM", name: "Sports and Entertainment Marketing Team Decision Making", exam: "mkt", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Promotion", "Market Planning", "Product/Service Management", "Selling"] },
  { code: "TTDM", name: "Travel and Tourism Team Decision Making", exam: "hat", group: "Team Decision Making", format: "1 case, 30 min prep, partner", pis: 7, focus: ["Product/Service Management", "Promotion", "Customer Relations", "Market Planning"] }
];

/* ---- Prepared / written events ----------------------------------------
   sections: the outline the paper is graded against, in order
   pages   : page limit, shown as a reminder on the plan               */

const RESEARCH_SECTIONS = [
  "Executive Summary",
  "Introduction",
  "Research Methods Used in the Study",
  "Findings and Conclusions of the Study",
  "Proposed Strategic Plan and Recommendations",
  "Bibliography",
  "Appendix"
];

const PROJECT_SECTIONS = [
  "Executive Summary",
  "Introduction",
  "Project Objectives and Planning",
  "Project Implementation",
  "Evaluation and Recommendations",
  "Bibliography",
  "Appendix"
];

const IMC_SECTIONS = [
  "Executive Summary",
  "Description of the business, product or service",
  "Objectives and rationale of the campaign",
  "Proposed campaign activities",
  "Implementation of the campaign",
  "Evaluation and recommendations",
  "Bibliography",
  "Appendix"
];

const PLAN_SECTIONS = [
  "Executive Summary",
  "Description of the business or idea",
  "Analysis of the business situation",
  "Planned operation of the business",
  "Planned financing",
  "Conclusion",
  "Bibliography",
  "Appendix"
];

const PREPARED = [
  { code: "BOR", name: "Business Services Operations Research", family: "Operations Research", pages: 20, sections: RESEARCH_SECTIONS },
  { code: "BMOR", name: "Buying and Merchandising Operations Research", family: "Operations Research", pages: 20, sections: RESEARCH_SECTIONS },
  { code: "FOR", name: "Finance Operations Research", family: "Operations Research", pages: 20, sections: RESEARCH_SECTIONS },
  { code: "HTOR", name: "Hospitality and Tourism Operations Research", family: "Operations Research", pages: 20, sections: RESEARCH_SECTIONS },
  { code: "SEOR", name: "Sports and Entertainment Marketing Operations Research", family: "Operations Research", pages: 20, sections: RESEARCH_SECTIONS },

  { code: "PMBS", name: "Business Solutions Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },
  { code: "PMCD", name: "Career Development Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },
  { code: "PMCA", name: "Community Awareness Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },
  { code: "PMCG", name: "Community Giving Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },
  { code: "PMFL", name: "Financial Literacy Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },
  { code: "PMSP", name: "Sales Project", family: "Project Management", pages: 20, sections: PROJECT_SECTIONS },

  { code: "IMCE", name: "Integrated Marketing Campaign — Event", family: "Integrated Marketing Campaign", pages: 20, sections: IMC_SECTIONS },
  { code: "IMCP", name: "Integrated Marketing Campaign — Product", family: "Integrated Marketing Campaign", pages: 20, sections: IMC_SECTIONS },
  { code: "IMCS", name: "Integrated Marketing Campaign — Service", family: "Integrated Marketing Campaign", pages: 20, sections: IMC_SECTIONS },

  { code: "EIP", name: "Innovation Plan", family: "Entrepreneurship", pages: 20, sections: PLAN_SECTIONS },
  { code: "ESB", name: "Start-Up Business Plan", family: "Entrepreneurship", pages: 20, sections: PLAN_SECTIONS },
  { code: "EIB", name: "Independent Business Plan", family: "Entrepreneurship", pages: 20, sections: PLAN_SECTIONS },
  { code: "EBG", name: "Business Growth Plan", family: "Entrepreneurship", pages: 10, sections: PLAN_SECTIONS },
  { code: "EFB", name: "Franchise Business Plan", family: "Entrepreneurship", pages: 20, sections: PLAN_SECTIONS },
  { code: "IBP", name: "International Business Plan", family: "Entrepreneurship", pages: 20, sections: PLAN_SECTIONS }
];

/* ---- Study actions ----------------------------------------------------
   Phrasing pools the planner draws from, so two study sessions on the
   same area don't read identically.                                   */

const EXAM_ACTIONS = [
  a => `Read the ${a} instructional area and write down every term you can't define`,
  a => `Do 10 practice questions on ${a}, then review only the ones you missed`,
  a => `Turn your ${a} notes into 15 flashcards and run them twice`,
  a => `Re-test ${a} cold — no notes — and log your score`
];

const ROLEPLAY_ACTIONS = [
  a => `Drill the ${a} performance indicators out loud, one minute each`,
  a => `Write a three-point answer frame for a prompt on ${a}`,
  a => `Record yourself answering a performance indicator on ${a}, then watch it back once`
];
