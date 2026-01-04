"use client"
import { useScrollReveal } from "@/lib/animations";

interface BrainGaugeMetric {
  name: string;
  description: string;
  icon: string;
  details: string;
  clinicalRelevance: string;
}

const brainGaugeMetrics: BrainGaugeMetric[] = [
  {
    name: "Reaction Time",
    description: "How quickly your brain responds to stimuli",
    icon: "⚡",
    details: "Measures the speed of neural signal transmission from sensory input to motor response. Faster reaction times indicate more efficient neural pathways.",
    clinicalRelevance: "Critical for ADHD assessment, concussion recovery monitoring, and age-related cognitive decline evaluation."
  },
  {
    name: "Attention",
    description: "How well you focus and sustain concentration",
    icon: "🎯",
    details: "Evaluates sustained attention capacity and the ability to maintain focus over time without distraction or mental fatigue.",
    clinicalRelevance: "Primary indicator for ADHD diagnosis, attention disorders, and treatment effectiveness monitoring."
  },
  {
    name: "Cognitive Speed",
    description: "How efficiently your brain processes information",
    icon: "🧠",
    details: "Measures the rate at which the brain can process and respond to complex cognitive tasks and sensory information.",
    clinicalRelevance: "Essential for detecting processing speed deficits common in TBI, autism spectrum disorders, and cognitive decline."
  },
  {
    name: "Plasticity",
    description: "Your brain's ability to adapt and rewire",
    icon: "🔄",
    details: "Assesses neuroplasticity - the brain's capacity to form new neural connections and adapt to changes or injury.",
    clinicalRelevance: "Key predictor of recovery potential in brain injury, stroke rehabilitation, and learning disorder interventions."
  },
  {
    name: "Fatigue",
    description: "Detects signs of brain overuse or stress",
    icon: "😴",
    details: "Identifies cognitive fatigue patterns that indicate when the brain is overworked or stressed, affecting overall performance.",
    clinicalRelevance: "Important for chronic fatigue syndrome, post-concussion syndrome, and optimizing treatment timing and intensity."
  }
];

export default function BrainGaugeMetrics() {
  const metricsRef = useScrollReveal(".metric-card", {
    start: "top 85%",
    stagger: 0.1
  });

  return (
    <section ref={metricsRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-white" aria-label="Brain Gauge Cortical Metrics">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 py-1 rounded-full border border-primary-200">
                FDA-Cleared Assessment
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6 tracking-tight">
            Brain Gauge Cortical Metrics
          </h2>
          <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed mb-6">
            Objective, quantifiable measurement of brain function through 5 key metrics
          </p>
          <div className="bg-primary-100 border border-primary-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-primary-800 font-medium text-sm">
              ✓ 15-minute non-invasive assessment ✓ Real-time results ✓ Progress tracking over time
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {brainGaugeMetrics.map((metric) => (
            <div
              key={metric.name}
              className="metric-card medical-card bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-primary-400 transition-all duration-300 group hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-xl bg-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <span className="text-2xl" role="img" aria-label={metric.name}>
                    {metric.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-medical-primary mb-2">
                  {metric.name}
                </h3>
                <p className="text-medical-gray-600 text-sm leading-relaxed mb-4">
                  {metric.description}
                </p>
              </div>

              {/* Expandable Details */}
              <details className="group/details">
                <summary className="cursor-pointer text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors list-none">
                  <div className="flex items-center justify-between">
                    <span>Clinical Details</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-open/details:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-3 text-xs text-medical-gray-600">
                    <div>
                      <strong className="text-primary-700">Measurement:</strong>
                      <p className="mt-1">{metric.details}</p>
                    </div>
                    <div>
                      <strong className="text-primary-700">Clinical Use:</strong>
                      <p className="mt-1">{metric.clinicalRelevance}</p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Assessment Process */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 border border-primary-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-medical-primary mb-4">
                How Brain Gauge Assessment Works
              </h3>
              <p className="text-medical-gray-600 leading-relaxed">
                Simple fingertip vibration testing provides objective brain function data in just 15 minutes
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold text-medical-primary mb-2">Baseline Test</h4>
                <p className="text-sm text-medical-gray-600">
                  Quick, painless assessment using gentle fingertip vibrations
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold text-medical-primary mb-2">Real-Time Analysis</h4>
                <p className="text-sm text-medical-gray-600">
                  Immediate scoring across all 5 cortical metrics with visual reports
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold text-medical-primary mb-2">Progress Tracking</h4>
                <p className="text-sm text-medical-gray-600">
                  Regular reassessments to monitor treatment effectiveness
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:4053900596"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 medical-button shadow-lg text-center medical-focus"
                aria-label="Call to inquire about Brain Gauge assessment"
              >
                Call (405) 390-0596
              </a>
              <a
                href="#services"
                className="bg-transparent border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 text-center medical-focus"
                aria-label="Learn more about Brain Gauge testing"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}