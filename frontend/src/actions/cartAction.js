import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`);
  console.log(data)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
      price:data.product.price
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart));
};


export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };


  export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };