import { DateIntlAndJS } from "./date";
import { NormalText } from "./normal-text";
import { NumberIntlAndJS } from "./number";
import { NumberOfThings } from "./number-of-things";

export const Formatted = () => {
  return (
    <div>
      <NormalText />
      <NumberOfThings />
      <DateIntlAndJS />
      <NumberIntlAndJS />
    </div>
  );
};
