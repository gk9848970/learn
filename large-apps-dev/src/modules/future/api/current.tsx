import { createContext, useContext, useState } from "react";

const MessageContext = createContext<string | null>(null);

function useMessageContext() {
  const context = useContext(MessageContext);
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
    <MessageContext.Provider value={message}>
      <div>
        <div>Current Context</div>
        <input onChange={(e) => setMessage(e.target.value)} />
        <Display />
      </div>
    </MessageContext.Provider>
  );
}
