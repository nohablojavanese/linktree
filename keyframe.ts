export const customKeyframes = {
  ripple: {
    "0%": { width: "0px", height: "0px", opacity: "0.5" },
    "100%": { width: "500px", height: "500px", opacity: "0" },
  },
  gradientShift: {
    "0%, 100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  glowPulse: {
    "0%, 100%": { boxShadow: "0 0 15px rgba(147,51,234,0.5)" },
    "50%": { boxShadow: "0 0 25px rgba(147,51,234,0.8)" },
  },
  liquidBubble: {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" },
  },
  retroWave: {
    "0%": { backgroundPosition: "0% 50%" },
    "100%": { backgroundPosition: "100% 50%" },
  },
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "neon-glow": {
    "0%": {
      boxShadow:
        "0 0 5px #ff00de, 0 0 10px #ff00de, 0 0 15px #ff00de, 0 0 20px #ff00de",
    },
    "100%": {
      boxShadow:
        "0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de",
    },
  },
  "neon-glow-dark": {
    "0%": {
      boxShadow:
        "0 0 5px #00f7ff, 0 0 10px #00f7ff, 0 0 15px #00f7ff, 0 0 20px #00f7ff",
    },
    "100%": {
      boxShadow:
        "0 0 10px #00f7ff, 0 0 20px #00f7ff, 0 0 30px #00f7ff, 0 0 40px #00f7ff",
    },
  },
  twinkling: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  shimmer: {
    "100%": { transform: "translateX(100%)" },
  },
  borderMagic: {
    "0%": { clipPath: "inset(0 100% 0 0)" },
    "50%": { clipPath: "inset(0)" },
    "100%": { clipPath: "inset(0 0 0 100%)" },
  },
  neonBlink: {
    "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: 0 },
    "20%, 24%, 55%": { opacity: 1 },
  },
  elasticPop: {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "90%": { transform: "scale(0.9)" },
    "100%": { transform: "scale(1)" },
  },
  rainbowShift: {
    "0%": { backgroundPosition: "0% 50%" },
    "100%": { backgroundPosition: "100% 50%" },
  },
};

export const customAnimations = {
  ripple: "ripple 1s linear infinite",
  gradientShift: "gradientShift 3s ease infinite",
  glowPulse: "glowPulse 10s ease-in-out infinite",
  liquidBubble: "liquidBubble 2s ease-in-out infinite",
  retroWave: "retroWave 5s linear infinite",
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "neon-glow": "neon-glow 5s ease-in-out infinite alternate",
  "neon-glow-dark": "neon-glow-dark 5s ease-in-out infinite alternate",
  twinkling: "twinkling 8s linear infinite",
  shimmer: "shimmer 2s infinite",
  borderMagic: "borderMagic 4s infinite",
  neonBlink: "neonBlink 2.5s infinite",
  elasticPop: "elasticPop 0.3s ease-in-out",
  rainbowShift: "rainbowShift 3s linear infinite",
};
