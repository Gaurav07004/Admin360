import type { Config } from 'tailwindcss'
import { keepTheme } from "keep-react/keepTheme";

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Open Sans"', 'sans-serif'],
      },
      animation: {
        rotate: 'rotate 2s infinite linear',
        'bounce-slow': 'bounce-slow 2s infinite ease-in-out',
        scaleout: 'scaleout 2s infinite ease-in-out',
        fadeIn: "fadeIn 0.5s ease-in-out",
        pingSlow: 'pingSlow 2.5s ease-out infinite',
        icon: "rotateIcon 1s ease-in-out",
      },
      keyframes: {
        scaleout: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.99)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        pingSlow: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'scale(1.6)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
        rotateIcon: {
          "0%": { transform: "rotate(0deg) scale(0.5)", opacity: "0" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "1" },
        },
      },
      screens: {
        'sm-320': '320px',
        'sm-480': '480px',
        'sm-767': '767px',
        'sm-991': '991px',
        'sm-992': '1025px',
      },
    },
  },
  plugins: [],
};

// Wrap the config with keepTheme if that's the expected behavior
export default keepTheme(config);
