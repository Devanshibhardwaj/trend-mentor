
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".dark"],
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
				sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
				display: ["Poppins", "Inter", "system-ui", "sans-serif"],
			},
			scale: {
				'98': '0.98',
			},
			colors: {
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
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addBase, theme }) {
			addBase({
				':root': {
					'--primary-rgb': '255, 255, 255',
					'--accent-rgb': '200, 200, 200',
				},
				'.light': {
					'--primary-rgb': '0, 0, 0',
					'--accent-rgb': '50, 50, 50',
				},
				'.vibrant': {
					'--primary-rgb': '157, 100, 255',
					'--accent-rgb': '200, 100, 255',
				},
				'.pastel': {
					'--primary-rgb': '100, 150, 255',
					'--accent-rgb': '255, 150, 180',
				},
                // Adding transition classes for theme changes
                '.from-dark': {
                    '--from-bg': '30, 30, 30',
                    '--from-text': '255, 255, 255',
                },
                '.from-light': {
                    '--from-bg': '255, 255, 255',
                    '--from-text': '30, 30, 30',
                },
                '.from-vibrant': {
                    '--from-bg': '36, 16, 56',
                    '--from-text': '157, 100, 255',
                },
                '.from-pastel': {
                    '--from-bg': '230, 240, 250',
                    '--from-text': '100, 150, 255',
                },
			});
		},
	],
} satisfies Config;
