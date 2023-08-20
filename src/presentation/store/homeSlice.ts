import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  name?: string;
  isFetchingMore: boolean;
}
const initialState: HomeState = {
  isFetchingMore: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setFetchingMore: (state, action: PayloadAction<boolean>) => {
      state.isFetchingMore = action.payload;
    },
  },
});

export const { changeFilter, setFetchingMore } = homeSlice.actions;

export default homeSlice.reducer;
