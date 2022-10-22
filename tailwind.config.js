/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui",
          "-apple-system", "BlinkMacSystemFont", "'Segoe UI'",
          "Roboto", "'Helvetica Neue'", "Arial", "'Noto Sans'",
          "sans-serif", "'Apple Color Emoji'", "'Segoe UI Emoji'",
          "'Segoe UI Symbol'", "'Noto Color Emoji'"],
        mono: ["Nunito", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "'Liberation Mono'", "'Courier New'", "monospace"],
      },
      animation: {
        text: 'text 5s ease infinite',
        slideIn: 'slideIn 0.8s ease-in-out',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-50%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        }
      }
    },
    plugins: [],
  }
}