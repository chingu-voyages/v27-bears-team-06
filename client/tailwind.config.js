const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            // transparent: 'transparent',
            current: 'currentColor',
            ...colors
          },
        extend: {
            fontFamily: {
                'source-sans-pro': ['Source Sans Pro'],
                mitr: ['Mitr'],
                'roboto-slab': ['Roboto Slab'],
            },
            keyframes: {
                'slide-in-bottom': {
                    from: {
                        opacity: '0',
                        transform: 'translateY(1000px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                },
                'slide-out-bottom': {
                    from: {
                        opacity: '1',
                        transform: 'translateY(0px)',
                    },
                    to: {
                        opacity: '0',
                        transform: 'translateY(1000px)',
                    },
                },
            },
            animation: {
                'slide-in-bottom': 'slide-in-bottom 0.75s both',
                'slide-out-bottom': 'slide-out-bottom 0.75s both',
            },
        },
        screens: {
            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' },
            // => @media (max-width: 639px) { ... }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [],
};
