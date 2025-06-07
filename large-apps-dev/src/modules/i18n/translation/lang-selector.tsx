import type { Dispatch } from "react";
import type { LangaugeCodes } from "./use-translation";

type Props = {
  locale: LangaugeCodes;
  setLocale: Dispatch<LangaugeCodes>;
};

export const LangSelector = ({ locale, setLocale }: Props) => {
  return (
    <div>
      <select
        value={locale}
        onChange={(
          e: React.ChangeEvent<HTMLSelectElement & { value: LangaugeCodes }>
        ) => setLocale(e.target.value)}
      >
        <option value="en">English</option>
        <option value="gj">Gujarati</option>
        <option value="fr">French</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
};
