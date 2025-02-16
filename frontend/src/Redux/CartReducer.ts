import { Cart } from "../pages/ProductDetails/ProductDetails.tsx";
import useFetch from "../utils/fetch-data.tsx";
import { useEffect } from "react";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART_ITEM,
  INITIAL_CART,
} from "./ActionType.ts";
import product from "../constant/product.ts";

let initialState :Cart;

  initialState = {
    items: [],
    total: 0,
  };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const availableProId = state.items.findIndex((item) => {
        return item.product.product_id === action.payload.product_id;
      });
      let updatedItem;
      console.log(availableProId);
      if (availableProId !== -1) {
        updatedItem = state.items.map((item, index) => {
          if (index == availableProId) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + action.payload.price,
            };
          }
          return item;
        });
      } else {
        updatedItem = [
          ...state.items,
          {
            product: action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          },
        ];
      }
      const newTotal = updatedItem.reduce((sum, item) => {
        sum = sum + item.totalPrice;
        return sum;
      }, 0);

      return {
        ...state,
        items: updatedItem,
        total: newTotal,
      };
    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(
        (item) => item.product.product_id !== action.payload
      );
      const newCartTotal = filteredItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return {
        ...state,
        items: filteredItems,
        total: newCartTotal,
      };

    case UPDATE_CART_QUANTITY:
      console.log("start updation");
      const updatedCartItems = state.items.map((item) => {
        console.log(
          item.product.product_id,
          "condition===",
          action.payload.productId
        );
        if (item.product.product_id == action.payload.productId) {
          console.log(item, "in update====");
          return {
            ...item,
            quantity: action.payload.quantity,
            totalPrice: item.product.price * action.payload.quantity,
          };
        }
        return item;
      });
      console.log("updated cart item", updatedCartItems);
      const updatedTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      console.log(updatedTotal);
      console.log("missin completed");
      return {
        ...state,
        items: updatedCartItems,
        total: updatedTotal,
      };

    case CLEAR_CART_ITEM:
      return { ...state, items: [] };
    case INITIAL_CART:
      return {...state, items: action.payload.product}  

    default:
      return state;
  }
};
