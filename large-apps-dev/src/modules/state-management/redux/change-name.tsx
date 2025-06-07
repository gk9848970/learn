import { useAppDispatch, useAppSelector } from "./hooks";
import { nameSlice } from "./store";

export const ChangeName = () => {
  const name = useAppSelector((state) => state.nameStore.name);
  const dispatch = useAppDispatch();

  const handleNameChange = () => {
    dispatch(nameSlice.actions.changeName("Khyati"));
  };

  return (
    <div>
      <p>{name}</p>
      <button onClick={handleNameChange}>Change Message</button>
    </div>
  );
};
