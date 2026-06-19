export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:     '#F5F0E8',
        surface:   '#FFFFFF',
        terra:     '#C97B4B',
        terraLight:'#E8D5C4',
        textPri:   '#2C2A27',
        textSec:   '#8A8680',
        textMuted: '#B8B4AC',
        success:   '#6B9E8A',
        warning:   '#D4956A',
        border:    '#E8E4DC',
      },
      borderRadius: {
        card:   '16px',
        btn:    '10px',
        input:  '12px',
        chip:   '6px',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      boxShadow: {
        warm: '0 4px 24px rgba(44,42,39,0.08)',
        card: '0 2px 12px rgba(44,42,39,0.06)',
      },
    },
  },
  plugins: [],
}
