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
                  <span className="link-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1em", height: "1em", fill: "currentColor" }} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 640 640">
                      <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/>
                    </svg>
                  </span>
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
                  <span className="link-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "1em", height: "1em", fill: "currentColor" }} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 497 511.86">
                      <path fillRule="nonzero" d="M497 227.28c0 29.39-4.56 56.35-13.58 80.75-9.13 24.51-22.07 43.5-38.62 56.98-16.56 13.47-35.66 20.16-57.2 20.16-17.82 0-32.78-5.41-45.09-16.13-12.2-10.82-19.42-24.62-21.75-41.38h-2.44c-8.28 18.04-20.16 32.15-35.66 42.34-15.38 10.07-33.73 15.17-54.85 15.17-31.09 0-55.39-10.62-72.9-31.83-17.5-21.23-26.21-50.08-26.21-86.59 0-42.23 12.21-76.61 36.61-103.03 24.51-26.42 56.66-39.58 96.45-39.58 14.01 0 30.03 1.28 47.86 3.93 17.82 2.55 33.85 6.16 48.17 10.72l-7.75 146v6.79c0 36.92 13.8 55.39 41.28 55.39 18.89 0 34.27-11.14 46.05-33.43 11.78-22.28 17.72-51.24 17.72-86.89 0-37.57-7.64-70.35-23.03-98.58-15.28-28.22-37.13-49.87-65.47-65.15-28.22-15.17-60.69-22.81-97.4-22.81-46.26 0-86.48 9.55-120.64 28.75-34.17 19.21-60.27 46.59-78.31 82.13-18.04 35.54-27.05 76.61-27.05 123.29 0 63.25 16.65 111.84 50.08 145.9 33.32 33.96 81.38 50.93 144.19 50.93 43.51 0 88.71-8.91 135.5-26.74v41.38c-39.79 17.41-84.89 26.11-135.5 26.11-75.23 0-133.58-20.7-175.18-62.08C20.69 408.51 0 350.68 0 276.41c0-53.9 11.04-101.86 33.21-143.99 22.18-42.01 53.8-74.59 94.86-97.72C169.03 11.57 216.14 0 269.19 0c44.56 0 84.14 9.34 118.95 28.12 34.69 18.78 61.53 45.41 80.42 79.9 19 34.48 28.44 74.27 28.44 119.26zm-321.4 40.75c0 52.62 20.17 78.94 60.59 78.94 42.97 0 66.21-32.47 69.93-97.3l4.45-81.07c-14.96-4.14-31.19-6.26-48.81-6.26-26.95 0-48.06 9.34-63.34 28.02-15.18 18.56-22.82 44.56-22.82 77.67z"/>
                    </svg>
                  </span>
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
                  <span className="link-icon" aria-hidden="true">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.31" style={{ width: "1em", height: "1em" }}>
                      <title>linkedin-app</title>
                      <path fill="#0a66c2" fillRule="evenodd" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"/>
                      <path fill="#fff" fillRule="evenodd" d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"/>
                    </svg>
                  </span>
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
