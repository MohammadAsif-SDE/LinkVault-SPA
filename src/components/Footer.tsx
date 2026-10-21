import { ArrowRight, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <section className="relative w-full flex flex-col overflow-hidden bg-[#FCFBF9] font-sans text-gray-900 pt-20">
      {/* Background Watermark */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-[18vw] font-black tracking-tighter text-gray-900/[0.03] select-none pointer-events-none z-0 whitespace-nowrap leading-none">
        VaultTabs
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-10 text-gray-900">
            Unlock your{" "}
            <span className="font-serif italic text-[#E8734A] font-bold px-1">
              growth
            </span>{" "}
            with VaultTabs
          </h2>
          <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-gray-900 bg-white hover:bg-gray-50 transition-all duration-300 text-sm font-medium text-gray-900 shadow-sm hover:shadow">
            1:1 Consultation
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>

        {/* Footer Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          {/* Left Column - Brand & Address */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center mb-6">
              {/* Stylized Logo Text with backwards C */}
              <span className="font-serif text-3xl font-bold text-[#E8734A] tracking-tight flex items-center">
                VaultTabs
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mb-8">
              VaultTabs Services Private Limited Gateway Building, MG Road, Mangalore, Karnataka, India, 575003
            </p>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-[#E8734A] transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Right Columns - Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-4">
            {/* Solutions */}
            <div className="flex flex-col">
              <h3 className="text-[#E8734A] text-xs font-semibold tracking-wider uppercase mb-6">
                Solutions
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    For Banks
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    For Brands
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    Monetize
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col">
              <h3 className="text-[#E8734A] text-xs font-semibold tracking-wider uppercase mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <h3 className="text-[#E8734A] text-xs font-semibold tracking-wider uppercase mb-6">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col">
              <h3 className="text-[#E8734A] text-xs font-semibold tracking-wider uppercase mb-6">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                  >
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors leading-snug block"
                  >
                    Privacy, Terms and
                    <br />
                    Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full text-center text-xs text-gray-400 pb-8 relative z-10">
          Copyright 2025 © VaultTabs Services Private Limited.
        </div>
      </div>

      {/* Bottom Warm Horizon Arc */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] md:w-[150vw] h-[400px] md:h-[500px] rounded-[100%] border-t border-amber-200/60 bg-gradient-to-b from-amber-50/50 to-white translate-y-[75%] md:translate-y-[65%] pointer-events-none z-0 shadow-[0_-30px_100px_-20px_rgba(245,158,11,0.15)]" />

      {/* Extra subtle glow at the very center bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[#E8734A]/5 blur-[100px] rounded-full pointer-events-none z-0 translate-y-1/2" />
    </section>
  );
}


