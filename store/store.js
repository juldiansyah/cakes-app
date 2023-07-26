import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import cakes from "@/store/cakeSlice";

const combinedReducer = combineReducers({
  cakes,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      cakes: {
        cakes: { ...state.cakes.cakes, ...action.payload.cakes.cakes },
        selectedCake: {
          ...state.cakes.selectedCake,
          ...action.payload.cakes.selectedCake,
        },
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const setupStore = (preloadedState) =>
  configureStore({
    reducer: masterReducer,
    preloadedState,
  });

export const wrapper = createWrapper(setupStore);
