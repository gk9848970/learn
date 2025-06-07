import { useEffect, useState } from "react";

export type LangaugeCodes = "en" | "gj" | "fr" | "de";

export const useTranslations = () => {
  const [locale, setLocale] = useState<LangaugeCodes>("en");
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadMessages = async () => {
      switch (locale) {
        case "en": {
          const module = await import("./locales/en.json");
          setMessages(module.default);
          break;
        }

        case "gj": {
          const module = await import("./locales/gj.json");
          setMessages(module.default);
          break;
        }

        case "fr": {
          const module = await import("./locales/fr.json");
          setMessages(module.default);
          break;
        }

        case "de": {
          const module = await import("./locales/de.json");
          setMessages(module.default);
          break;
        }

        default: {
          throw new Error("Locale not supported");
        }
      }
    };

    loadMessages();
  }, [locale]);

  return { locale, messages, setLocale };
};
