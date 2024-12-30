import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useLuckyNumber = () => {
  return useQuery({
    queryKey: ["lucky-number"],
    queryFn: () => Promise.resolve(Math.random()),
  });
};

const LuckyNumber = () => {
  const luckyNumber = useLuckyNumber();
  return <div>{luckyNumber.data}</div>;
};

const FortuneTeller = () => {
  const luckyNumber = useLuckyNumber();
  return <div>{luckyNumber.data}</div>;
};

export function Deduplication() {
  const [show, setShow] = useState(false);
  return (
    <>
      <LuckyNumber />
      <LuckyNumber />
      {show && <FortuneTeller />}
      <button onClick={() => setShow(!show)}>Show</button>
    </>
  );
}
