import type { Config } from 'tailwindcss';
import { keepTheme } from 'keep-react/keepTheme';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Adjust path to include TypeScript and JavaScript files
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Ensure paths include all relevant directories
  ],
  theme: {
    extend: {
      fontWeight: {
        'extra-light': '200',
        'light-bold': '700',
        'blackest': '950'
      }
    },
  },
  plugins: [
    // Add any plugins you might be using
  ],
};

export default keepTheme(config);
