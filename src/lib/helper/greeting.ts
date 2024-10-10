type TimeOfDay = 'earlyMorning' | 'morning' | 'afternoon' | 'evening' | 'night';
type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'id';

interface GreetingOptions {
  language?: Language;
  name?: string;
  useEmoji?: boolean;
}

const greetings: Record<TimeOfDay, Record<Language, string>> = {
  earlyMorning: {
    en: "Rise and Shine",
    es: "Arriba y Brilla",
    fr: "Debout et Brille",
    de: "Aufstehen und Strahlen",
    ja: "おはよう",
    id: "Bangun dan Bersinar"
  },
  morning: {
    en: "Good Morning",
    es: "Buenos Días",
    fr: "Bonjour",
    de: "Guten Morgen",
    ja: "おはようございます",
    id: "Selamat Pagi"
  },
  afternoon: {
    en: "Good Afternoon",
    es: "Buenas Tardes",
    fr: "Bon Après-Midi",
    de: "Guten Tag",
    ja: "こんにちは",
    id: "Selamat Siang"
  },
  evening: {
    en: "Good Evening",
    es: "Buenas Noches",
    fr: "Bonsoir",
    de: "Guten Abend",
    ja: "こんばんは",
    id: "Selamat Sore"
  },
  night: {
    en: "Good Night",
    es: "Buenas Noches",
    fr: "Bonne Nuit",
    de: "Gute Nacht",
    ja: "おやすみなさい",
    id: "Selamat Malam"
  }
};

const emojis: Record<TimeOfDay, string> = {
  earlyMorning: "🌅",
  morning: "☀️",
  afternoon: "🌤️",
  evening: "🌆",
  night: "🌙"
};

export function getGreeting(options: GreetingOptions = {}): string {
  const { language = 'en', name, useEmoji = false } = options;
  const hour = new Date().getHours();
  let timeOfDay: TimeOfDay;

  if (hour >= 0 && hour < 5) timeOfDay = 'night';
  else if (hour >= 5 && hour < 7) timeOfDay = 'earlyMorning';
  else if (hour >= 7 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 15) timeOfDay = 'afternoon';
  else if (hour >= 15 && hour < 18) timeOfDay = 'evening';
  else if (hour >= 18 && hour < 22) timeOfDay = 'evening';
  else timeOfDay = 'night';

  let greeting = greetings[timeOfDay][language];

  if (name) {
    switch (language) {
      case 'ja':
        greeting += `、${name}さん`;
        break;
      case 'id':
        greeting += `, ${name}`;
        break;
      default:
        greeting += `, ${name}`;
    }
  }

  if (useEmoji) {
    greeting += ` ${emojis[timeOfDay]}`;
  }

  return greeting;
}