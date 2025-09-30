"use client"
import { useState, useEffect, useRef } from "react";
import { useHeroEntrance, useScrollReveal, useStaggerAnimation, useHoverLift, initMedicalAnimations } from "@/lib/animations";
import PageTransition from "@/components/PageTransition";
import BrainGaugeMetrics from "@/components/BrainGaugeMetrics";
import ConditionSpecificServices from "@/components/ConditionSpecificServices";

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const heroRef = useHeroEntrance({
    duration: 1.0,
    stagger: 0.15
  });
  const servicesRef = useScrollReveal(".service-card");
  const aboutStatsRef = useStaggerAnimation("scaleIn", {
    duration: 0.8,
    stagger: 0.2
  });
  const faqRef = useScrollReveal(".faq-item", {
    start: "top 85%",
    stagger: 0.1
  });

  // Hover effects for interactive elements
  const heroCtaRef1 = useHoverLift<HTMLAnchorElement>();
  const heroCtaRef2 = useHoverLift<HTMLAnchorElement>();
  const emergencyBtnRef = useHoverLift<HTMLAnchorElement>();
  
  // Initialize medical animations and scroll animation
  useEffect(() => {
    // Initialize GSAP medical animations
    initMedicalAnimations();

    // Add CSS for smooth infinite scroll animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes infiniteScroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${services.length * 304}px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const services = [
    {
      icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
      title: "ADHD & Focus Support",
      description: "Enhanced brain balance for attention, focus, and emotional regulation"
    },
    {
      icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
      title: "Concussion & TBI Recovery",
      description: "Accelerated healing and restoration of brain function after injury"
    },
    {
      icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
      title: "Memory Loss & Brain Fog",
      description: "Restore cognitive clarity and protect against age-related decline"
    },
    {
      icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
      title: "Anxiety & Depression",
      description: "Balanced brain chemistry for improved mental wellness"
    },
    {
      icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
      title: "Chronic Pain",
      description: "Reduced inflammation and natural pain relief through light therapy"
    },
    {
      icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
      title: "Inflammation & Fatigue",
      description: "Combat inflammation and boost cellular energy levels"
    }
  ];

  useEffect(() => {
    // No longer needed - using CSS animation instead
  }, []);
  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Skip Navigation Link */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>
      <header className="bg-white backdrop-blur-sm text-medical-primary flex flex-row justify-between items-center py-4 md:py-6 px-4 md:px-8 shadow-lg border-b border-medical-gray-200 sticky top-0 z-50" role="banner">
          <div className="text-xl md:text-2xl font-bold text-medical-primary tracking-tight">BrainThrive</div>
          <nav className="hidden md:flex gap-2 font-medium" role="navigation" aria-label="Main navigation">
            <a href="services" className="px-4 lg:px-6 py-2 hover:text-brand-blue-600 text-medical-gray-600 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus font-medium" aria-label="View our services">Services</a>
            <a href="about" className="px-4 lg:px-6 py-2 hover:text-brand-blue-600 text-medical-gray-600 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus font-medium" aria-label="Learn about us">About</a>
            <a href="testimonials" className="px-4 lg:px-6 py-2 hover:text-brand-blue-600 text-medical-gray-600 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus font-medium" aria-label="Read testimonials">Testimonials</a>
            <a href="contact" className="bg-brand-blue-600 text-white px-4 lg:px-6 py-2.5 rounded-lg hover:bg-brand-blue-700 transition-all duration-200 medical-button medical-focus font-semibold shadow-lg" aria-label="Book a consultation appointment">Book Consultation</a>
          </nav>
          {/* Emergency Contact */}
          <div className="hidden lg:block">
            <a ref={emergencyBtnRef} href="tel:911" className="emergency-contact px-4 py-2 rounded-lg font-semibold text-sm" aria-label="Emergency contact - Call 911">
              🚨 Emergency: Call 911
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-medical-gray-50 transition-colors medical-focus"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6 text-medical-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-t border-medical-gray-200 shadow-lg md:hidden z-40">
              <div className="px-4 py-6 space-y-4">
                <a href="services" className="block px-4 py-3 text-medical-gray-600 hover:text-brand-blue hover:bg-medical-gray-50 rounded-lg transition-all duration-200 medical-focus" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="about" className="block px-4 py-3 text-medical-gray-600 hover:text-brand-blue hover:bg-medical-gray-50 rounded-lg transition-all duration-200 medical-focus" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="testimonials" className="block px-4 py-3 text-medical-gray-600 hover:text-brand-blue hover:bg-medical-gray-50 rounded-lg transition-all duration-200 medical-focus" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                <div className="pt-4 border-t border-medical-gray-200">
                  <a href="tel:911" className="block emergency-contact px-4 py-3 rounded-lg font-semibold text-center mb-3" onClick={() => setMobileMenuOpen(false)}>🚨 Emergency: Call 911</a>
                  <a href="contact" className="block bg-brand-blue text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-brand-indigo transition-all duration-200" onClick={() => setMobileMenuOpen(false)}>Book Consultation</a>
                </div>
              </div>
            </div>
          )}
      </header>

      <main id="main-content" role="main">
        <section ref={heroRef} className="min-h-[100vh] relative overflow-hidden flex items-center" aria-label="Hero section">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80"
              alt="Advanced neurological scanning technology and photobiomodulation therapy equipment in a modern medical facility"
              className="w-full h-full object-cover"
            />
            {/* Enhanced dark overlay for maximum contrast */}
            <div className="hero-overlay absolute inset-0 bg-gradient-to-r from-black/90 via-medical-gray-900/90 to-medical-secondary/90"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl mx-auto text-center lg:text-left">
              <div className="space-y-6 lg:space-y-8">
                <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  Advanced Neurology &
                  <span className="text-brand-blue-400 block">Photobiomodulation</span>
                  <span className="text-medical-gray-300 text-3xl sm:text-4xl lg:text-5xl font-medium block mt-2">Therapy Center</span>
                </h1>
                <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-medical-gray-200 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
                  Experience cutting-edge brain health solutions with FDA-cleared light therapy technology and comprehensive neurological assessment
                </p>
                {/* Trust indicators */}
                <div className="hero-trust flex flex-wrap gap-4 text-sm sm:text-base text-medical-gray-300 font-medium">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    FDA-Cleared Technology
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Board-Certified Specialists
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Advanced Brain Mapping
                  </span>
                </div>
              </div>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                <a ref={heroCtaRef1} href="#contact" className="bg-brand-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-brand-blue-700 transition-all duration-200 medical-button shadow-xl text-base sm:text-lg medical-focus" aria-label="Schedule a consultation appointment - Step 1 of your healing journey">
                  📅 Schedule Free Consultation
                </a>
                <a ref={heroCtaRef2} href="#services" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-200 medical-button text-base sm:text-lg medical-focus" aria-label="Learn more about our evidence-based treatments">
                  🧬 Learn About Treatments
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Services Overview Section */}
        <section ref={servicesRef} id="services" className="py-16 sm:py-20 lg:py-24 bg-white" aria-label="Our medical services">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6 tracking-tight">Our Advanced Services</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed mb-6">Evidence-based brain health treatments with FDA-cleared technology</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <span className="bg-brand-green-100 text-brand-green-800 px-3 py-1 rounded-full border border-brand-green-200">Objective Brain Assessment</span>
                <span className="bg-brand-blue-100 text-brand-blue-800 px-3 py-1 rounded-full border border-brand-blue-200">Medical-Grade Light Therapy</span>
                <span className="bg-brand-purple-100 text-brand-purple-800 px-3 py-1 rounded-full border border-brand-purple-200">Personalized Protocols</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Enhanced Photobiomodulation Service */}
              <div className="service-card medical-card bg-gradient-to-br from-brand-blue-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-blue-200 hover:border-brand-blue-400 transition-all duration-300 group hover:shadow-xl">
                {/* FDA Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-green-100 text-brand-green-800 text-xs font-semibold px-2 py-1 rounded-full border border-brand-green-200">FDA Cleared</span>
                  <span className="bg-brand-blue-50 text-brand-blue-700 text-xs font-medium px-2 py-1 rounded-full">20-30 min sessions</span>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-blue-700 transition-all duration-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-medical-primary">Medical-Grade Photobiomodulation</h3>
                </div>

                {/* Enhanced Benefits with Clinical Data */}
                <div className="space-y-3 mb-6">
                  <p className="text-medical-gray-600 leading-relaxed text-sm">Red and near-infrared light therapy that:</p>
                  <ul className="text-sm text-medical-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Increases cellular energy (ATP) production
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Reduces neuroinflammation and brain fog
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Promotes brain entrainment and healing
                    </li>
                  </ul>
                </div>

                {/* Enhanced Credibility */}
                <div className="bg-brand-blue-50 p-3 rounded-lg border border-brand-blue-200 mb-6">
                  <p className="text-xs text-brand-blue-800 font-medium">✓ Professional-grade devices • ✓ Backed by qEEG mapping • ✓ 3,000+ published studies</p>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <a href="#contact" className="w-full bg-brand-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition-all duration-200 medical-button shadow-lg text-center block medical-focus" aria-label="Schedule assessment for photobiomodulation therapy">
                    Schedule Free Assessment
                  </a>
                  <a href="#condition-treatments" className="w-full bg-transparent border-2 border-brand-blue-600 text-brand-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-brand-blue-50 transition-all duration-200 text-center block medical-focus" aria-label="View condition-specific treatments">
                    View Treatments
                  </a>
                </div>
              </div>

              {/* Enhanced Brain Gauge Service */}
              <div className="service-card medical-card bg-gradient-to-br from-brand-purple-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-purple-200 hover:border-brand-purple-400 transition-all duration-300 group hover:shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-purple-100 text-brand-purple-800 text-xs font-semibold px-2 py-1 rounded-full border border-brand-purple-200">Clinically Validated</span>
                  <span className="bg-brand-purple-50 text-brand-purple-700 text-xs font-medium px-2 py-1 rounded-full">15 min assessment</span>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-purple-700 transition-all duration-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-medical-primary">Brain Gauge Cortical Metrics</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-medical-gray-600 leading-relaxed text-sm">Objective measurement of 5 key brain functions:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-medical-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Reaction Time</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Attention</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Cognitive Speed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Plasticity</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span>Fatigue Detection</span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-purple-50 p-3 rounded-lg border border-brand-purple-100 mb-6">
                  <p className="text-xs text-brand-purple-800 font-medium">✓ Fingertip vibration testing • ✓ Real-time results • ✓ Progress tracking</p>
                </div>

                <div className="space-y-3">
                  <a href="#contact" className="w-full bg-brand-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-purple-700 transition-all duration-200 medical-button shadow-lg text-center block medical-focus" aria-label="Schedule brain performance assessment">
                    Book Assessment
                  </a>
                  <a href="#brain-gauge-metrics" className="w-full bg-transparent border-2 border-brand-purple-600 text-brand-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-brand-purple-50 transition-all duration-200 text-center block medical-focus" aria-label="Learn about Brain Gauge metrics">
                    View Metrics
                  </a>
                </div>
              </div>

              {/* Enhanced qEEG Service */}
              <div className="service-card medical-card bg-gradient-to-br from-brand-teal-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-teal-200 hover:border-brand-teal-400 transition-all duration-300 group hover:shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-brand-teal-100 text-brand-teal-800 text-xs font-semibold px-2 py-1 rounded-full border border-brand-teal-200">Medical Grade</span>
                  <span className="bg-brand-teal-50 text-brand-teal-700 text-xs font-medium px-2 py-1 rounded-full">45-60 min mapping</span>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-teal-700 transition-all duration-300 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-medical-primary">Quantitative EEG Brain Mapping</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-medical-gray-600 leading-relaxed text-sm">Comprehensive brain analysis to identify:</p>
                  <ul className="text-sm text-medical-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Areas of brain dysfunction
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Optimal treatment targets
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-brand-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Personalized therapy protocols
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-teal-50 p-3 rounded-lg border border-brand-teal-100 mb-6">
                  <p className="text-xs text-brand-teal-800 font-medium">✓ Board-certified interpretation • ✓ Detailed brain maps • ✓ Treatment guidance</p>
                </div>

                <div className="space-y-3">
                  <a href="#contact" className="w-full bg-brand-teal-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-teal-700 transition-all duration-200 medical-button shadow-lg text-center block medical-focus" aria-label="Schedule brain mapping consultation">
                    Schedule Mapping
                  </a>
                  <a href="#services" className="w-full bg-transparent border-2 border-brand-teal-600 text-brand-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-brand-teal-50 transition-all duration-200 text-center block medical-focus" aria-label="Learn more about quantitative EEG">
                    How It Works
                  </a>
                </div>
              </div>
            </div>

            {/* Enhanced Package Information */}
            <div className="max-w-4xl mx-auto mt-16 lg:mt-20">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-medical-primary mb-4">Integrated Assessment & Treatment</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-6">Our comprehensive approach combines objective brain assessment with targeted therapy for optimal results. Each protocol is customized based on your unique brain data.</p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-medical-primary mb-2">Assessment Phase</h4>
                      <p className="text-sm text-medical-gray-600">Brain Gauge + qEEG comprehensive evaluation</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-medical-primary mb-2">Treatment Phase</h4>
                      <p className="text-sm text-medical-gray-600">Personalized PBM therapy protocols</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-teal-200">
                      <h4 className="font-semibold text-medical-primary mb-2">Monitoring Phase</h4>
                      <p className="text-sm text-medical-gray-600">Regular progress assessments and adjustments</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" className="bg-brand-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition-all duration-200 medical-button shadow-lg medical-focus" aria-label="Schedule free consultation for treatment packages">
                      Get Free Consultation
                    </a>
                    <a href="tel:+1-405-390-0596" className="bg-transparent border-2 border-brand-blue-600 text-brand-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-50 transition-all duration-200 medical-focus" aria-label="Call to discuss treatment options">
                      Call (405) 390-0596
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Import the new components */}
        <BrainGaugeMetrics />
        
        <ConditionSpecificServices />

        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-medical-primary/5 via-blue-50 to-white relative overflow-hidden" aria-label="About BrainThrive">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-gray-900 mb-4 lg:mb-6 tracking-tight">About BrainThrive</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed font-light">Pioneering brain health through advanced light therapy and neurological assessment</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-medical-gray-900 mb-3 sm:mb-4">Our Mission</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-4">At BrainThrive, we&apos;re dedicated to revolutionizing brain health through cutting-edge photobiomodulation therapy and advanced neurological assessments. Our mission is to provide accessible, non-invasive solutions for cognitive enhancement and neurological recovery.</p>
                  <p className="text-medical-gray-600 leading-relaxed">We combine the latest in light therapy technology with comprehensive brain mapping to deliver personalized treatment plans that address each client&apos;s unique needs.</p>
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-medical-gray-900 mb-3 sm:mb-4">Expert Care</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-6 lg:mb-8">Our team of certified specialists brings together expertise in neuroscience, photobiomodulation therapy, and cognitive health. With years of experience and continuous training in the latest advancements, we ensure the highest standard of care for our clients.</p>
                </div>
                <div ref={aboutStatsRef} className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-medical border border-orange-100 hover:border-orange-200 transition-all duration-300">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">500+</div>
                    <div className="text-xs sm:text-sm text-gray-700 font-medium">Successful Treatments</div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-medical border border-green-100 hover:border-green-200 transition-all duration-300">
                    <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">98%</div>
                    <div className="text-xs sm:text-sm text-gray-700 font-medium">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Credentials and Compliance Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-medical-gray-200" aria-label="Medical credentials and compliance">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6 tracking-tight">Medical Excellence & Compliance</h2>
                <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed">Your safety and privacy are our highest priorities</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                {/* Professional Credentials */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-brand-blue to-brand-indigo rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white" role="img" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443a55.381 55.381 0 0 1 5.25 2.882V15m-9 0h9m0 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-medical-primary mb-3">Board Certified</h3>
                  <p className="text-medical-gray-600 leading-relaxed">Our practitioners are board-certified in neurology and photobiomodulation therapy</p>
                </div>

                {/* HIPAA Compliance */}
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-medical-success to-emerald-600 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white" role="img" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-medical-primary mb-3">HIPAA Compliant</h3>
                  <p className="text-medical-gray-600 leading-relaxed">Full compliance with healthcare privacy regulations and secure patient data handling</p>
                </div>

                {/* FDA Cleared */}
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-brand-purple to-purple-600 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white" role="img" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-4.875a2.25 2.25 0 0 0-.96-.586 48.114 48.114 0 0 0-3.478-.397m.01 0L12 2.25l.01.01m-.01-.01L9.75 3.375m8.25 0v7.5c0 .414-.336.75-.75.75h-2.25a.75.75 0 0 1-.75-.75v-1.5c0-.414.336-.75.75-.75h2.25a.75.75 0 0 0 .75-.75V8.25m0 0V7.5a.75.75 0 0 0-.75-.75H15a.75.75 0 0 0-.75.75v.75m8.25 0V9a2.25 2.25 0 0 1-2.25 2.25h-1.5c-.621 0-1.125-.504-1.125-1.125V9.75m2.25 0V8.25H18a2.25 2.25 0 0 1 2.25 2.25V9Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-medical-primary mb-3">FDA Cleared</h3>
                  <p className="text-medical-gray-600 leading-relaxed">All equipment and treatment protocols are FDA-cleared for medical use</p>
                </div>
              </div>

              {/* Compliance Statement */}
              <div className="bg-gradient-to-r from-medical-gray-50 to-blue-50 rounded-xl p-8 border border-medical-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                  <h3 className="text-2xl font-semibold text-medical-primary mb-4">Privacy &amp; Compliance Statement</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-4">
                    BrainThrive is fully committed to protecting your health information and maintaining the highest standards of medical practice.
                    We comply with all HIPAA regulations, maintain secure patient records, and follow evidence-based treatment protocols.
                  </p>
                  <p className="text-sm text-medical-gray-500">
                    <strong>Emergency Contact:</strong> If you are experiencing a medical emergency, please call 911 immediately.
                    For urgent but non-emergency concerns, contact your primary healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-medical-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6 tracking-tight">What Can Our Services Do For You?</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed">Discover how our treatments can help improve your quality of life</p>
            </div>

            {/* Horizontal scrolling container with updated descriptions */}
            <div className="w-full overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex gap-4"
                style={{
                  width: `${services.length * 2 * 304}px`,
                  animation: 'infiniteScroll 40s linear infinite'
                }}
              >
                {/* Render cards twice for seamless infinite scroll */}
                {[...services, ...services].map((service, index) => {
                  // Apply styleguide colors based on condition type
                  const getConditionTheme = (title: string) => {
                    if (title.includes('ADHD') || title.includes('Focus') || title.includes('Concussion') || title.includes('TBI')) {
                      return {
                        border: 'border-brand-blue-600',
                        icon: 'bg-brand-blue-600',
                        gradientFrom: 'from-brand-blue-50',
                        gradientTo: 'to-brand-blue-100'
                      };
                    } else if (title.includes('Memory') || title.includes('Brain') || title.includes('Anxiety') || title.includes('Depression')) {
                      return {
                        border: 'border-brand-purple-600',
                        icon: 'bg-brand-purple-600',
                        gradientFrom: 'from-brand-purple-50',
                        gradientTo: 'to-brand-purple-100'
                      };
                    } else {
                      return {
                        border: 'border-brand-teal-600',
                        icon: 'bg-brand-teal-600',
                        gradientFrom: 'from-brand-teal-50',
                        gradientTo: 'to-brand-teal-100'
                      };
                    }
                  };

                  const theme = getConditionTheme(service.title);

                  return (
                    <div
                      key={`card-${index}`}
                      className={`flex-shrink-0 w-72 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} rounded-xl p-6 sm:p-8 medical-card border-2 ${theme.border} transition-all duration-300 hover:shadow-xl`}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${theme.icon} flex items-center justify-center mb-4 sm:mb-6 shadow-lg hover:scale-110 transition-all duration-300`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-medical-primary">{service.title}</h3>
                        <p className="text-sm sm:text-base text-medical-gray-600 leading-relaxed flex-grow">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-100 via-medical-primary/10 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-gray-900 mb-4 lg:mb-6 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 font-light">Get answers to common questions about our treatments</p>
            </div>
            <div ref={faqRef} className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
              {[
                {
                  question: "What is Photobiomodulation Therapy?",
                  answer: "Photobiomodulation therapy uses FDA-cleared, specific wavelengths of light (typically 810-1070nm) to stimulate cellular mitochondria and promote natural healing. This non-invasive treatment has shown clinical efficacy for neurological conditions including cognitive enhancement, depression, anxiety, ADHD, and traumatic brain injury. Research demonstrates improved cellular energy production, reduced inflammation, and enhanced neural connectivity.",
                  category: "treatment",
                  icon: "⚡",
                  trustBadge: "Research-Backed"
                },
                {
                  question: "How long does each session take?",
                  answer: "Treatment sessions typically last 20-30 minutes for optimal therapeutic benefit. For cognitive enhancement, sessions are usually 20 minutes, while neurological conditions may require 25-30 minutes. Your personalized protocol will be determined during your comprehensive initial consultation based on your specific condition, medical history, and treatment goals.",
                  category: "treatment",
                  icon: "⏱️",
                  trustBadge: "Personalized"
                },
                {
                  question: "Is the treatment safe?",
                  answer: "Yes, photobiomodulation is FDA-cleared (Class II Medical Device) and extensively researched with over 3,000 published studies. It's non-invasive, painless, and drug-free. Mild side effects may include temporary headache or fatigue in sensitive individuals. All treatments are supervised by licensed healthcare professionals trained in photobiomodulation protocols.",
                  category: "safety",
                  icon: "🛡️",
                  trustBadge: "FDA-Cleared"
                },
                {
                  question: "How many sessions will I need?",
                  answer: "Treatment protocols vary by condition: Cognitive enhancement typically shows results in 6-10 sessions, depression/anxiety in 8-15 sessions, and ADHD in 12-20 sessions. Many patients notice improvements within the first 3-5 sessions. Maintenance sessions (1-2 monthly) help sustain benefits. Your exact protocol will be customized during consultation.",
                  category: "treatment",
                  icon: "📈",
                  trustBadge: "Evidence-Based"
                },
                {
                  question: "Do you accept insurance? What are the costs?",
                  answer: "We accept HSA/FSA accounts and provide detailed receipts for insurance reimbursement. While coverage varies by provider, many insurance plans cover neurofeedback and photobiomodulation when medically necessary. We offer flexible payment plans and package discounts. Initial consultation fees and treatment costs will be discussed transparently before beginning care.",
                  category: "practical",
                  icon: "💳",
                  trustBadge: "Transparent Pricing"
                },
                {
                  question: "What should I expect during my first visit?",
                  answer: "Your initial consultation includes a comprehensive medical history review, neurological assessment, and discussion of treatment goals. We'll explain the photobiomodulation process, demonstrate the equipment, and answer all questions. If appropriate, we may begin with a trial session. The entire visit typically takes 60-90 minutes, ensuring you feel completely informed and comfortable.",
                  category: "practical",
                  icon: "🏥",
                  trustBadge: "Comprehensive Care"
                },
                {
                  question: "Are there any medical conditions that prevent treatment?",
                  answer: "Few contraindications exist for photobiomodulation. We carefully screen for pregnancy, active cancer in the treatment area, photosensitive medications, and certain neurological conditions. During your consultation, we'll review your complete medical history, current medications, and any concerns to ensure treatment safety and appropriateness.",
                  category: "safety",
                  icon: "⚕️",
                  trustBadge: "Medical Screening"
                },
                {
                  question: "What are your practitioners' qualifications?",
                  answer: "Our team includes licensed healthcare professionals with specialized training in photobiomodulation therapy. Our practitioners hold relevant medical licenses, have completed manufacturer certification programs, and participate in ongoing continuing education. We maintain the highest standards of care with board-certified oversight and evidence-based protocols.",
                  category: "credentials",
                  icon: "🎓",
                  trustBadge: "Licensed Professionals"
                }
              ].map((faq, index) => {
                const categoryThemes: Record<string, {gradient: string; iconColor: string; badgeColor: string}> = {
                  safety: {
                    gradient: 'from-brand-green-50 via-white to-brand-green-100 border-brand-green-200',
                    iconColor: 'text-brand-green-600',
                    badgeColor: 'bg-brand-green-100 text-brand-green-800 border-brand-green-200'
                  },
                  treatment: {
                    gradient: 'from-brand-blue-50 via-white to-brand-blue-100 border-brand-blue-200',
                    iconColor: 'text-brand-blue-600',
                    badgeColor: 'bg-brand-blue-100 text-brand-blue-800 border-brand-blue-200'
                  },
                  credentials: {
                    gradient: 'from-brand-purple-50 via-white to-brand-purple-100 border-brand-purple-200',
                    iconColor: 'text-brand-purple-600',
                    badgeColor: 'bg-brand-purple-100 text-brand-purple-800 border-brand-purple-200'
                  },
                  practical: {
                    gradient: 'from-brand-teal-50 via-white to-brand-teal-100 border-brand-teal-200',
                    iconColor: 'text-brand-teal-600',
                    badgeColor: 'bg-brand-teal-100 text-brand-teal-800 border-brand-teal-200'
                  }
                };
                const theme = categoryThemes[faq.category];
                return (
                  <div key={index} className={`faq-item medical-card bg-gradient-to-br ${theme.gradient} rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-start justify-between p-4 sm:p-6 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl" role="img" aria-label={faq.category}>{faq.icon}</span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${theme.badgeColor}`}>
                          {faq.trustBadge}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full px-4 sm:px-6 pb-4 sm:pb-6 text-left hover:bg-white/30 transition-all duration-200 medical-focus"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-answer-${index}`}
                      aria-label={`Toggle FAQ: ${faq.question}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 id={`faq-question-${index}`} className="text-xl sm:text-2xl font-semibold text-medical-gray-800 pr-4 leading-tight">{faq.question}</h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-6 h-6 sm:w-7 sm:h-7 ${theme.iconColor} transform transition-transform duration-300 ease-in-out flex-shrink-0 mt-1 ${openIndex === index ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 pb-4 sm:pb-6' : 'max-h-0 opacity-0'} overflow-hidden`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="px-4 sm:px-6">
                      <div className="pt-3 border-t border-white/40">
                        <p className="text-medical-gray-700 leading-relaxed text-base sm:text-lg font-medium">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="bg-gradient-to-br from-medical-gray-900 via-medical-secondary to-medical-primary text-medical-gray-100 py-12 lg:py-16" role="contentinfo">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">BrainThrive</h3>
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base">Pioneering brain health through advanced photobiomodulation therapy and neurological assessment.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-blue-200 text-sm sm:text-base">
                  <li><a href="#services" className="hover:text-white transition-colors">Photobiomodulation</a></li>
                  <li><a href="#brain-gauge-metrics" className="hover:text-white transition-colors">Brain Gauge Testing</a></li>
                  <li><a href="#services" className="hover:text-white transition-colors">Quantitative EEG</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                <div className="space-y-3 text-blue-200 text-sm sm:text-base">
                  <p>Schedule your consultation today</p>
                  <div className="space-y-3">
                    <a href="tel:911" className="block bg-medical-error text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-red-700 transition-colors medical-button font-semibold text-sm sm:text-base medical-focus text-center" aria-label="Call for immediate assistance">
                      🚨 Emergency: Call 911
                    </a>
                    <a href="#contact" className="block bg-white text-medical-primary px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors medical-button font-medium text-sm sm:text-base medical-focus text-center" aria-label="Book your consultation appointment">
                      📅 Book Consultation
                    </a>
                  </div>
                </div>
              </div>
          </div>
          <div className="border-t border-white/20 pt-6 lg:pt-8 text-center">
            <p className="text-blue-100 text-sm sm:text-base">© {new Date().getFullYear()} BrainThrive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
    </div>
    </PageTransition>
  );
}
