/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      success: 'var(--color-success)',
      pending: 'var(--color-pending)',
      fail: 'var(--color-fail)',
    },
    extend: {},
  },
  plugins: [],
}
