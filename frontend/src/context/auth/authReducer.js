import { LOGIN_EXIT, SIGNUP_EXIT, ERROR } from "../types/index";
export default (state, action) => {
  switch (action.type) {
    case SIGNUP_EXIT:
      return { ...state, message: action.payload };
    case LOGIN_EXIT:
      localStorage.setItem("token", action.payload);
      return { ...state, authenticate: true };
    case ERROR:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
