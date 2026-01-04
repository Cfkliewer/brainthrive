"use client"
import { useState } from "react";
import Link from "next/link";
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
                <img
                  src="/BrainThrive_Icon_White.png"
                  alt="Brain Thrive Logo"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(53,243,230,0.5)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl tracking-wide brand-font text-white leading-none">BRAIN THRIVE</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#35F3E6]">WELLNESS</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-200/70">
              <a href="#services" className="hover:text-white transition-colors duration-200">Services</a>
              <Link href="/services" className="hover:text-white transition-colors duration-200">Treatments</Link>
              <a href="#methodology" className="hover:text-white transition-colors duration-200">Methodology</a>
              <a href="#location" className="hover:text-white transition-colors duration-200">Location</a>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#contact" className="bg-white text-[#002554] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#35F3E6] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Contact Us
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
                <Link href="/services" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Treatments</Link>
                <a href="#methodology" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Methodology</a>
                <a href="#location" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Location</a>
                <a href="tel:4053900596" className="block bg-[#5362EF] text-white px-4 py-3 rounded-lg text-center font-semibold mt-4">Call (405) 390-0596</a>
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
                  <Link href="/services" className="h-12 px-8 rounded-lg border border-[#223BA8] hover:bg-[#001a3d] text-blue-100 text-sm font-semibold transition-all flex items-center justify-center gap-2">
                    See the Treatments
                    <span className="text-xl">→</span>
                  </Link>
                </div>

              </div>

              {/* Hero Logo Visualization - Hidden on mobile */}
              <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Main Logo with Glow Effects */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Outer glow ring */}
                    <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#35F3E6]/20 via-[#5362EF]/20 to-[#35F3E6]/20 blur-[60px] animate-pulse"></div>

                    {/* Rotating rings */}
                    <div className="absolute w-[420px] h-[420px] rounded-full border border-[#35F3E6]/30 animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute w-[380px] h-[380px] rounded-full border border-[#5362EF]/20 animate-[spin_15s_linear_infinite_reverse]"></div>

                    {/* Staggered Logo Stack */}
                    {/* Full Color Logo - Back layer (offset) */}
                    <img
                      src="/BrainThrive_Icon_FullColor.png"
                      alt=""
                      className="absolute w-[240px] h-[240px] object-contain opacity-60 animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(53,243,230,0.3)]"
                      style={{ animationDelay: '0s', transform: 'translate(-80px, -80px)' }}
                    />

                    {/* Full Color Logo - Front layer (center) */}
                    <img
                      src="/BrainThrive_Icon_FullColor.png"
                      alt="Brain Thrive"
                      className="relative z-10 w-[280px] h-[280px] object-contain drop-shadow-[0_0_40px_rgba(53,243,230,0.4)] animate-[float_6s_ease-in-out_infinite]"
                      style={{ animationDelay: '1s' }}
                    />
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
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-medium text-white mb-6 brand-font leading-tight">Advanced Brain Assessment <br /> Meets Light Therapy</h2>
              <p className="text-blue-100/70 mb-12">
                We use Brain Gauge for objective cortical metrics and QEEG brain mapping to identify exact treatment targets. Our medical-grade PBM protocols are customized to your unique brain patterns for optimal healing.
              </p>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-6">
                  <div className="mt-1 bg-[#35F3E6]/10 p-2 rounded text-[#35F3E6] border border-[#35F3E6]/20">
                    <span className="text-xl">🖐️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Objective Brain Metrics</h4>
                    <p className="text-sm text-blue-200/50 mt-1">Brain Gauge provides real-time data on reaction time, attention, cognitive speed, plasticity, and fatigue - guiding treatment decisions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 rounded-xl p-6">
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

                  <a href="/services" className="inline-flex items-center gap-2 text-[#35F3E6] font-semibold border-b border-[#35F3E6]/30 pb-1 hover:border-[#35F3E6] transition-all">
                    See Treatments <span>→</span>
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
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3244.8889!2d-97.2353!3d35.5001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b21e8c8c8c8c8d%3A0x1234567890abcdef!2s15805%20NE%2023rd%20St%2C%20Choctaw%2C%20OK%2073020!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full absolute inset-0"
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
                      Call (405) 390-0596
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/5 bg-[#001a3d] pt-16 pb-8" id="contact">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 mb-12">
              <div className="md:max-w-sm">
                <a href="#" className="flex items-center gap-2 mb-6 group">
                  <img src="/BrainThrive_Icon_White.png" alt="Brain Thrive Logo" className="w-8 h-8 object-contain" />
                  <span className="text-xl font-bold text-white brand-font tracking-wide">BRAIN THRIVE</span>
                </a>
                <p className="text-xs text-blue-200/50 leading-relaxed">
                  Prioritizing brain health through the convergence of neuroscience, technology, and compassionate care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
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
