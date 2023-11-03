/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'products': "url('src/lib/assets/images/products/vegetables.jpg')"
      }
    },
  },
  plugins: [],
}

