import type { Config } from 'tailwindcss';
import { keepTheme } from 'keep-react/keepTheme';

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
      },
    },
  },
  plugins: [],
};

// Make sure to use the correct way to export the theme config
export default keepTheme(config);
