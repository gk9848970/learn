import { Provider } from "react-redux";
import { store } from "./store";
import type { PropsWithChildren } from "react";

export const ReduxProvider = (props: PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};
