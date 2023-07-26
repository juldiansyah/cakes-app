import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CAKE_FIELDS } from "@/constants";

const initialState = {
  cakes: {
    current_page: 1,
    total_page: 1,
    items: [],
  },
  selectedCake: DEFAULT_CAKE_FIELDS,
};

export const cakeSlice = createSlice({
  name: "cakes",
  initialState,
  reducers: {
    addCakeList: (state, action) => {
      state.cakes = { ...state.cakes, ...action.payload };
    },
    setSelectedCake: (state, action) => {
      state.selectedCake = { ...state.selectedCake, ...action.payload };
    },
    modifyCake: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCakeList, setSelectedCake, modifyCake } = cakeSlice.actions;

export default cakeSlice.reducer;
