
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2563EB',
					foreground: '#ffffff',
					50: '#eff6ff',
					100: '#dbeafe',
					500: '#2563EB',
					600: '#1d4ed8',
					700: '#1e40af'
				},
				secondary: {
					DEFAULT: '#16A34A',
					foreground: '#ffffff',
					50: '#f0fdf4',
					100: '#dcfce7',
					500: '#16A34A',
					600: '#15803d'
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#ffffff'
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: '#F9FAFB',
					foreground: '#6B7280'
				},
				accent: {
					DEFAULT: '#F3F4F6',
					foreground: '#374151'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#111827'
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
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'pulse-slow': 'pulse-slow 2s ease-in-out infinite'
			},
			fontSize: {
				'base': ['16px', '1.5'],
				'lg': ['18px', '1.6'],
				'xl': ['20px', '1.6']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
