import { useState } from "react";

export function SampleButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Increment {count}</button>;
}
