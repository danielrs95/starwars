import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`https://swapi.dev/api/people/`);
    const { results } = data;

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.results.message
          ? error.response.results.message
          : error.message,
    });
  }
};
