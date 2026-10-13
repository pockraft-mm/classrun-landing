import { useEffect, useState } from 'react';
import { ArrowRight, Award, BookOpen, CalendarCheck, Check, ClipboardCheck, GraduationCap, Menu, Users, X, Plus, Send, Mail } from 'lucide-react';
import { createPortal } from 'react-dom';

const features = [
  { icon: BookOpen, title: 'Manage classes and courses', body: 'Organize courses, batches, schedules, and session types in one clear workspace.', detail: 'Create courses with a level, teacher, session count, and weekly cadence. Group learners into batches, manage enrollment and status, then set the dates and delivery mode for each session.' },
  { icon: Users, title: 'Manage students and staff', body: 'Maintain student and teacher records, grouped by course and class batch.', detail: 'Keep student and teacher records together with course assignments. Find students by name, course, or batch, review attendance and homework progress, and manage teacher contact details and course ownership.' },
  { icon: CalendarCheck, title: 'Track attendance', body: 'Record attendance against scheduled sessions and keep participation easy to review.', detail: 'Choose a course, batch, week, and session to open the register. Mark each learner present or absent, save the record, and review live or recorded lesson completion in the student view.' },
  { icon: ClipboardCheck, title: 'Manage homework', body: 'Create and organize assignments, with a customizable frequency that fits each course.', detail: 'Set an assignment for a course, batch, and session, then record completion for each student. Add teacher feedback, save the class results, and let students follow their own homework progress.' },
];

const work = [
  { n: '01', icon: GraduationCap, title: 'Set up your school', body: 'Create courses and batches, invite teachers and bring your students in.' },
  { n: '02', icon: ClipboardCheck, title: 'Run each session', body: 'Manage schedules, mark attendance and keep homework moving.' },
  { n: '03', icon: Award, title: 'Celebrate progress', body: 'Use reports and student achievements to see what is working and who needs support.' },
];

const faqs = [
  { q: 'Who is Classrun for?', a: 'Classrun is designed for schools and learning centers that want one place to manage courses, batches, teachers, students and day-to-day class progress.' },
  { q: 'What can our team manage with Classrun?', a: 'Teams can organize courses and class batches, track attendance, assign homework, recognize student achievements and review progress reports.' },
  { q: 'Can teachers and students use it too?', a: 'Yes. Classrun includes role-based experiences for school administrators, teachers and students, so each person can focus on the information that matters to them.' },
  { q: 'How can we learn more or request a walkthrough?', a: 'Send a product inquiry below and the Pockraft Studio team can follow up about a walkthrough, fit for your school, or next steps.' },
];

const featureScreens = [
  [
    { label: 'Courses', title: 'Courses', action: '+ Create Course', metrics: [['Courses', '08'], ['Batches', '12'], ['Sessions / week', '4']], columns: ['Course', 'Level', 'Teacher'], rows: [['English', 'Level 2', 'Jamie Lee'], ['Math', 'Grade 4', 'Sam Rivera'], ['Science', 'Level 1', 'Unassigned']] },
    { label: 'Batches', title: 'Batch Management', action: '+ New Batch', metrics: [['Active', '08'], ['Upcoming', '03'], ['Students', '124']], columns: ['Batch', 'Course', 'Status'], rows: [['Weekday A', 'English · L2', 'Active'], ['Weekend B', 'Math · G4', 'Upcoming'], ['Evening A', 'Science · L1', 'Active']] },
    { label: 'Course setup', title: 'Create a course', action: 'Create Course', metrics: [], columns: ['Course level', 'Course name', 'Sessions / week'], rows: [['Level 2', 'English', '4'], ['First batch', 'Weekday A', 'Teacher: Jamie Lee']] },
    { label: 'Schedule', title: 'Session Schedule', action: 'Edit Dates', metrics: [['Course', 'English · L2'], ['Batch', 'Weekday A'], ['Cadence', '4 / week']], columns: ['Session', 'Date & time', 'Type'], rows: [['Session 01', 'Mon · 9:00 AM', 'Live'], ['Session 02', 'Tue · 9:00 AM', 'Recorded'], ['Session 03', 'Wed · 9:00 AM', 'Live']] },
  ],
  [
    { label: 'Students', title: 'Student Directory & Standings', action: '＋ Add Student', metrics: [['Students', '124'], ['Avg. attendance', '92%'], ['Homework', '86%']], columns: ['Rank · Student', 'Course & batch', 'Points'], rows: [['#01 · Alex Morgan', 'English · Weekday A', '240'], ['#02 · Mia Chen', 'Math · Weekend B', '218'], ['#03 · Noah Kim', 'English · Weekday A', '196']] },
    { label: 'Teachers', title: 'Teachers', action: '+ Add Teacher', metrics: [['Teachers', '08'], ['Assigned', '06'], ['Unassigned', '02']], columns: ['Teacher', 'Contact', 'Assigned course'], rows: [['Jamie Lee', 'jamie@school.edu', 'English · L2'], ['Sam Rivera', 'sam@school.edu', 'Math · G4'], ['Taylor Park', 'taylor@school.edu', 'Unassigned']] },
    { label: 'Progress', title: 'Student Profile', action: 'View Profile', metrics: [['Attendance', '94%'], ['Homework', '88%'], ['Points', '240']], columns: ['Learning record', 'Progress', 'Status'], rows: [['Live sessions', '15 of 16', 'On track'], ['Homework', '7 of 8', '1 due'], ['Badges earned', '04', 'Growing']] },
    { label: 'Invite', title: 'Invite a student', action: 'Send Invitation', metrics: [], columns: ['Student name', 'Email', 'Course & batch'], rows: [['Alex Morgan', 'alex@school.edu', 'English · Weekday A'], ['Role', 'Student', 'Welcome email enabled']] },
  ],
  [
    { label: 'Register', title: 'Batch Attendance Register', action: 'Save Attendance', metrics: [['Course', 'English · L2'], ['Batch', 'Weekday A'], ['Session', '01 · Live']], columns: ['Student', 'Session status', 'Points'], rows: [['Alex Morgan', 'Present', '+2 pts'], ['Mia Chen', 'Present', '+2 pts'], ['Noah Kim', 'Absent', '—']] },
    { label: 'Week view', title: 'Choose week & session', action: 'Session 01', metrics: [['Week', '01'], ['Scheduled', '4'], ['Completed', '3']], columns: ['Session', 'Date', 'Delivery'], rows: [['01', 'Mon · Sep 09', 'Live class'], ['02', 'Tue · Sep 10', 'Recorded lesson'], ['03', 'Wed · Sep 11', 'Live class']] },
    { label: 'Session record', title: 'Attendance Record', action: 'Save Attendance', metrics: [['Present', '18'], ['Absent', '02'], ['Class size', '20']], columns: ['Student', 'Attendance', 'Record'], rows: [['Alex Morgan', 'Present', 'Saved'], ['Mia Chen', 'Present', 'Saved'], ['Noah Kim', 'Absent', 'Saved']] },
    { label: 'Student view', title: 'My Batch Attendance', action: 'Progress', metrics: [['Attendance rate', '94%'], ['Live classes', '12'], ['Recorded', '04']], columns: ['Session', 'Lesson', 'Completion'], rows: [['Session 01', 'Speaking practice', 'Completed · +2'], ['Session 02', 'Listening drill', 'Completed · +2'], ['Session 03', 'Reading practice', 'Pending']] },
  ],
  [
    { label: 'Assignment', title: 'Add Homework', action: '+ New Homework', metrics: [['Course', 'English · L2'], ['Batch', 'Weekday A'], ['Frequency', '4 / week']], columns: ['Assignment', 'Session', 'Due'], rows: [['Speaking practice', 'Session 01', 'Friday'], ['Reading response', 'Session 02', 'Monday']] },
    { label: 'Class tracker', title: 'Homework Progress', action: 'Save Homework', metrics: [['Completed', '16'], ['To review', '04'], ['Class size', '20']], columns: ['Student', 'Completion', 'Teacher notes'], rows: [['Alex Morgan', 'Done', 'Clear pronunciation'], ['Mia Chen', 'Done', 'Great effort'], ['Noah Kim', 'In progress', 'Awaiting submission']] },
    { label: 'Review', title: 'Manage & Grade Homework', action: 'Save Results', metrics: [['Assignment', 'Speaking practice'], ['Session', '01'], ['Due date', 'Friday']], columns: ['Student', 'Status', 'Feedback'], rows: [['Alex Morgan', 'Complete', 'Strong delivery'], ['Mia Chen', 'Complete', 'Add more detail'], ['Noah Kim', 'Not yet', '—']] },
    { label: 'Student view', title: 'My Homework', action: 'Progress', metrics: [['Assignments', '08'], ['Completed', '07'], ['Points earned', '21']], columns: ['Session', 'Assignment', 'Status'], rows: [['01', 'Speaking practice', 'Completed'], ['02', 'Reading response', 'Completed'], ['03', 'Listening drill', 'In progress']] },
  ],
];

function FeatureDescription({ brief, detail }: { brief: string; detail: string }) {
  const [descriptionMode, setDescriptionMode] = useState<'brief' | 'detail'>('brief');
  return <div className="feature-description">
    <p>{descriptionMode === 'brief' ? brief : detail}</p>
    <div className="description-toggle" role="group" aria-label="Feature description length">
      <button type="button" aria-pressed={descriptionMode === 'brief'} className={descriptionMode === 'brief' ? 'selected' : ''} onClick={() => setDescriptionMode('brief')}>Brief</button>
      <button type="button" aria-pressed={descriptionMode === 'detail'} className={descriptionMode === 'detail' ? 'selected' : ''} onClick={() => setDescriptionMode('detail')}>Detail</button>
    </div>
  </div>;
}

function FeatureDemo({ index }: { index: number }) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const pages = featureScreens[index];
  const screen = pages[activeScreen];
  useEffect(() => {
    if (!isExpanded) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsExpanded(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isExpanded]);
  const renderWindow = (expanded = false) => <div className={`showcase-window${expanded ? ' showcase-window-expanded' : ''}`} role={expanded ? 'dialog' : undefined} aria-modal={expanded || undefined} aria-label={expanded ? `${screen.title} expanded preview` : undefined} onClick={(event) => event.stopPropagation()}>
    <div className="showcase-chrome"><span className="showcase-dots"><i/><i/><i/></span><span>CLASSRUN / SCHOOL DASHBOARD</span><b>Preview</b><button className="showcase-expand" type="button" onClick={() => setIsExpanded((value) => !value)} aria-label={expanded ? 'Close expanded preview' : 'Expand preview'}>{expanded ? 'Close preview' : 'Expand'}</button></div>
    <div className="showcase-tabs" role="tablist" aria-label={`${features[index].title} preview screens`}>
      {pages.map((page, pageIndex) => <button type="button" role="tab" aria-selected={activeScreen === pageIndex} className={activeScreen === pageIndex ? 'active' : ''} key={page.label} onClick={() => setActiveScreen(pageIndex)}>{page.label}</button>)}
    </div>
    <div className="showcase-content">
      <div className="showcase-title-row"><div><small>{index === 0 ? 'COURSES & BATCHES' : index === 1 ? 'PEOPLE & RECORDS' : index === 2 ? 'CLASS SESSIONS' : 'ASSIGNMENTS'}</small><h3>{screen.title}</h3></div><button type="button" className="showcase-action">{screen.action}</button></div>
      {screen.metrics.length > 0 && <div className="showcase-metrics">{screen.metrics.map(([label, value]) => <div key={label}><small>{label}</small><b>{value}</b></div>)}</div>}
      <div className="showcase-table"><div className="showcase-table-head">{screen.columns.map((column) => <span key={column}>{column}</span>)}</div>{screen.rows.map((row, rowIndex) => <div className="showcase-table-row" key={`${screen.label}-${rowIndex}`}>{row.map((cell, cellIndex) => <span key={`${cell}-${cellIndex}`} className={cellIndex === row.length - 1 ? 'showcase-cell-status' : ''}>{cellIndex === 0 && index === 1 && (activeScreen === 0 || activeScreen === 1) && <i className="showcase-avatar">{cell.slice(0, 1)}</i>}{cell}</span>)}</div>)}</div>
      <div className="showcase-footer"><span><i/> Updated just now</span><span>{activeScreen + 1} / {pages.length}</span></div>
    </div>
  </div>;
  return <div className="feature-demo">{renderWindow()}{isExpanded && createPortal(<div className="showcase-overlay" onClick={() => setIsExpanded(false)}>{renderWindow(true)}</div>, document.body)}</div>;
}

function BrandIcon() {
  return <span className="brand-mark"><img className="brand-logo" src="/programo-logo.png" alt="" /></span>;
}

function BrandLink() {
  return <a className="wordmark" href="/"><BrandIcon />classrun</a>;
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header"><a className="wordmark" href="/"><BrandIcon/>classrun</a><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button><nav className={open ? 'nav nav-open' : 'nav'}><a href="/features" onClick={close}>Features</a><a href="/faq" onClick={close}>FAQ</a><a href="/demo" onClick={close}>Demo</a><a className="nav-cta" href="/#inquiry" onClick={close}>Contact <ArrowRight size={15}/></a></nav></header>;
}

function SiteFooter() {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><BrandLink/><p>Thoughtful tools for better class days.</p><span className="studio-credit">A product by <b>Pockraft Studio</b></span><a className="studio-site" href="https://pockraft.asia" target="_blank" rel="noreferrer">pockraft.asia <ArrowRight size={12}/></a></div><div className="footer-column"><b>Explore</b><a href="/features">Features</a><a href="/faq">FAQs</a><a href="/demo">Demo</a></div><div className="footer-column"><b>Get in touch</b><a href="mailto:team.pockraft@gmail.com"><Mail size={13}/> team.pockraft@gmail.com</a><a href="https://t.me/pockraft_studio" target="_blank" rel="noreferrer"><Send size={13}/> @pockraft_studio</a><a href="tel:+959785700473">+95 978 570 0473</a></div></div><div className="footer-bottom"><span>© 2026 Pockraft Studio. All rights reserved.</span><span>Classrun · School management, simplified</span><a href="/">Home</a></div></footer>;
}

function FeaturePage() {
  return <><main className="route-page"><section className="feature-section route-feature-section"><div className="container"><div className="section-intro"><span className="section-kicker">THE EVERYDAY, MADE EASIER</span><h1>Four essentials.<br/><em>One clear workspace.</em></h1><p>Explore the Classrun screens for courses, people, attendance and homework.</p></div><div className="feature-grid">{features.map(({icon:Icon,title,body,detail},i)=><article className={`feature-card feature-card-${i}`} key={title}><FeatureDemo index={i}/><div className="feature-card-copy"><div className="feature-card-heading"><div className={`feature-icon feature-${i}`}><Icon size={19}/></div><span className="feature-number">0{i+1}</span></div><h2>{title}</h2><FeatureDescription brief={body} detail={detail}/></div></article>)}</div></div></section></main><InquirySection/></>;
}

function FAQPage() {
  return <><main className="route-page faq-route"><section className="faq-section"><div className="container faq-layout"><div className="faq-intro"><span className="section-kicker">GOOD QUESTIONS</span><h1>A few things<br/>you might be <em>wondering.</em></h1><p>Answers to common questions about Classrun.</p><a className="faq-contact" href="/#inquiry">Ask the team <ArrowRight size={15}/></a></div><div className="faq-list">{faqs.map(({q,a})=><details key={q}><summary>{q}<span><Plus size={15}/></span></summary><p>{a}</p></details>)}</div></div></section></main><InquirySection/></>;
}

function DemoPage() {
  return <><main className="route-page"><section className="tour-page"><section className="tour-page-heading"><span className="section-kicker">CLASSRUN DEMO</span><h1>See the class day<br/><em>come together.</em></h1><p>A quick look at how Classrun helps schools manage courses, students, attendance and homework.</p></section><section className="tour-page-video"><video controls playsInline preload="metadata" aria-label="Classrun product demo"><source src="/classrun-demo.mp4" type="video/mp4"/>Your browser does not support embedded video.</video><div className="tour-video-caption"><span><i/> Classrun walkthrough</span><a href="/#inquiry">Ask about Classrun <ArrowRight size={14}/></a></div></section></section></main><InquirySection/></>;
}

function HowItWorks() {
  return <section className="flow-section" id="how-it-works"><div className="container flow-inner"><div className="flow-heading"><span className="section-kicker">A SIMPLE RHYTHM</span><h2>Easy to start.<br/><em>Easy to keep going.</em></h2><p>Set up once, then let Classrun support the routines that keep a school running.</p><a href="/demo" className="flow-link">Watch the demo <ArrowRight size={15}/></a></div><div className="steps">{work.map(({n,icon:Icon,title,body},i)=><article className="step" key={n}><div className="step-marker"><span>{n}</span><div className="step-icon"><Icon size={19}/></div></div><div><h3>{title}</h3><p>{body}</p></div>{i<work.length-1&&<div className="step-line"/>}</article>)}</div></div></section>;
}

function InquirySection() {
  return <section className="inquiry-section" id="inquiry"><div className="container inquiry-layout"><div className="inquiry-copy"><span className="section-kicker">LET’S TALK ABOUT YOUR SCHOOL</span><h2>Curious about<br/><em>Classrun?</em></h2><p>Request a product walkthrough or ask us anything. Share a few details and the Pockraft Studio team will be in touch.</p><div className="inquiry-note"><span><Check size={15}/></span><p><b>Made for the everyday work of learning.</b><br/>We’ll help you find the right next step for your team.</p></div><div className="contact-links"><a href="mailto:team.pockraft@gmail.com"><Mail size={15}/><span><small>EMAIL THE TEAM</small>team.pockraft@gmail.com</span></a><a href="https://t.me/pockraft_studio" target="_blank" rel="noreferrer"><Send size={15}/><span><small>TELEGRAM</small>@pockraft_studio</span></a><a href="tel:+959785700473"><span className="phone-symbol">☎</span><span><small>CALL OR MESSAGE</small>+95 978 570 0473</span></a><a href="https://pockraft.asia" target="_blank" rel="noreferrer"><span className="web-symbol">↗</span><span><small>POCKRAFT WEBSITE</small>pockraft.asia</span></a></div></div><form className="inquiry-form" action="mailto:team.pockraft@gmail.com" method="post" encType="text/plain"><div className="form-heading"><h3>Send a product inquiry</h3><p>We’ll get back to you as soon as we can.</p></div><div className="form-fields"><label>Your name<input name="name" autoComplete="name" placeholder="e.g. Alex Morgan" required/></label><label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@school.com" required/></label><label>School or learning center<input name="school" autoComplete="organization" placeholder="Your organization"/></label><label>What would you like to know?<textarea name="message" rows={4} placeholder="Tell us what you’re looking for…" required/></label></div><button className="form-submit" type="submit">Send inquiry <ArrowRight size={16}/></button><small>By submitting, you agree to be contacted about your inquiry.</small></form></div></section>;
}

function HomePage() {
  return <main id="top"><section className="hero"><div className="hero-copy"><h1>Your school,<br/><em>in sync.</em></h1><p className="hero-description">Run courses, class schedules, attendance and homework from one simple workspace.</p><div className="hero-actions"><a className="primary-button" href="/demo">Watch the demo <ArrowRight size={17}/></a><a className="inquiry-link" href="#inquiry">Talk to our team <ArrowRight size={15}/></a></div></div></section><HowItWorks/><InquirySection/></main>;
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname.replace(/\/$/, '') || '/');
    window.addEventListener('popstate', syncPath);
    return () => window.removeEventListener('popstate', syncPath);
  }, []);
  let page = <HomePage/>;
  if (pathname === '/features') page = <FeaturePage/>;
  else if (pathname === '/faq') page = <FAQPage/>;
  else if (pathname === '/demo' || pathname === '/product-tour') page = <DemoPage/>;
  return <div className="site-shell"><SiteHeader/>{page}<SiteFooter/></div>;
}
