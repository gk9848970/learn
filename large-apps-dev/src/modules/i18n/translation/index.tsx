import { FormattedMessage } from "react-intl";
import { AppWithIntl } from "./provider";

export const Translation = () => {
  return (
    <AppWithIntl>
      <FormattedMessage id="greeting" />
    </AppWithIntl>
  );
};
