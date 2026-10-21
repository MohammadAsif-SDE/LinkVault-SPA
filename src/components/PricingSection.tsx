import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For personal use and link collectors.",
    cta: "Get started free",
    ctaStyle: "ghost",
    features: [
      "Up to 5 folders",
      "500 saved links",
      "Chrome extension",
      "Basic search",
    ],
  },
  {
    name: "Pro",
    price: "$7",
    period: "per month",
    desc: "For power users who live in their browser.",
    cta: "Start free trial",
    ctaStyle: "primary",
    highlight: true,
    features: [
      "Unlimited folders",
      "Unlimited links",
      "Full-text search",
      "Share folders publicly",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "$19",
    period: "per month",
    desc: "For teams that share and collaborate on links.",
    cta: "Contact us",
    ctaStyle: "ghost",
    features: [
      "Everything in Pro",
      "Up to 20 members",
      "Real-time collaboration",
      "Team analytics",
      "SSO / SAML",
    ],
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".price-card", {
        y: 36, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "100px 0", background: "#FCFBF9" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="pill" style={{ display: "inline-flex", marginBottom: 20 }}>
            <span className="pill-dot" />
            Pricing
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: "#666", fontSize: "1rem" }}>No hidden fees. Cancel any time.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="price-card"
              style={{
                padding: 32,
                borderRadius: 20,
                border: plan.highlight ? "2px solid #000" : "1.5px solid #eee",
                background: plan.highlight ? "#000" : "#fff",
                color: plan.highlight ? "#fff" : "#000",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#FF2D78",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: 999,
                }}>
                  Most popular
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", color: plan.highlight ? "#aaa" : "#888", marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontWeight: 900, fontSize: "2.5rem", letterSpacing: "-0.04em" }}>{plan.price}</span>
                  <span style={{ color: plan.highlight ? "#666" : "#999", fontSize: "0.8rem" }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: plan.highlight ? "#777" : "#888", lineHeight: 1.5 }}>{plan.desc}</p>
              </div>

              <a
                href="#"
                className={plan.ctaStyle === "primary" ? "btn-black" : "btn-ghost"}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: 28,
                  background: plan.highlight ? "#FF2D78" : undefined,
                  borderColor: plan.highlight ? "transparent" : undefined,
                  color: plan.highlight ? "#fff" : "#000",
                }}
              >
                {plan.cta}
              </a>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: "0.85rem", color: plan.highlight ? "#ccc" : "#555" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke={plan.highlight ? "#FF2D78" : "#00E87A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
