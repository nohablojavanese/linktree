export const FormatTheme = {
    default: "bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 text-gray-800 dark:text-white backdrop-filter backdrop-blur-lg rounded-full shadow-md",
    simple: "bg-gray-100 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 text-gray-700 dark:text-gray-200",
    elegant: "bg-gray-800 dark:bg-white bg-opacity-70 dark:bg-opacity-70 text-white dark:text-gray-800",
    minimal: "bg-gray-200 dark:bg-gray-600 bg-opacity-70 dark:bg-opacity-70 text-gray-600 dark:text-gray-300",
    colorful: "bg-gradient-to-r from-purple-400 to-pink-500 bg-opacity-70 text-white",

    neon: "bg-black dark:bg-gray-900 text-white border-2 border-neon-pink dark:border-neon-blue rounded-lg shadow-neon-glow dark:shadow-neon-glow-dark transition-all duration-300 hover:bg-neon-pink dark:hover:bg-neon-blue hover:text-black dark:hover:text-white",
    glassmorphism: "bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 backdrop-filter backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-gray-800 dark:text-white",
    neumorphism: "bg-gray-100 dark:bg-gray-800 rounded-xl shadow-neumorphic dark:shadow-neumorphic-dark text-gray-800 dark:text-white",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500 dark:from-blue-600 dark:to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300",
    outlined: "bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300",
    pillSoft: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full px-6 py-3 shadow-inner hover:shadow-md transition-all duration-300",
    cyberpunk: "bg-yellow-400 dark:bg-purple-700 text-black dark:text-white border-b-4 border-r-4 border-black dark:border-neon-pink rounded-md transform hover:translate-x-1 hover:translate-y-1 transition-all duration-200",
    nature: "bg-gradient-to-b from-green-400 to-green-600 dark:from-teal-500 dark:to-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-white dark:border-teal-300",
    cosmic: "bg-indigo-900 dark:bg-gray-900 text-white rounded-lg relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
  };
  
  export const FormatFont = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  
    // Additional common Tailwind font families
    display: "font-display",
    body: "font-body",
    heading: "font-heading",
    condensed: "font-condensed",
    expanded: "font-expanded",
    handwriting: "font-handwriting",
    decorative: "font-decorative",
  
    // Custom font (if you're using Poppins as mentioned in your Tailwind config)
    poppins: "font-poppins",
  
    // Common specific font families (examples)
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
// Will add another key/value later


  export type ThemeKey = keyof typeof FormatTheme;
  export type FontKey = keyof typeof FormatFont;
  
  export const getThemeClass = (key: string, formatObject: Record<string, string>, defaultKey: string): string => {
    return formatObject[key as keyof typeof formatObject] || formatObject[defaultKey];
  };

  