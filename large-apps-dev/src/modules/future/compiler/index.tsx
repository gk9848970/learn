import { useState } from "react";
import { NotRerender } from "./no-rerender";

export function Compiler() {
  // "use no memo" - This directive will tell react compiler not to memoise this component
  const [message, setMessage] = useState("");

  return (
    <div>
      <div>Current message</div>
      <div>{message}</div>
      <input onChange={(e) => setMessage(e.target.value)} />
      <NotRerender />
    </div>
  );
}
