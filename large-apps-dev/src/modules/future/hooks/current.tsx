import { useState, type SyntheticEvent } from "react";
import { SampleButton } from "./sample-button";

const submitForm = async () => {
  console.log("Starting first loop");
  for (let i = 0; i < 1000000000; i++) {
    // Do nothing
  }

  console.log("Starting second loop");
  for (let i = 0; i < 1000000000; i++) {
    // Do nothing
  }

  console.log("Starting third loop");
  for (let i = 0; i < 1000000000; i++) {
    // Do nothing
  }

  console.log("Starting fourth loop");
  for (let i = 0; i < 1000000000; i++) {
    // Do nothing
  }

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        time: Date.now(),
      });
    }, 5000);
  });

  return promise;
};

export function CurrentForm() {
  // create form state
  const [formState, setFormState] = useState<unknown>(null);
  const [isPending, setIsPending] = useState(false);

  const formAction = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsPending(true);
    try {
      const result = await submitForm();
      setFormState(result);
    } catch (error) {
      console.error(error);
      setFormState({ message: "Failed to complete action" });
    }
    setIsPending(false);
  };

  // display form template
  return (
    <>
      <form onSubmit={formAction}>
        <input disabled={isPending} id="name" />
        <div>{JSON.stringify(formState)}</div>
        {isPending && <div>Form is getting submitted please wait</div>}
        <button disabled={isPending}>Submit</button>
      </form>
      <SampleButton />
    </>
  );
}
