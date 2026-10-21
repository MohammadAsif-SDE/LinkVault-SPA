import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "⚡",
    color: "#FFE034",
    bg: "#fffbe6",
    title: "One-click save",
    desc: "Click the extension, hit save. Your link lands in the right folder instantly. No forms, no friction.",
  },
  {
    icon: "📁",
    color: "#FF6B35",
    bg: "#fff3ee",
    title: "Smart folders",
    desc: "Auto-tag and categorize links by topic, project, or client. Your folders learn from you over time.",
  },
  {
    icon: "👥",
    color: "#FF2D78",
    bg: "#fff0f5",
    title: "Real-time collaboration",
    desc: "Share folders with your team. Everyone sees new links the moment they're saved.",
  },
  {
    icon: "🔍",
    color: "#A855F7",
    bg: "#f8f0ff",
    title: "Instant search",
    desc: "Find any saved link in milliseconds. Search by title, domain, tag, or even the page content.",
  },
  {
    icon: "📱",
    color: "#00E87A",
    bg: "#f0fff8",
    title: "Access everywhere",
    desc: "Your folders sync across Chrome, mobile, and web. Links are always with you, on every device.",
  },
  {
    icon: "🔒",
    color: "#0EA5E9",
    bg: "#f0f9ff",
    title: "Private & secure",
    desc: "Your links are yours. Folders can be public, private, or shared with specific teammates only.",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-head", {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".feat-card", {
        y: 40, opacity: 0, stagger: 0.09, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 0", background: "#FCFBF9" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div className="feat-head" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 48, marginBottom: 64 }}>
          <div style={{ maxWidth: 480 }}>
            <div className="pill" style={{ marginBottom: 16 }}>
              <span className="pill-dot" />
              Features
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
          <p style={{ color: "#666", lineHeight: 1.7, maxWidth: 360, paddingTop: 16, fontSize: "0.95rem" }}>
            LinkFolder is built for people who care about their digital library. Fast, focused, and beautifully simple.
          </p>
        </div>

        {/* Grid */}
        <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card feat-card">
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: f.bg,
                border: `1.5px solid ${f.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
                marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8, letterSpacing: "-0.02em" }}>
                {f.title}
              </h3>
              <p style={{ color: "#666", fontSize: "0.875rem", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
