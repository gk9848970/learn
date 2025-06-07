import Post from "../../../components/post";
import { ChangeMessage } from "./change-message";
import { ReduxProvider } from "./redux-provider";

export const Redux = () => {
  return (
    <ReduxProvider>
      <ChangeMessage />
      <Post />
    </ReduxProvider>
  );
};
