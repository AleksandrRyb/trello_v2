import axios from "axios";
import * as ACTIONS from "../consts/userConsts";

const BASE_URL = "/api/v2/auth";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: ACTIONS.REGISTER_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/register`, user);
    await dispatch({
      type: ACTIONS.REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    await dispatch({
      type: ACTIONS.REGISTER_FAILED,
      payload: { error: error.response.data.message },
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: ACTIONS.LOGIN_REQUEST });
  try {
    const response = await axios.post(`${BASE_URL}/login`, user);
    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.LOGIN_FAILED,
      payload: { error: error.response.data.message },
    });
  }
};
