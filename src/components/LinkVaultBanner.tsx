import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LinkVaultBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        y: 60, opacity: 0, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(taglineRef.current, {
        y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(statsRef.current?.children ?? [], {
        y: 16, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.35, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050505",
        padding: "100px 40px 80px",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle top label */}
      <div style={{
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#444",
        marginBottom: 20,
        fontWeight: 600,
      }}>
        EST. 2024 &nbsp;·&nbsp; DIGITAL ARCHIVE
      </div>

      {/* Giant wordmark */}
      <div ref={textRef}>
        <h2
          style={{
            fontSize: "clamp(4rem, 16vw, 14rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            userSelect: "none",
            margin: "0 auto",
          }}
        >
          <span style={{ color: "#fff" }}>LINK</span>
          <span style={{ color: "#3b82f6" }}>VAULT</span>
        </h2>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          marginTop: 32,
          color: "rgba(255,255,255,0.55)",
          fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
          fontStyle: "italic",
          lineHeight: 1.6,
          maxWidth: 500,
          margin: "32px auto 0",
        }}
      >
        The ultra-premium way to organize your digital<br />
        universe. One click, <strong style={{ color: "rgba(255,255,255,0.85)", fontStyle: "normal" }}>infinite order.</strong>
      </p>

      {/* Stats row */}
      <div
        ref={statsRef}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 56,
          marginTop: 48,
        }}
      >
        {[
          { label: "SECURITY", value: "256-BIT" },
          { label: "SPEED", value: "INSTANT" },
          { label: "ACCESS", value: "GLOBAL" },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "#444", marginBottom: 4, fontWeight: 700 }}>
              {label}
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 900, color: "#aaa", letterSpacing: "0.05em" }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
