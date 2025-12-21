import { useFormStatus } from "react-dom";

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

const Status = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return <div>Form is getting submitted please wait</div>;
  }

  return null;
};

export function FormStatus() {
  const handleSubmit = async () => {
    await submitForm();
  };

  return (
    <>
      <form action={handleSubmit}>
        <input name="name" />
        <button>Submit</button>
        <Status />
      </form>
    </>
  );
}
