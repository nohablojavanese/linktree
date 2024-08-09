export const FormatTheme = {
    default: "bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 text-gray-800 dark:text-white",
    simple: "bg-gray-100 dark:bg-gray-700 bg-opacity-70 dark:bg-opacity-70 text-gray-700 dark:text-gray-200",
    elegant: "bg-gray-800 dark:bg-white bg-opacity-70 dark:bg-opacity-70 text-white dark:text-gray-800",
    minimal: "bg-gray-200 dark:bg-gray-600 bg-opacity-70 dark:bg-opacity-70 text-gray-600 dark:text-gray-300",
    colorful: "bg-gradient-to-r from-purple-400 to-pink-500 bg-opacity-70 text-white",
  };
  
  export const FormatFont = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };
// Will add another key/value later


  export type ThemeKey = keyof typeof FormatTheme;
  export type FontKey = keyof typeof FormatFont;
  
  export const getThemeClass = (key: string, formatObject: Record<string, string>, defaultKey: string): string => {
    return formatObject[key as keyof typeof formatObject] || formatObject[defaultKey];
  };