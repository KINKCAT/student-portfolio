"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cursor glow
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .edu-item").forEach((el) => {
      observer.observe(el);
    });

    // Lang bars
    const langObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector(".lang-bar") as HTMLElement;
            if (bar) bar.classList.add("animated");
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll(".lang-card").forEach((el) => {
      langObserver.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      langObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Cursor Glow */}
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />

      {/* Background */}
      <div className="grid-bg" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />

      {/* ─── Nav ─── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav-logo" aria-label="Shashank home">
          S<span style={{ color: "var(--red)" }}>.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#leadership">Leadership</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ─── HERO ─── */}
      <section id="hero" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero">
          <div className="hero-content">
            <span className="hero-eyebrow">Engineering Student · India</span>

            <h1 className="hero-name">
              <span>Hello, I&apos;m</span>
              <span className="red-accent">Shashank</span>
            </h1>

            <p className="hero-title">
              Aspiring <strong>Computer Scientist</strong> &amp; Engineer
            </p>

            <p className="hero-desc">
              A self-driven student from India building toward{" "}
              <strong>international engineering programs</strong> — with a
              background in advanced mathematics, programming, and leadership.
              JEE percentile 84 · Head Boy · Lifelong learner.
            </p>

            <div className="hero-cta">
              <a href="#about" className="btn-primary" id="hero-cta-about">
                Explore My Story
              </a>
              <a href="#contact" className="btn-secondary" id="hero-cta-contact">
                Get in Touch
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-img-wrap">
              <Image
                src="/hero_portrait.png"
                alt="Shashank — portrait placeholder"
                fill
                style={{ objectFit: "cover", borderRadius: "18px" }}
                priority
                sizes="380px"
              />
              <div
                className="hero-img-badge"
                role="status"
                aria-label="Available for opportunities"
              >
                <div className="badge-dot" />
                <div>
                  <div className="badge-text">Available</div>
                  <div className="badge-sub">Open to opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <div className="stats-strip" aria-label="Key statistics">
        <div className="stats-inner">
          {[
            { num: "84th", label: "JEE Percentile" },
            { num: "91%", label: "Maths Percentile" },
            { num: "7+", label: "Leadership Roles" },
            { num: "3+", label: "Languages" },
          ].map((s) => (
            <div className="stat-item reveal" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">01</span>
            <h2 className="section-title">About Me</h2>
            <span className="section-line" />
          </div>

          <div className="about-grid">
            <div className="about-text reveal-left">
              <p>
                I&apos;m a <strong>Class 12 student from Madhya Pradesh, India</strong>{" "}
                driven by a deep fascination with how things work — from circuits
                to algorithms. My academic journey has been shaped by
                independent study, resilience, and an ambitious global outlook.
              </p>
              <p>
                I prepared extensively for <strong>JEE-level mathematics and
                physics</strong>, tackling problems at the level of JEE Advanced
                and Irodov — not because I had to, but because I love the
                challenge. I currently study{" "}
                <strong>JavaScript and C++</strong>, build projects, and prepare
                for international university admissions in CS and Engineering.
              </p>
              <p>
                Beyond academics, I&apos;ve led as <strong>Head Boy</strong>, served
                as House Captain, mentored peers, and volunteered in my
                community — from cancer fundraising to COVID support.
              </p>
              <p>
                My goal is simple but bold: to study and build at the
                intersection of <strong>software, electronics, and global
                impact</strong>.
              </p>
            </div>

            <div className="about-photos reveal-right">
              <div
                className="photo-card"
                data-label="Portrait"
                title="Replace with your portrait photo"
              >
                <Image
                  src="/hero_portrait.png"
                  alt="Portrait — replace with your photo"
                  width={600}
                  height={220}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div
                className="photo-card"
                data-label="In Action"
                title="Replace with your fighting / sports photo"
              >
                <Image
                  src="/fighting_photo.png"
                  alt="Action shot — replace with your photo"
                  width={300}
                  height={160}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div
                className="photo-card"
                data-label="Coding"
                title="Replace with your coding photo"
              >
                <Image
                  src="/coding_photo.png"
                  alt="Coding — replace with your photo"
                  width={300}
                  height={160}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">02</span>
            <h2 className="section-title">Technical Skills</h2>
            <span className="section-line" />
          </div>

          <div className="skills-grid">
            {[
              {
                icon: "⚡",
                name: "JavaScript",
                desc: "Building web interfaces and learning modern JS patterns, DOM manipulation, and async programming.",
                tags: ["ES6+", "DOM", "Async/Await", "Node.js"],
              },
              {
                icon: "⚙️",
                name: "C++",
                desc: "Systems-level programming with focus on data structures, algorithms, and competitive problem solving.",
                tags: ["STL", "Pointers", "OOP", "Algorithms"],
              },
              {
                icon: "🔢",
                name: "Mathematics",
                desc: "Advanced problem solving at JEE Advanced level — calculus, algebra, coordinate geometry, and more.",
                tags: ["Calculus", "Algebra", "Trigonometry", "JEE Advanced"],
              },
              {
                icon: "⚛️",
                name: "Physics",
                desc: "Deep conceptual understanding, including Irodov-level mechanics, electromagnetism, and optics.",
                tags: ["Mechanics", "Electromagnetism", "Irodov"],
              },
              {
                icon: "🛠️",
                name: "Dev Tools",
                desc: "Comfortable in a macOS development environment with Git, GitHub, and the terminal.",
                tags: ["Git", "GitHub", "macOS", "Terminal", "Anki"],
              },
              {
                icon: "🌐",
                name: "Web Development",
                desc: "Learning full-stack web development — HTML, CSS, JavaScript, and exploring frameworks.",
                tags: ["HTML", "CSS", "Next.js", "Responsive"],
              },
            ].map((skill, i) => (
              <div
                className="skill-card reveal"
                key={skill.name}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="skill-icon" aria-hidden="true">
                  {skill.icon}
                </div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-desc">{skill.desc}</div>
                <div className="skill-tags">
                  {skill.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section id="education">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">03</span>
            <h2 className="section-title">Education</h2>
            <span className="section-line" />
          </div>

          <div className="edu-timeline">
            {[
              {
                icon: "🎓",
                year: "2024 – 2025",
                school: "Class 12 — MPBSE",
                detail: "Madhya Pradesh Board of Secondary Education · Science Stream",
                marks: [
                  "Overall 77.5%",
                  "Physics 80%",
                  "Chemistry 79%",
                  "Maths 67%",
                  "English 80%",
                  "Hindi 83%",
                ],
              },
              {
                icon: "📘",
                year: "2023 – 2024",
                school: "Class 11 — MPBSE",
                detail: "Strong academic year with ~90% overall performance",
                marks: ["Overall ~90%"],
              },
              {
                icon: "🔬",
                year: "2022 – 2023",
                school: "JEE Preparation",
                detail: "Intensive self-study for Joint Entrance Examination",
                marks: [
                  "Overall 84th %ile",
                  "Maths 91st %ile",
                  "Physics 85th %ile",
                  "Chemistry 66th %ile",
                ],
              },
              {
                icon: "🌍",
                year: "Ongoing",
                school: "International Goals",
                detail:
                  "SAT Prep · IELTS · German (TELC B1 Target) · University Research",
                marks: [
                  "Singapore",
                  "Germany",
                  "USA",
                  "UK",
                  "Canada",
                  "Ireland",
                ],
              },
            ].map((edu, i) => (
              <div
                className="edu-item"
                key={edu.school}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="edu-dot" aria-hidden="true">
                  {edu.icon}
                </div>
                <div className="edu-content">
                  <div className="edu-year">{edu.year}</div>
                  <div className="edu-school">{edu.school}</div>
                  <div className="edu-detail">{edu.detail}</div>
                  <div className="edu-marks">
                    {edu.marks.map((m) => (
                      <span className="mark-pill" key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP ─── */}
      <section id="leadership" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">04</span>
            <h2 className="section-title">Leadership & Service</h2>
            <span className="section-line" />
          </div>

          <div className="cards-grid">
            {[
              {
                emoji: "👑",
                title: "Head Boy",
                sub: "Class 11",
                desc: "Represented the student body, coordinated events and administration, and served as the primary liaison between students and faculty.",
              },
              {
                emoji: "🏠",
                title: "House Captain",
                sub: "Tagore House · Class 8 & 11",
                desc: "Led Tagore House across sports, cultural events, and inter-house competitions. Mentored younger students and built team spirit.",
              },
              {
                emoji: "🥊",
                title: "Sports Club Head",
                sub: "Post Re-enrollment",
                desc: "Managed and organized school-level sports activities, coordinated events, and led the club's operations.",
              },
              {
                emoji: "📚",
                title: "Teacher Assistant",
                sub: "4 Consecutive Years · Classes 5–8",
                desc: "Supported teachers in the classroom for four straight years — explaining concepts, helping peers, and managing learning environments.",
              },
              {
                emoji: "🎖️",
                title: "Class Monitor",
                sub: "7 Years Across School",
                desc: "Elected Class Monitor in Classes 1, 2, 5, 6, 7, 8, and 11 — a consistent demonstration of trustworthiness and peer confidence.",
              },
              {
                emoji: "🤝",
                title: "Community Service",
                sub: "Multiple Initiatives",
                desc: "Cancer fundraising during primary school, medical camp support, COVID-19 volunteer work alongside medical students, and peer educational mentorship.",
              },
            ].map((card, i) => (
              <div
                className="leadership-card reveal"
                key={card.title}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="lc-emoji" aria-hidden="true">
                  {card.emoji}
                </div>
                <div className="lc-title">{card.title}</div>
                <div className="lc-sub">{card.sub}</div>
                <div className="lc-desc">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">05</span>
            <h2 className="section-title">Projects</h2>
            <span className="section-line" />
          </div>

          <div className="projects-grid">
            {[
              {
                img: "/coding_photo.png",
                lang: "JavaScript",
                name: "Calculator",
                desc: "A clean, functional calculator built with vanilla JavaScript — one of the first projects in my programming journey. Demonstrates DOM manipulation and event handling.",
                links: [
                  { label: "GitHub →", href: "https://github.com" },
                ],
              },
              {
                img: "/coding_photo.png",
                lang: "C++",
                name: "Problem Solving Repo",
                desc: "A growing collection of competitive programming solutions — data structures, algorithms, and JEE-level mathematical implementations in C++.",
                links: [
                  { label: "GitHub →", href: "https://github.com" },
                ],
              },
              {
                img: "/coding_photo.png",
                lang: "Coming Soon",
                name: "Portfolio Website",
                desc: "This very portfolio — built with Next.js, TypeScript, and Tailwind CSS. Fully animated, responsive, and SEO-optimised. Source code on GitHub.",
                links: [
                  { label: "GitHub →", href: "https://github.com" },
                ],
              },
            ].map((proj, i) => (
              <div
                className="project-card reveal"
                key={proj.name}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={proj.img}
                    alt={proj.name}
                    fill
                    className="project-img"
                    style={{ objectFit: "cover" }}
                    sizes="400px"
                  />
                </div>
                <div className="project-body">
                  <div className="project-lang">{proj.lang}</div>
                  <div className="project-name">{proj.name}</div>
                  <div className="project-desc">{proj.desc}</div>
                  <div className="project-links">
                    {proj.links.map((l) => (
                      <a
                        key={l.label}
                        className="project-link"
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section
        id="languages"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">06</span>
            <h2 className="section-title">Languages</h2>
            <span className="section-line" />
          </div>

          <div className="lang-grid">
            {[
              {
                flag: "🇮🇳",
                name: "Hindi",
                level: "Native / Fluent",
                barWidth: "100%",
              },
              {
                flag: "🇬🇧",
                name: "English",
                level: "Working Proficiency",
                barWidth: "78%",
              },
              {
                flag: "🇩🇪",
                name: "German",
                level: "Learning · TELC B1 Target",
                barWidth: "40%",
              },
            ].map((lang) => (
              <div className="lang-card reveal" key={lang.name}>
                <span className="lang-flag" aria-hidden="true">
                  {lang.flag}
                </span>
                <div className="lang-name">{lang.name}</div>
                <div className="lang-level">{lang.level}</div>
                <div className="lang-bar-wrap">
                  <div
                    className="lang-bar"
                    style={
                      { "--bar-width": lang.barWidth } as React.CSSProperties
                    }
                    role="progressbar"
                    aria-valuenow={parseInt(lang.barWidth)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">07</span>
            <h2 className="section-title">Contact</h2>
            <span className="section-line" />
          </div>

          <div className="contact-grid">
            <div className="contact-text reveal-left">
              <h3 className="contact-headline">
                Let&apos;s build something <span>great</span> together.
              </h3>
              <p className="contact-body">
                Whether you&apos;re a university admissions office, a fellow
                developer, or someone who just wants to connect — I&apos;m always
                open to meaningful conversations. Reach out and say hello.
              </p>

              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem 1.5rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--red-border)",
                  borderRadius: "12px",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                }}
              >
                <strong
                  style={{ color: "var(--red-light)", display: "block", marginBottom: "0.5rem" }}
                >
                  🌍 International Goals
                </strong>
                Targeting CS & Engineering programs in{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  Singapore, Germany, USA, UK, Canada, Ireland, Australia, NZ,
                  South Korea, Japan
                </span>
                .
              </div>
            </div>

            <div className="reveal-right">
              <div className="contact-links">
                <a
                  href="https://github.com"
                  className="contact-link"
                  id="contact-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link-icon" aria-hidden="true">🐙</span>
                  <span>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>
                      GitHub
                    </strong>
                    View my code & projects
                  </span>
                </a>
                <a
                  href="mailto:your@email.com"
                  className="contact-link"
                  id="contact-email"
                >
                  <span className="link-icon" aria-hidden="true">✉️</span>
                  <span>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>
                      Email
                    </strong>
                    Drop me a message
                  </span>
                </a>
                <a
                  href="https://linkedin.com"
                  className="contact-link"
                  id="contact-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="link-icon" aria-hidden="true">💼</span>
                  <span>
                    <strong style={{ display: "block", color: "var(--text-primary)" }}>
                      LinkedIn
                    </strong>
                    Connect professionally
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <p className="footer-text">
          Built by <span>Shashank</span> · Designed to impress ·{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
