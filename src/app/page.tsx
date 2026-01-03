"use client"
import { useState } from "react";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#002554] text-white selection:bg-[#35F3E6]/30 selection:text-[#35F3E6]">
        {/* Skip Navigation */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#002554]/90 backdrop-blur-xl transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(53,243,230,0.5)]">
                  <circle cx="30" cy="50" r="3" fill="#35F3E6" className="node" style={{ animationDelay: '0s' }}></circle>
                  <circle cx="50" cy="30" r="3" fill="#35F3E6" className="node" style={{ animationDelay: '0.2s' }}></circle>
                  <circle cx="70" cy="50" r="3" fill="#5362EF" className="node" style={{ animationDelay: '0.4s' }}></circle>
                  <circle cx="50" cy="70" r="3" fill="#5362EF" className="node" style={{ animationDelay: '0.6s' }}></circle>
                  <circle cx="50" cy="50" r="3" fill="white" className="node" style={{ animationDelay: '0.8s' }}></circle>
                  <path d="M30 50 Q 50 20 70 50 T 50 80 T 30 50" fill="none" stroke="url(#grad1)" strokeWidth="2" className="opacity-50"></path>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#35F3E6', stopOpacity: 1 }}></stop>
                      <stop offset="100%" style={{ stopColor: '#5362EF', stopOpacity: 1 }}></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl tracking-wide brand-font text-white leading-none">BRAIN THRIVE</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#35F3E6]">WELLNESS</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-200/70">
              <a href="#services" className="hover:text-white transition-colors duration-200">Services</a>
              <a href="/services" className="hover:text-white transition-colors duration-200">Treatments</a>
              <a href="#methodology" className="hover:text-white transition-colors duration-200">Methodology</a>
              <a href="#location" className="hover:text-white transition-colors duration-200">Location</a>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a href="#" className="hidden lg:block text-xs font-semibold text-blue-200 hover:text-white transition-colors">Patient Portal</a>
              <a href="#contact" className="bg-white text-[#002554] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#35F3E6] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Book Consultation
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#001a3d] border-t border-white/10">
              <div className="px-6 py-6 space-y-4">
                <a href="#services" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="/services" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
                <a href="#methodology" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Methodology</a>
                <a href="#location" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Location</a>
                <a href="#contact" className="block bg-[#5362EF] text-white px-4 py-3 rounded-lg text-center font-semibold mt-4">Book Consultation</a>
              </div>
            </div>
          )}
        </nav>

        <main id="main-content" className="pt-20">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}></div>

            {/* Dot Grid Texture with Edge Fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(53, 243, 230, 0.4) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
                opacity: 0.3
              }}
            ></div>

            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#5362EF]/20 to-transparent rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#35F3E6]/10 to-transparent rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#35F3E6]/20 bg-[#35F3E6]/5 text-[#35F3E6] text-[10px] uppercase tracking-widest font-semibold mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35F3E6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35F3E6]"></span>
                  </span>
                  Now accepting new patients
                </div>

                <h1 className="text-7xl md:text-9xl tracking-tight text-white leading-[0.85] mb-8 brand-font">
                  Optimize Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35F3E6] via-[#5362EF] to-[#35F3E6] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">Neural Potential.</span>
                </h1>

                <p className="text-lg text-blue-100/70 max-w-lg mb-10 leading-relaxed font-light">
                  Located at Quick Access Neurology in Choctaw, OK, we combine Brain Gauge assessment, QEEG brain mapping, and medical-grade photobiomodulation to create personalized, science-based brain healing programs.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" className="h-12 px-8 rounded-lg bg-[#5362EF] hover:bg-[#434fc2] text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(83,98,239,0.3)] hover:shadow-[0_0_30px_rgba(83,98,239,0.5)] flex items-center justify-center gap-2">
                    Explore Our Services
                    <span className="text-xl">↓</span>
                  </a>
                  <a href="#methodology" className="h-12 px-8 rounded-lg border border-[#223BA8] hover:bg-[#001a3d] text-blue-100 text-sm font-semibold transition-all flex items-center justify-center gap-2">
                    <span>▶</span>
                    Watch The Science
                  </a>
                </div>

                <div className="mt-16 flex items-center gap-6 pt-8 border-t border-white/5">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#002554] bg-gray-600"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#002554] bg-gray-500"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#002554] bg-gray-400"></div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#002554] bg-[#001a3d] flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                  </div>
                  <div>
                    <div className="flex gap-1 text-[#35F3E6]">
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                    </div>
                    <p className="text-xs text-blue-200/50 mt-1">Trusted by patients worldwide</p>
                  </div>
                </div>
              </div>

              {/* Animated Brain Visualization - Hidden on mobile */}
              <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full opacity-90">
                  {/* Realistic Spinning Brain SVG */}
                  <svg viewBox="0 0 600 600" className="w-full h-full">
                    <defs>
                      {/* 3D Lighting Gradients */}
                      <radialGradient id="brain-light" cx="40%" cy="30%">
                        <stop offset="0%" style={{ stopColor: '#35F3E6', stopOpacity: 0.8 }}></stop>
                        <stop offset="50%" style={{ stopColor: '#5362EF', stopOpacity: 0.6 }}></stop>
                        <stop offset="100%" style={{ stopColor: '#002554', stopOpacity: 0.9 }}></stop>
                      </radialGradient>

                      <radialGradient id="cerebellum-light" cx="50%" cy="50%">
                        <stop offset="0%" style={{ stopColor: '#5362EF', stopOpacity: 0.7 }}></stop>
                        <stop offset="100%" style={{ stopColor: '#35F3E6', stopOpacity: 0.5 }}></stop>
                      </radialGradient>

                      {/* Glow filter */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>

                      {/* Shadow filter */}
                      <filter id="shadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="2" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.5"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Spinning Brain Group */}
                    <g className="animate-[spin_20s_linear_infinite]" transform-origin="300 300">
                      <g transform="translate(300, 280)" filter="url(#shadow)">

                        {/* Main Cerebrum (largest part) */}
                        <ellipse cx="0" cy="-20" rx="140" ry="110"
                          fill="url(#brain-light)"
                          stroke="#35F3E6"
                          strokeWidth="2"
                          filter="url(#glow)"
                          opacity="0.9"
                        />

                        {/* Frontal Lobe Details */}
                        <path
                          d="M -100,-70 Q -110,-50 -115,-30 Q -118,-10 -115,10"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="2.5"
                          opacity="0.7"
                        />
                        <path
                          d="M -80,-85 Q -90,-65 -95,-45"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                        <path
                          d="M -60,-95 Q -70,-75 -75,-55"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="2"
                          opacity="0.5"
                        />

                        {/* Central Sulcus (major brain fold) */}
                        <path
                          d="M -20,-100 Q -25,-50 -30,0 Q -28,30 -25,60"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="3"
                          opacity="0.8"
                          strokeLinecap="round"
                        />

                        {/* Parietal Lobe folds */}
                        <path
                          d="M 10,-95 Q 5,-65 8,-35 Q 12,-5 15,25"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="2.5"
                          opacity="0.7"
                        />
                        <path
                          d="M 40,-85 Q 35,-55 38,-25 Q 42,5 45,35"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="2"
                          opacity="0.6"
                        />

                        {/* Temporal Lobe curves */}
                        <path
                          d="M -105,20 Q -100,40 -90,55 Q -75,65 -55,68"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="2.5"
                          opacity="0.7"
                        />
                        <path
                          d="M -90,35 Q -85,50 -75,60"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="2"
                          opacity="0.5"
                        />

                        {/* Occipital Lobe (back) */}
                        <path
                          d="M 70,-70 Q 85,-50 95,-25 Q 102,0 105,30"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="2.5"
                          opacity="0.7"
                        />
                        <path
                          d="M 95,-55 Q 105,-35 110,-10"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="2"
                          opacity="0.6"
                        />

                        {/* Additional gyri (brain folds) for realism */}
                        <path
                          d="M -50,-90 Q -45,-60 -40,-30"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                        <path
                          d="M 60,-75 Q 65,-45 70,-15"
                          fill="none"
                          stroke="#5362EF"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                        <path
                          d="M -70,10 Q -60,30 -50,45"
                          fill="none"
                          stroke="#35F3E6"
                          strokeWidth="1.5"
                          opacity="0.4"
                        />

                        {/* Cerebellum (smaller structure at bottom) */}
                        <ellipse cx="-10" cy="95" rx="80" ry="45"
                          fill="url(#cerebellum-light)"
                          stroke="#5362EF"
                          strokeWidth="2"
                          opacity="0.85"
                        />

                        {/* Cerebellum folds (very detailed) */}
                        <path d="M -70,85 L -65,105" stroke="#35F3E6" strokeWidth="1.5" opacity="0.6"/>
                        <path d="M -50,80 L -48,108" stroke="#5362EF" strokeWidth="1.5" opacity="0.5"/>
                        <path d="M -30,78 L -28,110" stroke="#35F3E6" strokeWidth="1.5" opacity="0.6"/>
                        <path d="M -10,75 L -8,112" stroke="#5362EF" strokeWidth="1.5" opacity="0.5"/>
                        <path d="M 10,78 L 12,110" stroke="#35F3E6" strokeWidth="1.5" opacity="0.6"/>
                        <path d="M 30,80 L 32,108" stroke="#5362EF" strokeWidth="1.5" opacity="0.5"/>
                        <path d="M 50,85 L 52,105" stroke="#35F3E6" strokeWidth="1.5" opacity="0.6"/>

                        {/* Brain Stem */}
                        <ellipse cx="5" cy="140" rx="18" ry="25"
                          fill="#5362EF"
                          opacity="0.6"
                          stroke="#35F3E6"
                          strokeWidth="1.5"
                        />

                        {/* Pulsing Neural Activity Points */}
                        <g className="neural-activity">
                          <circle cx="-60" cy="-40" r="3" fill="#35F3E6">
                            <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx="30" cy="-50" r="3" fill="#5362EF">
                            <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" begin="0.3s"/>
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.3s"/>
                          </circle>
                          <circle cx="-40" cy="20" r="3" fill="#35F3E6">
                            <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                          </circle>
                          <circle cx="50" cy="10" r="3" fill="#5362EF">
                            <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" begin="0.9s"/>
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.9s"/>
                          </circle>
                          <circle cx="-20" cy="90" r="2.5" fill="white">
                            <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin="0.4s"/>
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.4s"/>
                          </circle>
                          <circle cx="15" cy="95" r="2.5" fill="white">
                            <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" begin="0.7s"/>
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.7s"/>
                          </circle>
                        </g>

                        {/* Energy waves flowing through brain */}
                        <circle r="5" fill="#35F3E6" opacity="0.7">
                          <animateMotion dur="6s" repeatCount="indefinite"
                            path="M -100,-50 Q 0,-70 100,-30 Q 80,20 60,70 Q 0,90 -60,70 Q -80,30 -100,-50"/>
                          <animate attributeName="opacity" values="0;0.8;0" dur="6s" repeatCount="indefinite"/>
                        </circle>
                        <circle r="5" fill="#5362EF" opacity="0.7">
                          <animateMotion dur="8s" repeatCount="indefinite"
                            path="M 100,-30 Q 20,-60 -80,-40 Q -90,10 -70,60 Q 0,85 70,65 Q 100,20 100,-30"/>
                          <animate attributeName="opacity" values="0;0.8;0" dur="8s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                    </g>
                  </svg>

                  {/* Floating Data Cards */}
                  <div className="absolute top-[20%] right-[10%] bg-[#001a3d]/80 backdrop-blur-md border border-[#35F3E6]/20 p-4 rounded-xl shadow-xl w-48 animate-bounce" style={{ animationDuration: '4s' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-blue-200 uppercase tracking-wider">Alpha Waves</span>
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    </div>
                    <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-[#35F3E6] w-[70%]"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-[20%] left-[10%] bg-[#001a3d]/80 backdrop-blur-md border border-[#5362EF]/20 p-4 rounded-xl shadow-xl w-48 animate-bounce" style={{ animationDuration: '5s' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-blue-200 uppercase tracking-wider">Coherence</span>
                      <span className="text-[#35F3E6] text-xs font-bold">94%</span>
                    </div>
                    <div className="flex gap-1 h-3 items-end">
                      <div className="w-1 bg-[#5362EF] h-[40%] rounded-sm"></div>
                      <div className="w-1 bg-[#5362EF] h-[60%] rounded-sm"></div>
                      <div className="w-1 bg-[#5362EF] h-[90%] rounded-sm"></div>
                      <div className="w-1 bg-[#5362EF] h-[70%] rounded-sm"></div>
                      <div className="w-1 bg-[#5362EF] h-[50%] rounded-sm"></div>
                      <div className="w-1 bg-[#5362EF] h-[80%] rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 bg-[#001a3d] relative">
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#35F3E6]/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-16">
                <span className="text-[#35F3E6] font-semibold tracking-widest text-xs uppercase mb-2 block">Comprehensive Care</span>
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 brand-font">Clinical Services & Modalities</h2>
                <p className="text-blue-100/60 text-lg">
                  We combine state-of-the-art diagnostic technology with evidence-based therapeutic interventions to map, train, and optimize your brain&apos;s performance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service 1: Brain Gauge */}
                <div className="group relative bg-[#002554] rounded-2xl p-8 border border-white/5 hover:border-[#35F3E6]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-[#35F3E6]/10 flex items-center justify-center text-[#35F3E6] mb-6 group-hover:bg-[#35F3E6] group-hover:text-[#002554] transition-colors">
                    <span className="text-2xl">🖐️</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 brand-font">Brain Gauge Cortical Metrics</h3>
                  <p className="text-sm text-blue-200/60 leading-relaxed mb-6">
                    FDA-cleared fingertip test measuring brain health through sensory processing. Quick 15-minute assessment of reaction time, attention, cognitive speed, plasticity, and fatigue detection.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> Non-Invasive & Painless
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> Immediate Results
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> Track Progress Over Time
                    </li>
                  </ul>
                </div>

                {/* Service 2: QEEG Brain Mapping */}
                <div className="group relative bg-[#002554] rounded-2xl p-8 border border-white/5 hover:border-[#5362EF]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-[#5362EF]/10 flex items-center justify-center text-[#5362EF] mb-6 group-hover:bg-[#5362EF] group-hover:text-white transition-colors">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 brand-font">QEEG Brain Mapping</h3>
                  <p className="text-sm text-blue-200/60 leading-relaxed mb-6">
                    Comprehensive brain analysis measuring electrical activity to identify dysregulation patterns. Combined with Brain Gauge and PBM for complete brain assessment and treatment.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#5362EF]"></span> Identifies Treatment Targets
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#5362EF]"></span> Tracks Brain Changes
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#5362EF]"></span> Personalized Protocols
                    </li>
                  </ul>
                </div>

                {/* Service 3: Photobiomodulation */}
                <div className="group relative bg-[#002554] rounded-2xl p-8 border border-white/5 hover:border-[#35F3E6]/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-[#35F3E6]/10 flex items-center justify-center text-[#35F3E6] mb-6 group-hover:bg-[#35F3E6] group-hover:text-[#002554] transition-colors">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 brand-font">Medical-Grade Photobiomodulation</h3>
                  <p className="text-sm text-blue-200/60 leading-relaxed mb-6">
                    Safe, painless treatment using red and near-infrared light to stimulate cells, increase ATP energy production, and reduce inflammation. Brain entrainment keeps your brain in therapeutic frequency.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> 10-20 Minute Sessions
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> FDA-Cleared Technology
                    </li>
                    <li className="flex items-center gap-2 text-xs text-blue-100 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#35F3E6]"></span> No Downtime, No Medications
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* Methodology / Science Stats */}
          <section id="methodology" className="py-24 bg-[#002554] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-medium text-white mb-6 brand-font leading-tight">Advanced Brain Assessment <br /> Meets Light Therapy</h2>
                <p className="text-blue-100/70 mb-8">
                  We use Brain Gauge for objective cortical metrics and QEEG brain mapping to identify exact treatment targets. Our medical-grade PBM protocols are customized to your unique brain patterns for optimal healing.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-[#35F3E6]/10 p-2 rounded text-[#35F3E6] border border-[#35F3E6]/20">
                      <span className="text-xl">🖐️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Objective Brain Metrics</h4>
                      <p className="text-sm text-blue-200/50 mt-1">Brain Gauge provides real-time data on reaction time, attention, cognitive speed, plasticity, and fatigue - guiding treatment decisions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-[#5362EF]/10 p-2 rounded text-[#5362EF] border border-[#5362EF]/20">
                      <span className="text-xl">💡</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">Scientifically Backed Treatment</h4>
                      <p className="text-sm text-blue-200/50 mt-1">FDA-cleared medical-grade PBM increases cellular ATP, reduces neuroinflammation, and promotes neuroplasticity for lasting brain health.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#001a3d] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-[#35F3E6] brand-font mb-2">94%</span>
                  <span className="text-xs text-blue-200/60 uppercase tracking-wider">Symptom Reduction</span>
                </div>
                <div className="bg-[#001a3d] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold text-[#5362EF] brand-font mb-2">3k+</span>
                  <span className="text-xs text-blue-200/60 uppercase tracking-wider">Brain Maps Analyzed</span>
                </div>
                <div className="bg-[#001a3d] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center col-span-2">
                  <span className="text-4xl font-bold text-white brand-font mb-2">15k+</span>
                  <span className="text-xs text-blue-200/60 uppercase tracking-wider">Neurofeedback Sessions Completed</span>
                </div>
              </div>
            </div>
          </section>

          {/* PBM Treatment Details */}
          <section id="technology" className="py-24 bg-[#001a3d] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#5362EF]/10 border border-[#5362EF]/30 text-[#5362EF] text-[10px] uppercase font-bold tracking-widest mb-6">
                    Medical-Grade Technology
                  </div>
                  <h2 className="text-5xl font-medium text-white mb-6 brand-font">Professional PBM Devices</h2>
                  <p className="text-blue-100/70 text-lg mb-8">
                    Our clinical-grade photobiomodulation equipment delivers precise wavelengths of red and near-infrared light, customized to your brain&apos;s specific needs based on QEEG mapping results.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3">
                      <span className="text-[#35F3E6] text-xl">✓</span>
                      <span className="text-blue-100 text-sm">Supervised by trained professionals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#35F3E6] text-xl">✓</span>
                      <span className="text-blue-100 text-sm">Protocols customized to your brain map</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#35F3E6] text-xl">✓</span>
                      <span className="text-blue-100 text-sm">Done multiple times per week for best results</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#35F3E6] text-xl">✓</span>
                      <span className="text-blue-100 text-sm">Scientifically backed with clinic supervision</span>
                    </div>
                  </div>

                  <a href="#contact" className="inline-flex items-center gap-2 text-[#35F3E6] font-semibold border-b border-[#35F3E6]/30 pb-1 hover:border-[#35F3E6] transition-all">
                    Schedule Your Assessment <span>→</span>
                  </a>
                </div>

                <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-[#5362EF] blur-[100px] opacity-20"></div>
                  {/* Treatment Benefits Visualization */}
                  <div className="relative z-10 space-y-4">
                    <div className="bg-gradient-to-b from-[#002554] to-[#001a3d] border border-[#35F3E6]/20 rounded-2xl p-6">
                      <h4 className="text-white font-medium mb-4 brand-font text-xl">Conditions We Treat</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm text-blue-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>ADHD & Focus</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Memory Loss</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>TBI/Concussion</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Brain Fog</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Anxiety</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Depression</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Chronic Pain</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[#35F3E6] rounded-full"></span>
                          <span>Inflammation</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-b from-[#002554] to-[#001a3d] border border-[#5362EF]/20 rounded-2xl p-6">
                      <h4 className="text-white font-medium mb-4 brand-font text-xl">What to Expect</h4>
                      <ul className="space-y-3 text-sm text-blue-100">
                        <li className="flex items-start gap-2">
                          <span className="text-[#5362EF] mt-1">•</span>
                          <span>Relaxing, painless sessions (warm sensation)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#5362EF] mt-1">•</span>
                          <span>10-20 minutes per treatment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#5362EF] mt-1">•</span>
                          <span>No downtime or side effects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#5362EF] mt-1">•</span>
                          <span>Brain entrainment for lasting benefits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Contact */}
          <section id="location" className="py-24 bg-[#002554]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-medium tracking-tight text-white mb-4 brand-font">Visit Our Clinic</h2>
                <p className="text-blue-200/60">Located in Choctaw, Oklahoma – Easy to find, convenient to reach.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Map */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(53,243,230,0.1)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.8889!2d-97.2353!3d35.5001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b21e8c8c8c8c8d%3A0x1234567890abcdef!2s15805%20NE%2023rd%20St%2C%20Choctaw%2C%20OK%2073020!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  {/* Address Card */}
                  <div className="bg-gradient-to-br from-[#001a3d] to-[#002554] rounded-2xl p-8 border border-white/10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#35F3E6]/10 flex items-center justify-center text-[#35F3E6] text-2xl flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white brand-font mb-2">Our Location</h3>
                        <p className="text-blue-100/80 leading-relaxed">
                          Brain Thrive, PLLC<br />
                          at Quick Access Neurology<br />
                          15805 NE 23rd St.<br />
                          Choctaw, OK 73020
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=15805+NE+23rd+St,+Choctaw,+OK+73020"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#35F3E6] hover:text-white transition-colors text-sm font-semibold"
                    >
                      Get Directions <span>→</span>
                    </a>
                  </div>

                  {/* Phone Card */}
                  <div className="bg-gradient-to-br from-[#001a3d] to-[#002554] rounded-2xl p-8 border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#5362EF]/10 flex items-center justify-center text-[#5362EF] text-2xl flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white brand-font mb-2">Call Us</h3>
                        <a
                          href="tel:+14053900596"
                          className="text-2xl text-blue-100/90 hover:text-[#35F3E6] transition-colors font-medium"
                        >
                          (405) 390-0596
                        </a>
                        <p className="text-sm text-blue-200/50 mt-2">
                          Monday - Friday: 9:00 AM - 5:00 PM<br />
                          Saturday: By Appointment<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="bg-gradient-to-br from-[#001a3d] to-[#002554] rounded-2xl p-8 border border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#35F3E6]/10 flex items-center justify-center text-[#35F3E6] text-2xl flex-shrink-0">
                        ✉️
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white brand-font mb-2">Email Us</h3>
                        <a
                          href="mailto:info@brainthrive.com"
                          className="text-lg text-blue-100/90 hover:text-[#35F3E6] transition-colors"
                        >
                          info@brainthrive.com
                        </a>
                        <p className="text-sm text-blue-200/50 mt-2">
                          We typically respond within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a
                      href="#contact"
                      className="block w-full py-4 rounded-lg bg-gradient-to-r from-[#5362EF] to-[#434fc2] text-white text-center font-semibold transition-all shadow-[0_0_30px_rgba(83,98,239,0.3)] hover:shadow-[0_0_40px_rgba(83,98,239,0.5)] hover:scale-[1.02]"
                    >
                      Schedule Your Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/5 bg-[#001a3d] pt-16 pb-8" id="contact">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <a href="#" className="flex items-center gap-2 mb-6 group">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#35F3E6] to-[#5362EF]"></div>
                  <span className="text-xl font-bold text-white brand-font tracking-wide">BRAIN THRIVE</span>
                </a>
                <p className="text-xs text-blue-200/50 leading-relaxed mb-6">
                  Prioritizing brain health through the convergence of neuroscience, technology, and compassionate care.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#35F3E6] hover:text-[#002554] transition-all text-blue-200/50">
                    <span>𝕏</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#35F3E6] hover:text-[#002554] transition-all text-blue-200/50">
                    <span>in</span>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#35F3E6] hover:text-[#002554] transition-all text-blue-200/50">
                    <span>📷</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-6 brand-font tracking-wider">Services</h4>
                <ul className="space-y-3 text-xs text-blue-200/60">
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">QEEG Brain Mapping</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Neurofeedback</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Photobiomodulation</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Metabolic Analysis</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Remote Training</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-6 brand-font tracking-wider">Patient Resources</h4>
                <ul className="space-y-3 text-xs text-blue-200/60">
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">New Patient Portal</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Insurance Information</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">Clinical Studies</a></li>
                  <li><a href="#" className="hover:text-[#35F3E6] transition-colors">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-6 brand-font tracking-wider">Contact</h4>
                <ul className="space-y-4 text-xs text-blue-200/60">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5362EF]">📍</span>
                    <span>Brain Thrive, PLLC<br />at Quick Access Neurology<br />15805 NE 23rd St.<br />Choctaw, OK 73020</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#5362EF]">📞</span>
                    <span>(405) 390-0596</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#5362EF]">✉️</span>
                    <span>info@brainthrive.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-blue-200/40">© 2024 Brain Thrive Wellness Inc. All rights reserved.</p>
              <div className="flex gap-6 text-[10px] text-blue-200/40">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">HIPAA Notice</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </PageTransition>
  );
}
