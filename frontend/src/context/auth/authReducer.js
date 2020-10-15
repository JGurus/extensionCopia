import { SIGNUP_EXIT } from "../types/index";
export default (state, action) => {
  switch (action.type) {
    case SIGNUP_EXIT:
      return { ...state };
    default:
      return state;
  }
};
