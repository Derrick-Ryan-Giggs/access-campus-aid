
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
			screens: {
				'xs': '475px',
			},
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
					600: '#2563EB',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a'
				},
				secondary: {
					DEFAULT: '#16A34A',
					foreground: '#ffffff',
					50: '#f0fdf4',
					100: '#dcfce7',
					500: '#16A34A',
					600: '#16A34A',
					700: '#15803d',
					800: '#166534',
					900: '#14532d'
				},
				destructive: {
					DEFAULT: '#DC2626',
					foreground: '#ffffff',
					50: '#fef2f2',
					500: '#DC2626',
					600: '#DC2626',
					700: '#b91c1c',
					800: '#991b1b'
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#ffffff',
					light: '#FEF3C7',
					text: '#92400E',
					50: '#fffbeb',
					100: '#fef3c7',
					500: '#F59E0B',
					600: '#d97706',
					700: '#b45309'
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
				},
				// Neutral colors for proper contrast
				neutral: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827'
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
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)'
					},
					'100%': {
						transform: 'translateX(0)'
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
				'slide-in-right': 'slide-in-right 0.3s ease-out',
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
