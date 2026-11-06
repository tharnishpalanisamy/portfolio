import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Binary, Braces, Code2, Database, Globe2, Layers3, Mail, Menu, Network, Sparkles, X } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'

const personal = {
  name: 'Tharnish P.', location: 'Coimbatore, India',
  github: 'https://github.com/tharnishpalanisamy',
  linkedin: 'https://www.linkedin.com/in/tharnish-palanisamy/',
  leetcode: 'https://leetcode.com/u/tharnishpalanisamy/',
  email: 'tharnishpalanisamy3@gmail.com',
  resume: '', // Add a public resume path, for example /resume.pdf.
}

const sections = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'DSA', 'Contact']

type Project = {
  id: string; number: string; name: string; type: string; title: string; description: string;
  status: string; featured?: boolean; stack: string[]; highlights: string[]; note: string; repo: string;
  problem?: string; motivation?: string; solution?: string; architecture?: string[];
  implemented?: string[]; inProgress?: string[]; sourcePending?: boolean;
  authentication?: string; dataModel?: string;
}

const projects: Project[] = [
  {
    id: 'dog-territory', number: '01', name: 'Dog Territory', type: 'FULL-STACK · BACKEND ENGINEERING',
    title: 'A better way to coordinate community care.',
    description: 'A community-driven platform for reporting street dog incidents, managing dog records, and bringing citizens, volunteers, and administrators together.',
    status: 'In development', featured: true,
    stack: ['React', 'TypeScript', 'React Router', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT'],
    problem: 'Street dog records and welfare reports are difficult to follow when they live in disconnected conversations and informal notes. A dog also needs a durable identity so that care information can be found again.',
    motivation: 'Build a practical community tool that gives citizens a way to report concerns and gives authorized volunteers and administrators a shared record to work from.',
    solution: 'Dog Territory combines account access, dog records with generated identification codes, and report submission in a React application backed by a modular FastAPI API.',
    architecture: ['React + TypeScript client', 'FastAPI routers + role dependencies', 'Service layer + protocols', 'SQLAlchemy repositories + async session', 'PostgreSQL + Alembic migrations'],
    authentication: 'Passwords are hashed with pwdlib. Login returns a short-lived JWT access token and an opaque refresh token. Only a SHA-256 hash of the refresh token is stored; refresh locks and validates its record, creates a replacement, and revokes the old record. If a revoked token is reused, the service revokes the user’s active refresh tokens.',
    dataModel: 'SQLAlchemy models cover users and roles, refresh-token lineage, dogs, volunteers, and reports. Dog records carry a unique dog code, postal-code sequence, area, coordinates, vaccination data, and creator; a database constraint also prevents duplicate dog numbers within a postal code. Reports link to their reporter and optionally a dog, and store image path metadata.',
    implemented: [
      'Signup, login, current-user lookup, access JWTs, and refresh-token endpoint.',
      'Passwords hashed with pwdlib; refresh tokens are opaque random values whose SHA-256 hashes are stored server-side.',
      'Refresh rotation locks and checks the old token, issues a replacement, and revokes the previous record. Reuse of a revoked token triggers revocation of the user’s active tokens.',
      'Dog create, read, update, and delete API routes with role checks; dog codes are generated from the postal code and per-area sequence.',
      'Dog filters for status, sterilization, vaccination, location, postal code, and age, plus bounded limit/offset pagination.',
      'Report creation with optional image upload, plus authenticated report listing, filters, and detail retrieval.',
      'SQLAlchemy models for users, dogs, reports, volunteers, and refresh tokens; Alembic schema revisions.',
      'Central exception handlers, request-logging middleware, and CORS configuration.',
    ],
    inProgress: [
      'The dashboard dog, report, volunteer, and profile views currently read mock data; sign-in and sign-up call the API.',
      'Backend report routes currently cover create and read flows; report status-management UI is not connected to those routes.',
      'Volunteer services and models exist, but the volunteer API router is not included in the active v1 router.',
      'No application screenshots were present in the inspected checkout. The portfolio artwork is an illustration, not a product screenshot.',
    ],
    highlights: ['JWT access + rotated opaque refresh tokens', 'Router → service → repository boundaries', 'Dog CRUD, filters, and pagination', 'Report submission and image upload'],
    note: 'The backend is active work. Dashboard modules for dogs, reports, volunteers, and profile still use prototype/mock data; the app should not be described as fully connected end to end.',
    repo: 'https://github.com/tharnishpalanisamy/dog-territory',
  },
  {
    id: 'ai-workspace', number: '02', name: 'AI Operations Workspace', type: 'FULL-STACK + AI',
    title: 'Project details pending source review.',
    description: 'A clearly marked project placeholder. Its source repository was not present among the inspected project folders, so no functionality, framework, architecture, or AI integration is claimed.',
    status: 'Source not provided', stack: ['Implementation details pending'],
    highlights: ['Problem and solution to document from the source', 'Technology stack and architecture to verify', 'AI integrations to verify before describing'],
    note: 'Placeholder retained at the owner’s request. Add the project folder or repository URL before publishing this case study.',
    repo: '', sourcePending: true,
  },
  {
    id: 'product-management', number: '03', name: 'Product Management Application', type: 'BACKEND ENGINEERING',
    title: 'Implementation details pending source review.',
    description: 'A clearly marked project placeholder. No matching Product Management source was found in the inspected folders, so its requested CRUD, upload, payment, and email features are not presented as verified work.',
    status: 'Source not provided', stack: ['Implementation details pending'],
    highlights: ['Product CRUD implementation to verify', 'Database, migrations, and uploads to verify', 'Razorpay and SMTP configuration to verify'],
    note: 'The available neighboring API is a Job Recruitment project, not this Product Management application. Its code and features have not been substituted here.',
    repo: '', sourcePending: true,
  },
  {
    id: 'event-site', number: '04', name: 'Department Event Website', type: 'WEB DEVELOPMENT', title: 'A digital home for a department event.', description: 'A department event website I have worked on. Add the event context and project details when ready.', status: 'Details to add', stack: ['Technology stack to add'], highlights: ['Project title and description to add', 'Add verified implementation details', 'Repository URL to add'], note: 'Details are placeholders pending project information.', repo: '', sourcePending: true,
  },
]

const skillGroups = [
  { icon: Code2, title: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'SQL', 'PHP', 'HTML', 'CSS'] },
  { icon: Braces, title: 'Frontend', items: ['React', 'React Router', 'Vite', 'Bootstrap', 'jQuery', 'HTML5', 'CSS3'] },
  { icon: Network, title: 'Backend & architecture', items: ['FastAPI', 'REST APIs', 'SQLAlchemy', 'Async SQLAlchemy', 'Pydantic', 'Alembic', 'Node.js', 'Express.js', 'JWT', 'Refresh token rotation', 'RBAC', 'Dependency injection', 'Repository pattern', 'Migrations', 'Testing'] },
  { icon: Database, title: 'Databases', items: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'MongoDB'] },
  { icon: Sparkles, title: 'AI & machine learning', items: ['NumPy', 'Pandas', 'Scikit-learn', 'EDA', 'Feature engineering', 'Model evaluation', 'LLM API integration', 'RAG · exploring', 'Embeddings · exploring', 'Vector databases · exploring'] },
  { icon: Layers3, title: 'Tools & engineering', items: ['Git', 'GitHub', 'Postman', 'Swagger / OpenAPI', 'VS Code', 'PyCharm', 'MongoDB Compass', 'npm', 'Vite', 'API testing'] },
]

const algorithms = ['Arrays & strings', 'Linked lists', 'Trees', 'Graphs', 'BFS / DFS', 'Topological sort', 'Shortest paths', 'Minimum spanning trees', 'Disjoint set union', 'Backtracking', 'Dynamic programming']

function App() {
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { setActive(entry.target.id === 'home' ? 'Home' : entry.target.id); entry.target.classList.add('in-view') }
    }), { rootMargin: '-32% 0px -58% 0px' })
    document.querySelectorAll('main section[id], header[id]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const readProjectFromUrl = () => setSelected(new URLSearchParams(window.location.search).get('project'))
    readProjectFromUrl()
    window.addEventListener('popstate', readProjectFromUrl)
    return () => window.removeEventListener('popstate', readProjectFromUrl)
  }, [])

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.querySelector<HTMLButtonElement>('.modal-close')?.focus()
    return () => { document.body.style.overflow = previousOverflow; returnFocus.current?.focus() }
  }, [selected])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeProject() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const project = projects.find(item => item.id === selected)
  function openProject(projectId: string) {
    if (!selected && document.activeElement instanceof HTMLElement) returnFocus.current = document.activeElement
    const url = new URL(window.location.href)
    url.searchParams.set('project', projectId)
    window.history.pushState({}, '', url)
    setSelected(projectId)
  }
  function closeProject() {
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    window.history.replaceState({}, '', url)
    setSelected(null)
  }

  return <MotionConfig reducedMotion="user"><>
    <header className="nav-wrap"><nav className="nav shell" aria-label="Main navigation">
      <a className="brand" href="#home" aria-label="Tharnish P., home"><span className="brand-mark">TP</span><span>tharnish<span className="brand-dot">.</span></span></a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>{sections.map(item => <a key={item} className={active === item ? 'active' : ''} onClick={() => setMenuOpen(false)} href={item === 'Home' ? '#home' : `#${item.toLowerCase()}`}>{item}</a>)}
        <div className="mobile-social"><SocialLinks /></div>
      </div>
      <div className="nav-actions"><SocialLinks />{personal.resume ? <a className="button button-small button-outline" href={personal.resume} download>Download resume <ArrowUpRight size={14} /></a> : <span className="button button-small button-outline button-disabled" aria-disabled="true" title="No resume file has been added yet">Resume not attached</span>}</div>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </nav></header>

    <main>
      <section id="home" className="hero shell section-reveal" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> FULL-STACK DEVELOPER <span className="eyebrow-divider">/</span> AI ENTHUSIAST</div>
          <h1 id="hero-title">Building intelligent<br />software, <span className="text-gradient">from<wbr /> backend</span><br />systems to AI-<wbr />powered<br />experiences<span className="period">.</span></h1>
          <p className="hero-description">I'm Tharnish, a software engineer focused on full-stack development, backend architecture, and AI-powered applications. I enjoy turning complex problems into practical, well-engineered solutions.</p>
          <div className="hero-meta"><span><Globe2 size={15} /> {personal.location}</span><span className="availability"><span className="status-dot muted" /> Availability <em>not specified</em></span></div>
          <div className="hero-actions"><a href="#projects" className="button button-primary">Explore projects <ArrowRight size={16} /></a>{personal.resume ? <a href={personal.resume} download className="button button-ghost">Download resume <ArrowUpRight size={15} /></a> : <span className="button button-ghost button-disabled" aria-disabled="true" title="No resume file has been added yet">Resume not attached</span>}</div>
          <div className="hero-social"><SocialLinks /><span className="social-note">Open to thoughtful conversations</span></div>
        </div>
        <ArchitectureVisual />
        <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDown size={13} /></a>
      </section>

      <section id="about" className="section shell section-reveal">
        <SectionHeading index="01" kicker="A LITTLE ABOUT HOW I BUILD" title={<>Curious about the <span className="text-gradient">whole system.</span></>} />
        <div className="about-grid"><div className="about-copy"><p className="lead">I like understanding how applications work from the inside out.</p><p>I'm a Computer Science graduate drawn to the connections between thoughtful interfaces, reliable APIs, and well-designed data. My path so far has been hands-on: building practical applications, learning backend architecture, solving algorithmic problems, and exploring machine learning.</p><p>I learn best by implementing real systems—working through the details, finding what breaks, and making the next version a little better.</p></div>
          <div className="credential-stack"><article className="credential"><div className="credential-icon"><Layers3 size={18} /></div><div><span className="micro-label">EDUCATION · 2026</span><h3>B.Sc. Computer Science<br />with Data Analytics</h3><p>PSG College of Arts & Science <span>·</span> CGPA 7.5</p></div><ArrowUpRight size={16} className="card-arrow" /></article><article className="credential"><div className="credential-icon blue"><Code2 size={18} /></div><div><span className="micro-label">CURRENTLY LEARNING</span><h3>Full-stack systems<br />and applied AI</h3><p>Backend foundations · AI/ML exploration</p></div><ArrowUpRight size={16} className="card-arrow" /></article></div>
        </div>
      </section>

      <section id="skills" className="section shell section-reveal">
        <SectionHeading index="02" kicker="THE TECHNICAL ARSENAL" title={<>Tools for <span className="text-gradient">building well.</span></>} sub="A growing toolkit shaped by the applications I build and the systems I want to understand." />
        <div className="skills-grid">{skillGroups.map(({ icon: Icon, title, items }, i) => <article className="skill-card" key={title}><div className="skill-card-top"><span className="skill-icon"><Icon size={17} /></span><span className="micro-label">0{i + 1}</span></div><h3>{title}</h3><div className="tag-list">{items.map(skill => <span className={`tag ${skill.includes('exploring') ? 'tag-learning' : ''}`} key={skill}>{skill}</span>)}</div></article>)}</div>
      </section>

      <section id="projects" className="section shell section-reveal">
        <SectionHeading index="03" kicker="SELECTED WORK" title={<>Built by <span className="text-gradient">doing the work.</span></>} sub="Projects are where I practice turning engineering ideas into useful, working systems." />
        <div className="project-list">{projects.map(item => <article key={item.id} className={`project-card ${item.featured ? 'project-featured' : ''}`}>
          <div className="project-number">{item.number}<span className="number-rule" /></div><div className="project-main"><div className="project-topline"><span className="micro-label">{item.type}</span><span className="project-status"><i />{item.status}</span></div><h3>{item.name}</h3><h4>{item.title}</h4><p>{item.description}</p><div className="tag-list project-tags">{item.stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
            <button className="text-link" onClick={() => openProject(item.id)}>Explore case study <ArrowUpRight size={15} /></button>
          </div><ProjectArtwork id={item.id} /><div className="project-edge"><button onClick={() => openProject(item.id)} aria-label={`Open ${item.name} case study`}><ArrowUpRight size={18} /></button></div>
        </article>)}</div>
      </section>

      <section id="experience" className="section shell section-reveal">
        <SectionHeading index="04" kicker="EXPERIENCE" title={<>Learning through <span className="text-gradient">real systems.</span></>} />
        <div className="experience-card"><div className="timeline-rail"><span /></div><div className="experience-content"><div className="experience-head"><div><span className="micro-label">MARCH 2026 — PRESENT</span><h3>Software Engineer Trainee</h3><p className="company">G2 TechSoft</p></div><span className="experience-type">HANDS-ON TRAINING</span></div><p className="experience-description">Building practical skills in backend application architecture and full-stack development—learning by implementing APIs, working with relational data, and applying core software engineering patterns.</p><div className="experience-details"><div><span className="micro-label">FOCUS AREAS</span><p>REST APIs · Authentication · Database-driven applications · API testing · Migrations</p></div><div><span className="micro-label">WORKING WITH</span><p>Python · FastAPI · PostgreSQL · SQLAlchemy · React · TypeScript</p></div></div></div></div>
      </section>

      <section id="dsa" className="section shell section-reveal">
        <SectionHeading index="05" kicker="DATA STRUCTURES & ALGORITHMS" title={<>Enjoying the <span className="text-gradient">hard problems.</span></>} sub="A practice that keeps me sharp and helps me think clearly about trade-offs." />
        <div className="dsa-layout"><div className="dsa-count-card"><div className="dsa-count"><span>214</span><span className="count-plus">+</span></div><span className="micro-label">PROBLEMS SOLVED · HISTORICAL COUNT</span><div className="count-rule" /><p>Problem solving is a steady part of how I learn. The count is an editable historical snapshot, not live profile data.</p><a className="profile-link" href={personal.github} target="_blank" rel="noreferrer"><GithubMark size={15} /> GitHub <ArrowUpRight size={13} /></a><a className="profile-link" href={personal.leetcode} target="_blank" rel="noreferrer"><Binary size={15} /> LeetCode <ArrowUpRight size={13} /></a><Binary className="count-ornament" size={128} strokeWidth={0.6} /></div>
          <div className="dsa-topics"><div className="topic-header"><div><span className="micro-label">CURRENT PRACTICE</span><h3>Building breadth, one problem at a time.</h3></div><span className="topic-focus"><span className="status-dot" /> DP IN PROGRESS</span></div><div className="topic-tags">{algorithms.map((topic, i) => <span key={topic} className={i === 3 || i === 9 ? 'topic-strong' : i === 10 ? 'topic-current' : ''}>{topic}</span>)}</div><div className="strength-row"><div><span className="strength-icon purple"><Network size={17} /></span><div><span className="micro-label">STRONG AREAS</span><b>Graphs</b></div></div><div><span className="strength-icon blue"><Binary size={17} /></span><div><span className="micro-label">STRONG AREAS</span><b>Backtracking</b></div></div><div><span className="strength-icon amber"><Braces size={17} /></span><div><span className="micro-label">IN PROGRESS</span><b>Dynamic programming</b></div></div></div></div>
        </div>
      </section>

      <section id="ml" className="section shell section-reveal">
        <SectionHeading index="06" kicker="MACHINE LEARNING JOURNEY" title={<>Learning by <span className="text-gradient">working through it.</span></>} sub="Practical experiments with data preparation, model building, and honest evaluation." />
        <div className="ml-flow" aria-label="Data to preprocessing to training to evaluation"><div className="flow-node"><span>01</span><b>Data</b><small>Explore & clean</small></div><ArrowRight className="flow-arrow" /><div className="flow-node"><span>02</span><b>Preprocess</b><small>Transform & engineer</small></div><ArrowRight className="flow-arrow" /><div className="flow-node"><span>03</span><b>Train</b><small>Fit & tune models</small></div><ArrowRight className="flow-arrow" /><div className="flow-node flow-node-current"><span>04</span><b>Evaluate</b><small>Validate results</small></div></div>
        <div className="ml-cards"><article><span className="ml-card-index">01 / REGRESSION</span><h3>House price prediction</h3><p>Implemented a linear regression model with Scikit-learn on a house price dataset.</p><span className="ml-card-tech">SCIKIT-LEARN · REGRESSION</span></article><article><span className="ml-card-index">02 / CLASSIFICATION</span><h3>Titanic survival</h3><p>Built a preprocessing and classification pipeline with engineered features and mixed-type data handling.</p><span className="ml-card-tech">PIPELINE · COLUMNTRANSFORMER · LOGISTIC REGRESSION</span></article><article><span className="ml-card-index">03 / MODEL TUNING</span><h3>Bank marketing experiments</h3><p>Explored Decision Tree and Random Forest models with cross-validation and GridSearchCV tuning.</p><span className="ml-card-tech">GRIDSEARCHCV · CROSS-VALIDATION</span></article></div>
        <p className="learning-note"><Sparkles size={15} /> Currently exploring LLM application patterns, RAG, embeddings, and vector databases.</p>
      </section>

      <section id="contact" className="contact-section section-reveal"><div className="contact-inner shell"><div><span className="eyebrow"><span className="status-dot" /> LET'S CONNECT</span><h2>Have an interesting<br />problem? <span className="text-gradient">Let's build something.</span></h2><p>I'm always glad to talk about software, backend systems, and good engineering problems.</p></div><div className="contact-actions"><a className="button button-primary" href={`mailto:${personal.email}`}><Mail size={16} /> Email me <ArrowUpRight size={15} /></a><a className="contact-email" href={`mailto:${personal.email}`}>{personal.email}</a><a href={personal.github} target="_blank" rel="noreferrer" className="contact-social"><GithubMark size={17} /> GitHub <ArrowUpRight size={14} /></a><a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-social"><LinkedinMark size={17} /> LinkedIn <ArrowUpRight size={14} /></a><span className="contact-location"><Globe2 size={15} /> {personal.location}</span></div><div className="contact-decoration">TP<span>.</span></div></div></section>
    </main>

    <footer className="footer shell"><a className="brand" href="#home"><span className="brand-mark">TP</span><span>tharnish<span className="brand-dot">.</span></span></a><span className="footer-note">Designed & built with care<span className="footer-dot"> · </span>© {new Date().getFullYear()} Tharnish P.</span><div className="footer-links"><a href="#about">About</a><a href="#projects">Projects</a><a href="#contact">Contact</a><a href={personal.github} aria-label="GitHub" target="_blank" rel="noreferrer"><GithubMark size={15} /></a></div></footer>

    <AnimatePresence>{project && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && closeProject()}><motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: .98 }} transition={{ duration: .22 }}><button className="modal-close" aria-label="Close case study" onClick={closeProject}><X size={19} /></button><span className="micro-label">CASE STUDY · {project.number} / 04</span><span className="project-status modal-status"><i />{project.status}</span><h2 id="case-title">{project.name}</h2><h3>{project.title}</h3><p>{project.description}</p>{(project.problem || project.sourcePending) && <CaseStudyDetails project={project} />}<div className="modal-divider" /><div className="modal-columns"><div><span className="micro-label">IMPLEMENTATION HIGHLIGHTS</span><ul>{project.highlights.map(point => <li key={point}>{point}</li>)}</ul></div><div><span className="micro-label">TECHNOLOGY</span><div className="tag-list modal-tags">{project.stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></div>{project.inProgress && <div className="status-panel"><span className="micro-label">IN DEVELOPMENT / NOT YET CONNECTED</span><ul>{project.inProgress.map(item => <li key={item}>{item}</li>)}</ul></div>}<p className="case-note">{project.note}</p>{project.repo ? <a className="button button-outline" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={15} /></a> : <span className="repo-pending">No repository link available to verify</span>}</motion.article></motion.div>}</AnimatePresence>
  </></MotionConfig>
}

function GithubMark({ size = 17 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" /></svg> }
function LinkedinMark({ size = 17 }: { size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.34H4.97V9.02h2.96v9.32ZM6.45 7.75a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.56 10.59h-2.95v-4.53c0-1.08-.02-2.47-1.51-2.47-1.51 0-1.74 1.18-1.74 2.39v4.61H9.86V9.02h2.83v1.27h.04c.39-.73 1.36-1.5 2.8-1.5 3 0 3.48 1.97 3.48 4.53v5.02Z" /></svg> }

function SocialLinks() { return <div className="social-links"><a aria-label="GitHub" href={personal.github} target="_blank" rel="noreferrer"><GithubMark /></a><a aria-label="LinkedIn" href={personal.linkedin} target="_blank" rel="noreferrer"><LinkedinMark /></a></div> }

function CaseStudyDetails({ project }: { project: Project }) {
  return <div className="case-study-details">
    {project.sourcePending ? <div className="source-pending"><span className="micro-label">SOURCE REVIEW REQUIRED</span><p>The source files were not available in the inspected workspace. This case study intentionally contains no implementation claims.</p></div> : <>
      <div className="case-story-grid">
        <article><span className="micro-label">THE PROBLEM</span><p>{project.problem}</p></article>
        <article><span className="micro-label">MOTIVATION</span><p>{project.motivation}</p></article>
        <article><span className="micro-label">SOLUTION</span><p>{project.solution}</p></article>
      </div>
      {project.architecture && <div className="case-architecture"><div className="case-subheading"><span className="micro-label">SYSTEM ARCHITECTURE</span><span className="case-flow-label">REQUEST → DATA FLOW</span></div><div className="architecture-flow" role="img" aria-label={project.architecture.join(' to ')}>{project.architecture.map((layer, index) => <div className="architecture-flow-step" key={layer}><span>0{index + 1}</span><b>{layer}</b>{index < project.architecture!.length - 1 && <ArrowRight className="architecture-flow-arrow" size={15} />}</div>)}</div></div>}
      {project.authentication && <article className="case-detail-block"><span className="micro-label">AUTHENTICATION ARCHITECTURE</span><p>{project.authentication}</p></article>}
      {project.dataModel && <article className="case-detail-block"><span className="micro-label">POSTGRESQL DATA MODEL</span><p>{project.dataModel}</p></article>}
      {project.implemented && <div className="case-implemented"><span className="micro-label">IMPLEMENTED IN THE BACKEND</span><ul>{project.implemented.map(item => <li key={item}>{item}</li>)}</ul></div>}
    </>}
  </div>
}

function SectionHeading({ index, kicker, title, sub }: { index: string; kicker: string; title: ReactNode; sub?: string }) { return <div className="section-heading"><span className="section-index">{index}<i /></span><div><span className="eyebrow">{kicker}</span><h2>{title}</h2>{sub && <p>{sub}</p>}</div></div> }

function ArchitectureVisual() { return <div className="architecture" aria-label="Illustration of a connected software architecture"><div className="arch-label"><span className="status-dot" /> SYSTEM MAP <span>· 04 MODULES</span></div><svg className="arch-lines" viewBox="0 0 560 470" fill="none" aria-hidden="true"><path d="M277 132V182M277 182H135V224M277 182H420V224M135 278V326H277V364M420 278V326H277" stroke="url(#lineGradient)" strokeWidth="1.4" strokeDasharray="4 5"/><circle cx="277" cy="182" r="3" fill="#7c70f5"/><circle cx="135" cy="326" r="2.5" fill="#38bdf8"/><circle cx="420" cy="326" r="2.5" fill="#7c70f5"/><defs><linearGradient id="lineGradient" x1="135" y1="182" x2="420" y2="364" gradientUnits="userSpaceOnUse"><stop stopColor="#4f46e5" stopOpacity=".2"/><stop offset=".48" stopColor="#8b82fa" stopOpacity=".78"/><stop offset="1" stopColor="#38bdf8" stopOpacity=".25"/></linearGradient></defs></svg>
    <div className="arch-node arch-core"><div className="core-orbit orbit-a"/><div className="core-orbit orbit-b"/><span className="core-glyph">{`{ }`}</span><span className="node-title">APPLICATION</span><span className="node-sub">thoughtful by design</span><span className="core-pulse" /></div>
    <div className="arch-node node-frontend"><span className="node-icon node-indigo"><Braces size={16} /></span><span className="node-title">FRONTEND</span><span className="node-sub">React · TypeScript</span><span className="node-live" /></div>
    <div className="arch-node node-backend"><span className="node-icon node-blue"><Code2 size={16} /></span><span className="node-title">BACKEND</span><span className="node-sub">FastAPI · Python</span><span className="node-live" /></div>
    <div className="arch-node node-data"><span className="node-icon node-cyan"><Database size={16} /></span><span className="node-title">DATA</span><span className="node-sub">PostgreSQL</span><span className="node-live" /></div>
    <div className="arch-node node-ai"><span className="node-icon node-amber"><Sparkles size={16} /></span><span className="node-title">AI / ML</span><span className="node-sub">always exploring</span><span className="node-live learning" /></div>
    <div className="arch-caption"><span className="caption-line" /> SYSTEMS THAT FIT TOGETHER <span className="caption-line" /></div><div className="arch-coordinates">FIG. 01<br /><span>APPLICATION MAP</span></div><div className="arch-grid" /></div> }

function ProjectArtwork({ id }: { id: string }) { return <div className={`project-art art-${id}`} aria-hidden="true">{id === 'dog-territory' ? <div className="map-art"><div className="map-grid"/><svg viewBox="0 0 340 210" fill="none"><path d="M22 154C61 142 64 88 113 101C151 111 153 52 197 67C242 82 243 131 309 53" stroke="#7064ed" strokeWidth="2" strokeDasharray="4 5"/><path d="M22 154C61 142 64 88 113 101C151 111 153 52 197 67C242 82 243 131 309 53" stroke="url(#route)" strokeWidth="1"/><defs><linearGradient id="route" x1="22" y1="154" x2="309" y2="53"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs>{[[22,154],[113,101],[197,67],[309,53]].map(([cx,cy], i) => <g key={i}><circle cx={cx} cy={cy} r="8" fill="#6258d8" fillOpacity=".22"/><circle cx={cx} cy={cy} r="3" fill={i===1?'#38bdf8':'#a9a1ff'}/></g>)}</svg><div className="map-marker marker-one"><span /> DOG RECORD</div><div className="map-marker marker-two"><span /> COMMUNITY REPORT</div><div className="map-coordinate">ILLUSTRATION / NOT A SCREENSHOT</div></div> : id === 'ai-workspace' ? <div className="ai-art"><div className="ai-spark"><Sparkles size={27}/></div><div className="ai-orbit orbit-one"/><div className="ai-orbit orbit-two"/><span className="ai-chip chip-a">IDEA</span><span className="ai-chip chip-b">SYSTEM</span><span className="ai-chip chip-c">EXPLORATION</span><div className="ai-art-label">CONCEPT / SOURCE PENDING</div></div> : id === 'product-management' ? <div className="product-art-ui"><div className="source-art-note">CONCEPT / SOURCE PENDING</div><div className="product-window"><div className="window-top"><span/><span/><span/><i>PRODUCT WORKFLOW / CONCEPT</i></div><div className="window-body"><div className="product-sidebar"><span/><span/><span/><span/></div><div className="product-content"><div className="product-headline"/><div className="product-chart"><i/><i/><i/><i/><i/><i/><i/></div><div className="product-rows"><span/><span/><span/></div></div></div></div></div> : <div className="event-art"><div className="event-ring ring-a"/><div className="event-ring ring-b"/><span className="event-star">✳</span><span className="event-word">GATHER<br/><i>ideas.</i></span><span className="event-side">DEPARTMENT / EVENT</span></div>}</div> }

export default App
