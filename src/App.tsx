import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ArcFeatures } from "./components/ArcFeatures";
import { FeaturesSection } from "./components/FeaturesSection";
import { SocialProof } from "./components/SocialProof";
import { PricingSection } from "./components/PricingSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let lenis: Lenis | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
    }

    ScrollTrigger.refresh();

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      lenis?.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FCFBF9", overflowX: "hidden" }}>
      <Navbar />
      <main style={{ paddingTop: 88 }}>
        <HeroSection />
        <ArcFeatures />
        {/* <FeaturesSection />
        <SocialProof /> */}
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
