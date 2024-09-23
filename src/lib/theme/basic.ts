// Define the available themes with their corresponding CSS classes
export const FormatTheme = {
  default: "bg-white hover:bg-blue-600 text-black font-semibold py-2 px-4 rounded-md transition-colors duration-300",
  neonPulse: "bg-black text-neon-green border-2 border-neon-green rounded-lg shadow-neon-glow animate-pulse transition-all duration-300 hover:bg-neon-green hover:text-black",
  holographic: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-holographic",
  frostedGlass: "bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-lg text-white",
  Sunflower: "bg-yellow-400 text-black border-4 border-black rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1",
  pillButton: "bg-blue-600 text-white font-bold rounded-2xl py-3 px-6 shadow-[0_8px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[2px] active:translate-y-[6px] transition-all duration-150",
  cosmicRipple: "bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold rounded-lg py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-0 before:h-0 before:bg-white before:opacity-30 before:rounded-full hover:before:animate-ripple",
  neonOutline: "bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-bold py-2 px-4 rounded-full transition-all duration-300",
  gradientShift: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-500",
  dButton: "bg-yellow-400 text-yellow-900 font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded-md active:border-b-0 active:translate-y-[4px] transition-all duration-150",
  glowPulse: "bg-purple-600 text-white font-bold py-2 px-4 rounded-md animate-pulse shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-shadow duration-300",
  pixelated: "bg-gray-800 text-white font-pixel py-2 px-4 border-2 border-white hover:bg-white hover:text-gray-800 transition-colors duration-300 transform hover:scale-105 active:scale-95",
  liquidBubble: "bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-cyan-300/50 active:shadow-inner",
  retroWave: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-md hover:shadow-lg",
  natureInspired: "bg-green-600 text-white font-semibold py-2 px-4 rounded-full border-2 border-green-700 hover:bg-green-700 hover:border-green-800 transition-all duration-300 shadow-md hover:shadow-lg",
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
export const getThemeClass = (key: string, formatObject: Record<string, string>, defaultKey: string): string => {
  return formatObject[key as keyof typeof formatObject] || formatObject[defaultKey];
};