import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { icon: "🔗", title: "Figma Design File", sub: "figma.com", color: "#FF7262" },
  { icon: "📄", title: "Q4 Report.pdf", sub: "drive.google.com", color: "#4285F4" },
  { icon: "⭐", title: "React Docs", sub: "react.dev", color: "#61DAFB" },
];

const SHARE_ICONS = [
  { icon: "📤", label: "Share", color: "#FF2D78", tx: -90, ty: -80 },
  { icon: "👥", label: "Collaborate", color: "#FF6B35", tx: 0, ty: -100 },
  { icon: "🔗", label: "Copy link", color: "#00E87A", tx: 90, ty: -80 },
  { icon: "✉️", label: "Invite", color: "#A855F7", tx: -60, ty: -140 },
  { icon: "📱", label: "Mobile", color: "#FFE034", tx: 60, ty: -140 },
];

export function ScrollFileDrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const linkCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── Phase 0: headline appears ── */
      tl.from(headRef.current, { y: 40, opacity: 0, duration: 0.3 }, 0);

      /* ── Phase 1: link cards float in from left ── */
      tl.from(linkCardsRef.current, {
        x: -80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.3,
      }, 0.1);

      /* ── Phase 2: file lifts off the first card ── */
      tl.to(fileRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
      }, 0.4);

      /* ── Phase 3: file arcs across screen toward folder ── */
      tl.to(fileRef.current, {
        x: 340,
        y: -60,
        rotation: 12,
        scale: 0.85,
        duration: 0.5,
        ease: "power2.inOut",
      }, 0.6);

      tl.to(fileRef.current, {
        x: 480,
        y: 40,
        rotation: -5,
        scale: 0.7,
        duration: 0.25,
        ease: "power2.in",
      }, 1.1);

      /* ── Phase 4: file drops into folder (disappear) ── */
      tl.to(fileRef.current, {
        x: 510,
        y: 90,
        rotation: 0,
        scale: 0.4,
        opacity: 0,
        duration: 0.2,
        ease: "power4.in",
      }, 1.35);

      /* ── Folder bounces on drop ── */
      tl.to(folderRef.current, {
        y: 8,
        scale: 1.06,
        duration: 0.1,
        ease: "power2.out",
      }, 1.4);
      tl.to(folderRef.current, {
        y: 0,
        scale: 1,
        duration: 0.15,
        ease: "elastic.out(1.2, 0.4)",
      }, 1.5);

      /* ── Folder front opens ── */
      tl.to(folderFrontRef.current, {
        scaleY: 0.7,
        transformOrigin: "bottom center",
        duration: 0.2,
      }, 1.5);
      tl.to(folderFrontRef.current, {
        scaleY: 1,
        duration: 0.15,
      }, 1.7);

      /* ── Phase 5: icons burst out ── */
      tl.from(".share-icon", {
        scale: 0,
        opacity: 0,
        y: 0,
        stagger: 0.06,
        duration: 0.25,
        ease: "back.out(2)",
      }, 1.55);

      tl.to(".share-icon", {
        opacity: 1,
        duration: 0.1,
      }, 1.55);

      /* ── Label appears ── */
      tl.from(labelRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.25,
      }, 1.75);

      /* ── Link cards fade out ── */
      tl.to(linkCardsRef.current, {
        opacity: 0.3,
        x: -20,
        duration: 0.3,
      }, 1.4);

    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="scroll-demo" ref={wrapRef} style={{ height: "350vh", position: "relative" }}>
      <div
        ref={stageRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Section label top-left */}
        <div style={{
          position: "absolute",
          top: 48,
          left: 60,
          color: "#555",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          How it works
        </div>

        {/* Scroll progress line */}
        <div style={{
          position: "absolute",
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          width: 2,
          height: 120,
          background: "#222",
          borderRadius: 2,
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "40%",
            background: "#FF2D78",
            borderRadius: 2,
          }} />
        </div>

        <div style={{ width: "100%", maxWidth: 1100, padding: "0 60px", position: "relative" }}>
          {/* Headline */}
          <div ref={headRef} style={{ marginBottom: 64, textAlign: "center" }}>
            <div className="pill" style={{ display: "inline-flex", marginBottom: 20, background: "#1a1a1a", color: "#888" }}>
              <span className="pill-dot" />
              One click saves everything
            </div>
            <h2 style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}>
              Click. Drop. <span className="gradient-pink">Share.</span>
            </h2>
          </div>

          {/* Main layout: links left | scene center-right */}
          <div style={{ display: "flex", alignItems: "center", gap: 40, justifyContent: "space-between" }}>

            {/* Left: link cards stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              {LINKS.map((link, i) => (
                <div
                  key={link.title}
                  ref={el => { linkCardsRef.current[i] = el; }}
                  className="file-card"
                  style={{ width: 230 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: 8,
                      background: `${link.color}20`,
                      border: `1.5px solid ${link.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}>
                      {link.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#111", lineHeight: 1.3 }}>{link.title}</div>
                      <div style={{ fontSize: "0.7rem", color: "#999" }}>{link.sub}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "#FF2D78",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13,
                      }}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ color: "#444", fontSize: "0.75rem", fontWeight: 500, paddingLeft: 4 }}>
                Saved from anywhere on the web
              </div>
            </div>

            {/* Center: flying file card */}
            <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>

              {/* The flying file */}
              <div
                ref={fileRef}
                className="file-card"
                style={{
                  position: "absolute",
                  left: "10%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  scale: 0.8,
                  zIndex: 20,
                  pointerEvents: "none",
                  width: 200,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "#FF726220",
                    border: "1.5px solid #FF726240",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>🔗</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.82rem" }}>Figma Design File</div>
                    <div style={{ fontSize: "0.7rem", color: "#999" }}>figma.com</div>
                  </div>
                </div>
              </div>

              {/* Arc trail dots */}
              {[0.2, 0.4, 0.6, 0.8].map((op, i) => (
                <div
                  key={i}
                  ref={i === 0 ? trailRef : undefined}
                  style={{
                    position: "absolute",
                    left: `${20 + i * 15}%`,
                    top: `${45 - i * 5}%`,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#FF2D78",
                    opacity: op * 0.4,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>

            {/* Right: folder + burst icons */}
            <div style={{ position: "relative", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

              {/* Share icons that burst out */}
              <div ref={iconsRef} style={{ position: "relative", width: 200, height: 200 }}>

                {/* Folder sits center-bottom */}
                <div
                  ref={folderRef}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="folder-wrap">
                    <div className="folder-tab" />
                    <div className="folder-back" />
                    <div ref={folderFrontRef} className="folder-front">
                      <div className="folder-shine" />
                    </div>
                  </div>
                </div>

                {/* Burst icons */}
                {SHARE_ICONS.map((item, i) => (
                  <div
                    key={item.label}
                    className="share-icon"
                    style={{
                      position: "absolute",
                      bottom: 60,
                      left: "50%",
                      transform: `translate(calc(-50% + ${item.tx}px), ${item.ty}px)`,
                      opacity: 0,
                    }}
                  >
                    <div className="icon-bubble" style={{ background: item.color, fontSize: 22 }}>
                      {item.icon}
                    </div>
                    <div style={{
                      textAlign: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#aaa",
                      marginTop: 4,
                    }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Label below folder */}
              <div ref={labelRef} style={{ textAlign: "center", opacity: 0 }}>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: "1rem", marginBottom: 4 }}>
                  Work folder
                </div>
                <div style={{ fontSize: "0.75rem", color: "#555", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="4" stroke="#FF2D78" strokeWidth="1.5"/>
                    <circle cx="6" cy="4" r="1.2" fill="#FF2D78"/>
                    <path d="M3.5 9c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5" stroke="#FF2D78" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  3 collaborators · 14 links
                </div>
              </div>
            </div>
          </div>

          {/* Bottom steps */}
          <div style={{
            position: "absolute",
            bottom: -40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 40,
            width: "max-content",
          }}>
            {[
              { n: "01", label: "Save any link" },
              { n: "02", label: "Drop into folder" },
              { n: "03", label: "Share & collaborate" },
            ].map(({ n, label }) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#FF2D78" }}>{n}</span>
                <span style={{ color: "#555", fontSize: "0.8rem", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
