import { combineReducers } from "redux";
// import { favouriteReducer } from "./favourite";
import authReducer from "./authenticate";
import likesReducer from "./likeReducer";


export const rootReducer = combineReducers({
//   likes: favouriteReducer,
  user: authReducer,
  likes:likesReducer
 
});