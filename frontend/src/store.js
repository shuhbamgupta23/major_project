import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
