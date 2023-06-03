import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from "./../constants/productConstants";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/products");
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: e.response.data.message,
    });
  }
};



//clear all error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
