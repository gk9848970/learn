import { AppWithIntl } from "./provider";
import { Formatted } from "./formatted";

export const Translation = () => {
  return (
    <AppWithIntl>
      <Formatted />
    </AppWithIntl>
  );
};
