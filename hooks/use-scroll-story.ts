import { useEffect, useRef } from "react";

// ─── Easing functions ──────────────────────────────────────────────────────
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic  = (t: number) => t * t * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Scroll-driven storytelling — Apple product-page style.
 *
 * Phase 1 — Hero EXIT   (scrollY: 0 → 65vh)
 *   Hero content fades out and drifts upward.
 *
 * Phase 2 — Journey IN  (scrollY: 18vh → 85vh)
 *   Journey section rises from below and scales into view.
 *
 * Phase 3 — Journey OUT (journey section scrolled toward top of viewport)
 *   Journey section fades and shrinks away as the user continues scrolling.
 *
 * All transforms are applied frame-perfectly via requestAnimationFrame.
 */
export function useScrollStory(
  heroContentSelector = ".hero-content-center",
  journeySelector = "#journey"
) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const heroEl    = document.querySelector<HTMLElement>(heroContentSelector);
    const journeyEl = document.querySelector<HTMLElement>(journeySelector);

    if (!heroEl || !journeyEl) return;

    // Prime GPU composite layers immediately
    heroEl.style.willChange    = "transform, opacity";
    journeyEl.style.willChange = "transform, opacity";

    // Lock journey invisible on mount — hook drives it from here
    journeyEl.style.opacity   = "0";
    journeyEl.style.transform = "translateY(72px) scale(0.94)";
    journeyEl.style.transformOrigin = "50% 10%";

    const tick = () => {
      const scrollY = window.scrollY;
      const vh      = window.innerHeight;

      // ── Phase 1: Hero EXIT ────────────────────────────────────────
      // [0 → vh*0.65] → progress [0 → 1]
      const heroRaw      = Math.min(Math.max(scrollY / (vh * 0.65), 0), 1);
      const heroProgress = easeInCubic(heroRaw); // accelerates out

      heroEl.style.opacity   = Math.max(0, 1 - heroProgress * 1.4).toFixed(4);
      heroEl.style.transform = `translateY(${-(heroProgress * 80).toFixed(2)}px) scale(${(1 - heroProgress * 0.06).toFixed(4)})`;

      // ── Phase 2: Journey IN ───────────────────────────────────────
      // [vh*0.18 → vh*0.85] → progress [0 → 1]
      const jInRaw      = Math.min(Math.max((scrollY - vh * 0.18) / (vh * 0.67), 0), 1);
      const jInProgress = easeOutCubic(jInRaw); // decelerates into place

      // ── Phase 3: Journey OUT ──────────────────────────────────────
      // Starts when the top of the journey section reaches the top 20% of viewport.
      const journeyTop    = journeyEl.getBoundingClientRect().top;
      const journeyHeight = journeyEl.offsetHeight;
      // Starts when the top of the journey section reaches 20vh above the viewport (-vh * 0.2), creating a solid plateau for the user to explore the orbit before it fades out.
      const outRaw      = Math.min(Math.max((-journeyTop - vh * 0.2) / (journeyHeight * 0.55), 0), 1);
      const jOutProgress = easeInOutCubic(outRaw);

      // Combine: fully in unless scrolling out
      const netOpacity   = jInProgress * (1 - jOutProgress * 0.95);
      const netTY        = (1 - jInProgress) * 72 + jOutProgress * -70;
      const netScale     = 0.94 + jInProgress * 0.06 - jOutProgress * 0.07;

      journeyEl.style.opacity   = Math.max(0, netOpacity).toFixed(4);
      journeyEl.style.transform = `translateY(${netTY.toFixed(2)}px) scale(${Math.max(0.87, netScale).toFixed(4)})`;

      // ── Background orb parallax ───────────────────────────────────
      const orb1 = document.querySelector<HTMLElement>(".orb-1");
      const orb2 = document.querySelector<HTMLElement>(".orb-2");
      const para = Math.min(scrollY / (vh * 1.5), 1);
      if (orb1) orb1.style.transform = `translate(${para * 30}px, ${para * -60}px) scale(${1 + para * 0.15})`;
      if (orb2) orb2.style.transform = `translate(${para * -20}px, ${para * 40}px) scale(${1 + para * 0.10})`;
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initialise on mount
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      heroEl.style.willChange    = "";
      journeyEl.style.willChange = "";
    };
  }, [heroContentSelector, journeySelector]);
}
