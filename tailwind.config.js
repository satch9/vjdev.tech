export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f6f7f3',
        ink: '#1f3d8a',
        night: '#1d2a44',
        slate: '#37445f',
        lagon: '#4fd1c5',
        lagonDeep: '#167570',
        pencil: '#b9382a',
        frame: '#c9d1e0'
      },
      fontFamily: {
        sans: ['"Familjen Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        blueprint: 'linear-gradient(#e3e7ef 1px, transparent 1px), linear-gradient(90deg, #e3e7ef 1px, transparent 1px)'
      },
      backgroundSize: {
        blueprint: '24px 24px'
      }
    }
  }
}
