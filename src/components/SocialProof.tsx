import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  "Figma", "Notion", "Linear", "Vercel", "Stripe", "GitHub", "Slack", "Loom",
  "Figma", "Notion", "Linear", "Vercel", "Stripe", "GitHub", "Slack", "Loom",
];

const TESTIMONIALS = [
  {
    text: "Finally a Chrome extension that treats saving links as a first-class experience. My whole team uses it now.",
    name: "Sarah K.",
    role: "Product Manager, Figma",
    avatar: "SK",
    avatarBg: "#FF2D78",
  },
  {
    text: "I used to lose important links in browser bookmarks. LinkFolder is everything bookmarks should have been.",
    name: "James R.",
    role: "Lead Engineer, Vercel",
    avatar: "JR",
    avatarBg: "#FF6B35",
  },
  {
    text: "The collaboration feature sold us immediately. Our design team shares links constantly and this made it seamless.",
    name: "Priya M.",
    role: "Design Lead, Stripe",
    avatar: "PM",
    avatarBg: "#A855F7",
  },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 32, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#FCFBF9", padding: "80px 0 100px", borderTop: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Marquee */}
        <div style={{ marginBottom: 72, textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#aaa", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
            Used by teams at
          </p>
          <div className="marquee-wrap" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
            <div className="marquee-track">
              {LOGOS.map((l, i) => (
                <span key={i} style={{ fontWeight: 800, fontSize: "1.1rem", color: "#ccc", letterSpacing: "-0.03em", flexShrink: 0 }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                padding: 28,
                border: "1.5px solid #f0f0f0",
                borderRadius: 16,
                background: "#fff",
              }}
            >
              {/* Stars */}
              <div style={{ marginBottom: 16, color: "#FFB800", fontSize: "0.9rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#333", marginBottom: 24 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: t.avatarBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 800, fontSize: "0.75rem",
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#999" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
