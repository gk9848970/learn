import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const initialMessageState = {
  message: "Hello World",
};

export const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    changeMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

const initialNameState = {
  name: "Gaurav",
};

export const nameSlice = createSlice({
  name: "name",
  initialState: initialNameState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    messageStore: messageSlice.reducer,
    nameStore: nameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
