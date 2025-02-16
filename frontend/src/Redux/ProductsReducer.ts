import { ADD_PRODUCTS } from "./ActionType.ts";

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};