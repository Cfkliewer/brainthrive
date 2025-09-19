"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { BrainIcon, SparklesIcon, HeartIcon, FireIcon, BoltIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Add CSS for smooth infinite scroll animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${6 * 304}px);
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
      description: "Enhance attention and concentration with targeted light therapy"
    },
    {
      icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
      title: "Concussion & TBI Recovery",
      description: "Support healing and recovery from brain injuries"
    },
    {
      icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
      title: "Memory Loss & Brain Fog",
      description: "Improve cognitive clarity and memory function"
    },
    {
      icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
      title: "Anxiety & Depression",
      description: "Support mental wellness and emotional balance"
    },
    {
      icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
      title: "Chronic Pain",
      description: "Reduce persistent pain through light therapy"
    },
    {
      icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
      title: "Inflammation & Fatigue",
      description: "Combat inflammation and boost energy levels"
    }
  ];

  useEffect(() => {
    // No longer needed - using CSS animation instead
  }, []);
  return (
    <div className="min-h-screen">
      <header className="bg-white/95 backdrop-blur-sm text-medical-gray-900 flex flex-row justify-between items-center py-4 md:py-6 px-4 md:px-8 shadow-medical border-b border-medical-gray-100 sticky top-0 z-50">
          <div className="text-xl md:text-2xl font-bold text-medical-primary tracking-tight">BrainThrive</div>
          <nav className="hidden md:flex gap-2 font-medium">
            <a href="#services" className="px-4 lg:px-6 py-2 hover:text-medical-primary text-medical-gray-700 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus">Services</a>
            <a href="#about" className="px-4 lg:px-6 py-2 hover:text-medical-primary text-medical-gray-700 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus">About</a>
            <a href="#testimonials" className="px-4 lg:px-6 py-2 hover:text-medical-primary text-medical-gray-700 transition-all duration-200 rounded-lg hover:bg-medical-gray-50 medical-focus">Testimonials</a>
            <a href="#contact" className="bg-medical-primary text-white px-4 lg:px-6 py-2.5 rounded-lg hover:bg-medical-secondary transition-all duration-200 medical-button medical-focus font-medium shadow-medical">Book Consultation</a>
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-medical-gray-50 transition-colors">
            <svg className="w-6 h-6 text-medical-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
      </header>

      <main>
        <section className="min-h-[100vh] relative overflow-hidden flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80" 
              alt="Medical brain health technology"
              className="w-full h-full object-cover"
            />
            {/* Darker blue overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-medical-gray-900/85 via-medical-secondary/80 to-medical-primary/75"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-4xl mx-auto text-center lg:text-left">
              <div className="space-y-6 lg:space-y-8">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  Transform Your 
                  <span className="text-cyan-300 block">Brain Health</span>
                  <span className="text-blue-200 text-3xl sm:text-4xl lg:text-5xl font-medium block mt-2">with Light Therapy</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
                  Experience the healing power of photobiomodulation therapy with our advanced, evidence-based treatments
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center lg:justify-start">
                <a href="#contact" className="bg-white text-medical-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 medical-button shadow-medical-lg text-base sm:text-lg">
                  Schedule Consultation
                </a>
                <a href="#services" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-white hover:text-medical-primary transition-all duration-200 medical-button text-base sm:text-lg">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-gray-900 mb-4 lg:mb-6 tracking-tight">Our Advanced Services</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed font-light">Comprehensive brain health solutions using cutting-edge, evidence-based technology</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="medical-card bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl p-8 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 transition-all duration-300 group hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Photobiomodulation</h3>
                <p className="text-gray-600 leading-relaxed">Advanced light therapy using specific wavelengths to stimulate cellular healing and optimize brain function</p>
              </div>

              <div className="medical-card bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-xl p-8 flex flex-col items-center text-center border border-purple-100 hover:border-purple-300 transition-all duration-300 group hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Brain Gauge Cortical Metrics</h3>
                <p className="text-gray-600 leading-relaxed">Precise measurement of brain performance using advanced tactile testing technology</p>
              </div>

              <div className="medical-card bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-xl p-8 flex flex-col items-center text-center border border-emerald-100 hover:border-emerald-300 transition-all duration-300 group hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Quantitative EEG</h3>
                <p className="text-gray-600 leading-relaxed">Detailed brain mapping and analysis to identify areas needing targeted treatment</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-medical-primary/5 via-blue-50 to-white relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-gray-900 mb-4 lg:mb-6 tracking-tight">About BrainThrive</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed font-light">Pioneering brain health through advanced light therapy and neurological assessment</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-medical-gray-900 mb-3 sm:mb-4">Our Mission</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-4">At BrainThrive, we're dedicated to revolutionizing brain health through cutting-edge photobiomodulation therapy and advanced neurological assessments. Our mission is to provide accessible, non-invasive solutions for cognitive enhancement and neurological recovery.</p>
                  <p className="text-medical-gray-600 leading-relaxed">We combine the latest in light therapy technology with comprehensive brain mapping to deliver personalized treatment plans that address each client's unique needs.</p>
                </div>
              </div>
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-medical-gray-900 mb-3 sm:mb-4">Expert Care</h3>
                  <p className="text-medical-gray-600 leading-relaxed mb-6 lg:mb-8">Our team of certified specialists brings together expertise in neuroscience, photobiomodulation therapy, and cognitive health. With years of experience and continuous training in the latest advancements, we ensure the highest standard of care for our clients.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
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

        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-gray-900 mb-4 lg:mb-6 tracking-tight">What Can Our Services Do For You?</h2>
              <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed font-light">Discover how our treatments can help improve your quality of life</p>
            </div>
            
            {/* Horizontal scrolling container */}
            <div className="w-full overflow-hidden">
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 animate-scroll"
                style={{ 
                  width: `${services.length * 2 * 304}px`,
                  animation: 'scroll 30s linear infinite'
                }}
              >
                {services.map((service, index) => {
                  const gradients = [
                    'from-violet-50 via-white to-purple-50 border-violet-100',
                    'from-rose-50 via-white to-pink-50 border-rose-100',
                    'from-sky-50 via-white to-blue-50 border-sky-100',
                    'from-emerald-50 via-white to-green-50 border-emerald-100',
                    'from-amber-50 via-white to-yellow-50 border-amber-100',
                    'from-indigo-50 via-white to-blue-50 border-indigo-100'
                  ];
                  const iconGradients = [
                    'from-violet-500 to-purple-400',
                    'from-rose-500 to-pink-400',
                    'from-sky-500 to-blue-400',
                    'from-emerald-500 to-green-400',
                    'from-amber-500 to-yellow-400',
                    'from-indigo-500 to-blue-400'
                  ];
                  return (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-72 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl p-6 sm:p-8 shadow-medical border transition-all duration-300 hover:shadow-xl`}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${iconGradients[index % iconGradients.length]} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">{service.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">{service.description}</p>
                      </div>
                    </div>
                  );
                })}
                
                {/* Duplicate cards for seamless looping */}
                {services.map((service, index) => {
                  const gradients = [
                    'from-violet-50 via-white to-purple-50 border-violet-100',
                    'from-rose-50 via-white to-pink-50 border-rose-100',
                    'from-sky-50 via-white to-blue-50 border-sky-100',
                    'from-emerald-50 via-white to-green-50 border-emerald-100',
                    'from-amber-50 via-white to-yellow-50 border-amber-100',
                    'from-indigo-50 via-white to-blue-50 border-indigo-100'
                  ];
                  const iconGradients = [
                    'from-violet-500 to-purple-400',
                    'from-rose-500 to-pink-400',
                    'from-sky-500 to-blue-400',
                    'from-emerald-500 to-green-400',
                    'from-amber-500 to-yellow-400',
                    'from-indigo-500 to-blue-400'
                  ];
                  return (
                    <div 
                      key={`duplicate-${index}`}
                      className={`flex-shrink-0 w-72 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl p-6 sm:p-8 shadow-medical border transition-all duration-300 hover:shadow-xl`}
                    >
                      <div className="flex flex-col items-center text-center h-full">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${iconGradients[index % iconGradients.length]} flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 sm:w-8 sm:h-8 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">{service.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">{service.description}</p>
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
            <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
              {[
                {
                  question: "What is Photobiomodulation Therapy?",
                  answer: "Photobiomodulation therapy uses specific wavelengths of light to stimulate cellular function and promote healing. It's a non-invasive treatment that can help with various neurological and physical conditions."
                },
                {
                  question: "How long does each session take?",
                  answer: "Treatment sessions typically last between 15-30 minutes, depending on the condition being treated and its severity. We'll create a personalized treatment plan during your consultation."
                },
                {
                  question: "Is the treatment safe?",
                  answer: "Yes, photobiomodulation is FDA-cleared and has been extensively studied. It's non-invasive, painless, and has no known side effects when administered by trained professionals."
                },
                {
                  question: "How many sessions will I need?",
                  answer: "The number of sessions varies based on your condition and treatment goals. Many clients see improvements within 6-12 sessions, though some conditions may require ongoing maintenance."
                }
              ].map((faq, index) => {
                const cardGradients = [
                  'from-blue-50 via-white to-cyan-50 border-blue-100',
                  'from-purple-50 via-white to-violet-50 border-purple-100',
                  'from-emerald-50 via-white to-teal-50 border-emerald-100',
                  'from-rose-50 via-white to-pink-50 border-rose-100'
                ];
                const iconColors = [
                  'text-blue-500',
                  'text-purple-500',
                  'text-emerald-500',
                  'text-rose-500'
                ];
                return (
                  <div key={index} className={`medical-card bg-gradient-to-br ${cardGradients[index % cardGradients.length]} rounded-xl overflow-hidden border hover:shadow-lg transition-all duration-300`}>
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full p-4 sm:p-6 text-left flex justify-between items-center hover:bg-white/50 transition-all duration-200 medical-focus"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 pr-4">{faq.question}</h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColors[index % iconColors.length]} transform transition-transform duration-200 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                  >
                    <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-medical-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-medical-gray-900 via-medical-secondary to-medical-primary text-medical-gray-100 py-12 lg:py-16">
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
                <li><a href="#services" className="hover:text-white transition-colors">Brain Gauge Testing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Quantitative EEG</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-blue-200 text-sm sm:text-base">
                <p>Schedule your consultation today</p>
                <a href="#contact" className="inline-block bg-white text-medical-primary px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-blue-50 transition-colors medical-button font-medium text-sm sm:text-base">
                  Book Now
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 lg:pt-8 text-center">
            <p className="text-blue-100 text-sm sm:text-base">© {new Date().getFullYear()} BrainThrive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
