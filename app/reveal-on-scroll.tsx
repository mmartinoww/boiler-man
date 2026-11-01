"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".section-heading",
  ".service-card",
  ".service-card--featured",
  ".signal-card",
  ".stat-card",
  ".process-step",
  ".review-card",
  ".faq-item",
  ".brand-pill",
  ".glass-panel",
  ".coverage-card",
  ".site-footer__panel",
  ".site-footer__mapWrap",
  ".cta-panel"
].join(",");

export function RevealOnScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
    if (!elements.length) return;

    document.documentElement.classList.add("reveal-ready");

    const staggerGroups = new Map<Element, number>();
    elements.forEach((element) => {
      element.classList.add("reveal-item");

      const parent = element.parentElement;
      const index = parent ? staggerGroups.get(parent) ?? 0 : 0;
      element.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 70}ms`);
      if (parent) staggerGroups.set(parent, index + 1);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px 15% 0px",
        threshold: 0
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
      elements.forEach((element) => {
        element.classList.remove("reveal-item", "is-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
