const initialState = {
  likedItems: [],
};
export const addToFavourite = "addToFav";
export const removeToFavourite = "removeFromFav";
export const RemoveEverything = "removeallFav";
const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case addToFavourite:
      return {
        ...state,
        likedItems: Array.isArray(state.likedItems) // if state.items is array
        ? [...state.likedItems, action.payload]
        : [action.payload],
      };

    case removeToFavourite:
      const updatedFavourites = state.likedItems.filter(
        (item) => item.title !== action.payload.title
      );
      return {
        ...state,
        likedItems: updatedFavourites,
      };
      case RemoveEverything:
      return {
        ...state,
        likedItems: [],
      };
    default:
      return state;
  }
};

export default likesReducer;
