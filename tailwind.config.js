/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Blue theme
                accent: {
                    DEFAULT: '#2563eb',
                    light: '#3b82f6',
                    dark: '#1d4ed8',
                    glow: 'rgba(37, 99, 235, 0.15)',
                },
                bg: {
                    DEFAULT: '#f9fafc',
                    card: '#ffffff',
                    subtle: '#eef2f9',
                },
                border: {
                    DEFAULT: '#dbe2ec',
                    glow: 'rgba(37, 99, 235, 0.4)',
                },
                text: {
                    DEFAULT: '#1e2636',
                    secondary: '#4b5568',
                    muted: '#5f6b7e',
                },
                danger: '#ef4444',
                warning: '#f59e0b',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                outfit: ['var(--font-outfit)', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '14px',
                sm: '8px',
                lg: '20px',
            },
            boxShadow: {
                card: '0 4px 18px rgba(30, 38, 54, 0.035)',
                glow: '0 4px 20px rgba(37, 99, 235, 0.15)',
                'glow-lg': '0 8px 30px rgba(37, 99, 235, 0.2)',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                'gradient-critical': 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                'gradient-backlog': 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
