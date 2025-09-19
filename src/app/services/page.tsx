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
    gradient: 'from-blue-50 via-white to-cyan-50',
    iconGradient: 'from-blue-500 to-cyan-400',
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
    gradient: 'from-purple-50 via-white to-pink-50',
    iconGradient: 'from-purple-500 to-pink-400',
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
    gradient: 'from-emerald-50 via-white to-teal-50',
    iconGradient: 'from-emerald-500 to-teal-400',
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-medical-primary/10 via-blue-50 to-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-medical-primary to-blue-600 bg-clip-text text-transparent mb-6 lg:mb-8">
              Our Services
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
              Discover our comprehensive range of photobiomodulation therapy treatments tailored to your unique needs
            </p>
          </div>
        </div>
      </div>

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
              className={`py-20 lg:py-28 bg-gradient-to-br ${service.gradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-30">
                <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${service.iconGradient} rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${service.iconGradient} rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2`}></div>
              </div>
              
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className={`flex flex-col ${layoutClass} items-center gap-12 lg:gap-16`}>
                  <div className={`lg:w-1/2 ${visibleSections[`service-${service.id}`] ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700`}>
                    <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.iconGradient} opacity-20`}></div>
                    </div>
                  </div>
                  
                  <div className={`lg:w-1/2 space-y-6 lg:space-y-8 ${visibleSections[`service-${service.id}`] ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
                    <div>
                      <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${service.iconGradient} text-white text-sm font-medium mb-4`}>
                        {service.subtitle}
                      </div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">
                        {service.title}
                      </h2>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className={`px-6 py-3 bg-gradient-to-r ${service.iconGradient} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        Learn More
                      </button>
                      <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Process Steps Section */}
            <section className={`py-16 lg:py-20 bg-white relative`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Treatment Process</h3>
                    <p className="text-lg text-gray-600">Our structured approach to your recovery</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {service.process.map((step, index) => (
                      <div key={index} className={`text-center p-6 rounded-xl bg-gradient-to-br ${service.gradient} border border-gray-100 hover:shadow-lg transition-all duration-300`}>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.iconGradient} text-white flex items-center justify-center mx-auto mb-4 text-lg font-bold`}>
                          {step.step}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className={`py-16 lg:py-20 bg-gradient-to-br ${service.gradient} relative`}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Key Benefits</h3>
                    <p className="text-lg text-gray-600">What you can expect from treatment</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.iconGradient} flex items-center justify-center mb-4`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d={benefit.icon} />
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 lg:py-20 bg-white relative">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-12 lg:mb-16">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                    <p className="text-lg text-gray-600">Common questions about {service.title.toLowerCase()}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className={`bg-gradient-to-br ${service.gradient} rounded-xl overflow-hidden border border-gray-100`}>
                        <button
                          onClick={() => toggleFAQ(service.id, index)}
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-white/50 transition-all duration-200"
                        >
                          <h4 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h4>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 flex-shrink-0 ${openFAQ[service.id] === index ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${openFAQ[service.id] === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                        >
                          <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
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
    </div>
  );
};

export default ServicePage;
