import { useAppDispatch, useAppSelector } from "./hooks";
import { messageSlice } from "./store";

export const ChangeMessage = () => {
  const message = useAppSelector((state) => state.messageStore.message);
  const dispatch = useAppDispatch();

  const handleMessageChange = () => {
    dispatch(messageSlice.actions.changeMessage("Hello React"));
  };

  return (
    <div>
      <p>Message: {message}</p>
      <button onClick={handleMessageChange}>Change Message</button>
    </div>
  );
};
