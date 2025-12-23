import { createContext, use, useState } from "react";

const MessageContext = createContext<string | null>(null);

function Display() {
  //   let finalMessage: null | string = "Gaurav";
  let finalMessage: null | string = "";

  if (finalMessage === "") {
    finalMessage = use(MessageContext);
  }

  return (
    <div>
      <h2>Message currently</h2>
      {finalMessage}
    </div>
  );
}

export function UsePart2() {
  const [message, setMessage] = useState("");

  return (
    <MessageContext value={message}>
      <div>
        <div>Current Context</div>
        <input onChange={(e) => setMessage(e.target.value)} />
        <Display />
      </div>
    </MessageContext>
  );
}
