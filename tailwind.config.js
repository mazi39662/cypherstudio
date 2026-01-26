/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                primary: {
                    DEFAULT: '#FFD700',
                    hover: '#FFBF00',
                },
                accent: {
                    DEFAULT: '#FFD700',
                    hover: '#FFBF00',
                }
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.5s ease-out forwards',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
