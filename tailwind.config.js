// tailwind.config.js
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{css,xml}'
  ],
  // use the .ns-dark class to control dark mode (applied by NativeScript) - since 'media' (default) is not supported.
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        page: '#083D55'
      }
    },
  },
  plugins: [
    /**
     * A simple inline plugin that adds the ios: and android: variants
     *
     * Example usage:
     *
     *   <Label class="android:text-red-500 ios:text-blue-500" />
     *
     */
    plugin(function ({ addVariant }) {
      addVariant('android', '.ns-android &');
      addVariant('ios', '.ns-ios &');
      addVariant('tablet', '.ns-tablet &');
      addVariant('phone', '.ns-phone &');
      addVariant('dark', '.ns-dark &');
      addVariant('light', '.ns-light &');
      addVariant('oLandscape', '.ns-landscape &');
      addVariant('oPortrait', '.ns-portrait &');
    }),
  ],
  corePlugins: {
    preflight: false // disables browser-specific resets
  }
}