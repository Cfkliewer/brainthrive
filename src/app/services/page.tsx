'use client';

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  iconGradient: string;
  process: ProcessStep[];
  benefits: Benefit[];
  faqs: FAQ[];
}

const services: Service[] = [
  {
    id: 'adhd-focus',
    title: 'ADHD & Focus Support',
    subtitle: 'Enhance Cognitive Performance',
    description: 'Our specialized light therapy protocols help improve focus, attention span, and cognitive function in individuals with ADHD and concentration challenges.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80',
    gradient: 'from-brand-blue-50 via-white to-brand-blue-100',
    iconGradient: 'from-brand-blue-600 to-brand-blue-800',
    process: [
      {
        step: 1,
        title: 'Initial Assessment',
        description: 'Comprehensive cognitive evaluation and symptom analysis'
      },
      {
        step: 2,
        title: 'Custom Protocol Design',
        description: 'Personalized light therapy treatment plan creation'
      },
      {
        step: 3,
        title: 'Treatment Sessions',
        description: 'Regular 20-30 minute photobiomodulation sessions'
      },
      {
        step: 4,
        title: 'Progress Monitoring',
        description: 'Ongoing assessment and protocol adjustments'
      }
    ],
    benefits: [
      {
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        title: 'Enhanced Focus',
        description: 'Improved concentration and sustained attention'
      },
      {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Mental Clarity',
        description: 'Reduced brain fog and clearer thinking'
      },
      {
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        title: 'Emotional Balance',
        description: 'Better mood regulation and stress management'
      }
    ],
    faqs: [
      {
        question: 'How long before I see results?',
        answer: 'Most clients notice improvements in focus within 2-4 weeks of consistent treatment.'
      },
      {
        question: 'Is it safe for children?',
        answer: 'Yes, our protocols are safe and effective for children and adults alike.'
      }
    ]
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness & Recovery',
    subtitle: 'Holistic Brain Health',
    description: 'Comprehensive approach to mental health using photobiomodulation to support anxiety, depression, and overall emotional well-being.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gradient: 'from-brand-purple-50 via-white to-brand-purple-100',
    iconGradient: 'from-brand-purple-600 to-brand-purple-800',
    process: [
      {
        step: 1,
        title: 'Mental Health Screening',
        description: 'Detailed psychological assessment and history review'
      },
      {
        step: 2,
        title: 'Biomarker Analysis',
        description: 'Advanced testing to identify underlying factors'
      },
      {
        step: 3,
        title: 'Integrated Treatment',
        description: 'Combined light therapy with wellness coaching'
      },
      {
        step: 4,
        title: 'Lifestyle Integration',
        description: 'Long-term strategies for sustained mental health'
      }
    ],
    benefits: [
      {
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        title: 'Mood Enhancement',
        description: 'Natural improvement in mood and emotional stability'
      },
      {
        icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
        title: 'Stress Reduction',
        description: 'Significant decrease in anxiety and stress levels'
      },
      {
        icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
        title: 'Better Sleep',
        description: 'Improved sleep quality and circadian rhythm regulation'
      }
    ],
    faqs: [
      {
        question: 'Can this replace medication?',
        answer: 'Our therapy complements traditional treatments. Always consult your physician before making medication changes.'
      },
      {
        question: 'How often are sessions needed?',
        answer: 'Typically 2-3 sessions per week for optimal results, with maintenance sessions as needed.'
      }
    ]
  },
  {
    id: 'tbi-recovery',
    title: 'TBI & Concussion Recovery',
    subtitle: 'Neurological Rehabilitation',
    description: 'Specialized treatment protocols designed to support recovery from traumatic brain injuries and concussions using targeted photobiomodulation.',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
    gradient: 'from-brand-teal-50 via-white to-brand-teal-100',
    iconGradient: 'from-brand-teal-600 to-brand-teal-800',
    process: [
      {
        step: 1,
        title: 'Neurological Evaluation',
        description: 'Comprehensive brain injury assessment and imaging review'
      },
      {
        step: 2,
        title: 'Recovery Planning',
        description: 'Customized rehabilitation protocol development'
      },
      {
        step: 3,
        title: 'Intensive Treatment',
        description: 'Frequent photobiomodulation sessions for optimal healing'
      },
      {
        step: 4,
        title: 'Functional Recovery',
        description: 'Gradual return to normal activities with ongoing support'
      }
    ],
    benefits: [
      {
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        title: 'Cognitive Recovery',
        description: 'Restoration of memory, processing speed, and executive function'
      },
      {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        title: 'Reduced Inflammation',
        description: 'Decreased neuroinflammation and accelerated healing'
      },
      {
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        title: 'Symptom Relief',
        description: 'Reduction in headaches, dizziness, and fatigue'
      }
    ],
    faqs: [
      {
        question: 'How soon after injury can treatment begin?',
        answer: 'Treatment can typically begin within days of injury, once medically cleared by your physician.'
      },
      {
        question: 'What is the success rate?',
        answer: 'Studies show significant improvement in 70-80% of patients with consistent treatment protocols.'
      }
    ]
  }
];

const ServicePage = () => {
  const [openFAQ, setOpenFAQ] = useState<{[key: string]: number | null}>({});
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({});
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (serviceId: string, index: number) => {
    setOpenFAQ(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === index ? null : index
    }));
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-white" role="main">
        {/* Emergency Contact Banner */}
        <div className="bg-gradient-to-r from-brand-red-600 to-brand-red-700 text-white py-3 px-4 text-center shadow-medical">
          <p className="font-medium">
            🚨 Medical Emergency? Call <a href="tel:911" className="underline hover:no-underline font-semibold">911</a> immediately
            or contact our 24/7 urgent care line: <a href="tel:555-CARE-NOW" className="underline hover:no-underline font-semibold">555-CARE-NOW</a>
          </p>
        </div>

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-white via-brand-blue-50 to-brand-purple-50 py-20 lg:py-28 relative overflow-hidden border-b border-medical-gray-200" role="banner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-blue-800 via-brand-purple-700 to-brand-teal-700 bg-clip-text text-transparent mb-6 lg:mb-8">
                Our Services
              </h1>
              <p className="text-xl sm:text-2xl text-medical-gray-700 leading-relaxed max-w-3xl mx-auto">
                Discover our comprehensive range of <span className="text-brand-blue-600 font-semibold">photobiomodulation therapy</span> treatments tailored to your unique needs
              </p>
            </div>
          </div>
        </header>

      {/* Services */}
      {services.map((service, serviceIndex) => {
        const isEven = serviceIndex % 2 === 0;
        const layoutClass = isEven ? 'lg:flex-row' : 'lg:flex-row-reverse';
        
        return (
          <div key={service.id} className="relative">
            {/* Service Main Section */}
            <section
              id={`service-${service.id}`}
              ref={(el) => {
                sectionRefs.current[`service-${service.id}`] = el;
              }}
              className={`py-20 lg:py-28 bg-gradient-to-br ${service.gradient} relative`}
              role="region"
              aria-labelledby={`service-title-${service.id}`}
            >
              
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className={`flex flex-col ${layoutClass} items-center gap-12 lg:gap-16`}>
                  <div className={`lg:w-1/2 ${visibleSections[`service-${service.id}`] ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700`}>
                    <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image}
                        alt={`${service.title} - Professional medical treatment environment`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  <div className={`lg:w-1/2 space-y-6 lg:space-y-8 ${visibleSections[`service-${service.id}`] ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
                    <div>
                      <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${service.iconGradient} text-white text-sm font-semibold mb-4 shadow-lg`}>
                        {service.subtitle}
                      </div>
                      <h2
                        id={`service-title-${service.id}`}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6"
                      >
                        {service.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        className={`px-8 py-4 bg-gradient-to-r ${service.iconGradient} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 medical-focus text-lg`}
                        aria-label={`Schedule consultation for ${service.title}`}
                      >
                        Schedule Free Consultation
                      </button>
                      <button
                        className="px-6 py-4 border-2 border-brand-blue-600 text-brand-blue-600 rounded-lg font-medium hover:bg-brand-blue-50 transition-all duration-300 medical-focus"
                        aria-label={`Download information about ${service.title}`}
                      >
                        Download Treatment Guide
                      </button>
                    </div>

                    {/* Social Proof */}
                    <div className="mt-6 pt-6 border-t border-medical-gray-200">
                      <div className="flex items-center justify-center space-x-6 text-sm text-medical-gray-600">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            <div className="w-6 h-6 rounded-full bg-brand-blue-600 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-brand-purple-600 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-brand-teal-600 border-2 border-white"></div>
                          </div>
                          <span>500+ patients treated</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-brand-amber-500 text-lg">★★★★★</span>
                          <span className="font-medium">4.9/5 satisfaction rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Process Steps Section */}
            <section
              className={`py-16 lg:py-20 bg-gradient-to-br from-medical-gray-50 to-white relative`}
              role="region"
              aria-labelledby={`process-title-${service.id}`}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3
                      id={`process-title-${service.id}`}
                      className="text-2xl sm:text-3xl font-bold text-medical-primary mb-4"
                    >
                      Treatment Process
                    </h3>
                    <p className="text-lg text-medical-gray-600">Our structured approach to your recovery</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {service.process.map((step, index) => (
                      <div key={index} className={`text-center p-6 rounded-xl bg-white border-2 ${service.id === 'adhd-focus' ? 'border-brand-blue-200 hover:border-brand-blue-400' : service.id === 'mental-wellness' ? 'border-brand-purple-200 hover:border-brand-purple-400' : 'border-brand-teal-200 hover:border-brand-teal-400'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.iconGradient} text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold`}>
                          {step.step}
                        </div>
                        <h4 className="text-lg font-semibold text-medical-primary mb-2">{step.title}</h4>
                        <p className="text-sm text-medical-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section
              className={`py-16 lg:py-20 bg-gradient-to-br ${service.gradient} relative`}
              role="region"
              aria-labelledby={`benefits-title-${service.id}`}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3
                      id={`benefits-title-${service.id}`}
                      className="text-2xl sm:text-3xl font-bold text-medical-primary mb-4"
                    >
                      Key Benefits
                    </h3>
                    <p className="text-lg text-medical-gray-600">What you can expect from treatment</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.iconGradient} flex items-center justify-center mb-4`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                            role="img"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-medical-primary mb-2">{benefit.title}</h4>
                        <p className="text-medical-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Guarantee */}
                  <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-medical-gray-200">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <h4 className="text-xl font-semibold text-medical-primary mb-4">Treatment Investment</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-medical-gray-600">Initial Consultation</span>
                            <span className="font-semibold text-medical-primary">Complimentary</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-medical-gray-600">Per Session</span>
                            <span className="font-semibold text-medical-primary">$175 - $225</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-brand-green-50 rounded-lg">
                            <span className="text-brand-green-700 font-medium">Treatment Package (10 sessions)</span>
                            <span className="font-bold text-brand-green-800 text-lg">$1,500 - $2,000</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-brand-green-50 rounded-lg p-6">
                        <h5 className="font-semibold text-brand-green-800 mb-3">💚 Our Guarantee</h5>
                        <p className="text-sm text-brand-green-700 leading-relaxed">
                          We&apos;re committed to your success. If you don&apos;t see measurable improvement within your first 4 sessions,
                          we&apos;ll work with you to adjust your protocol or provide a full refund.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section
              className="py-16 lg:py-20 bg-white relative"
              role="region"
              aria-labelledby={`faq-title-${service.id}`}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3
                      id={`faq-title-${service.id}`}
                      className="text-2xl sm:text-3xl font-bold text-medical-primary mb-4"
                    >
                      Frequently Asked Questions
                    </h3>
                    <p className="text-lg text-medical-gray-600">Common questions about {service.title.toLowerCase()}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className={`bg-gradient-to-r ${service.id === 'adhd-focus' ? 'from-brand-blue-50 to-white border-brand-blue-200 hover:border-brand-blue-400' : service.id === 'mental-wellness' ? 'from-brand-purple-50 to-white border-brand-purple-200 hover:border-brand-purple-400' : 'from-brand-teal-50 to-white border-brand-teal-200 hover:border-brand-teal-400'} rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-md hover:shadow-lg`}>
                        <button
                          onClick={() => toggleFAQ(service.id, index)}
                          className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center hover:bg-medical-gray-100 transition-colors medical-focus"
                          aria-expanded={openFAQ[service.id] === index}
                          aria-controls={`faq-answer-${service.id}-${index}`}
                          id={`faq-question-${service.id}-${index}`}
                        >
                          <h4 className="text-lg font-medium text-medical-primary">{faq.question}</h4>
                          <svg
                            className={`w-5 h-5 text-medical-gray-500 transform transition-transform duration-300 ${
                              openFAQ[service.id] === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          id={`faq-answer-${service.id}-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${service.id}-${index}`}
                          className={`transition-all duration-300 ease-in-out ${
                            openFAQ[service.id] === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <p className="px-4 sm:px-6 pb-4 sm:pb-6 text-medical-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      {/* Medical Compliance & Credentials Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-blue-50 via-brand-purple-50 to-brand-teal-50 border-t border-medical-gray-200" role="contentinfo">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-primary mb-4">Medical Excellence & Compliance</h2>
              <p className="text-lg text-medical-gray-600">Your safety and trust are our highest priorities</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Practitioner Credentials */}
              <div className="bg-white rounded-xl p-6 shadow-medical border-l-4 border-brand-blue-600">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-blue-600 to-brand-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-medical-primary mb-3">Board Certified Practitioners</h3>
                <ul className="text-medical-gray-600 space-y-2">
                  <li>• Licensed Medical Doctors</li>
                  <li>• Neurology Board Certification</li>
                  <li>• 15+ Years Clinical Experience</li>
                  <li>• Continuing Medical Education</li>
                </ul>
              </div>

              {/* FDA Compliance */}
              <div className="bg-white rounded-xl p-6 shadow-medical border-l-4 border-brand-purple-600">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-purple-600 to-brand-purple-700 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 -2l2-2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-medical-primary mb-3">FDA Cleared Technology</h3>
                <ul className="text-medical-gray-600 space-y-2">
                  <li>• FDA 510(k) Cleared Devices</li>
                  <li>• Clinical Evidence Based</li>
                  <li>• Safety Protocols Followed</li>
                  <li>• Regular Equipment Calibration</li>
                </ul>
              </div>

              {/* HIPAA Compliance */}
              <div className="bg-white rounded-xl p-6 shadow-medical border-l-4 border-brand-teal-600 md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-teal-600 to-brand-teal-700 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-medical-primary mb-3">HIPAA Privacy Protection</h3>
                <ul className="text-medical-gray-600 space-y-2">
                  <li>• Strict Privacy Protocols</li>
                  <li>• Secure Medical Records</li>
                  <li>• Staff Training Certified</li>
                  <li>• Patient Rights Protected</li>
                </ul>
              </div>
            </div>

            {/* Medical Disclaimers */}
            <div className="mt-12 p-6 bg-white rounded-xl border-2 border-brand-amber-200 shadow-medical">
              <h3 className="text-lg font-semibold text-medical-primary mb-4">Important Medical Information</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-medical-gray-600">
                <div>
                  <h4 className="font-medium text-medical-gray-800 mb-2">Treatment Disclaimer:</h4>
                  <p>Our photobiomodulation therapy services are provided by licensed medical professionals. Individual results may vary. These statements have not been evaluated by the FDA. This treatment is not intended to diagnose, treat, cure, or prevent any disease.</p>
                </div>
                <div>
                  <h4 className="font-medium text-medical-gray-800 mb-2">Consultation Required:</h4>
                  <p>All treatments require a medical consultation and assessment. Our practitioners will determine if you are a suitable candidate for photobiomodulation therapy based on your medical history and current health status.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default ServicePage;
