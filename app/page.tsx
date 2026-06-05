"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RadialOrbitalTimelineDemo } from "@/components/radial-orbital-timeline-demo";
import { SparklesCore } from "@/components/ui/sparkles";
import { useScrollStory } from "@/hooks/use-scroll-story";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Scroll-driven storytelling: hero exits, journey enters
  useScrollStory();

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

      {/* ─── Nav ─── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav-logo" aria-label="Shashank home">
          S<span style={{ color: "var(--accent)" }}>.</span>
        </a>
        <ul className="nav-links">
          <li><a href="#journey">Journey</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ─── HERO STICKY PIN ───
          The wrapper is 180vh tall — creates scroll room so the hero
          stays pinned while the user scrolls and animations play.
          After 180vh the hero releases and the journey section takes over.
      ─── */}
      <div className="hero-pin-wrapper">
        <section id="hero" className="hero-section relative w-full overflow-hidden">
          {/* Sparkles Background */}
          <div className="w-full absolute inset-0 h-full">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={1}
            />
          </div>
          <div className="hero-content-center relative z-10">
            <span className="hero-eyebrow">Engineering Student</span>
            <h1 className="hero-name">
              <span>Hello, I&apos;m</span>
              <span className="white-accent">Shashank</span>
            </h1>
            <p className="hero-title">
              Aspiring <strong>Computer Scientist</strong> &amp; Engineer
            </p>
            <p className="hero-desc">
              A self-driven student building toward{" "}
              <strong>international engineering programs</strong> — with a
              background in advanced mathematics, programming, and leadership.
            </p>
            <div className="hero-cta">
              <a href="#journey" className="btn-primary" id="hero-cta-journey">My Journey</a>
              <a href="#projects" className="btn-secondary" id="hero-cta-projects">View Projects</a>
            </div>
            <div className="hero-scroll-hint" aria-hidden="true">
              <span>scroll</span>
              <div className="scroll-line"></div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── JOURNEY / ORBIT ─── */}
      <section id="journey" className="journey-section">        
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="section-header reveal">
            <span className="section-number">00</span>
            <h2 className="section-title">My Journey</h2>
            <span className="section-line" />
          </div>
        </div>
        <RadialOrbitalTimelineDemo />
      </section>


      {/* ─── PROJECTS ─── */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">01</span>
            <h2 className="section-title">Projects</h2>
            <span className="section-line" />
          </div>

          <div className="projects-grid">
            {[
              {
                lang: "Web Prototype",
                name: "BinduCare",
                desc: "Healthcare startup web prototype. Designed to demonstrate the core user flows and value proposition of a modern health-tech solution.",
                links: [
                  { label: "GitHub →", href: "https://github.com/KINKCAT" },
                ],
              },
              {
                lang: "Next.js & TypeScript",
                name: "Personal Portfolio Website",
                desc: "Professional student portfolio featuring a scroll-driven storytelling layout, Apple-style animations, and custom UI components.",
                links: [
                  { label: "GitHub →", href: "https://github.com/KINKCAT" },
                ],
              },
              {
                lang: "C++",
                name: "C++ Calculator",
                desc: "Console-based calculator application built in C++. Demonstrates core programming logic, mathematical implementations, and control flow.",
                links: [
                  { label: "GitHub →", href: "https://github.com/KINKCAT" },
                ],
              },
            ].map((proj, i) => (
              <div
                className="project-card reveal"
                key={proj.name}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="project-body" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="project-lang">{proj.lang}</div>
                  <div className="project-name">{proj.name}</div>
                  <div className="project-desc">{proj.desc}</div>
                  <div className="project-links" style={{ marginTop: "auto" }}>
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



      {/* ─── CONTACT ─── */}
      <section id="contact">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-number">02</span>
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
                Targeting CS & Engineering programs, aspiring Quant and future{" "}
                <span style={{ color: "var(--text-secondary)" }}>
                  High-Frequency Trading engineer, deeply interested in
                  algorithms, mathematical modeling, and ultra-low-latency
                  systems.
                </span>
              </div>
            </div>

            <div className="reveal-right">
              <div className="contact-links">
                <a
                  href="https://github.com/KINKCAT"
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
                  href="mailto:shashankcodes247@gmail.com"
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
                  href="https://www.linkedin.com/in/shashank-tripathi-326b80310?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
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
