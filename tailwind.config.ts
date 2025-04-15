
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".elegant", ".cosmic"],
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
					'--primary-rgb': '79, 70, 229',
					'--accent-rgb': '138, 116, 255',
                    '--radius': '1rem',
				},
				'.elegant': {
					'--background': '222 47% 11%',
                    '--foreground': '210 40% 98%',
                    '--card': '222 47% 11%',
                    '--card-foreground': '210 40% 98%',
                    '--popover': '222 47% 11%',
                    '--popover-foreground': '210 40% 98%',
                    '--primary': '238 75% 57%',
                    '--primary-foreground': '222 47% 11%',
                    '--secondary': '217.2 32.6% 17.5%',
                    '--secondary-foreground': '210 40% 98%',
                    '--muted': '217.2 32.6% 17.5%',
                    '--muted-foreground': '215 20.2% 65.1%',
                    '--accent': '217.2 32.6% 17.5%',
                    '--accent-foreground': '210 40% 98%',
                    '--destructive': '0 62.8% 30.6%',
                    '--destructive-foreground': '210 40% 98%',
                    '--border': '217.2 32.6% 17.5%',
                    '--input': '217.2 32.6% 17.5%',
                    '--ring': '224.3 76.3% 48%',
					'--primary-rgb': '79, 70, 229',
					'--accent-rgb': '138, 116, 255',
				},
				'.vibrant': {
					'--background': '260 20% 12%',
                    '--foreground': '280 60% 92%',
                    '--card': '262 22% 15%',
                    '--card-foreground': '280 60% 92%',
                    '--popover': '262 22% 15%',
                    '--popover-foreground': '280 60% 92%',
                    '--primary': '267 75% 60%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '278 40% 24%',
                    '--secondary-foreground': '280 60% 92%',
                    '--muted': '262 22% 20%',
                    '--muted-foreground': '280 30% 70%',
                    '--accent': '290 50% 40%',
                    '--accent-foreground': '280 60% 92%',
                    '--destructive': '0 70% 50%',
                    '--destructive-foreground': '0 0% 98%',
                    '--border': '262 22% 26%',
                    '--input': '262 22% 22%',
                    '--ring': '267 75% 60%',
					'--primary-rgb': '153, 102, 255',
					'--accent-rgb': '216, 180, 254',
				},
				'.playful': {
					'--background': '350 100% 98%',
                    '--foreground': '350 20% 20%',
                    '--card': '350 100% 99%',
                    '--card-foreground': '350 20% 20%',
                    '--popover': '350 100% 99%',
                    '--popover-foreground': '350 20% 20%',
                    '--primary': '340 82% 52%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '355 100% 94%',
                    '--secondary-foreground': '350 20% 20%',
                    '--muted': '350 100% 96%',
                    '--muted-foreground': '350 20% 45%',
                    '--accent': '327 73% 53%',
                    '--accent-foreground': '350 20% 20%',
                    '--destructive': '0 85% 60%',
                    '--destructive-foreground': '0 0% 98%',
                    '--border': '350 100% 92%',
                    '--input': '350 100% 90%',
                    '--ring': '340 82% 52%',
					'--primary-rgb': '236, 72, 153',
					'--accent-rgb': '249, 168, 212',
				},
				'.cosmic': {
					'--background': '230 25% 12%',
                    '--foreground': '210 40% 98%',
                    '--card': '230 25% 15%',
                    '--card-foreground': '210 40% 98%',
                    '--popover': '230 25% 15%',
                    '--popover-foreground': '210 40% 98%',
                    '--primary': '265 60% 60%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '240 30% 20%',
                    '--secondary-foreground': '210 40% 98%',
                    '--muted': '240 25% 20%',
                    '--muted-foreground': '240 20% 70%',
                    '--accent': '280 50% 50%',
                    '--accent-foreground': '210 40% 98%',
                    '--destructive': '0 70% 50%',
                    '--destructive-foreground': '210 40% 98%',
                    '--border': '240 25% 25%',
                    '--input': '240 25% 22%',
                    '--ring': '265 60% 60%',
					'--primary-rgb': '153, 102, 255',
					'--accent-rgb': '167, 139, 250',
				},
				'.system': {
					'--background': '0 0% 100%',
                    '--foreground': '222 47% 11%',
                    '--card': '0 0% 100%',
                    '--card-foreground': '222 47% 11%',
                    '--popover': '0 0% 100%',
                    '--popover-foreground': '222 47% 11%',
                    '--primary': '238 75% 57%',
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
                    '--ring': '238 75% 57%',
					'--primary-rgb': '79, 70, 229',
					'--accent-rgb': '138, 116, 255',
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
                '.from-system': {
                    '--from-bg': '0 0% 100%',
                    '--from-text': '222 47% 11%',
                },
			});
		},
	],
} satisfies Config;
