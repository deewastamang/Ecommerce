import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// api slice import
import { productSlice } from "./productSlice/product.slice";
import { orderSlice } from "./orderSlice/order.slice";
import { authSlice } from "./authSlice/auth.slice";
// slice import
import shoppingReducer from "./shoppingSlice/shopping.slice";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

//creating dummy storage for persistance in both client and server
export function createPersistStorage() {
    const isServer = typeof window === 'undefined';
    //if the enviroment is server, this returns noop(dummy) storage to persist
    if(isServer) {
        // If the code is running on the server (isServer is true), the function returns a dummy storage object. This object has three methods (getItem, setItem, and removeItem) that all resolve to empty promises. Since Web Storage doesn't exist in server-side environments, these methods essentially do nothing.
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve()
            },
            removeItem() {
                return Promise.resolve()
            }
        }
    }
    //if the environment is client side,it uses local storage in browser to persist data
    return createWebStorage('local')
}

const storage = createPersistStorage();


//combining all reducers from all slices and also api slices
export const rootReducer = combineReducers({
  // userSlice: userReducer,
  // userSlice2: userReducer2,
  shopping: shoppingReducer, //use the reducer name to extract data from store using useSelector hook i.e. const {products} = useSelector(state => state.shopping);
  [productSlice.reducerPath]: productSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
});

//add middleware from api slices for rtk query
export const rootApiMiddleware = [productSlice.middleware, orderSlice.middleware, authSlice.middleware];

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: [productSlice.reducerPath, orderSlice.reducerPath, authSlice.reducerPath], //not persisting this api slice
  };

//to persist reducer data
export const persistedReducer = persistReducer(persistConfig, rootReducer);
