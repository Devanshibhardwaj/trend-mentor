
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class", ".elegant"],
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
					'--primary-rgb': '42, 157, 244',
					'--accent-rgb': '138, 208, 255',
                    '--radius': '1rem',
				},
				'.fun': {
					'--background': '210 40% 98%',
                    '--foreground': '222 47% 11%',
                    '--card': '0 0% 100%',
                    '--card-foreground': '222 47% 11%',
                    '--popover': '0 0% 100%',
                    '--popover-foreground': '222 47% 11%',
                    '--primary': '221 83% 53%',
                    '--primary-foreground': '210 40% 98%',
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
                    '--ring': '221 83% 53%',
					'--primary-rgb': '59, 130, 246',
					'--accent-rgb': '147, 197, 253',
				},
				'.elegant': {
					'--background': '222 47% 11%',
                    '--foreground': '210 40% 98%',
                    '--card': '222 47% 11%',
                    '--card-foreground': '210 40% 98%',
                    '--popover': '222 47% 11%',
                    '--popover-foreground': '210 40% 98%',
                    '--primary': '217 91% 60%',
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
					'--primary-rgb': '99, 102, 241',
					'--accent-rgb': '165, 180, 252',
				},
				'.playful': {
					'--background': '320 20% 98%',
                    '--foreground': '322 80% 5%',
                    '--card': '0 0% 100%',
                    '--card-foreground': '322 80% 5%',
                    '--popover': '0 0% 100%',
                    '--popover-foreground': '322 80% 5%',
                    '--primary': '322 90% 55%',
                    '--primary-foreground': '0 0% 100%',
                    '--secondary': '320 20% 96.1%',
                    '--secondary-foreground': '322 80% 5%',
                    '--muted': '320 20% 96.1%',
                    '--muted-foreground': '322 80% 35%',
                    '--accent': '320 20% 96.1%',
                    '--accent-foreground': '322 80% 5%',
                    '--destructive': '0 84.2% 60.2%',
                    '--destructive-foreground': '0 0% 100%',
                    '--border': '322 80% 84.0%',
                    '--input': '322 80% 84.0%',
                    '--ring': '322 90% 55%',
					'--primary-rgb': '236, 72, 153',
					'--accent-rgb': '249, 168, 212',
				},
				'.cosmic': {
					'--background': '260 25% 11%',
                    '--foreground': '260 25% 98%',
                    '--card': '260 25% 16%',
                    '--card-foreground': '260 25% 98%',
                    '--popover': '260 25% 16%',
                    '--popover-foreground': '260 25% 98%',
                    '--primary': '263 90% 64%',
                    '--primary-foreground': '260 25% 11%',
                    '--secondary': '260 25% 20%',
                    '--secondary-foreground': '260 25% 98%',
                    '--muted': '260 25% 20%',
                    '--muted-foreground': '260 25% 60%',
                    '--accent': '260 25% 20%',
                    '--accent-foreground': '260 25% 98%',
                    '--destructive': '0 62.8% 30.6%',
                    '--destructive-foreground': '260 25% 98%',
                    '--border': '260 25% 30%',
                    '--input': '260 25% 30%',
                    '--ring': '263 90% 64%',
					'--primary-rgb': '153, 102, 255',
					'--accent-rgb': '216, 180, 254',
				},
                // Adding transition classes for theme changes
                '.from-fun': {
                    '--from-bg': '210 40% 98%',
                    '--from-text': '222 47% 11%',
                },
                '.from-elegant': {
                    '--from-bg': '222 47% 11%',
                    '--from-text': '210 40% 98%',
                },
                '.from-playful': {
                    '--from-bg': '320 20% 98%',
                    '--from-text': '322 80% 5%',
                },
                '.from-cosmic': {
                    '--from-bg': '260 25% 11%',
                    '--from-text': '260 25% 98%',
                },
			});
		},
	],
} satisfies Config;
