import { FormattedMessage } from "react-intl";

export const NumberOfThings = () => {
  return (
    <div>
      <div>
        <FormattedMessage id="itemsCount" values={{ itemsCount: 0 }} />
      </div>
      <div>
        <FormattedMessage id="itemsCount" values={{ itemsCount: 1 }} />
      </div>
      <div>
        <FormattedMessage id="itemsCount" values={{ itemsCount: 2 }} />
      </div>
    </div>
  );
};
