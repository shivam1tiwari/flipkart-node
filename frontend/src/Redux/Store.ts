import { createStore, combineReducers } from 'redux';
import { cartReducer } from './CartReducer.ts';
import { userReducer } from './UserReducer.ts';
import { productsReducer } from './ProductsReducer.ts';

const combineReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  products: productsReducer
})
 const store = createStore(combineReducer);

 export default store;