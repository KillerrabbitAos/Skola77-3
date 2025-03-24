import tailwindConfig from './tailwind.config.js'; // Import the TypeScript config

export default {
    plugins: {
        '@tailwindcss/postcss': tailwindConfig, // Use the imported Tailwind config
        autoprefixer: {},
    },
};