/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'medical': {
          'primary': '#2563eb',     // Clean medical blue
          'secondary': '#1e40af',   // Darker blue
          'accent': '#3b82f6',      // Lighter blue
          'success': '#059669',     // Medical green
          'warning': '#d97706',     // Medical orange
          'error': '#dc2626',       // Medical red
          'light': '#f8fafc',       // Very light gray
          'gray': {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a'
          }
        },
        // Keep legacy colors for compatibility
        'medical-blue': '#2563eb',
        'medical-light': '#3b82f6'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'medical': ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'medical': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medical-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'medical-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: [],
}
