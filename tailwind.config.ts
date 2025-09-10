import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      animation: {
        'lightning-flash': 'lightningFlash 0.1s infinite alternate',
        'thunder-pulse': 'thunderPulse 0.5s infinite ease-in-out',
        'epic-glow': 'epicGlow 1s infinite alternate',
        'mega-bounce': 'megaBounce 0.6s infinite',
        'crazy-spin': 'crazySpin 2s linear infinite',
        'flash-colors': 'flashColors 0.3s infinite alternate',
        'shake-violent': 'shakeViolent 0.1s infinite',
        'zoom-intense': 'zoomIntense 0.8s infinite alternate',
      },
      keyframes: {
        lightningFlash: {
          '0%': { 
            backgroundColor: '#000',
            boxShadow: '0 0 50px #fff, 0 0 100px #00f, 0 0 150px #f0f'
          },
          '100%': { 
            backgroundColor: '#fff',
            boxShadow: '0 0 100px #fff, 0 0 200px #00f, 0 0 300px #f0f'
          },
        },
        thunderPulse: {
          '0%': { 
            transform: 'scale(1)',
            filter: 'brightness(1) contrast(1)',
          },
          '50%': { 
            transform: 'scale(1.2)',
            filter: 'brightness(2) contrast(3)',
          },
          '100%': { 
            transform: 'scale(1)',
            filter: 'brightness(1) contrast(1)',
          },
        },
        epicGlow: {
          '0%': { 
            boxShadow: '0 0 20px #ff0080, 0 0 40px #8000ff, 0 0 60px #00ff80',
          },
          '100%': { 
            boxShadow: '0 0 40px #00ff80, 0 0 80px #ff0080, 0 0 120px #8000ff',
          },
        },
        megaBounce: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.1)' },
        },
        crazySpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flashColors: {
          '0%': { color: '#ff0000', textShadow: '0 0 10px #ff0000' },
          '25%': { color: '#00ff00', textShadow: '0 0 10px #00ff00' },
          '50%': { color: '#0000ff', textShadow: '0 0 10px #0000ff' },
          '75%': { color: '#ff00ff', textShadow: '0 0 10px #ff00ff' },
          '100%': { color: '#ffff00', textShadow: '0 0 10px #ffff00' },
        },
        shakeViolent: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px) translateY(-5px)' },
          '50%': { transform: 'translateX(5px) translateY(5px)' },
          '75%': { transform: 'translateX(-5px) translateY(5px)' },
          '100%': { transform: 'translateX(5px) translateY(-5px)' },
        },
        zoomIntense: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;