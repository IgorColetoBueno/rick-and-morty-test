import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GetCharactersQueryVariables } from "../../domain/schema";

interface HomeState {
  name?: string;
}
const initialState: HomeState = {};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = homeSlice.actions;

export default homeSlice.reducer;
