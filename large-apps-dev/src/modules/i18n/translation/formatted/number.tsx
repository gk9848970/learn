import { FormattedNumber } from "react-intl";

const number = 1004580.89;
const formattedNumber = new Intl.NumberFormat("en-US").format(number);

export const NumberIntlAndJS = () => {
  return (
    <>
      <span>{formattedNumber}</span>
      <div>
        <FormattedNumber value={number} style="currency" currency="USD" />
      </div>
    </>
  );
};
