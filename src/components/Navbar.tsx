import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, { y: -60, opacity: 0, duration: 0.6, ease: "power3.out" });

    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={ref}
      style={{
        position: "fixed",
        top: isScrolled ? 10 : 16,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: "0 16px",
        transition: "top 0.28s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1080,
          margin: "0 auto",
          height: 56,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px 0 14px",
          pointerEvents: "auto",
          background: isScrolled ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.56)",
          border: "1px solid rgba(255,255,255,0.75)",
          boxShadow: isScrolled
            ? "0 8px 26px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.75)"
            : "0 6px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(100deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 38%, rgba(255,255,255,0.35) 58%, rgba(255,255,255,0.08) 100%)",
            transform: "translateX(-18%)",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 70%)",
            top: -130,
            right: 120,
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 10, paddingLeft: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: "#E3C538",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.82rem", letterSpacing: "-0.03em", color: "#2e2e2e", lineHeight: 1 }}>Vault Tabs</span>
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 38 }}>
          {["Features", "Showcase", "Pricing", "Resources"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontSize: "1.0rem",
                fontWeight: 500,
                color: "#777",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1f1f1f")}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 20, paddingRight: 4 }}>
          <a
            href="#"
            style={{
              color: "#2f2f2f",
              fontSize: "1.05rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Log In
          </a>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 28px",
              borderRadius: 999,
              background: "#111",
              color: "#fff",
              fontSize: "1.05rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(0,0,0,0.22)",
            }}
          >
            Get Started
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}
