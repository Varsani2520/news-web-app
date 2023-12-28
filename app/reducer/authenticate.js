// reducers/authReducer.js
const initialState = {
  user: [],
  isAuthenticated: false,
};
export const LOGIN_USER = "loginSucess";
export const LOGOUT_USER = "logout";
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
