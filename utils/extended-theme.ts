import { type Config } from 'tailwindcss';

export const extendedTheme = {
	colors: {
		// white: 'rgb(var(--white))',
		border: {
			DEFAULT: 'rgb(var(--gray-100))',
			light: 'rgb(var(--gray-50))',
		},

		// error: 'rgb(var(--error))',
		// warning: 'rgb(var(--warning))',
		// success: 'rgb(var(--success))',

		// gray: {
		// 	25: 'rgb(var(--gray-25))',
		// 	50: 'rgb(var(--gray-50))',
		// 	100: 'rgb(var(--gray-100))',
		// 	200: 'rgb(var(--gray-200))',
		// 	300: 'rgb(var(--gray-300))',
		// 	400: 'rgb(var(--gray-400))',
		// 	500: 'rgb(var(--gray-500))',
		// 	primary: 'rgb(var(--gray-primary))',
		// },

		// purple: {
		// 	25: 'rgb(var(--purple-25))',
		// 	50: 'rgb(var(--purple-50))',
		// 	100: 'rgb(var(--purple-100))',
		// 	200: 'rgb(var(--purple-200))',
		// 	300: 'rgb(var(--purple-300))',
		// 	400: 'rgb(var(--purple-400))',
		// 	500: 'rgb(var(--purple-500))',
		// 	primary: 'rgb(var(--purple-primary))',
		// },
	},
	borderRadius: {
		none: '0',
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)',
		full: '9999px',
	},
	spacing: {
		xxs: '.25rem',
		xs: '.5rem',
		sm: '.75rem',
		md: '1rem',
		lg: '1.5rem',
		xl: '2rem',
		xxl: '3rem',
		xxxl: '4rem',
	},
	width: {
		xxs: '.5rem',
		xs: '.75rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '3rem',
		xxl: '4rem',
	},
	height: {
		xxs: '.5rem',
		xs: '.75rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '3rem',
		xxl: '4rem',
	},
	fontSize: {
		/** 42px size / 46.2px high / bold */
		h1: ['2.625rem', { lineHeight: '2.8875rem', fontWeight: '700', letterSpacing: '-1.26px' }],
		/** 32px size / 35.2px high / bold */
		h2: ['2rem', { lineHeight: '2.2rem', fontWeight: '700', letterSpacing: '-0.96px' }],
		/** 28px size / 33.6px high / bold */
		h3: ['1.75rem', { lineHeight: '2.1rem', fontWeight: '700', letterSpacing: '-0.42px' }],
		/** 24px size / 28.8px high / bold */
		h4: ['1.5rem', { lineHeight: '1.8rem', fontWeight: '700', letterSpacing: '-0.48px' }],
		/** 20px size / 24px high / bold */
		h5: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700', letterSpacing: '-0.4px' }],
		/** 20px size / 24px high / bold */
		h6: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '700', letterSpacing: '-0.4px' }],

		/** 32px size / 41.6px high / normal */
		'body-2xl': ['2rem', { lineHeight: '2.6rem', letterSpacing: '-0.3px' }],
		/** 24px size / 31.2px high / normal */
		'body-xl': ['1.5rem', { lineHeight: '1.95rem', letterSpacing: '-0.3px' }],
		/** 20px size / 26px high / normal */
		'body-lg': ['1.25rem', { lineHeight: '1.625rem', letterSpacing: '-0.3px' }],
		/** 16px size / 20.8px high / normal */
		'body-md': ['1rem', { lineHeight: '1.3rem', letterSpacing: '-0.16px' }],
		/** 14px size / 18.2px high / normal */
		'body-sm': ['0.875rem', { lineHeight: '1.1375rem', letterSpacing: '-0.14px' }],
		/** 12px size / 15.6px high / normal */
		'body-xs': ['0.75rem', { lineHeight: '0.975rem', letterSpacing: '-0.06px' }],
		/** 10px size / 12.8px high / normal */
		'body-xxs': ['0.625rem', { lineHeight: '0.8rem', letterSpacing: '-0.01px' }],

		/** 10px size / 11px high / bold */
		'button-xs': ['0.625rem', { lineHeight: '0.6875rem', fontWeight: '700' }],
		/** 12px size / 13.2px high / bold */
		'button-sm': ['0.75rem', { lineHeight: '0.825rem', fontWeight: '700' }],
		/** 16px size / 17.6px high / bold */
		'button-md': ['1rem', { lineHeight: '1.1rem', fontWeight: '700' }],
		/** 20px size / 22px high / bold */
		'button-lg': ['1.25rem', { lineHeight: '1.375rem', fontWeight: '700' }],
	},
	keyframes: {
		'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' },
		},
		'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' },
		},
	},
	animation: {
		'accordion-down': 'accordion-down 0.2s ease-out',
		'accordion-up': 'accordion-up 0.2s ease-out',
	},
} satisfies Config['theme'];
