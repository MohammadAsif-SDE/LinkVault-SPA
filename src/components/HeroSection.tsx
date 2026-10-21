import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(badgeRef.current, { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(headRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power4.out" }, "-=0.2")
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .from(ctaRef.current, { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.3");
  }, []);

  return (
    <section style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", overflow: "hidden" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px" }}>
        {/* Badge */}
        <div ref={badgeRef} style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div className="pill">
            <span className="pill-dot" />
            Chrome Extension · Free to install
          </div>
        </div>

        {/* Headline */}
        <div ref={headRef}>
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#000",
              marginBottom: 24,
            }}
          >
            Save links.
            <br />
            <span className="gradient-pink">Beautifully.</span>
          </h1>
        </div>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#666",
            maxWidth: 560,
            margin: "0 auto 40px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Drop any link into a smart folder with one click. Share with your team,
          collaborate in real time. The Chrome extension that makes the web yours.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
          <a href="#" className="btn-black" style={{ fontSize: "0.95rem", padding: "13px 26px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5"/>
              <path d="M7 6.5l5 2.5-5 2.5V6.5z" fill="white"/>
            </svg>
            Add to Chrome — Free
          </a>
          <a href="#scroll-demo" className="btn-ghost" style={{ fontSize: "0.95rem", padding: "12px 24px" }}>
            See how it works ↓
          </a>
        </div>

        {/* Social proof */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center", alignItems: "center", gap: 32 }}>
          {[
            { n: "12,000+", label: "Active users" },
            { n: "4.9★", label: "Chrome Store" },
            { n: "Free", label: "Forever plan" },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 900, fontSize: "1.3rem", letterSpacing: "-0.03em" }}>{n}</div>
              <div style={{ fontSize: "0.75rem", color: "#999", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
