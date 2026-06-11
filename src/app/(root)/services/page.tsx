"use client"
import { useState, useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";

interface TreatmentData {
  id: string;
  title: string;
  emoji: string;
  intro: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export default function ServicesPage() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>("adhd-autism");
  const [treatmentData, setTreatmentData] = useState<TreatmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const parseTreatmentFile = (text: string, id: string): TreatmentData => {
    const lines = text.split('\n').filter(line => line.trim());

    // Extract title and emoji from first line
    const titleLine = lines[0] || "";
    const emojiMatch = titleLine.match(/^([\u{1F300}-\u{1F9FF}])/u);
    const emoji = emojiMatch ? emojiMatch[1] : "🧠";
    const title = titleLine.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, "").trim();

    // Extract intro (second line)
    const intro = lines[1] || "";

    // Parse sections
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } | null = null;

    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if it's a section header (starts with emoji)
      if (/^[\u{1F300}-\u{1F9FF}]/u.test(line)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, "").trim(),
          content: []
        };
      } else if (currentSection && line) {
        currentSection.content.push(line);
      }
    }

    if (currentSection) {
      sections.push(currentSection);
    }

    return { id, title, emoji, intro, sections };
  };

  useEffect(() => {
    const loadTreatments = async () => {
      const treatments = [
        { id: "adhd-autism", file: "adhd&autism.txt" },
        { id: "memory-cognitive", file: "memory&cognitive.txt" },
        { id: "tbi-concussion", file: "TBI&concussion.txt" }
      ];

      try {
        const data: TreatmentData[] = await Promise.all(
          treatments.map(async (treatment) => {
            const response = await fetch(`/data/treatments/${treatment.file}`);
            const text = await response.text();
            return parseTreatmentFile(text, treatment.id);
          })
        );

        setTreatmentData(data);
      } catch (error) {
        console.error("Error loading treatment data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTreatments();
  }, []);

  const currentTreatment = treatmentData.find(t => t.id === selectedTreatment);

  // Intersection Observer for reveal animations - Desktop only
  useEffect(() => {
    // Skip on mobile - content is visible by default via CSS
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;

    if (isMobile) {
      // On mobile, just ensure all sections are visible immediately
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.reveal-section');
        sections.forEach(section => {
          (section as HTMLElement).style.opacity = '1';
          (section as HTMLElement).style.transform = 'none';
        });
      }
      return;
    }

    // Desktop: Use IntersectionObserver for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (contentRef.current) {
      const sections = contentRef.current.querySelectorAll('.reveal-section');
      sections.forEach(section => observer.observe(section));
    }

    return () => observer.disconnect();
  }, [currentTreatment]);

  const treatmentCategories = [
    {
      id: "adhd-autism",
      name: "ADHD & Autism",
      shortDesc: "Focus, behavior, and sensory processing support",
      icon: "🧠"
    },
    {
      id: "memory-cognitive",
      name: "Memory & Cognitive",
      shortDesc: "Memory enhancement and cognitive function",
      icon: "🎯"
    },
    {
      id: "tbi-concussion",
      name: "TBI & Concussion",
      shortDesc: "Brain injury recovery and healing",
      icon: "💡"
    }
  ];

  const renderSection = (section: { title: string; content: string[] }, index: number) => {
    // Detect section type based on title keywords
    const title = section.title.toLowerCase();
    const isBrainImpact = title.includes('what happens') || title.includes('brain with');
    const isHowPBM = title.includes('how pbm') || title.includes('supports');
    const isBenefits = title.includes('benefits');
    const isSafe = title.includes('safe') || title.includes('non-invasive');

    // For "What Happens in the Brain" sections - Card layout
    if (isBrainImpact) {
      return (
        <section key={index} className="reveal-section">
          <div className="flex items-start gap-4 mb-8">
            <div className="mt-2 w-2.5 h-2.5 rounded-full bg-[#35F3E6] pulse-bullet shrink-0"></div>
            <h2 className="text-2xl md:text-3xl tracking-tight text-white brand-font leading-none">
              {section.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {section.content.map((item, itemIndex) => (
              <div key={itemIndex} className="group relative bg-[#001a3d]/80 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-[#35F3E6]/40 transition-all duration-300 shadow-lg hover:shadow-[#35F3E6]/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#35F3E6] to-transparent opacity-50 rounded-t-xl"></div>
                <p className="text-sm md:text-base text-blue-100/90 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // For "How PBM Supports" sections - List layout with cards
    if (isHowPBM) {
      return (
        <section key={index} className="reveal-section">
          <div className="flex items-start gap-4 mb-2">
            <div className="mt-2 w-2.5 h-2.5 rounded-full bg-[#35F3E6] pulse-bullet shrink-0"></div>
            <h2 className="text-2xl md:text-3xl tracking-tight text-white brand-font leading-none">
              {section.title}
            </h2>
          </div>
          <p className="text-[#35F3E6] tracking-wide text-xs uppercase mb-10 pl-7">
            Medical-grade PBM helps by:
          </p>

          <div className="space-y-8 pl-0 md:pl-7">
            {section.content.map((item, itemIndex) => {
              const isSubHeading = item.length < 60 && !item.match(/[.!?]$/);

              if (isSubHeading) {
                return (
                  <div key={itemIndex} className="group">
                    <h3 className="text-base font-medium text-[#35F3E6] mb-3 flex items-center gap-2">
                      {item}
                    </h3>
                  </div>
                );
              }

              return (
                <div key={itemIndex} className="bg-[#002b5c]/50 border border-white/5 rounded-lg p-6 hover:border-[#35F3E6]/20 transition-all duration-300">
                  <p className="text-blue-100 leading-relaxed text-sm md:text-base">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      );
    }

    // For "Benefits" sections - Simple list with checkmarks
    if (isBenefits) {
      return (
        <section key={index} className="reveal-section pt-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex items-center justify-center w-6 h-6 rounded bg-[#35F3E6] shadow-[0_0_10px_rgba(53,243,230,0.4)] shrink-0">
              <span className="text-[#002554] font-bold text-sm">✓</span>
            </div>
            <h2 className="text-xl md:text-2xl tracking-tight text-white brand-font">
              {section.title}
            </h2>
          </div>

          <div className="pl-10 space-y-6">
            {section.content.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-3 group">
                <div className="w-1.5 h-1.5 rounded-full bg-[#35F3E6]/50 group-hover:bg-[#35F3E6] transition-colors"></div>
                <p className="text-base text-[#35F3E6]">{item}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // For "Safe" sections - Card with icons
    if (isSafe) {
      return (
        <section key={index} className="reveal-section pt-8 border-t border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#35F3E6] pulse-bullet shrink-0"></div>
            <h2 className="text-xl md:text-2xl tracking-tight text-white brand-font">
              {section.title}
            </h2>
          </div>

          <div className="pl-7 grid gap-6">
            {section.content.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-[#001a3d]/50 border border-[#35F3E6]/10 rounded-lg p-5 flex items-center gap-4">
                <span className="text-2xl shrink-0">
                  {itemIndex === 0 ? '🛡️' : itemIndex === 1 ? '🏆' : '🧠'}
                </span>
                <p className="text-[#35F3E6] text-base">{item}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // Default section rendering
    return (
      <section key={index} className="reveal-section">
        <div className="flex items-start gap-4 mb-8">
          <div className="mt-2 w-2.5 h-2.5 rounded-full bg-[#35F3E6] pulse-bullet shrink-0"></div>
          <h2 className="text-xl md:text-2xl tracking-tight text-white brand-font leading-none">
            {section.title}
          </h2>
        </div>

        <div className="space-y-6 pl-0 md:pl-7">
          {section.content.map((item, itemIndex) => {
            const isSubHeading = item.length < 60 && !item.match(/[.!?]$/);

            if (isSubHeading) {
              return (
                <h3 key={itemIndex} className="text-base font-medium text-[#35F3E6] mt-6">
                  {item}
                </h3>
              );
            }

            return (
              <div key={itemIndex} className="bg-[#002b5c]/50 border border-white/5 rounded-lg p-6 hover:border-[#35F3E6]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-[#35F3E6] text-2xl mt-1">•</span>
                  <p className="flex-1 text-blue-100/90 leading-relaxed">{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#002554] text-white selection:bg-[#35F3E6]/30 selection:text-[#35F3E6] antialiased">
        {/* Skip Navigation */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#002554]/90 backdrop-blur-xl transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
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
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-200/70">
              <Link href="/#services" className="hover:text-white transition-colors duration-200">Services</Link>
              <Link href="/services" className="text-white transition-colors duration-200">Treatments</Link>
              <Link href="/#methodology" className="hover:text-white transition-colors duration-200">Methodology</Link>
              <Link href="/#location" className="hover:text-white transition-colors duration-200">Location</Link>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/#contact"
                className="bg-white text-[#002554] text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#35F3E6] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Contact Us
              </Link>
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
                <Link href="/#services" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                <Link href="/services" className="block text-white py-2" onClick={() => setMobileMenuOpen(false)}>Treatments</Link>
                <Link href="/#methodology" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Methodology</Link>
                <Link href="/#location" className="block text-blue-200 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Location</Link>
                <a href="tel:4053900596" className="block bg-[#5362EF] text-white px-4 py-3 rounded-lg text-center font-semibold mt-4">Call (405) 390-0596</a>
              </div>
            </div>
          )}
        </nav>

        <main id="main-content" className="relative flex-1 pt-32 pb-24 px-6 overflow-hidden">
          {/* Background Ambient Effects */}
          <div className="fixed inset-0 opacity-20 mix-blend-soft-light pointer-events-none" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}></div>
          <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#5362EF]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#35F3E6]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

          {/* Treatment Selection Tabs - Mobile */}
          <div className="max-w-4xl mx-auto mb-12 relative z-10 md:hidden px-6">
            <div className="grid grid-cols-3 gap-2">
              {treatmentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedTreatment(category.id)}
                  className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl border text-center transition-all duration-300 ${
                    selectedTreatment === category.id
                      ? 'bg-[#5362EF] border-[#5362EF] text-white'
                      : 'bg-[#001a3d]/80 border-white/10 text-blue-100/70'
                  }`}
                  aria-pressed={selectedTreatment === category.id}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-xs font-medium leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Treatment Selection Tabs - Desktop */}
          <div className="max-w-4xl mx-auto mb-16 relative z-10 hidden md:block">
            <div className="grid grid-cols-3 gap-6">
              {treatmentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedTreatment(category.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 text-left transform hover:-translate-y-1 ${
                    selectedTreatment === category.id
                      ? 'bg-gradient-to-br from-[#5362EF] to-[#434fc2] border-[#5362EF] shadow-[0_0_30px_rgba(83,98,239,0.4)]'
                      : 'bg-[#001a3d]/80 border-white/10 hover:border-[#35F3E6]/30 hover:bg-[#001a3d]'
                  }`}
                  aria-pressed={selectedTreatment === category.id}
                >
                  <div className="text-2xl mb-3">{category.icon}</div>
                  <h3 className="text-lg brand-font text-white mb-2">{category.name}</h3>
                  <p className="text-xs text-blue-100/70">{category.shortDesc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Treatment Content */}
          {loading ? (
            <div className="max-w-4xl mx-auto text-center py-24">
              <div className="inline-block w-16 h-16 border-4 border-[#35F3E6] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-blue-100/60">Loading treatment information...</p>
            </div>
          ) : currentTreatment ? (
            <div ref={contentRef} className="max-w-4xl mx-auto space-y-20 relative z-10">
              {currentTreatment.sections.map((section, index) => renderSection(section, index))}

              {/* Bottom CTA */}
              <div className="mt-20 text-center reveal-section">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#35F3E6] text-[#002554] px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(53,243,230,0.3)] hover:scale-105"
                >
                  Call (405) 390-0596 <span>→</span>
                </Link>
              </div>
            </div>
          ) : null}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#001a3d] pt-16 pb-8" id="contact">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="md:max-w-sm">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <img src="/BrainThrive_Icon_White.png" alt="Brain Thrive Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold text-white brand-font tracking-wide">BRAIN THRIVE</span>
              </Link>
              <p className="text-xs text-blue-200/50 leading-relaxed">
                Prioritizing brain health through the convergence of neuroscience, technology, and compassionate care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
              <div>
                <h4 className="text-sm font-semibold text-white mb-6 brand-font tracking-wider">Services</h4>
                <ul className="space-y-3 text-xs text-blue-200/60">
                  <li><Link href="/services" className="hover:text-[#35F3E6] transition-colors">Treatment Services</Link></li>
                  <li><Link href="/#services" className="hover:text-[#35F3E6] transition-colors">QEEG Brain Mapping</Link></li>
                  <li><Link href="/#services" className="hover:text-[#35F3E6] transition-colors">Photobiomodulation</Link></li>
                  <li><Link href="/#services" className="hover:text-[#35F3E6] transition-colors">Brain Gauge Assessment</Link></li>
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
            <p className="text-[10px] text-blue-200/40">© {new Date().getFullYear()} Brain Thrive Wellness Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
