import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Crosshair,
  FileText,
  Flask,
  Leaf,
  List,
  MagnifyingGlass,
  MapPin,
  PaperPlaneTilt,
  ShieldCheck,
  Target,
  TrendUp,
  UsersThree,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { applySeoMetadata, routeMetadata } from "./seo.js";

export { routeMetadata } from "./seo.js";

const primaryNavigation = [
  { label: "Learn", to: "/learn", path: "/learn" },
  { label: "For Business", to: "/business", path: "/business" },
  { label: "Community", to: "/community", path: "/community" },
  { label: "About", to: "/#about", path: "/" },
];

export const intentConfig = {
  collective: {
    eyebrow: "Founding collective",
    title: "Join the BorneoAI Collective.",
    intro: "Tell us how you would like to learn, contribute or connect as the collective takes shape.",
    submitLabel: "Join the founding list",
    successTitle: "Your interest is ready.",
    successBody:
      "This prototype completed the local form demo only. Your details were not sent or stored.",
    defaultInterests: [],
  },
  learn: {
    eyebrow: "Founding learners",
    title: "Join the founding learner list.",
    intro: "Help us shape practical learning around the work people across Borneo already do.",
    submitLabel: "Express learning interest",
    successTitle: "Your learning interest is ready.",
    successBody:
      "This prototype completed the local form demo only. Your details were not sent or stored.",
    defaultInterests: ["Learning programmes"],
  },
  gathering: {
    eyebrow: "First founding gathering",
    title: "Register your gathering interest.",
    intro: "Tell us where you are based and what you hope to explore with the community.",
    submitLabel: "Register gathering interest",
    successTitle: "Your gathering interest is ready.",
    successBody:
      "This prototype completed the local form demo only. Your details were not sent or stored.",
    defaultInterests: ["Community gatherings"],
  },
  contribute: {
    eyebrow: "Build the field together",
    title: "Contribute a useful field practice.",
    intro: "Tell us what you have tried, learned or want to help document for others.",
    submitLabel: "Express contribution interest",
    successTitle: "Your contribution interest is ready.",
    successBody:
      "This prototype completed the local form demo only. Your details were not sent or stored.",
    defaultInterests: ["Contributing workflows"],
  },
  clinic: {
    eyebrow: "AI readiness clinic",
    title: "Tell us where work is getting stuck.",
    intro: "We start with the business problem, not a tool.",
    submitLabel: "Express clinic interest",
    successTitle: "Your clinic interest is ready.",
    successBody:
      "This prototype completed the local form demo only. Your details were not sent or stored.",
  },
};

const learningLevels = [
  {
    number: "01",
    title: "AI Ready",
    summary: "Build confidence with the basics. Use AI tools safely and effectively in daily work.",
    points: ["Core concepts", "Prompting fundamentals", "Responsible use"],
    outcome: "Confident starter",
  },
  {
    number: "02",
    title: "AI Productive",
    summary: "Apply AI to real tasks. Work faster, think clearer, and create better outcomes.",
    points: ["Use cases in your role", "Workflow integration", "Quality and iteration"],
    outcome: "Measurable impact",
  },
  {
    number: "03",
    title: "AI Practitioner",
    summary: "Design solutions and automate workflows around meaningful problems.",
    points: ["Solution design", "Automation and tools", "Evaluation and testing"],
    outcome: "Solution builder",
  },
  {
    number: "04",
    title: "AI Leader",
    summary: "Lead adoption responsibly. Enable teams and shape an AI-ready culture.",
    points: ["Change and enablement", "Governance and risk", "Strategy and value"],
    outcome: "Capable leader",
  },
];

const businessSteps = [
  { number: "01", title: "Assess", body: "Understand goals, capability and data. Map opportunities and risks.", icon: MagnifyingGlass },
  { number: "02", title: "Prioritise", body: "Select high-impact use cases. Align on value, feasibility and effort.", icon: Target },
  { number: "03", title: "Pilot", body: "Test in real conditions. Measure outcomes and learn quickly.", icon: Flask },
  { number: "04", title: "Govern", body: "Put guardrails in place. Pursue safety, fairness and accountability.", icon: ShieldCheck },
  { number: "05", title: "Scale", body: "Put what works into daily work. Build capability continuously.", icon: TrendUp },
];

const roles = ["Administrators", "Sales & Marketing", "Business Owners", "Educators", "Researchers", "Creators"];
const commonInterests = [
  "Learning programmes",
  "Community gatherings",
  "Contributing workflows",
  "Business adoption",
];

export function submitInterest(payload) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (String(payload.email || "").toLowerCase().startsWith("error@")) {
        reject(new Error("Prototype error"));
      } else {
        resolve({ ok: true });
      }
    }, 360);
  });
}

function useRoute() {
  const [route, setRoute] = useState(() => `${window.location.pathname}${window.location.hash}`);

  useEffect(() => {
    const update = () => setRoute(`${window.location.pathname}${window.location.hash}`);
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  const navigate = (to) => {
    const url = new URL(to, window.location.origin);
    const next = `${url.pathname}${url.hash}`;
    if (next !== route) {
      window.history.pushState({}, "", next);
      setRoute(next);
    }
    window.requestAnimationFrame(() => {
      if (url.hash) {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });
  };

  return { route, path: route.split("#")[0] || "/", navigate };
}

function SiteLink({ to, navigate, children, className = "", onClick, ref, ...props }) {
  return (
    <a
      ref={ref}
      href={to}
      className={className}
      onClick={(event) => {
        if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          event.preventDefault();
          navigate(to);
          onClick?.();
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function ActionLink({ to, navigate, children, tone = "orange", className = "" }) {
  return (
    <SiteLink to={to} navigate={navigate} className={`action-link action-link--${tone} ${className}`}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" weight="bold" />
    </SiteLink>
  );
}

function IntentButton({ intent, openIntent, children, className = "action-link action-link--orange" }) {
  return (
    <button className={className} type="button" onClick={() => openIntent(intent)}>
      <span>{children}</span>
      <ArrowRight weight="bold" aria-hidden="true" />
    </button>
  );
}

function Header({ path, navigate, openIntent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => setMenuOpen(false), [path]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const main = document.querySelector("main");
    const footer = document.querySelector(".site-footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    document.body.classList.add("menu-open");
    window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ).filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-header__inner">
        <SiteLink to="/" navigate={navigate} className="brand" aria-label="BorneoAI home">
          BorneoAI
        </SiteLink>
        <Crosshair className="header-mark" size={27} weight="light" aria-hidden="true" />
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
        </button>
        {menuOpen && (
          <button
            className="nav-backdrop"
            type="button"
            aria-label="Dismiss navigation menu"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <nav
          id="primary-navigation"
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((item, index) => {
            const isActive = item.path === path;
            return (
              <SiteLink
                key={item.label}
                to={item.to}
                navigate={navigate}
                onClick={() => setMenuOpen(false)}
                className={`site-nav__link ${isActive ? "site-nav__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                {...(index === 0 ? { ref: firstLinkRef } : {})}
              >
                {item.label}
              </SiteLink>
            );
          })}
          <button
            className="join-button"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openIntent("collective");
            }}
          >
            Join the Collective
          </button>
        </nav>
      </div>
    </header>
  );
}

function FieldStrip() {
  return (
    <div className="field-strip">
      <Crosshair size={24} weight="light" aria-hidden="true" />
      <span>Practitioner-led AI collective</span>
      <span>Founded in Sarawak & Sabah</span>
      <span>Learn · Apply · Share</span>
      <span className="field-strip__stamp">Work in progress. Always.</span>
    </div>
  );
}

function Footer({ navigate, openIntent }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <p className="eyebrow eyebrow--light">BorneoAI Field Collective</p>
          <h2>Building capability through real work.</h2>
        </div>
        <IntentButton intent="collective" openIntent={openIntent} className="footer-join">
          Join the Collective
        </IntentButton>
      </div>
      <div className="site-footer__grid">
        <div><strong>BorneoAI</strong><p>Practical AI for Borneo, built together.</p></div>
        <div>
          <span className="footer-label">Explore</span>
          <SiteLink to="/learn" navigate={navigate}>Learn</SiteLink>
          <SiteLink to="/business" navigate={navigate}>For Business</SiteLink>
          <SiteLink to="/community" navigate={navigate}>Community</SiteLink>
        </div>
        <div>
          <span className="footer-label">Founded in</span>
          <span>Kuching, Sarawak</span><span>Kota Kinabalu, Sabah</span>
          <span>Open to wider Borneo over time</span>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 BorneoAI</span><span>Useful · Responsible · Shared</span>
      </div>
    </footer>
  );
}

function HomePage({ navigate, openIntent }) {
  return (
    <>
      <section className="home-hero page-shell">
        <div className="home-hero__copy">
          <p className="eyebrow">Sarawak · Sabah</p>
          <h1 tabIndex="-1">Practical AI<br />for Borneo,<br />built together.</h1>
          <p className="lead">Learn AI, apply it to real work, and build Borneo&apos;s capability together.</p>
          <div className="hero-actions">
            <ActionLink to="/learn" navigate={navigate}>Start Learning</ActionLink>
            <ActionLink to="/business" navigate={navigate} tone="paper">For Business</ActionLink>
            <IntentButton intent="collective" openIntent={openIntent} className="text-action">
              Join the Collective
            </IntentButton>
          </div>
        </div>
        <figure className="home-hero__media">
          <img
            src="/images/home-workshop.jpg"
            width="1536"
            height="1024"
            alt="BorneoAI practitioners mapping a workflow together around a table"
          />
          <figcaption>Knowledge rooted in place. Applied for impact.</figcaption>
        </figure>
      </section>

      <FieldStrip />

      <section className="pathway-section page-shell" aria-labelledby="pathway-heading">
        <div className="section-intro">
          <p className="eyebrow">Two pathways. One collective.</p>
          <h2 id="pathway-heading">Choose the path that fits your journey.</h2>
        </div>
        <article className="pathway pathway--orange">
          <div className="pathway__number">01</div>
          <img className="pathway__sketch" src="/images/sketches/upskilling-toolkit.webp" alt="Hand-drawn practical AI learning toolkit" loading="lazy" width="1024" height="1024" />
          <p className="eyebrow">Individual pathway</p><h3>Upskilling</h3>
          <p>Build practical AI skills, confidence, and a portfolio of real-world work in community.</p>
          <SiteLink to="/learn" navigate={navigate} className="inline-link">Explore learning <ArrowRight weight="bold" aria-hidden="true" /></SiteLink>
        </article>
        <article className="pathway pathway--green">
          <div className="pathway__number">02</div>
          <img className="pathway__sketch" src="/images/sketches/business-workflow.webp" alt="Hand-drawn workflow growing into a useful business outcome" loading="lazy" width="1024" height="1024" />
          <p className="eyebrow">Organisation pathway</p><h3>For Business</h3>
          <p>Adopt AI responsibly to solve real problems, strengthen teams, and create lasting value.</p>
          <SiteLink to="/business" navigate={navigate} className="inline-link">Explore business <ArrowRight weight="bold" aria-hidden="true" /></SiteLink>
        </article>
      </section>

      <section className="forming-section">
        <div className="page-shell forming-section__grid">
          <div>
            <p className="eyebrow eyebrow--light">Now forming</p>
            <h2>Help shape the first chapter.</h2>
            <p>BorneoAI is at the founding stage. We are gathering people who want to build something useful, local and durable—not pretend the finished institution already exists.</p>
          </div>
          <div className="forming-tracks">
            <button type="button" onClick={() => openIntent("learn")}><span>01</span><strong>Founding learners</strong><ArrowRight aria-hidden="true" /></button>
            <button type="button" onClick={() => openIntent("clinic")}><span>02</span><strong>Early business partners</strong><ArrowRight aria-hidden="true" /></button>
            <button type="button" onClick={() => openIntent("contribute")}><span>03</span><strong>Workflow contributors</strong><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="page-shell about-grid">
          <div className="about-grid__lead">
            <p className="eyebrow eyebrow--light">Why BorneoAI</p>
            <h2>Not an AI hype machine. A place to build useful capability.</h2>
          </div>
          <div className="about-grid__body">
            <h3>Why this exists</h3>
            <p>AI capability should not be imported as a finished answer. People and organisations here need room to understand it, question it and adapt it to local work.</p>
            <h3>What we are building first</h3>
            <p>A practical learning pathway, early business readiness clinics, community gatherings and an open playbook of useful workflows.</p>
            <h3>How it operates</h3>
            <p>Start with a real problem. Test in context. Keep human judgement visible. Document what is useful. Share the learning.</p>
          </div>
          <div className="principle-notes">
            <span>Local before generic</span><span>Practice before performance</span>
            <span>Evidence before hype</span><span>Shared learning over gatekeeping</span>
          </div>
        </div>
      </section>

      <section className="signal-section page-shell">
        <div><p className="eyebrow">Flagship field project</p><h2>100 Useful AI Workflows for Borneo</h2></div>
        <p>A community-built playbook of practical workflows for real work—across roles, sectors and communities.</p>
        <ActionLink to="/community#playbook" navigate={navigate} tone="green">See how it is being built</ActionLink>
      </section>
    </>
  );
}

function LearnPage({ navigate, openIntent }) {
  return (
    <>
      <section className="split-hero page-shell">
        <div className="split-hero__copy">
          <p className="eyebrow eyebrow--orange">Pathway 01</p>
          <h1 tabIndex="-1">Become AI‑savvy through real work.</h1>
          <p className="lead">Practical learning for people who want to work, create and decide more effectively with AI.</p>
          <a className="action-link action-link--orange" href="#curriculum"><span>Find Your Learning Path</span><ArrowRight weight="bold" aria-hidden="true" /></a>
        </div>
        <img className="split-hero__image" src="/images/upskilling-workshop.jpg" width="1672" height="941" alt="Adult learners applying AI concepts during a hands-on BorneoAI session" />
      </section>

      <section className="curriculum page-shell" id="curriculum">
        <div className="section-rule-title"><span>The field curriculum</span><span>Learn by doing. Apply in context. Share what works.</span></div>
        <div className="curriculum__grid">
          {learningLevels.map((level, index) => (
            <article className="level" key={level.title}>
              <div className="level__topline"><span className="level__number">{level.number}</span>{index < learningLevels.length - 1 && <ArrowRight className="level__arrow" weight="light" aria-hidden="true" />}</div>
              <h2>{level.title}</h2><p>{level.summary}</p>
              <ul>{level.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <span className="level__outcome">Outcome: {level.outcome}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="programme-section page-shell" id="founding-programme">
        <div className="programme-section__intro">
          <p className="eyebrow">Founding learning programme</p>
          <h2>Build the programme with the first cohort.</h2>
          <p>For curious professionals, owners, educators and creators who want practical confidence—not a collection of tool demos.</p>
          <IntentButton intent="learn" openIntent={openIntent}>Join the founding learner list</IntentButton>
        </div>
        <div className="programme-notes">
          <div><span>01 · Approach</span><h3>Real tasks first</h3><p>Bring work you already do. Learn a useful practice, test it, reflect and improve.</p></div>
          <div><span>02 · Formats being explored</span><h3>Small cohorts, clinics and field sessions</h3><p>A blend of guided sessions, peer practice and role-based exercises is being shaped.</p></div>
          <div><span>03 · Current status</span><h3>Details are being confirmed</h3><p>Timing, locations, cohort size and participation details are not yet final.</p></div>
          <div><span>04 · What interest means</span><h3>Help us understand demand</h3><p>Expressing interest is not a booking. It helps shape which learning paths should come first.</p></div>
        </div>
      </section>

      <section className="roles-section page-shell">
        <div><p className="eyebrow">Role-based field paths</p><h2>Start with the work you already do.</h2></div>
        <div className="role-list">{roles.map((role, index) => <div className="role-row" key={role}><span>{String(index + 1).padStart(2, "0")}</span><strong>{role}</strong><ArrowRight weight="bold" aria-hidden="true" /></div>)}</div>
      </section>

      <section className="faq-section page-shell" aria-labelledby="learning-faq">
        <div><p className="eyebrow">Good to know</p><h2 id="learning-faq">Founding programme FAQ</h2></div>
        <div>
          <details><summary>Do I need technical experience?</summary><p>No. The pathway starts with practical AI literacy and grows with your confidence.</p></details>
          <details><summary>Is the programme open now?</summary><p>Interest is open. Cohort dates, format and participation details are still being shaped.</p></details>
          <details><summary>Does expressing interest reserve a place?</summary><p>No. It helps us understand needs and decide what to build first.</p></details>
        </div>
      </section>

      <section className="closing-cta closing-cta--orange page-shell">
        <div><p className="eyebrow">Your first field step</p><h2>Bring a real task. Build a working practice.</h2></div>
        <IntentButton intent="learn" openIntent={openIntent} className="action-link action-link--paper">Join the founding learner list</IntentButton>
      </section>
    </>
  );
}

function BusinessPage({ openIntent }) {
  return (
    <>
      <section className="split-hero page-shell split-hero--business">
        <div className="split-hero__copy">
          <p className="eyebrow eyebrow--green">Pathway 02</p>
          <h1 tabIndex="-1">Move from AI interest to useful adoption.</h1>
          <p className="lead">Find valuable opportunities, test them responsibly, and build your team&apos;s capability.</p>
          <IntentButton intent="clinic" openIntent={openIntent} className="action-link action-link--green">Express interest in a readiness clinic</IntentButton>
        </div>
        <img className="split-hero__image" src="/images/business-clinic.jpg" width="1672" height="941" alt="A BorneoAI facilitator running a practical readiness clinic with business leaders" />
      </section>

      <section className="adoption page-shell" id="process">
        <div className="section-rule-title"><span>The adoption sequence</span><span>Practical. Responsible. Repeatable.</span></div>
        <div className="adoption__grid">
          {businessSteps.map((step, index) => {
            const Icon = step.icon;
            return <article className="adoption-step" key={step.title}><div className="adoption-step__head"><span>{step.number}</span><Icon weight="thin" aria-hidden="true" />{index < businessSteps.length - 1 && <ArrowRight className="adoption-step__arrow" weight="light" aria-hidden="true" />}</div><h2>{step.title}</h2><p>{step.body}</p></article>;
          })}
        </div>
      </section>

      <section className="business-outcomes"><div className="page-shell business-outcomes__grid">
        <div><p className="eyebrow eyebrow--light">Start from the business problem</p><h2>Where are you losing time, consistency or knowledge?</h2></div>
        <div className="outcome-list">{["Reduce repetitive administrative work", "Respond to customers more consistently", "Find internal knowledge faster", "Turn operational data into better decisions"].map((outcome) => <div key={outcome}><CheckCircle weight="fill" aria-hidden="true" /><span>{outcome}</span></div>)}</div>
      </div></section>

      <section className="clinic-section page-shell" id="readiness-clinic">
        <div className="clinic-section__title"><p className="eyebrow">Readiness clinic</p><h2>A focused first conversation about the work.</h2><p>Designed for organisations that can name a real workflow problem but need help deciding whether, where and how AI could assist.</p></div>
        <div className="clinic-section__grid">
          <div><span>Good fit</span><p>Teams facing repetitive work, inconsistent service, knowledge bottlenecks or difficult manual decisions.</p></div>
          <div><span>What we explore</span><p>The workflow, desired outcome, people involved, data boundaries, risks and a sensible experiment.</p></div>
          <div><span>Possible output</span><p>A clearer problem statement, readiness gaps and a first use case worth investigating—not a promised implementation.</p></div>
          <div><span>Current status</span><p>Clinic format and availability are being finalised. Expressing interest starts discovery; it is not a booking.</p></div>
        </div>
        <IntentButton intent="clinic" openIntent={openIntent} className="action-link action-link--green">Express interest in a readiness clinic</IntentButton>
      </section>

      <section className="governance page-shell">
        <div><p className="eyebrow">Responsible AI foundation</p><h2>Move quickly without losing judgement.</h2></div>
        <div className="governance__grid">
          <div><span>01</span><h3>Approved tools</h3><p>Know which tools are safe for which work.</p></div>
          <div><span>02</span><h3>Human review</h3><p>Keep important decisions accountable.</p></div>
          <div><span>03</span><h3>Data boundaries</h3><p>Protect sensitive customer and business information.</p></div>
        </div>
      </section>

      <section className="closing-cta closing-cta--green page-shell">
        <div><p className="eyebrow eyebrow--light">From interest to impact</p><h2>Find the first use case worth investigating.</h2></div>
        <IntentButton intent="clinic" openIntent={openIntent} className="action-link action-link--paper">Express clinic interest</IntentButton>
      </section>
    </>
  );
}

function CommunityPage({ navigate, openIntent }) {
  return (
    <>
      <section className="split-hero page-shell split-hero--community">
        <div className="split-hero__copy">
          <p className="eyebrow eyebrow--orange">Our community</p>
          <h1 tabIndex="-1">A collective that learns by sharing.</h1>
          <p className="lead">Meet practitioners, contribute what works, and help build Borneo&apos;s AI capability.</p>
          <IntentButton intent="collective" openIntent={openIntent}>Join the Collective</IntentButton>
        </div>
        <img className="split-hero__image" src="/images/community-gathering.jpg" width="1672" height="941" alt="BorneoAI community members sharing ideas around a table" />
      </section>

      <section className="community-board page-shell" id="resources">
        <article className="community-feature">
          <p className="eyebrow">Featured initiative</p><FileText size={48} weight="thin" aria-hidden="true" />
          <h2>100 Useful AI Workflows for Borneo</h2><p>A community-built playbook of practical workflows for real work across roles and sectors.</p>
          <SiteLink to="/community#playbook" navigate={navigate} className="inline-link">See how the playbook is being built <ArrowRight weight="bold" aria-hidden="true" /></SiteLink>
          <span className="round-stamp">Founding field project</span>
        </article>
        <article className="community-feature">
          <p className="eyebrow">Coming soon</p><CalendarBlank size={48} weight="thin" aria-hidden="true" />
          <h2>First founding gathering</h2>
          <p className="event-meta"><span><CalendarBlank aria-hidden="true" /> Details coming soon</span><span><MapPin aria-hidden="true" /> Sarawak &amp; Sabah interest welcome</span></p>
          <IntentButton intent="gathering" openIntent={openIntent} className="inline-link">Register gathering interest</IntentButton>
        </article>
        <article className="community-feature">
          <p className="eyebrow">Contribute</p><PaperPlaneTilt size={48} weight="thin" aria-hidden="true" />
          <h2>Share what works. Help others.</h2><p>Contribute a workflow, case note or field insight. Small, honest shares can unlock useful local practice.</p>
          <IntentButton intent="contribute" openIntent={openIntent} className="inline-link">Express contribution interest</IntentButton>
        </article>
      </section>

      <section className="playbook-section" id="playbook">
        <div className="page-shell playbook-section__grid">
          <div><p className="eyebrow eyebrow--light">How the playbook is being built</p><h2>Useful enough to try. Clear enough to question.</h2><p>The playbook will document small, practical AI-supported workflows grounded in real Borneo work. It is currently a founding project, not a finished library.</p></div>
          <div className="playbook-criteria">
            <div><span>01 · Purpose</span><p>Help someone understand and adapt a practical workflow without hiding the judgement involved.</p></div>
            <div><span>02 · What counts</span><p>A real task, clear inputs, repeatable steps, human review and honest limits.</p></div>
            <div><span>03 · Review</span><p>Contributions will be checked for clarity, responsible use and enough context to be useful.</p></div>
            <div><span>04 · Status</span><p>The contribution format and review process are still being shaped with founding contributors.</p></div>
          </div>
        </div>
      </section>

      <section className="contribution-guide page-shell">
        <div><p className="eyebrow">Contribution guidance</p><h2>Bring practice, not performance.</h2></div>
        <div><p>A useful contribution can be small: a prompt pattern, a before-and-after workflow, a caution, a failed attempt or a field note.</p><ul><li>Use work you have permission to discuss.</li><li>Remove private or sensitive information.</li><li>Describe where human review remains essential.</li><li>Be honest about what did not work.</li></ul><IntentButton intent="contribute" openIntent={openIntent} className="action-link action-link--green">Help build the playbook</IntentButton></div>
      </section>

      <section className="principles page-shell">
        <div className="principles__intro"><p className="eyebrow">How we gather</p><h2>Open enough to welcome. Rigorous enough to be useful.</h2><img className="principles__sketch" src="/images/sketches/community-roundtable.webp" alt="Borneo practitioners mapping a practical workflow together" loading="lazy" width="1536" height="1024" /></div>
        <div className="principles__grid">
          <div><UsersThree weight="thin" aria-hidden="true" /><h3>Practitioner-led</h3><p>Members share work they have actually tried.</p></div>
          <div><ShieldCheck weight="thin" aria-hidden="true" /><h3>Responsible</h3><p>Privacy, judgement and accountability stay visible.</p></div>
          <div><Leaf weight="thin" aria-hidden="true" /><h3>Rooted here</h3><p>Local contexts, sectors and communities shape the work.</p></div>
        </div>
      </section>

      <section className="closing-cta closing-cta--signal page-shell">
        <div><p className="eyebrow">Your contribution matters</p><h2>Come to learn. Stay to help build.</h2></div>
        <IntentButton intent="collective" openIntent={openIntent} className="action-link action-link--ink">Join the Collective</IntentButton>
      </section>
    </>
  );
}

function CommonInterestFields({ defaults, errors }) {
  return (
    <>
      <label><span>Your name</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /></label>
      {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
      <label><span>Email address</span><input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /></label>
      {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
      <label><span>Where are you based?</span><select name="location" defaultValue=""><option value="" disabled>Select a location</option><option>Sarawak</option><option>Sabah</option><option>Brunei</option><option>Kalimantan</option><option>Elsewhere in Borneo</option><option>Outside Borneo</option></select></label>
      <fieldset className="interest-options" aria-describedby={errors.interests ? "interest-error" : undefined}>
        <legend>What are you interested in? <span>Select at least one</span></legend>
        <div>{commonInterests.map((interest) => <label key={interest}><input type="checkbox" name="interests" value={interest} defaultChecked={defaults.includes(interest)} /><span>{interest}</span></label>)}</div>
      </fieldset>
      {errors.interests && <p className="field-error" id="interest-error">{errors.interests}</p>}
      <label><span>Anything you would like us to know? <em>Optional</em></span><textarea name="note" rows="3" /></label>
    </>
  );
}

function ClinicFields({ errors }) {
  return (
    <>
      <div className="form-pair">
        <label><span>Your name</span><input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} /></label>
        <label><span>Organisation</span><input name="organisation" autoComplete="organization" aria-invalid={Boolean(errors.organisation)} /></label>
      </div>
      <div className="form-pair">
        <label><span>Work email</span><input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} /></label>
        <label><span>Your role</span><input name="role" autoComplete="organization-title" aria-invalid={Boolean(errors.role)} /></label>
      </div>
      <label><span>Approximate team size</span><select name="teamSize" defaultValue=""><option value="" disabled>Select a range</option><option>1–5</option><option>6–20</option><option>21–50</option><option>51–200</option><option>201+</option></select></label>
      <label><span>What workflow problem would you like to improve?</span><textarea name="workflowProblem" rows="4" aria-invalid={Boolean(errors.workflowProblem)} /></label>
      {errors.form && <p className="field-error">{errors.form}</p>}
    </>
  );
}

function validateInterest(payload, isClinic) {
  const errors = {};
  if (!payload.name?.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email || "")) errors.email = "Please enter a valid email.";
  if (isClinic) {
    if (!payload.organisation?.trim()) errors.organisation = "Please enter your organisation.";
    if (!payload.role?.trim()) errors.role = "Please enter your role.";
    if (!payload.teamSize) errors.form = "Please choose a team size and describe the workflow problem.";
    if (!payload.workflowProblem?.trim()) errors.workflowProblem = "Please describe the workflow problem.";
  } else if (!payload.interests?.length) {
    errors.interests = "Choose at least one area of interest.";
  }
  if (!payload.acknowledgement) errors.acknowledgement = "Please confirm how your details would be used.";
  return errors;
}

function InterestModal({ intent, onClose, returnFocusRef }) {
  const config = intentConfig[intent];
  const isClinic = intent === "clinic";
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const background = Array.from(document.querySelectorAll(".site-header, main, .site-footer"));
    background.forEach((element) => element.setAttribute("inert", ""));
    document.body.classList.add("modal-open");
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      background.forEach((element) => element.removeAttribute("inert"));
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [onClose, returnFocusRef]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.intent = intent;
    payload.interests = formData.getAll("interests");
    payload.acknowledgement = formData.get("acknowledgement") === "on";
    const nextErrors = validateInterest(payload, isClinic);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("validation");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await submitInterest(payload);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="modal__close" type="button" onClick={onClose} aria-label="Close dialog"><X weight="bold" /></button>
        {status === "success" ? (
          <div className="modal__success" role="status" aria-live="polite">
            <CheckCircle size={56} weight="fill" aria-hidden="true" />
            <p className="eyebrow">Prototype complete</p>
            <h2 ref={successRef} tabIndex="-1" id="modal-title">{config.successTitle}</h2>
            <p>{config.successBody}</p>
            <button className="action-link action-link--ink" type="button" onClick={onClose}><span>Return to the site</span><ArrowRight weight="bold" aria-hidden="true" /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow eyebrow--orange">{config.eyebrow}</p>
            <h2 id="modal-title">{config.title}</h2>
            <p className="modal__intro">{config.intro}</p>
            <p className="prototype-note"><WarningCircle weight="fill" aria-hidden="true" /> Prototype form — submissions are not yet connected or transmitted.</p>
            {status === "error" && <div className="form-alert" role="alert"><WarningCircle weight="fill" aria-hidden="true" /><span>The prototype could not complete this demo. Check the details and try again.</span></div>}
            {status === "validation" && <p className="form-summary" role="alert">Please review the highlighted fields.</p>}
            <form noValidate onSubmit={handleSubmit}>
              {isClinic ? <ClinicFields errors={errors} /> : <CommonInterestFields defaults={config.defaultInterests || []} errors={errors} />}
              <label className="acknowledgement"><input type="checkbox" name="acknowledgement" /><span>I understand these details would be used only to contact me about this BorneoAI interest.</span></label>
              {errors.acknowledgement && <p className="field-error">{errors.acknowledgement}</p>}
              <button className="action-link action-link--orange modal__submit" type="submit" disabled={status === "submitting"}><span>{status === "submitting" ? "Preparing prototype…" : config.submitLabel}</span><ArrowRight weight="bold" aria-hidden="true" /></button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export function App() {
  const { path, navigate } = useRoute();
  const [intent, setIntent] = useState(null);
  const returnFocusRef = useRef(null);
  const previousPath = useRef(path);

  const openIntent = (nextIntent) => {
    returnFocusRef.current = document.activeElement;
    setIntent(nextIntent);
  };

  useEffect(() => {
    applySeoMetadata(path);
  }, [path]);

  useEffect(() => {
    if (previousPath.current !== path) {
      window.requestAnimationFrame(() => document.querySelector("main h1")?.focus());
      previousPath.current = path;
    }
  }, [path]);

  const page = useMemo(() => {
    if (path === "/learn") return <LearnPage navigate={navigate} openIntent={openIntent} />;
    if (path === "/business") return <BusinessPage openIntent={openIntent} />;
    if (path === "/community") return <CommunityPage navigate={navigate} openIntent={openIntent} />;
    return <HomePage navigate={navigate} openIntent={openIntent} />;
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header path={path} navigate={navigate} openIntent={openIntent} />
      <main id="main-content">{page}</main>
      <Footer navigate={navigate} openIntent={openIntent} />
      {intent && <InterestModal intent={intent} onClose={() => setIntent(null)} returnFocusRef={returnFocusRef} />}
    </>
  );
}
