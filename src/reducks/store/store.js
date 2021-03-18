import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk'; // 非同期処理

// Import reducers
//* reducersを追加したらstore.jsで追加する必要がある
import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export default function createStore(history) {
  return reduxCreateStore(
    //reduxのcreateStoreメソッドの別名
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
