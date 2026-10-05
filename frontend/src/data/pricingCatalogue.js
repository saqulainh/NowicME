export const pricingCatalogue = [
  {
    id: 'websites',
    name: 'Website Development',
    summary: 'Responsive websites, CMS platforms and commerce products for startups and established businesses.',
    children: [
      { name: 'Static Website', price: '₹8,000 – ₹25,000', details: '1 page ₹8,000 | 3 pages ₹12,000 | 5 pages ₹15,000 | 7 pages ₹20,000 | 10 pages ₹25,000 | Additional page ₹2,000/page', includes: 'Responsive design, mobile compatibility, contact form, WhatsApp, Maps, social links, basic SEO, SSL and deployment.' },
      { name: 'Dynamic / CMS Website', price: '₹30,000+', details: 'Basic ₹30,000 | Standard ₹40,000 | Advanced ₹60,000 | Premium Corporate ₹80,000+', includes: 'Admin panel, database, dynamic pages, blog, news, gallery, team, enquiries, banners, forms, users, SEO and content management. Additional dynamic page ₹3,000.' },
      { name: 'E-Commerce Development', price: '₹60,000+', details: 'Basic ₹60,000 | Advanced ₹1,00,000 – ₹2,50,000+ | Marketplace ₹2,00,000 – ₹6,00,000+', includes: 'Products, categories, search, cart, wishlist, accounts, checkout, orders, payments, coupons and admin. Advanced scope can add inventory, variations, GST invoices, shipping, returns, reviews, wallets and reports.' },
      { name: 'Website Page-Wise Development', price: 'From ₹1,500', details: 'Home ₹5,000 | About ₹2,000 | Services ₹2,000 | Product ₹2,500 | Contact ₹2,000 | Portfolio/Gallery ₹3,000 | Blog listing ₹3,000 | Blog details ₹2,000 | Team ₹2,000 | FAQ ₹1,500 | Career ₹3,000 | Pricing ₹2,000', includes: 'Login/Register ₹4,000 | User dashboard ₹8,000+ | Admin dashboard ₹10,000+. Complex APIs, databases and business logic are quoted separately.' }
    ]
  },
  {
    id: 'apps',
    name: 'Mobile Applications',
    summary: 'Native Android, native iOS and cross-platform products with optional feature modules.',
    children: [
      { name: 'Android Application', price: '₹60,000+', details: 'Basic ₹60,000 | Standard ₹1,00,000 | Advanced ₹1,50,000 – ₹3,00,000+ | Complex ₹3,00,000 – ₹10,00,000+', includes: 'Business, education, e-commerce, booking, delivery, CRM, social, utility and enterprise applications.' },
      { name: 'iOS Application', price: '₹80,000+', details: 'Basic ₹80,000 | Standard ₹1,25,000 | Advanced ₹2,00,000 – ₹4,00,000+ | Complex ₹4,00,000 – ₹10,00,000+', includes: 'Swift, SwiftUI, iOS SDK, Apple Login, payments, notifications, analytics and App Store release support.' },
      { name: 'Cross-Platform Application', price: '₹1,00,000+', details: 'Basic ₹1,00,000 | Standard ₹1,50,000 | Advanced ₹2,50,000 – ₹5,00,000+ | Complex ₹5,00,000 – ₹15,00,000+', includes: 'Flutter or React Native product for Android and iOS. Final price depends on screens, backend, APIs, integrations and business logic.' },
      { name: 'Mobile Features', price: 'From ₹5,000', details: 'Login ₹5,000 | OTP ₹8,000 | Google Login ₹5,000 | Apple Login ₹7,500 | Profile ₹5,000 | Push notifications ₹7,500 | Firebase ₹10,000 | REST API ₹10,000+ | Payment ₹10,000 | Subscription ₹20,000+', includes: 'Maps ₹10,000 | Live location ₹15,000+ | QR scanner ₹7,500 | Chat ₹20,000+ | Real-time chat ₹30,000+ | Video call ₹40,000+ | Audio call ₹30,000+ | Booking ₹20,000+ | Reviews ₹7,500 | Wallet ₹20,000+ | Advanced admin ₹40,000+.' },
      { name: 'Mobile UI/UX', price: '₹15,000+', details: 'Basic ₹15,000 | Standard ₹30,000 | Advanced ₹50,000+ | Complete product design ₹75,000+', includes: 'User flows, wireframes, app screens, design system, components, prototype and responsive layouts.' }
    ]
  },
  {
    id: 'software',
    name: 'Custom Software & Business Systems',
    summary: 'Module-based software for operations, CRM, ERP, SaaS and industry-specific workflows.',
    children: [
      { name: 'Custom Web Application', price: '₹75,000+', details: 'Basic web app ₹75,000 | Business management ₹1,00,000 | CRM ₹1,25,000 | HRMS ₹1,25,000 | Inventory ₹1,00,000 | Billing ₹75,000 | Accounting ₹1,50,000 | ERP ₹2,50,000+ | Advanced ERP ₹5,00,000+ | SaaS ₹3,00,000+ | Enterprise ₹5,00,000+', includes: 'Authentication, users, roles, customers, employees, products, inventory, sales, billing, payments, reports, notifications, dashboards and audit logs as scoped.' },
      { name: 'Admin Panel & Dashboard', price: '₹20,000+', details: 'Basic ₹20,000 | Standard ₹35,000 | Advanced ₹60,000+', includes: 'Dashboard, users, roles, permissions, reports, analytics, content, notifications, settings, exports, logs and activity monitoring.' },
      { name: 'Software Modules', price: 'From ₹10,000', details: 'Authentication ₹10,000 | User management ₹10,000 | Roles ₹10,000 | Dashboard ₹15,000 | Customer/Employee/Product management ₹15,000 each | Inventory/Purchase/Sales ₹20,000 each | Invoice ₹15,000 | Expenses ₹10,000 | Payments/Reports ₹15,000 each', includes: 'Advanced reports ₹30,000+ | Notifications/File management ₹10,000 | Documents/Audit logs ₹15,000 | Multi-branch ₹30,000+ | Multi-company ₹40,000+ | API or third-party integration ₹10,000+.' },
      { name: 'CRM Development', price: '₹1,25,000+', details: 'Basic CRM ₹1,25,000 | Advanced CRM ₹2,50,000 – ₹6,00,000+', includes: 'Leads, customers, follow-ups, sales pipeline, tasks, reminders, calls, enquiries, reports, employees, permissions and notifications.' },
      { name: 'ERP Development', price: '₹2,50,000+', details: 'Basic ERP ₹2,50,000 | Advanced ERP ₹5,00,000 – ₹15,00,000+', includes: 'HR, payroll, attendance, production, raw material, wastage, purchase, sales, inventory, accounting, GST, invoices, CRM, portals, multi-branch, multi-company and analytics.' },
      { name: 'SaaS Product Development', price: '₹3,00,000+', details: 'SaaS MVP ₹3,00,000 | Standard ₹5,00,000 – ₹12,00,000+ | Advanced ₹10,00,000 – ₹25,00,000+', includes: 'Multi-tenant architecture, organisations, users, subscriptions, billing, payments, usage limits, admin, dashboards, analytics, APIs, notifications and permissions.' },
      { name: 'Industry-Specific Software', price: '₹40,000+', details: 'Education ₹1,50,000 | Real estate CRM ₹1,25,000 | Hospital/Clinic ₹1,25,000 | Restaurant ₹75,000 | POS + Inventory ₹75,000 | Booking ₹40,000 | Delivery ₹1,50,000 | Social/Community ₹2,00,000 | Marketplace ₹2,00,000+', includes: 'Final cost depends on modules, integrations, users, workflows and business rules.' }
    ]
  },
  {
    id: 'engineering',
    name: 'Backend, API & Database Engineering',
    summary: 'Secure backend systems, integrations and data architecture selected for the project requirements.',
    children: [
      { name: 'Backend Development', price: '₹25,000+', details: 'Basic ₹25,000 | REST API backend ₹30,000 | Standard ₹50,000 | Advanced ₹1,00,000+ | Enterprise ₹2,50,000+ | High-scale ₹5,00,000+', includes: 'Node.js, Express, NestJS, Fastify, Laravel, Symfony, Django, Flask, FastAPI, Spring Boot, ASP.NET Core, Ruby on Rails, Go, Rust, Kotlin, Elixir and other specialist stacks as required.' },
      { name: 'API Development', price: '₹20,000+', details: 'Basic REST API ₹20,000 | Standard API ₹40,000 | Advanced platform ₹1,00,000+ | Enterprise API ₹2,50,000+', includes: 'REST, authentication, authorization, CRUD, uploads, payments, notifications, third-party APIs, webhooks, OpenAPI docs, rate limiting and API security.' },
      { name: 'Database Development', price: '₹10,000+', details: 'Design ₹10,000 | Optimisation ₹15,000 | Migration ₹15,000 | Advanced architecture ₹30,000+', includes: 'MySQL, PostgreSQL, SQL Server, Oracle, MariaDB, SQLite, MongoDB, Firestore, Redis, Cassandra, DynamoDB, CouchDB, Neo4j and Elasticsearch/OpenSearch.' }
    ]
  },
  {
    id: 'ai-integrations',
    name: 'AI, Automation & Integrations',
    summary: 'AI features, business process automation and common payment or communication integrations.',
    children: [
      { name: 'AI & Machine Learning', price: '₹25,000+', details: 'AI feature integration ₹25,000+ | Advanced AI product ₹1,00,000 – ₹10,00,000+', includes: 'Chatbots, assistants, AI search, recommendations, content generation, document processing, automation, AI APIs and AI-powered dashboards. Model, token and infrastructure costs are separate.' },
      { name: 'Business Process Automation', price: '₹15,000+', details: 'Basic ₹15,000 | Business ₹30,000 | Advanced workflow ₹75,000+ | Enterprise ₹2,00,000+', includes: 'Lead, email, invoice and approval automation, notifications, scheduled jobs, data synchronisation and reports.' },
      { name: 'Payment Gateway', price: '₹10,000+', details: 'Razorpay, Cashfree, PayU, Stripe and other supported providers', includes: 'Gateway integration, callbacks, payment status and reconciliation as scoped. Transaction charges and merchant fees are separate.' },
      { name: 'SMS, OTP, Email & WhatsApp', price: '₹5,000+', details: 'SMS ₹7,500 | OTP ₹8,000 | SMTP ₹5,000 | Transactional email ₹10,000 | Email automation ₹20,000+ | WhatsApp ₹10,000+', includes: 'Third-party usage charges are separate.' }
    ]
  },
  {
    id: 'infrastructure',
    name: 'Cloud, DevOps, Security & Migration',
    summary: 'Deployment, release engineering, security reviews and modernization for existing systems.',
    children: [
      { name: 'Cloud & DevOps', price: '₹3,000+', details: 'Website deployment ₹3,000 | Web app ₹7,500 | Server config ₹10,000 | Cloud/Docker/CI-CD ₹15,000 | Advanced DevOps ₹30,000+ | Kubernetes ₹50,000+', includes: 'AWS, Azure, Google Cloud, DigitalOcean, Cloudflare, Firebase, Vercel, VPS, Docker, Kubernetes, Linux, Nginx, SSL, DNS, backups and monitoring. Infrastructure charges are separate.' },
      { name: 'Software Testing & QA', price: '₹10,000+', details: 'Manual testing ₹10,000 | Web app ₹20,000 | Mobile ₹20,000 | API ₹15,000 | Complete QA ₹30,000+ | Automation ₹30,000+', includes: 'Functional, UI, API, device/browser and regression testing with bug reports and retesting.' },
      { name: 'Security Services', price: '₹15,000+', details: 'Basic review ₹15,000 | Web audit ₹30,000 | Application audit ₹30,000+ | Advanced assessment ₹50,000+', includes: 'Scope is finalised separately according to application, data and infrastructure risk.' },
      { name: 'Migration & Modernization', price: '₹15,000+', details: 'Website migration ₹15,000 | Framework migration ₹25,000+ | Backend migration ₹40,000+ | Mobile migration ₹50,000+ | Database migration ₹15,000+ | Full migration ₹75,000+ | Legacy modernization ₹1,50,000+', includes: 'Migration can cover PHP, JavaScript, backend frameworks, mobile apps and databases. Final price depends on source quality, size, compatibility and business logic.' },
      { name: 'Data Migration & Import', price: '₹5,000+', details: 'Excel/CSV ₹5,000 | Basic migration ₹10,000 | Database ₹15,000 | Large data ₹25,000+ | Enterprise ₹1,00,000+', includes: 'Data mapping, validation, import and migration reporting as scoped.' }
    ]
  },
  {
    id: 'growth',
    name: 'Design, SEO, Marketing & Support',
    summary: 'Product design, search visibility, marketing assets, deployment assistance and ongoing maintenance.',
    children: [
      { name: 'UI/UX & Product Design', price: '₹10,000+', details: 'Logo ₹3,000 | Website UI/UX ₹10,000 | Mobile UI/UX ₹15,000 | Dashboard ₹15,000 | Design system ₹15,000 | Complete product ₹30,000+ | Premium branding ₹25,000+', includes: 'Wireframes, user flows, screens, design systems, components, prototypes and responsive layouts as scoped.' },
      { name: 'SEO Services', price: '₹7,500+', details: 'Basic setup ₹7,500 | Monthly SEO ₹10,000/month | Advanced SEO ₹20,000 – ₹50,000+/month', includes: 'Technical SEO, on-page SEO, keyword research, sitemap, Search Console, analytics, metadata, local SEO and reporting. Advertising budget is separate.' },
      { name: 'Digital Marketing', price: '₹8,000/month', details: 'Social management ₹8,000/month | Social + content ₹15,000/month | Digital marketing ₹25,000/month | Advanced ₹40,000+/month', includes: 'Social media, creative design, content, campaigns, lead generation, analytics and reporting. Ad spend is separate.' },
      { name: 'Graphic Design & Branding', price: '₹500+', details: 'Social creative ₹500 | Business card/letterhead/poster ₹1,000 | Logo ₹3,000 | Brochure/presentation ₹3,000 | Company profile ₹5,000 | Brand identity ₹15,000+', includes: 'Print-ready and digital brand assets delivered in agreed formats.' },
      { name: 'Maintenance & AMC', price: '₹1,500/month', details: 'Website ₹1,500/month | Business website ₹3,000/month | Web app/mobile ₹5,000/month | Software AMC ₹15,000/year | Advanced AMC ₹30,000/year+', includes: 'Bug fixes, minor updates, security updates, backups, database/server monitoring and technical support. New modules are charged separately.' },
      { name: 'Documentation & Store Deployment', price: '₹5,000+', details: 'Technical docs ₹10,000 | API docs ₹7,500 | Complete docs ₹20,000+ | Play Store ₹5,000 | App Store ₹10,000 | Store listing/release ₹5,000+', includes: 'Developer account fees, source-code ownership and handover terms are separate/agreed in the project contract.' }
    ]
  }
];

export const pricingTerms = [
  'All prices are indicative starting prices. Final pricing follows approved scope, modules, integrations and business workflows.',
  'GST/taxes are additional where applicable. Domain, hosting, cloud, SMS, WhatsApp, payment gateway, email, AI API, Maps, plugins, themes, stock media and app-store fees are separate unless quoted otherwise.',
  'Small projects: 50% advance and 50% before final delivery. Medium projects: 40% advance, 30% milestone and 30% final delivery. Large projects use milestone-based payments.',
  'New modules, features, screens, integrations, workflows, redesigns or platforms added after approval are estimated as change requests before implementation.',
  'Timeline depends on scope complexity, client approvals, content readiness and third-party services. Final quotation supersedes this general rate card.',
  'Source-code ownership, licensing, handover, warranty and AMC terms are defined in the project agreement.'
];
