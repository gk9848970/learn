import { FormattedDate } from "react-intl";

const date = new Date();
const options = { year: "numeric", month: "long", day: "numeric" } as const;
const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

export const DateIntlAndJS = () => {
  return (
    <>
      <span>{formattedDate}</span>
      <div>
        <FormattedDate
          value={date}
          weekday="long"
          year="numeric"
          month="long"
          day="numeric"
        />
      </div>
    </>
  );
};
