export const FormatTheme = {
    modernMinimal: "bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300",
    neonPulse: "bg-black text-neon-green border-2 border-neon-green rounded-lg shadow-neon-glow animate-pulse transition-all duration-300 hover:bg-neon-green hover:text-black",
    frostyGlass: "bg-white bg-opacity-20 backdrop-filter backdrop-blur-xl border border-white border-opacity-25 rounded-xl shadow-lg text-white",
    gradientFlow: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-gradient-x",
    organicShape: "bg-green-100 text-green-800 rounded-blob shadow-md hover:shadow-lg transition-all duration-300 border-2 border-green-300",
    retroWave: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-b-4 border-yellow-300",
    paperCut: "bg-white text-gray-800 rounded-lg shadow-paper-cut hover:shadow-paper-cut-hover transition-all duration-300",
    cosmicDust: "bg-indigo-900 text-white rounded-lg relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:bg-sparkles before:opacity-30 before:animate-twinkle",
    liquidMetal: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white rounded-lg shadow-inner hover:shadow-lg transition-all duration-300 animate-shine",
    carbonFiber: "bg-black text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-carbon-fiber",
    holographic: "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-holographic",
    pixelated: "bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-black pixelated-border",
    brushStroke: "bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-all duration-300 brush-stroke-border",
    glitchEffect: "bg-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-glitch",
    origami: "bg-white text-gray-800 rounded-lg shadow-origami hover:shadow-origami-hover transition-all duration-300 origami-fold",
    neonOutline: "bg-transparent text-neon-blue border-2 border-neon-blue rounded-lg shadow-neon-glow transition-all duration-300 hover:bg-neon-blue hover:text-white",
    marbleTexture: "bg-marble text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300",
    rainbowGradient: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300",
    frostedGlass: "bg-white bg-opacity-10 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-lg text-white",
    neoBrutalism: "bg-yellow-400 text-black border-4 border-black rounded-none shadow-brutal hover:shadow-brutal-hover transition-all duration-200 transform hover:translate-x-1 hover:translate-y-1",

    pillButton: "bg-blue-600 text-white font-bold rounded-2xl py-3 px-6 shadow-[0_8px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] hover:translate-y-[2px] active:translate-y-[6px] transition-all duration-150",

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

  