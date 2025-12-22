import { useOptimistic, useState, useTransition, type FormEvent } from "react";

const wait = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 5000);
  });

  return promise;
};

export function Optimisitic() {
  const [message, setMessage] = useState("");

  return (
    <>
      <OptimisticForm message={message} updateMessage={setMessage} />
    </>
  );
}

// Without using optimistic hook

// function OptimisticForm({
//   message,
//   updateMessage,
// }: {
//   message: string;
//   updateMessage: (msg: string) => void;
// }) {
//   const [inputMessage, setInputMessage] = useState("");
//   const [isPending, setIsPending] = useState(false);
//   const [optimisticMessage, setOptimisticMessage] = useState(message);

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const newMessage = inputMessage;

//     try {
//       setIsPending(true);
//       setOptimisticMessage(newMessage);
//       await wait();
//       const updatedMessage = newMessage;
//       updateMessage(updatedMessage);
//     } catch (error) {
//       console.error(error);
//       setOptimisticMessage(message);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <>
//       <p>{optimisticMessage}</p>
//       {isPending && <div>Form is getting submitted please wait</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//         />
//         <button>Submit</button>
//       </form>
//     </>
//   );
// }

function OptimisticForm({
  message,
  updateMessage,
}: {
  message: string;
  updateMessage: (msg: string) => void;
}) {
  const [inputMessage, setInputMessage] = useState("");

  const [optimisticMessage, setOptimisticMessage] = useOptimistic(message);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMessage = inputMessage;
    setOptimisticMessage(newMessage);

    startTransition(async () => {
      await wait();
      const updatedMessage = newMessage;
      updateMessage(updatedMessage);
    });
  };

  return (
    <>
      <p>{optimisticMessage}</p>
      {isPending && <div>Form is getting submitted please wait</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
