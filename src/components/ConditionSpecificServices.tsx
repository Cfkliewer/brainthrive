"use client"
import { useState } from "react";
import { useScrollReveal } from "@/lib/animations";
import ProgressiveDisclosure from "./ProgressiveDisclosure";

interface TreatmentService {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  iconColor: string;
  badgeColor: string;
  badgeText: string;
  progressiveLevels: {
    title: string;
    content: string;
    level: 1 | 2 | 3;
    audienceLabel: string;
  }[];
  brainScience: {
    whatHappens: string[];
    howPBMHelps: string[];
    benefits: string[];
  };
  sessionInfo: {
    duration: string;
    frequency: string;
    protocol: string;
  };
}

const conditionServices: TreatmentService[] = [
  {
    id: "adhd-autism",
    title: "ADHD & Autism Support",
    shortDescription: "Targeted brain balance for attention and sensory processing",
    icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18",
    gradientFrom: "from-white",
    gradientTo: "to-white",
    borderColor: "border-gray-200",
    iconColor: "bg-primary-600",
    badgeColor: "bg-primary-100 text-primary-800 border-primary-200",
    badgeText: "Neuroplasticity Focus",
    progressiveLevels: [
      {
        title: "What You'll Notice",
        content: "Better focus and attention • Improved emotional regulation • Enhanced social interaction • Better sleep quality • Reduced hyperactivity and impulsivity",
        level: 1,
        audienceLabel: "Patient-Friendly"
      },
      {
        title: "How It Works",
        content: "PBM therapy helps balance brain activity by normalizing overactive or underactive brain regions. It enhances cellular energy production in neurons, reduces neuroinflammation, and improves brain connectivity between regions responsible for attention, executive function, and emotional regulation.",
        level: 2,
        audienceLabel: "Informed Patient"
      },
      {
        title: "Clinical Mechanisms",
        content: "ADHD involves underactive frontal brain regions affecting dopaminergic pathways. Autism involves brain network imbalances and sensory processing challenges. PBM at 810-1070nm wavelengths stimulates mitochondrial cytochrome c oxidase, increasing ATP production. This enhances neuroplasticity, reduces microglial activation, and promotes balanced neurotransmitter function in prefrontal cortex and limbic regions.",
        level: 3,
        audienceLabel: "Clinical Detail"
      }
    ],
    brainScience: {
      whatHappens: [
        "ADHD: Underactive frontal brain regions affect attention and impulse control",
        "Autism: Brain network imbalances and sensory processing challenges",
        "Reduced dopamine and norepinephrine in attention circuits",
        "Neuroinflammation affecting neural connectivity"
      ],
      howPBMHelps: [
        "Balances brain activity by normalizing overactive/underactive regions",
        "Enhances cellular energy (ATP) in neurons",
        "Reduces neuroinflammation and microglial activation",
        "Improves brain connectivity and neuroplasticity",
        "Regulates neurotransmitter production"
      ],
      benefits: [
        "Better focus and attention span",
        "Improved emotional regulation and calmness",
        "Reduced hyperactivity and impulsivity (ADHD)",
        "Enhanced social interaction and communication (Autism)",
        "Improved sleep and overall mood"
      ]
    },
    sessionInfo: {
      duration: "20-30 minutes",
      frequency: "2-3 times per week",
      protocol: "12-20 session comprehensive program"
    }
  },
  {
    id: "memory-cognitive",
    title: "Memory & Cognitive Enhancement",
    shortDescription: "Restore mental clarity and cognitive function",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    gradientFrom: "from-white",
    gradientTo: "to-white",
    borderColor: "border-gray-200",
    iconColor: "bg-primary-600",
    badgeColor: "bg-primary-100 text-primary-800 border-primary-200",
    badgeText: "Neuroprotective",
    progressiveLevels: [
      {
        title: "What You'll Experience",
        content: "Improved recall and short-term memory • Better mental clarity and focus • Reduced confusion or 'brain fog' • Enhanced mood and sleep quality • Support for healthy aging",
        level: 1,
        audienceLabel: "Patient-Friendly"
      },
      {
        title: "Treatment Approach",
        content: "Memory loss often results from decreased blood flow, inflammation, and weakened cellular energy in brain regions like the hippocampus. PBM therapy directly targets these issues by boosting cellular energy, reducing inflammation, improving circulation, and stimulating neuroplasticity to protect existing neurons and encourage new connections.",
        level: 2,
        audienceLabel: "Informed Patient"
      },
      {
        title: "Neurobiological Process",
        content: "Cognitive decline involves decreased cerebral blood flow, mitochondrial dysfunction, neuroinflammation, and synaptic loss particularly in hippocampal and cortical regions. PBM enhances mitochondrial respiration, upregulates BDNF expression, reduces pro-inflammatory cytokines (IL-1β, TNF-α), and promotes angiogenesis. This supports memory consolidation pathways and protects against neurodegeneration.",
        level: 3,
        audienceLabel: "Clinical Detail"
      }
    ],
    brainScience: {
      whatHappens: [
        "Decreased blood flow reduces oxygen and nutrient delivery",
        "Inflammation damages neurons and disrupts communication",
        "Mitochondria weaken, slowing brain function",
        "Neurodegeneration leads to shrinking memory networks"
      ],
      howPBMHelps: [
        "Boosts cellular energy (ATP) production",
        "Reduces brain inflammation and oxidative stress",
        "Improves blood flow and oxygenation to memory centers",
        "Stimulates neuroplasticity and new connection formation",
        "Protects neurons from further degeneration"
      ],
      benefits: [
        "Improved recall and short-term memory",
        "Better mental clarity and focus",
        "Reduced confusion or 'brain fog'",
        "Enhanced mood and sleep quality",
        "Support for healthy aging and quality of life"
      ]
    },
    sessionInfo: {
      duration: "25-30 minutes",
      frequency: "2-3 times per week",
      protocol: "8-15 session initial series"
    }
  },
  {
    id: "tbi-concussion",
    title: "TBI & Concussion Recovery",
    shortDescription: "Accelerate healing and restore brain function",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    gradientFrom: "from-white",
    gradientTo: "to-white",
    borderColor: "border-gray-200",
    iconColor: "bg-primary-600",
    badgeColor: "bg-primary-100 text-primary-800 border-primary-200",
    badgeText: "Regenerative",
    progressiveLevels: [
      {
        title: "Recovery Benefits",
        content: "Better memory and focus • Reduced headaches and brain fog • Improved mood and sleep quality • Faster recovery and greater mental clarity • Decreased post-concussion symptoms",
        level: 1,
        audienceLabel: "Patient-Friendly"
      },
      {
        title: "Healing Process",
        content: "After brain injury, swelling and inflammation damage tissue while disrupting normal neural connections. PBM therapy accelerates healing by increasing cellular energy for repair, reducing inflammation and swelling, improving oxygen delivery, and stimulating the growth of new neural pathways to restore function.",
        level: 2,
        audienceLabel: "Informed Patient"
      },
      {
        title: "Therapeutic Mechanisms",
        content: "TBI involves primary mechanical damage followed by secondary injury cascades including excitotoxicity, calcium influx, mitochondrial dysfunction, and neuroinflammation. PBM therapy at specific wavelengths (810-1070nm) penetrates skull tissue, enhances mitochondrial function, reduces microglial activation, promotes angiogenesis, and upregulates neurotrophic factors (BDNF, NGF) essential for axonal regeneration and synaptogenesis.",
        level: 3,
        audienceLabel: "Clinical Detail"
      }
    ],
    brainScience: {
      whatHappens: [
        "Swelling and inflammation damage brain tissue",
        "Blood flow decreases, starving cells of oxygen",
        "Mitochondria become weakened, slowing recovery",
        "Neural connections are disrupted, impairing function"
      ],
      howPBMHelps: [
        "Increases cellular energy (ATP) for repair processes",
        "Reduces brain inflammation and swelling",
        "Improves blood flow and oxygen delivery",
        "Stimulates neuroplasticity and new pathway formation",
        "Balances brain chemistry and neurotransmitters"
      ],
      benefits: [
        "Better memory and focus",
        "Reduced headaches and brain fog",
        "Improved mood and sleep quality",
        "Faster recovery and greater mental clarity",
        "Decreased post-concussion symptoms"
      ]
    },
    sessionInfo: {
      duration: "25-30 minutes",
      frequency: "3-4 times per week initially",
      protocol: "15-25 session recovery program"
    }
  }
];

export default function ConditionSpecificServices() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const servicesRef = useScrollReveal(".condition-card", {
    start: "top 85%",
    stagger: 0.2
  });

  return (
    <section ref={servicesRef} className="py-16 sm:py-20 lg:py-24 bg-white" aria-label="Condition-specific treatments">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-primary mb-4 lg:mb-6 tracking-tight">
            Condition-Specific Brain Treatments
          </h2>
          <p className="text-lg sm:text-xl text-medical-gray-600 leading-relaxed mb-6">
            Targeted photobiomodulation protocols based on detailed brain science and clinical research
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
            <p className="text-medical-gray-700 font-medium text-sm">
              Each treatment protocol is customized using qEEG brain mapping and Brain Gauge assessment
            </p>
          </div>
        </div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {conditionServices.map((service) => (
            <div
              key={service.id}
              className="condition-card medical-card bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all duration-300 hover:shadow-xl"
            >
              {/* Header */}
              <div className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold text-medical-primary">{service.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${service.badgeColor}`}>
                          {service.badgeText}
                        </span>
                      </div>
                      <p className="text-medical-gray-600 leading-relaxed">{service.shortDescription}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2 medical-focus ${
                        expandedService === service.id
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'bg-white text-primary-600 border-primary-600'
                      }`}
                      aria-expanded={expandedService === service.id}
                      aria-label={`Toggle detailed information for ${service.title}`}
                    >
                      {expandedService === service.id ? 'Hide Details' : 'Learn More'}
                    </button>
                    <a
                      href="#contact"
                      className="px-4 py-2 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 text-center medical-focus"
                      aria-label={`Schedule consultation for ${service.title}`}
                    >
                      Schedule Consultation
                    </a>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedService === service.id && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-6 lg:p-8 space-y-8">
                    {/* Progressive Disclosure */}
                    <div>
                      <h4 className="text-xl font-semibold text-medical-primary mb-4">Treatment Information</h4>
                      <ProgressiveDisclosure levels={service.progressiveLevels} />
                    </div>

                    {/* Brain Science */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-white/60 rounded-lg p-4 border border-white/60">
                        <h5 className="font-semibold text-medical-primary mb-3">What Happens in the Brain</h5>
                        <ul className="space-y-2 text-sm text-medical-gray-600">
                          {service.brainScience.whatHappens.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/60 rounded-lg p-4 border border-white/60">
                        <h5 className="font-semibold text-medical-primary mb-3">How PBM Helps</h5>
                        <ul className="space-y-2 text-sm text-medical-gray-600">
                          {service.brainScience.howPBMHelps.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/60 rounded-lg p-4 border border-white/60">
                        <h5 className="font-semibold text-medical-primary mb-3">Expected Benefits</h5>
                        <ul className="space-y-2 text-sm text-medical-gray-600">
                          {service.brainScience.benefits.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Session Information */}
                    <div className="bg-white/60 rounded-lg p-4 border border-white/60">
                      <h5 className="font-semibold text-medical-primary mb-3">Treatment Protocol</h5>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong className="text-medical-gray-700">Session Duration:</strong>
                          <p className="text-medical-gray-600">{service.sessionInfo.duration}</p>
                        </div>
                        <div>
                          <strong className="text-medical-gray-700">Frequency:</strong>
                          <p className="text-medical-gray-600">{service.sessionInfo.frequency}</p>
                        </div>
                        <div>
                          <strong className="text-medical-gray-700">Typical Protocol:</strong>
                          <p className="text-medical-gray-600">{service.sessionInfo.protocol}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Integration Note */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-medical-gray-50 to-blue-50 rounded-xl p-8 border border-medical-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-medical-primary mb-4">Integrated Assessment & Treatment</h3>
            <p className="text-medical-gray-600 leading-relaxed mb-6">
              All condition-specific treatments are guided by objective brain assessments and monitored for progress using our advanced diagnostic tools.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-primary-200">
                <h4 className="font-semibold text-medical-primary mb-2">Brain Gauge Assessment</h4>
                <p className="text-sm text-medical-gray-600">5 key cortical metrics baseline and progress tracking</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-primary-200">
                <h4 className="font-semibold text-medical-primary mb-2">qEEG Brain Mapping</h4>
                <p className="text-sm text-medical-gray-600">Detailed brain activity analysis and treatment targeting</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-primary-200">
                <h4 className="font-semibold text-medical-primary mb-2">Customized Protocols</h4>
                <p className="text-sm text-medical-gray-600">Personalized treatment plans based on your brain data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}