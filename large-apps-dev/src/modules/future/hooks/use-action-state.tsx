import { useActionState } from "react";

const submitForm = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        time: Date.now(),
      });
    }, 500);
  });

  return promise;
};

const action = async (currentState: unknown, formData: unknown) => {
  console.log(currentState, formData);
  try {
    const result = await submitForm();
    return { message: result };
  } catch {
    return { message: "Failed to complete action" };
  }
};

export function ActionState() {
  const [state, dispatch, isPending] = useActionState(action, null);

  return (
    <>
      <form action={dispatch}>
        <input name="name" disabled={isPending} />
        <div>{JSON.stringify(state)}</div>
        {isPending && <div>Form is getting submitted please wait</div>}
        <button disabled={isPending}>Submit</button>
      </form>
    </>
  );
}
