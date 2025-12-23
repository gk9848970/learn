import { createContext, use, useState } from "react";

const MessageContext = createContext<string | null>(null);

function useMessageContext() {
  // use can be used inside a react hook or component only
  const context = use(MessageContext);
  if (context === null) {
    throw new Error("Message context must be used inside MessageProvider");
  }

  return context;
}

function Display() {
  const message = useMessageContext();

  return (
    <div>
      <h2>Message currently</h2>
      {message}
    </div>
  );
}

export function CurrentContext() {
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
