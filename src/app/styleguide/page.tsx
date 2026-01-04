import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BrainThrive Medical Design System - Styleguide',
  description: 'Comprehensive design system and styleguide for BrainThrive medical website',
}

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-medical-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-medical-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-medical-gray-900">BrainThrive Medical Design System</h1>
          <p className="text-lg text-medical-gray-600 mt-2">Comprehensive styleguide for neurology and photobiomodulation therapy website</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-medical-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <a href="#colors" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Colors</a>
            <a href="#typography" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Typography</a>
            <a href="#buttons" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Buttons</a>
            <a href="#cards" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Cards</a>
            <a href="#service-themes" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Service Themes</a>
            <a href="#accessibility" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Accessibility</a>
            <a href="#usage" className="text-sm font-medium text-medical-gray-700 hover:text-medical-accent whitespace-nowrap">Usage Guidelines</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Color System</h2>
          <p className="text-medical-gray-600 mb-8">Medical-grade color palette designed for accessibility and trust. All colors meet WCAG 2.1 AA standards with 4.5:1 contrast ratios minimum.</p>

          {/* Medical Core Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-medical-gray-800 mb-4">Medical Core Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="medical-card bg-white p-4 rounded-lg">
                <div className="w-full h-20 bg-medical-primary rounded mb-3"></div>
                <h4 className="font-medium text-medical-gray-900">Primary</h4>
                <p className="text-sm text-medical-gray-600">#0F172A</p>
                <p className="text-xs text-medical-gray-500">medical-primary</p>
              </div>
              <div className="medical-card bg-white p-4 rounded-lg">
                <div className="w-full h-20 bg-medical-secondary rounded mb-3"></div>
                <h4 className="font-medium text-medical-gray-900">Secondary</h4>
                <p className="text-sm text-medical-gray-600">#1E293B</p>
                <p className="text-xs text-medical-gray-500">medical-secondary</p>
              </div>
              <div className="medical-card bg-white p-4 rounded-lg">
                <div className="w-full h-20 bg-medical-accent rounded mb-3"></div>
                <h4 className="font-medium text-medical-gray-900">Accent</h4>
                <p className="text-sm text-medical-gray-600">#1E40AF</p>
                <p className="text-xs text-medical-gray-500">medical-accent</p>
              </div>
              <div className="medical-card bg-white p-4 rounded-lg">
                <div className="w-full h-20 bg-medical-error rounded mb-3"></div>
                <h4 className="font-medium text-medical-gray-900">Emergency</h4>
                <p className="text-sm text-medical-gray-600">#B91C1C</p>
                <p className="text-xs text-medical-gray-500">medical-error</p>
              </div>
            </div>
          </div>

          {/* Service Theme Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-medical-gray-800 mb-4">Service Theme Colors</h3>

            {/* Blue Theme */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-medical-gray-700 mb-3">Blue Theme - Photobiomodulation</h4>
              <div className="flex flex-wrap gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div className={`w-16 h-16 bg-brand-blue-${shade} rounded mb-2 border border-medical-gray-200`}></div>
                    <p className="text-xs text-medical-gray-600">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purple Theme */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-medical-gray-700 mb-3">Purple Theme - Brain Performance</h4>
              <div className="flex flex-wrap gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div className={`w-16 h-16 bg-brand-purple-${shade} rounded mb-2 border border-medical-gray-200`}></div>
                    <p className="text-xs text-medical-gray-600">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teal Theme */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-medical-gray-700 mb-3">Teal Theme - Brain Mapping</h4>
              <div className="flex flex-wrap gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div className={`w-16 h-16 bg-brand-teal-${shade} rounded mb-2 border border-medical-gray-200`}></div>
                    <p className="text-xs text-medical-gray-600">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gray Scale */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-medical-gray-800 mb-4">Medical Gray Scale</h3>
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="text-center">
                  <div className={`w-16 h-16 bg-medical-gray-${shade} rounded mb-2 border border-medical-gray-200`}></div>
                  <p className="text-xs text-medical-gray-600">{shade}</p>
                  <p className="text-xs text-medical-gray-500">gray-{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Typography</h2>
          <p className="text-medical-gray-600 mb-8">Clean, professional typography optimized for medical content readability and accessibility.</p>

          <div className="medical-card bg-white p-6 rounded-lg space-y-6">
            <div>
              <h1 className="text-5xl font-bold text-medical-gray-900">Heading 1 - Hero Title</h1>
              <p className="text-sm text-medical-gray-500 mt-2">text-5xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-medical-gray-900">Heading 2 - Section Title</h2>
              <p className="text-sm text-medical-gray-500 mt-2">text-3xl font-bold</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-medical-gray-800">Heading 3 - Subsection</h3>
              <p className="text-sm text-medical-gray-500 mt-2">text-xl font-semibold</p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-medical-gray-700">Heading 4 - Card Title</h4>
              <p className="text-sm text-medical-gray-500 mt-2">text-lg font-medium</p>
            </div>
            <div>
              <p className="text-base text-medical-gray-600">Body text - Regular paragraph content for medical information and descriptions.</p>
              <p className="text-sm text-medical-gray-500 mt-2">text-base text-medical-gray-600</p>
            </div>
            <div>
              <p className="text-sm text-medical-gray-500">Small text - Supporting information, captions, and metadata.</p>
              <p className="text-sm text-medical-gray-500 mt-2">text-sm text-medical-gray-500</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Button Components</h2>
          <p className="text-medical-gray-600 mb-8">Medical-grade buttons with proper contrast ratios and accessibility features.</p>

          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-lg font-medium text-medical-gray-800 mb-4">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Blue Primary
                </button>
                <button className="medical-button bg-brand-purple-600 hover:bg-brand-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Purple Primary
                </button>
                <button className="medical-button bg-brand-teal-600 hover:bg-brand-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Teal Primary
                </button>
                <button className="emergency-contact px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Emergency Contact
                </button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="text-lg font-medium text-medical-gray-800 mb-4">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="medical-button border-2 border-brand-blue-600 text-brand-blue-600 hover:bg-brand-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Blue Outline
                </button>
                <button className="medical-button border-2 border-brand-purple-600 text-brand-purple-600 hover:bg-brand-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Purple Outline
                </button>
                <button className="medical-button border-2 border-brand-teal-600 text-brand-teal-600 hover:bg-brand-teal-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Teal Outline
                </button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-medium text-medical-gray-800 mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-all duration-200">
                  Small
                </button>
                <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2 rounded font-medium transition-all duration-200">
                  Medium
                </button>
                <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Large
                </button>
                <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200">
                  Extra Large
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Card Components</h2>
          <p className="text-medical-gray-600 mb-8">Medical card components with proper shadows and professional styling.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Card */}
            <div className="medical-card bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-medical-gray-900 mb-3">Basic Medical Card</h3>
              <p className="text-medical-gray-600 mb-4">Standard card with medical-grade shadows and professional appearance.</p>
              <p className="text-sm text-medical-gray-500">Classes: medical-card bg-white p-6 rounded-lg</p>
            </div>

            {/* Blue Theme Card */}
            <div className="medical-card bg-gradient-to-br from-brand-blue-50 to-white rounded-lg p-6 border-2 border-brand-blue-200">
              <div className="w-12 h-12 bg-brand-blue-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h3 className="text-lg font-medium text-medical-gray-900 mb-3">Blue Theme Card</h3>
              <p className="text-medical-gray-600 mb-4">Card with blue gradient background and themed elements.</p>
              <button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2 rounded font-medium transition-all duration-200">
                Action Button
              </button>
            </div>

            {/* Purple Theme Card */}
            <div className="medical-card bg-gradient-to-br from-brand-purple-50 to-white rounded-lg p-6 border-2 border-brand-purple-200">
              <div className="w-12 h-12 bg-brand-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <h3 className="text-lg font-medium text-medical-gray-900 mb-3">Purple Theme Card</h3>
              <p className="text-medical-gray-600 mb-4">Card with purple gradient background and themed elements.</p>
              <button className="medical-button bg-brand-purple-600 hover:bg-brand-purple-700 text-white px-4 py-2 rounded font-medium transition-all duration-200">
                Action Button
              </button>
            </div>
          </div>
        </section>

        {/* Service Themes Section */}
        <section id="service-themes" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Service Theme Implementation</h2>
          <p className="text-medical-gray-600 mb-8">Complete service card implementations with color-coded themes for different medical services.</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Photobiomodulation Service */}
            <div className="medical-card bg-gradient-to-br from-brand-blue-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-blue-200 hover:border-brand-blue-400 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blue-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>

              <h3 className="text-xl font-bold text-medical-gray-900 mb-3">Photobiomodulation Service</h3>
              <p className="text-medical-gray-600 mb-6">Advanced light therapy for neurological healing and cellular regeneration.</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-blue-600 rounded mr-3"></div>
                  FDA-cleared technology
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-blue-600 rounded mr-3"></div>
                  Non-invasive treatment
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-blue-600 rounded mr-3"></div>
                  Evidence-based protocols
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full medical-button bg-brand-blue-600 hover:bg-brand-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Call Us
                </button>
                <button className="w-full medical-button border-2 border-brand-blue-600 text-brand-blue-600 hover:bg-brand-blue-600 hover:text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Brain Performance Assessment */}
            <div className="medical-card bg-gradient-to-br from-brand-purple-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-purple-200 hover:border-brand-purple-400 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-purple-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>

              <h3 className="text-xl font-bold text-medical-gray-900 mb-3">Brain Performance Assessment</h3>
              <p className="text-medical-gray-600 mb-6">Comprehensive cognitive evaluation and performance optimization analysis.</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-purple-600 rounded mr-3"></div>
                  Cognitive testing
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-purple-600 rounded mr-3"></div>
                  Memory evaluation
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-purple-600 rounded mr-3"></div>
                  Performance metrics
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full medical-button bg-brand-purple-600 hover:bg-brand-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Contact Us
                </button>
                <button className="w-full medical-button border-2 border-brand-purple-600 text-brand-purple-600 hover:bg-brand-purple-600 hover:text-white py-3 rounded-lg font-medium transition-all duration-200">
                  View Research
                </button>
              </div>
            </div>

            {/* Advanced Brain Mapping */}
            <div className="medical-card bg-gradient-to-br from-brand-teal-50 to-white rounded-xl p-6 lg:p-8 border-2 border-brand-teal-200 hover:border-brand-teal-400 transition-all duration-300">
              <div className="w-16 h-16 bg-brand-teal-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>

              <h3 className="text-xl font-bold text-medical-gray-900 mb-3">Advanced Brain Mapping</h3>
              <p className="text-medical-gray-600 mb-6">Detailed neurological mapping and brain activity analysis technology.</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-teal-600 rounded mr-3"></div>
                  qEEG brain mapping
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-teal-600 rounded mr-3"></div>
                  Detailed analysis
                </div>
                <div className="flex items-center text-sm text-medical-gray-700">
                  <div className="w-4 h-4 bg-brand-teal-600 rounded mr-3"></div>
                  Treatment planning
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full medical-button bg-brand-teal-600 hover:bg-brand-teal-700 text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Contact Us
                </button>
                <button className="w-full medical-button border-2 border-brand-teal-600 text-brand-teal-600 hover:bg-brand-teal-600 hover:text-white py-3 rounded-lg font-medium transition-all duration-200">
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section id="accessibility" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Accessibility Standards</h2>
          <p className="text-medical-gray-600 mb-8">WCAG 2.1 AA compliant design system ensuring medical website accessibility for all patients.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="medical-card bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-medical-gray-900 mb-4">Color Contrast Ratios</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-medical-gray-700">Primary Text</span>
                  <span className="font-mono text-sm bg-medical-gray-100 px-2 py-1 rounded">12:1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-medical-gray-600">Secondary Text</span>
                  <span className="font-mono text-sm bg-medical-gray-100 px-2 py-1 rounded">7:1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-medical-gray-500">Supporting Text</span>
                  <span className="font-mono text-sm bg-medical-gray-100 px-2 py-1 rounded">4.5:1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-blue-600">Primary Actions</span>
                  <span className="font-mono text-sm bg-medical-gray-100 px-2 py-1 rounded">4.5:1</span>
                </div>
              </div>
            </div>

            <div className="medical-card bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-medical-gray-900 mb-4">Focus Indicators</h3>
              <div className="space-y-4">
                <button className="medical-button bg-brand-blue-600 text-white px-4 py-2 rounded font-medium focus:outline-3 focus:outline-blue-300 focus:outline-offset-2">
                  Focusable Button
                </button>
                <input
                  type="text"
                  placeholder="Focusable Input"
                  className="w-full px-3 py-2 border border-medical-gray-300 rounded focus:outline-3 focus:outline-blue-300 focus:outline-offset-2"
                />
                <p className="text-sm text-medical-gray-600">All interactive elements have 3px focus indicators with 2px offset for visibility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines Section */}
        <section id="usage" className="mb-16">
          <h2 className="text-2xl font-bold text-medical-gray-900 mb-6">Usage Guidelines</h2>
          <p className="text-medical-gray-600 mb-8">Best practices for implementing the BrainThrive medical design system.</p>

          <div className="space-y-8">
            <div className="medical-card bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-medical-gray-900 mb-4">Color Theme Assignment</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-brand-blue-50 border border-brand-blue-200 rounded-lg">
                  <h4 className="font-medium text-brand-blue-700 mb-2">Blue Theme</h4>
                  <p className="text-sm text-medical-gray-600">Technology-focused services, photobiomodulation, equipment-based treatments</p>
                </div>
                <div className="p-4 bg-brand-purple-50 border border-brand-purple-200 rounded-lg">
                  <h4 className="font-medium text-brand-purple-700 mb-2">Purple Theme</h4>
                  <p className="text-sm text-medical-gray-600">Cognitive services, neurology, brain performance, assessment services</p>
                </div>
                <div className="p-4 bg-brand-teal-50 border border-brand-teal-200 rounded-lg">
                  <h4 className="font-medium text-brand-teal-700 mb-2">Teal Theme</h4>
                  <p className="text-sm text-medical-gray-600">Wellness services, mapping, analysis, health optimization</p>
                </div>
              </div>
            </div>

            <div className="medical-card bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium text-medical-gray-900 mb-4">Implementation Classes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-medical-gray-800 mb-2">Service Cards</h4>
                  <pre className="bg-medical-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<div className="medical-card bg-gradient-to-br from-brand-blue-50 to-white
     rounded-xl p-6 border-2 border-brand-blue-200
     hover:border-brand-blue-400 transition-all duration-300">
  <!-- Card content -->
</div>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium text-medical-gray-800 mb-2">Primary Buttons</h4>
                  <pre className="bg-medical-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<button className="medical-button bg-brand-blue-600 hover:bg-brand-blue-700
        text-white px-6 py-3 rounded-lg font-medium
        transition-all duration-200">
  Button Text
</button>`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium text-medical-gray-800 mb-2">Outline Buttons</h4>
                  <pre className="bg-medical-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<button className="medical-button border-2 border-brand-blue-600
        text-brand-blue-600 hover:bg-brand-blue-600 hover:text-white
        px-6 py-3 rounded-lg font-medium transition-all duration-200">
  Button Text
</button>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}