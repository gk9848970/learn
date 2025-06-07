import { IntlProvider } from "react-intl";
import { type PropsWithChildren } from "react";

import { LangSelector } from "./lang-selector";
import { useTranslations } from "./use-translation";

export const AppWithIntl = (props: PropsWithChildren) => {
  const { locale, setLocale, messages } = useTranslations();
  return (
    <IntlProvider locale={locale} messages={messages}>
      {props.children}
      <LangSelector locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
};
