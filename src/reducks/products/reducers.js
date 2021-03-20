import * as Actions from './actions';
import initialState from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
        //! list: action.Actions この書き方だと確かにStoreの値は書き換わるが、Component側でそれを検知できない
      };
    case Actions.DELETE_PRODUCT:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
