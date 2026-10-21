import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(innerRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 40px 64px", background: "#FCFBF9" }}>
      <div
        ref={innerRef}
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#000",
          borderRadius: 28,
          padding: "72px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent blobs */}
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 300, height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FF2D7840, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -60,
          width: 260, height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FF6B3540, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="pill" style={{ display: "inline-flex", marginBottom: 24, background: "#1a1a1a", color: "#888" }}>
          <span className="pill-dot" />
          Free forever · No credit card
        </div>

        <h2 style={{
          fontSize: "clamp(2.2rem, 5vw, 4rem)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          Start saving links
          <br />
          <span className="gradient-pink">beautifully today.</span>
        </h2>

        <p style={{ color: "#777", fontSize: "1rem", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
          Join 12,000+ people who've upgraded their browser bookmarks to something actually useful.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
          <a href="#" className="btn-black" style={{ background: "#FF2D78", fontSize: "1rem", padding: "14px 28px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5"/>
              <path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="white"/>
            </svg>
            Add to Chrome — It's Free
          </a>
          <a href="#" className="btn-ghost" style={{ borderColor: "#333", color: "#fff", fontSize: "1rem", padding: "13px 26px" }}>
            View demo
          </a>
        </div>

        <p style={{ marginTop: 20, color: "#555", fontSize: "0.75rem" }}>
          Chrome Web Store · 4.9 ★ · 12,000+ installs
        </p>
      </div>
    </section>
  );
}
