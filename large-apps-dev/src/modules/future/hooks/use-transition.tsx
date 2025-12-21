import { useState, useTransition, type SyntheticEvent } from "react";

const submitForm = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        time: Date.now(),
      });
    }, 4000);
  });

  return promise;
};

export function Transition() {
  // create form state
  const [formState, setFormState] = useState<unknown>(null);
  const [isPending, startTransition] = useTransition();

  const formAction = async (event: SyntheticEvent) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await submitForm();
        setFormState(result);
      } catch (error) {
        console.error(error);
        setFormState({ message: "Failed to complete action" });
      }
    });
  };

  // display form template
  return (
    <form onSubmit={formAction}>
      <input disabled={isPending} id="name" />
      <div>{JSON.stringify(formState)}</div>
      {isPending && <div>Form is getting submitted please wait</div>}
      <button disabled={isPending}>Submit</button>
    </form>
  );
}
