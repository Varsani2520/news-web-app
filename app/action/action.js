import { LOGIN_USER, LOGOUT_USER } from "../reducer/authenticate";
import {  RemoveEverything, addToFavourite, removeToFavourite } from "../reducer/likeReducer";

export const loginUser = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT_USER,
});


export const addToFavouriteItem = (item) => ({
  type: addToFavourite,
  payload: item,
});
export const removeToFavouriteItem = (item) => ({
  type: removeToFavourite,
  payload: item,
});
export const removeAllFavouriteItem = () => ({
  type: RemoveEverything,
  
});