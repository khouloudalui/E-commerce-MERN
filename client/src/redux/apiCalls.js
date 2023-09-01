import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "requestMethods";

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch( loginFailure());
  }
};
