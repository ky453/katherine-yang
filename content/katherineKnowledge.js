// Public, English-only facts for both the portfolio guide and the AI backend.
// Sources: Katherine's supplied English résumé, supplemental project descriptions,
// and existing portfolio case studies. Interview coaching is not source material.
// Keep private documents, phone numbers, and speculative growth explanations out.

export const SOURCES = {
  notes: { id: "notes", label: "Project notes", href: "assets/katherine-project-notes.txt" },
  resume: { id: "resume", label: "Résumé", href: "assets/Katherine_Yang_PM_Resume.pdf" },
  about: { id: "about", label: "About Katherine", href: "#/about" },
  cloudsky: { id: "cloudsky", label: "CloudSky story", href: "#/projects/cloudsky" },
  honor: { id: "honor", label: "HONOR story", href: "#/projects/honor" },
  duolingo: { id: "duolingo", label: "Duolingo project", href: "#/projects/duolingo" },
  movies: { id: "movies", label: "Cornell Movies", href: "#/projects/cornell-movies" },
  pantry: { id: "pantry", label: "Recipe assistant", href: "#/projects/recipe-generator" },
  sidequest: { id: "sidequest", label: "Sidequest story", href: "#/projects/sidequest" },
};

export const SUGGESTED_QUESTIONS = [
  "What did Katherine do in her internships?",
  "What has she built with AI?",
  "How does she approach user research?",
  "Tell me about her technical projects.",
];

export const KNOWLEDGE = [
  {
    id: "introduction",
    title: "Meet Katherine",
    keywords: ["who is katherine", "introduce", "background", "education", "studying", "cornell university", "degree", "graduate", "gpa", "coursework"],
    text: "Kaiqing (Katherine) Yang studies Information Science and Art History at Cornell University, with a minor in Business and an expected graduation date of May 2028. Her résumé lists a GPA of 4.004. Her interests connect product strategy, customer research, interaction design, and hands-on prototyping. Coursework includes Product Strategy, Digital Product Design, AI Application Development, Interactive Web Development, Introduction to Marketing, and Financial Accounting; Data Science is listed as in progress. She is based in Ithaca, New York, and speaks English and Mandarin Chinese.",
    sourceIds: ["resume", "about"],
  },
  {
    id: "internships",
    title: "Internship experience",
    keywords: ["internships", "internship", "work experience", "professional experience", "companies", "where has she worked"],
    text: "Katherine has three internship experiences in Shenzhen, China. At Cloudsky - Panghe Cloud Gaming (July–August 2026), she worked as a Product Manager Intern on customer journeys, cross-platform product rules, documentation, and release workflows. At HONOR (June–August 2025), she was a UX Motion Design Intern designing onboarding interactions across phones, tablets, and foldable devices with designers and engineers. At China Merchants Bank (June–August 2024), she was an Account Manager Intern in Corporate Banking, researching corporate clients and preparing KYC and due-diligence materials. Her recurring contribution was turning user or customer context into clear requirements while working within business and technical constraints.",
    sourceIds: ["resume", "cloudsky", "honor"],
  },
  {
    id: "cloudsky",
    title: "CloudSky: translating user needs into product behavior",
    keywords: ["cloudsky", "panghe", "cloud gaming", "cloud pc", "product manager intern", "customer journey", "release", "jira", "user feedback"],
    text: "At Cloudsky - Panghe Cloud Gaming in Shenzhen, Katherine was a Product Manager Intern from July to August 2026. The product lets people access a high-performance Windows computer from a local device. She mapped the journey through registration, node selection, payment, balance, queues, remote sessions, and storage. She organized feedback about performance, latency, login, updates, pricing, and promotions using customer, support, community, and competitive signals. She used ChatGPT and Claude for structured, source-grounded synthesis and checked the findings against the product context. With design, engineering, and operations, she translated needs and edge cases into product requirements, user guidance, and release workflows, using Jira for project management. Her supplemental notes also describe Android app-store update materials and publishing support. Her role was clarifying rules and coordinating implementation, rather than claiming sole ownership of every feature or writing all the product code.",
    sourceIds: ["resume", "cloudsky", "notes"],
  },
  {
    id: "payments",
    title: "CloudSky: payment flows and edge cases",
    keywords: ["payment", "payments", "alipay", "wechat", "qr", "refund", "edge cases", "acceptance criteria", "cross-platform"],
    text: "For CloudSky's Alipay payment requirements, Katherine helped turn a seemingly small request into explicit flows across PC, Mac, and Android. The work covered credits, time cards, storage, and bundles, including desktop QR payment and Android app handoff alongside WeChat. She worked through success, failure, cancellation, pending confirmation, expired QR codes, duplicate payment or fulfillment, and refunds where supported. Her supplemental notes also describe recharge records, asset transactions, operational queries, reconciliation, and acceptance criteria. This illustrates how she translated a user need into connected front-end and back-office product rules; the materials do not establish that she independently implemented the payment system.",
    sourceIds: ["cloudsky", "notes"],
  },
  {
    id: "storage",
    title: "CloudSky: explaining persistent storage",
    keywords: ["storage", "data disk", "data drive", "renewal", "expiration", "expiry", "mods", "save files", "documentation", "user guide"],
    text: "Katherine's supplemental CloudSky notes describe a persistent data-disk workflow for users who need to keep game saves, MODs, application files, and settings when a temporary cloud system disk may reset. She organized the journey from purchase and viewing the disk through use, renewal, expiration, space reclamation, and FAQs. The documented rules included region-specific use, extending validity rather than increasing capacity when repurchasing the same package, and irreversible data loss when expired storage is reclaimed. Her contribution was making these system rules clear and turning them into usable documentation. These are descriptions of that internship's product rules, not current storage advice for visitors.",
    sourceIds: ["cloudsky", "notes"],
  },
  {
    id: "growth",
    title: "CloudSky: growth figures and attribution",
    keywords: ["growth", "metrics", "66", "49", "40", "impact", "results", "dau", "paying users", "new users", "attribution", "increase"],
    text: "During Katherine's CloudSky internship, the product's daily new users grew 66%, active users grew 49%, and paying users grew 40%, according to her résumé. These are product-wide figures for the period, not results causally attributed to her individual work. Her documented contribution involved customer and competitive synthesis, clearer payment and storage rules, reduced ambiguity in user journeys, documentation, and collaboration on release workflows. The supplied materials do not isolate the effect of her requirements or establish the causes of the growth. Channel, promotional, and content explanations in the supplemental coaching notes are hypotheses, not verified findings, so they should not be presented as proven causes.",
    sourceIds: ["resume", "cloudsky"],
  },
  {
    id: "honor",
    title: "HONOR: motion across devices",
    keywords: ["honor", "motion", "onboarding", "foldable", "tablet", "lottie", "figma", "design engineering", "tradeoff", "trade-off", "collaboration"],
    text: "At HONOR in Shenzhen, Katherine was a UX Motion Design Intern from June to August 2025. She designed and iterated onboarding interactions for mobile, tablet, and foldable products, partnering with UI designers and engineers to balance the experience with implementation constraints. Her notes describe adapting attention, layout, timing, and state feedback across screen types rather than simply enlarging a phone animation. She used Figma and Lottie/JSON where appropriate for prototyping and handoff. She also researched consumer-product interaction patterns using Gemini and Claude, iterative prompts, and multi-model comparison, with human review of the synthesis. She learned to treat motion as a consistent system that explains state and guides attention. The materials provide no measured conversion improvement or public original HONOR screenshots.",
    sourceIds: ["resume", "honor", "notes"],
  },
  {
    id: "ai-overview",
    title: "AI projects and ways of working",
    keywords: ["ai experience", "built with ai", "ai projects", "ai skills", "artificial intelligence", "language models", "llm experience"],
    text: "Katherine's AI work includes an INFO 5940 e-commerce customer-service multi-agent system and RAG optimization project, plus PantryPilot, a local-browser recipe assistant described in her supplemental notes. The customer-service project used GPT-4o, function calling, triage routing, scoped sales/support tools, and shared context; she also tested retrieval, chunking, and query transformations. PantryPilot used Vue.js and WebLLM to explore constrained recipe generation, personas, and output formats. Across her work, she uses AI-assisted research, synthesis, and coding while checking the output against source material, product requirements, and observed application behavior. These examples demonstrate project experience; they do not establish production-scale traffic or commercial deployment for the multi-agent system.",
    sourceIds: ["resume", "pantry", "notes"],
  },
  {
    id: "agents-rag",
    title: "INFO 5940: multi-agent customer service and RAG",
    keywords: ["agent", "agents", "rag", "retrieval", "chunking", "customer service", "info 5940", "e-commerce", "ecommerce", "hyde", "query transformation", "function calling", "gpt-4o"],
    text: "For an INFO 5940 project, Katherine built a GPT-4o multi-agent e-commerce customer-service system with function calling, triage routing, scoped sales and support tools, and shared context. She tested RAG retrieval and chunking and found that semantic chunking improved answer quality with fewer retrieved chunks in her project experiments. She evaluated four query transformation methods: rewriting, expansion, decomposition, and HyDE. She identified safety risks involving unverified actions, refund authorization, and runaway loops, and proposed code-level safeguards. Her résumé does not provide a numerical quality uplift, a universal best query method, production usage figures, or evidence that all proposed safeguards were implemented.",
    sourceIds: ["resume"],
  },
  {
    id: "pantry",
    title: "PantryPilot: a local recipe assistant",
    keywords: ["pantrypilot", "pantry", "recipe", "recipes", "webllm", "local llm", "vue", "personas", "prompt engineering", "system prompt", "pwa"],
    text: "PantryPilot is the local LLM recipe assistant described in Katherine's supplemental project notes and portfolio. She defined a flow from ingredient and constraint inputs to recipe generation, adjustment, and regeneration. With Vue.js and local-browser WebLLM, she incorporated available ingredients, servings, and time constraints into dynamic system prompts. She tested inputs, personas, and output formats for omitted ingredients, violated time limits, and unreasonable cooking steps, then iterated the prompts and interaction. She used GitHub Copilot and an AGENTS.md specification to constrain the stack, file-editing scope, and build verification. The portfolio describes an installable PWA and tradeoffs between output quality and latency. The materials contain no measured accuracy benchmark or user adoption figures. This project is supplemental; it is not listed in the newly supplied résumé.",
    sourceIds: ["pantry", "notes"],
  },
  {
    id: "duolingo",
    title: "Duolingo Podcast: research before the feature",
    keywords: ["duolingo", "podcast", "user research", "usability", "prioritization", "prioritisation", "listening", "language learning", "feature decision"],
    text: "For the Duolingo Podcast Feature design project, Katherine conducted qualitative research into the gap between gamified lessons and real-world listening and speaking. She identified concerns around confidence, grammar, and contextual practice. She compared podcast learning, AI pronunciation coaching, and peer exchange using user value, feasibility, and scalability, then prioritized podcasts. Her supplemental notes describe discovery, levels, subtitles, vocabulary, quizzes, progress, and saved content as design areas. Usability testing exposed friction in finding the feature, playback controls, and saving content, which informed iteration. She defined engagement, completion, and repeat-listening metrics for future evaluation. The materials do not establish a Duolingo partnership, a shipped Duolingo feature, participant counts, or measured post-launch improvements.",
    sourceIds: ["resume", "duolingo", "notes"],
  },
  {
    id: "movies",
    title: "Cornell Movies: from discovery flow to full stack",
    keywords: ["cornell movies", "movies", "full-stack", "full stack", "mongodb", "express", "rest api", "technical projects", "technical skills", "engineering", "search", "filters", "coding"],
    text: "Katherine built Cornell Movies, a full-stack community-event discovery product, using React, Node.js, Express.js, MongoDB, and REST APIs. It supports browsing, search, filtering, event details, likes, and loading and error states. Her supplemental notes frame the problem as scattered campus movie-event information and describe narrowing the MVP around discovery rather than adding broad social features. She mapped requirements into front-end interactions, API behavior, and database structures. Codex, Copilot, and iterative AI-assisted debugging helped with implementation and front-end/back-end integration; she validated generated code against requirements and application behavior. The project helped her understand the system work behind an apparently simple interface feature. No visitor counts or adoption metrics are supplied.",
    sourceIds: ["resume", "movies", "notes"],
  },
  {
    id: "bank",
    title: "China Merchants Bank: learning an unfamiliar business",
    keywords: ["bank", "banking", "china merchants", "kyc", "due diligence", "finance", "corporate clients"],
    text: "At China Merchants Bank in Shenzhen, Katherine was an Account Manager Intern in Corporate Banking from June to August 2024. She researched corporate clients' business models, financial positions, competitive environments, and financing needs. She participated in client visits and prepared KYC and due-diligence materials to support onboarding and relationship management. She connects that experience to product work through understanding a customer's underlying business context and constraints before deciding what problem to address. The supplied materials do not identify individual banking clients or quantify financial results attributable to her work.",
    sourceIds: ["resume", "about"],
  },
  {
    id: "leadership",
    title: "Cornell MCSA: cross-functional leadership",
    keywords: ["leadership", "mcsa", "president", "sponsor", "sponsorship", "16000", "16k", "student forum", "team leadership"],
    text: "As President of Cornell MCSA, Katherine led teams spanning programming, external relations, publicity, and operations. She aligned members and external partners around community and professional-development goals, secured more than $16,000 in sponsorships through outreach and tailored proposals, and initiated a Shanghai incoming-student forum connecting students with academic, career, and campus resources. The supplied résumé does not state the leadership term dates, exact team size, or forum attendance.",
    sourceIds: ["resume", "about"],
  },
  {
    id: "sidequest",
    title: "Sidequest: a concept still being validated",
    keywords: ["sidequest", "budget", "activity discovery", "recommendations", "personal project", "zero to one", "0 to 1"],
    text: "Sidequest is Katherine's personal product concept for discovering activities that fit a person's budget, time, mood, and context, then keeping a lightweight memory afterward. She explored the hierarchy of activity discovery, contextual recommendation inputs, budget-aware suggestions, saving activities, and post-activity memories. The case study describes product direction and a UI system as designed, interaction ideas as prototyped, reusable implementation patterns as planned, and the portfolio case-study surface as implemented. The concept still needs validation. It should not be described as a launched recommendation engine, a tested business, or an app with demonstrated users or revenue.",
    sourceIds: ["sidequest"],
  },
  {
    id: "skills",
    title: "Technical skills and tools",
    keywords: ["technical skills", "skills", "python", "javascript", "html", "css", "tools", "languages", "technology stack"],
    text: "Katherine's résumé lists Python, JavaScript, React, Node.js, Express.js, REST APIs, MongoDB, Git/GitHub, and HTML/CSS. Cornell Movies provides a concrete full-stack example using React, Node/Express, and MongoDB. Her supplemental PantryPilot project uses Vue.js and WebLLM. Her AI experience includes prompt and context engineering, RAG, multi-agent workflows, and AI-assisted research and development; her design tools include Figma and Lottie. She also lists Excel and Notion and speaks English and Mandarin Chinese. These are her documented skills and project experiences, rather than a claim of expert-level proficiency in every tool.",
    sourceIds: ["resume", "movies", "pantry", "notes"],
  },
  {
    id: "approach",
    title: "How Katherine approaches product work",
    keywords: ["strengths", "product approach", "how she works", "how does she work", "problem solving", "product thinking", "product decisions", "why hire", "good fit"],
    text: "Katherine's work illustrates a recurring approach: understand the user's context, frame the underlying problem, compare possible solutions, and make product rules explicit before refining the experience. At CloudSky, that meant turning feedback into cross-platform flows, edge cases, and documentation. In the Duolingo project, she compared three feature directions before prioritizing podcasts and iterating after usability testing. Cornell Movies gave her hands-on experience with the APIs, data, and states behind an interface. Her HONOR work connected design choices with device differences and engineering constraints. These examples offer evidence of her approach; suitability for a particular role depends on that role's requirements and a conversation with Katherine.",
    sourceIds: ["resume", "about", "notes"],
  },
  {
    id: "contact",
    title: "Contact Katherine",
    keywords: ["contact", "email", "reach her", "get in touch", "say hello", "connect with"],
    text: "You can contact Katherine at ky453@cornell.edu. Her résumé and portfolio describe her experience, projects, and education. The assistant cannot send messages or arrange meetings on her behalf. Availability, work authorization, and interest in a specific opportunity should be confirmed directly with Katherine.",
    sourceIds: ["resume", "about"],
  },
];
