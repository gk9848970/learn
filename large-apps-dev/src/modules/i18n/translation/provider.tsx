import { IntlProvider } from "react-intl";
import { useState, type PropsWithChildren } from "react";

import messages_en from "./locales/en.json";
import messages_gj from "./locales/gj.json";
import messages_fr from "./locales/fr.json";
import messages_de from "./locales/de.json";
import { LangSelector } from "./lang-selector";

const messages = {
  en: messages_en,
  gj: messages_gj,
  fr: messages_fr,
  de: messages_de,
} as const;

export type LangaugeCodes = keyof typeof messages;

export const AppWithIntl = (props: PropsWithChildren) => {
  const [locale, setLocale] = useState<LangaugeCodes>("en");

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {props.children}
      <LangSelector locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
};
