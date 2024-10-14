// Define the available themes with their corresponding CSS classes and alt text
export const FormatTheme = {
  default: {
    class: "bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-300",
    alt: "Default"
  },
  neonPulse: {
    class: "bg-black text-neon-green border-2 border-neon-green rounded-lg shadow-neon-glow animate-pulse transition-all duration-300 hover:bg-neon-green hover:text-neon-glow",
    alt: "Neon Pulse"
  },
  holographic: {
    class: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-holographic",
    alt: "Lucide Dream"
  },
  frostedGlass: {
    class: "bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-lg text-white",
    alt: "Frosted Glass"
  },
  Sunflower: {
    class: "bg-yellow-400 text-black border-4 border-black rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1",
    alt: "Sunflower"
  },
  pillButton: {
    class: "bg-blue-600 text-white font-bold rounded-2xl py-3 px-6 shadow-[0_8px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[2px] active:translate-y-[6px] transition-all duration-150",
    alt: "Blue Sky"
  },
  cosmicRipple: {
    class: "bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold rounded-lg py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-white before:opacity-30 before:rounded-full hover:before:animate-ripple",
    alt: "Cosmic Ripple"
  },
  neonOutline: {
    class: "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold py-2 px-4 rounded-2xl transition-all duration-300",
    alt: "Neon Outline"
  },
  gradientShift: {
    class: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-500",
    alt: "Gradient"
  },
  dButton: {
    class: "bg-yellow-400 text-yellow-900 font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-md active:border-b-0 active:translate-y-[4px] transition-all duration-150",
    alt: "Yellow Wrap"
  },
  glowPulse: {
    class: "bg-purple-600 text-white font-bold py-2 px-4 rounded-md animate-pulse shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-shadow duration-300",
    alt: "Glow Pulse"
  },
  pixelated: {
    class: "bg-gray-800 text-white font-pixel py-2 px-4 border-2 border-white hover:bg-white hover:text-gray-800 transition-colors duration-300 transform hover:scale-105 active:scale-95",
    alt: "Pixelated"
  },
  liquidBubble: {
    class: "bg-cyan-500 text-white font-bold py-3 px-6 rounded-2xl hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-cyan-300/50 active:shadow-inner",
    alt: "Bubble"
  },
  retroWave: {
    class: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-md hover:shadow-lg",
    alt: "Retro Wave"
  },
  natureInspired: {
    class: "bg-green-600 text-white font-semibold py-2 px-4 rounded-2xl border-2 border-green-700 hover:bg-green-700 hover:border-green-800 transition-all duration-300 shadow-md hover:shadow-lg",
    alt: "Nature"
  },
  shimmer: {
    class: "bg-gray-200 text-transparent bg-clip-text font-bold py-2 px-4 rounded-2xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent after:absolute after:inset-0 after:rounded-2xl after:border-2 after:border-white after:animate-shimmer",
    alt: "Shimmer"
  },
  borderMagic: {
    class: "bg-purple-600 text-white font-bold py-2 px-4 rounded-md relative before:absolute before:inset-0 before:rounded-md before:border-2 before:border-white before:animate-borderMagic",
    alt: "Magic Border"
  },
  neonBlink: {
    class: "bg-black text-white font-bold py-2 px-4 rounded-md relative overflow-hidden before:absolute before:inset-0 before:bg-blue-500 before:opacity-0 before:animate-neonBlink",
    alt: "Neon Blink"
  },
  elasticPop: {
    class: "bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 hover:animate-elasticPop active:animate-none",
    alt: "Elastic Pop"
  },
  rainbowText: {
    class: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text font-bold py-2 px-4 rounded-md animate-rainbowShift border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:p-[2px] before:rounded-md before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:to-blue-500 before:-z-10",
    alt: "Rainbow Text"
  },
};

// Define the available font families with their corresponding CSS classes
export const FormatFont = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
  display: "font-display",
  body: "font-body",
  heading: "font-heading",
  condensed: "font-condensed",
  expanded: "font-expanded",
  handwriting: "font-handwriting",
  decorative: "font-decorative",
  poppins: "font-poppins",
  arial: "font-arial",
  helvetica: "font-helvetica",
  verdana: "font-verdana",
  tahoma: "font-tahoma",
  trebuchet: "font-trebuchet",
  georgia: "font-georgia",
  garamond: "font-garamond",
  courier: "font-courier",
  brushScript: "font-brush-script",
  impact: "font-impact",
};

// Define types for the keys of FormatTheme and FormatFont
export type ThemeKey = keyof typeof FormatTheme;
export type FontKey = keyof typeof FormatFont;

// Function to get the CSS class for a given key, with a default fallback
export const getThemeClass = (key: string, formatObject: typeof FormatTheme, defaultKey: string): string => {
  return (formatObject[key as ThemeKey] || formatObject[defaultKey as ThemeKey]).class;
};
