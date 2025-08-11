
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".nautical", ".galaxy"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				display: ["Playfair Display", "Georgia", "serif"],
				serif: ["Playfair Display", "Georgia", "serif"],
				fashion: ["Futura", "Montserrat", "system-ui", "sans-serif"],
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
				'7xl': ['4.5rem', { lineHeight: '1.1' }],
				'8xl': ['6rem', { lineHeight: '1.1' }],
				'9xl': ['8rem', { lineHeight: '1.1' }],
			},
			scale: {
				'98': '0.98',
			},
			colors: {
				"luxury": {
					"blue": {
						DEFAULT: "#0d2b4b",
						"50": "#f0f6fc",
						"100": "#dbe8f7",
						"200": "#bad3ef",
						"300": "#86b2e3",
						"400": "#5088d0",
						"500": "#2d67bc",
						"600": "#1e4d99",
						"700": "#193d7b",
						"800": "#173666",
						"900": "#173056",
					},
					"gold": {
						DEFAULT: "#a67c00",
						"50": "#fffbeb",
						"100": "#fef3c7",
						"200": "#fde68a",
						"300": "#fcd34d",
						"400": "#fbbf24",
						"500": "#f59e0b",
						"600": "#d97706",
						"700": "#b45309",
						"800": "#92400e",
						"900": "#78350f",
					},
					"emerald": {
						DEFAULT: "#064e3b",
						"50": "#ecfdf5",
						"100": "#d1fae5",
						"200": "#a7f3d0",
						"300": "#6ee7b7",
						"400": "#34d399",
						"500": "#10b981",
						"600": "#059669",
						"700": "#047857",
						"800": "#065f46",
						"900": "#064e3b",
					}
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-down': {
					from: { opacity: '0', transform: 'translateY(-20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-subtle': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'rotate-gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				'morphing': {
					'0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
					'50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
					'100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' },
				},
                'confetti-fall': {
                    '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
                },
                'pop-in': {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '70%': { transform: 'scale(1.1)', opacity: '1' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'swing': {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'fade-down': 'fade-down 0.6s ease-out',
				'slow-fade-in': 'fade-in 1.2s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float 8s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s infinite linear',
				'scale-in': 'scale-in 0.2s ease-out forwards',
				'rotate-gradient': 'rotate-gradient 6s linear infinite',
				'morphing': 'morphing 8s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'scale-in-out': 'scale-in-out 2s ease-in-out infinite',
                'confetti-fall': 'confetti-fall 3s forwards',
                'pop-in': 'pop-in 0.5s forwards',
                'swing': 'swing 2s ease-in-out infinite',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase, theme }) {
			addBase({
				':root': {
					'--primary-rgb': '13, 43, 75',
					'--accent-rgb': '6, 78, 59',
                    '--radius': '0.5rem',
				},
				'.nautical': {
					'--background': '210 50% 10%',
                    '--foreground': '210 40% 98%',
                    '--card': '210 50% 13%',
                    '--card-foreground': '210 40% 98%',
                    '--popover': '210 50% 13%',
                    '--popover-foreground': '210 40% 98%',
                    '--primary': '200 85% 60%',
                    '--primary-foreground': '210 50% 10%',
                    '--secondary': '210 40% 20%',
                    '--secondary-foreground': '210 40% 98%',
                    '--muted': '210 40% 20%',
                    '--muted-foreground': '210 30% 70%',
                    '--accent': '200 75% 40%',
                    '--accent-foreground': '210 40% 98%',
                    '--destructive': '0 70% 50%',
                    '--destructive-foreground': '210 40% 98%',
                    '--border': '210 40% 20%',
                    '--input': '210 40% 20%',
                    '--ring': '200 85% 60%',
					'--primary-rgb': '56, 189, 248',
					'--accent-rgb': '28, 126, 214',
				},
				'.sunset': {
					'--background': '32 95% 98%',
                    '--foreground': '32 30% 15%',
                    '--card': '32 95% 99%',
                    '--card-foreground': '32 30% 15%',
                    '--popover': '32 95% 99%',
                    '--popover-foreground': '32 30% 15%',
                    '--primary': '20 90% 60%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '32 80% 90%',
                    '--secondary-foreground': '32 30% 15%',
                    '--muted': '32 80% 95%',
                    '--muted-foreground': '32 30% 40%',
                    '--accent': '12 80% 55%',
                    '--accent-foreground': '32 30% 15%',
                    '--destructive': '0 85% 60%',
                    '--destructive-foreground': '0 0% 98%',
                    '--border': '32 80% 85%',
                    '--input': '32 80% 80%',
                    '--ring': '20 90% 60%',
					'--primary-rgb': '249, 115, 22',
					'--accent-rgb': '234, 88, 12',
				},
				'.forest': {
					'--background': '120 40% 98%',
                    '--foreground': '120 30% 15%',
                    '--card': '120 40% 99%',
                    '--card-foreground': '120 30% 15%',
                    '--popover': '120 40% 99%',
                    '--popover-foreground': '120 30% 15%',
                    '--primary': '140 70% 30%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '120 25% 90%',
                    '--secondary-foreground': '120 30% 15%',
                    '--muted': '120 25% 92%',
                    '--muted-foreground': '120 15% 40%',
                    '--accent': '160 60% 30%',
                    '--accent-foreground': '120 40% 98%',
                    '--destructive': '0 85% 60%',
                    '--destructive-foreground': '0 0% 98%',
                    '--border': '120 25% 85%',
                    '--input': '120 25% 80%',
                    '--ring': '140 70% 30%',
					'--primary-rgb': '21, 128, 61',
					'--accent-rgb': '16, 185, 129',
				},
				'.galaxy': {
					'--background': '260 40% 12%',
                    '--foreground': '260 40% 98%',
                    '--card': '260 40% 15%',
                    '--card-foreground': '260 40% 98%',
                    '--popover': '260 40% 15%',
                    '--popover-foreground': '260 40% 98%',
                    '--primary': '270 80% 70%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '260 30% 25%',
                    '--secondary-foreground': '260 40% 98%',
                    '--muted': '260 30% 25%',
                    '--muted-foreground': '260 20% 70%',
                    '--accent': '290 70% 60%',
                    '--accent-foreground': '260 40% 98%',
                    '--destructive': '0 70% 50%',
                    '--destructive-foreground': '260 40% 98%',
                    '--border': '260 30% 25%',
                    '--input': '260 30% 20%',
                    '--ring': '270 80% 70%',
					'--primary-rgb': '170, 135, 250',
					'--accent-rgb': '192, 132, 252',
				},
				'.system': {
					'--background': '0 0% 100%',
                    '--foreground': '222 47% 11%',
                    '--card': '0 0% 100%',
                    '--card-foreground': '222 47% 11%',
                    '--popover': '0 0% 100%',
                    '--popover-foreground': '222 47% 11%',
                    '--primary': '222 47% 50%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '210 40% 96.1%',
                    '--secondary-foreground': '222 47% 11%',
                    '--muted': '210 40% 96.1%',
                    '--muted-foreground': '215.4 16.3% 46.9%',
                    '--accent': '210 40% 96.1%',
                    '--accent-foreground': '222 47% 11%',
                    '--destructive': '0 84.2% 60.2%',
                    '--destructive-foreground': '210 40% 98%',
                    '--border': '214.3 31.8% 91.4%',
                    '--input': '214.3 31.8% 91.4%',
                    '--ring': '222 47% 50%',
					'--primary-rgb': '59, 130, 246',
					'--accent-rgb': '96, 165, 250',
				},
                '.from-nautical': {
                    '--from-bg': '210 50% 10%',
                    '--from-text': '210 40% 98%',
                },
                '.from-sunset': {
                    '--from-bg': '32 95% 98%',
                    '--from-text': '32 30% 15%',
                },
                '.from-forest': {
                    '--from-bg': '120 40% 98%',
                    '--from-text': '120 30% 15%',
                },
                '.from-galaxy': {
                    '--from-bg': '260 40% 12%',
                    '--from-text': '260 40% 98%',
                },
                '.from-system': {
                    '--from-bg': '0 0% 100%',
                    '--from-text': '222 47% 11%',
                },
                '.from-elegant': {
                    '--from-bg': '222 47% 11%',
                    '--from-text': '210 40% 98%',
                },
                '.from-vibrant': {
                    '--from-bg': '260 20% 12%',
                    '--from-text': '280 60% 92%',
                },
                '.from-playful': {
                    '--from-bg': '350 100% 98%',
                    '--from-text': '350 20% 20%',
                },
                '.from-cosmic': {
                    '--from-bg': '230 25% 12%',
                    '--from-text': '210 40% 98%',
                },
			});
		},
	],
} satisfies Config;
