import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./apis/userApi";
import { addressSlice } from "./slices/addressSlice";
import { authApi } from "./apis/authApi";
import { addressApi } from "./apis/addressApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { setupListeners } from "@reduxjs/toolkit/query";
import { wishlistApi } from "./apis/wishlistApi";
// import { productsApi } from "./apis/productApi.ts.bak";
import { categoryApi } from "./apis/categoryApi";
import { storeTypeSlice } from "./slices/storeTypeSlice";
import { cartApi } from "./apis/cartApi";
import { centerAddressSlice } from "./slices/centerAddressSlice";
import { centerAddressApi } from "./apis/centerAddresApi";
import { orderSlice } from "./slices/orderSlice";
import { productListSlice } from "./slices/productListSlice";
import { authSlice } from "./slices/authSlice";
import { imageApi } from "./apis/imageApi";
import { roleApi } from "./apis/roleApi";
import { productApi } from "./apis/productApi";
import { newArrivalApi } from "./apis/newArrivalApi";

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [addressSlice.name]: addressSlice.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  // [productsApi.reducerPath]: productsApi.reducer,
  [productListSlice.name]: productListSlice.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [storeTypeSlice.name]: storeTypeSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [centerAddressApi.reducerPath]: centerAddressApi.reducer,
  [centerAddressSlice.name]: centerAddressSlice.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [newArrivalApi.reducerPath]: newArrivalApi.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [userApi.reducerPath, authApi.reducerPath, addressApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(wishlistApi.middleware)
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(addressApi.middleware)
      .concat(categoryApi.middleware)
      .concat(centerAddressApi.middleware)
      .concat(roleApi.middleware)
      .concat(productApi.middleware)
      .concat(newArrivalApi.middleware)
      .concat(imageApi.middleware),
});

// store.subscribe(() => {
//   console.log("State after change:", store.getState().mapSelectedAddress);
// });

export const persistor = persistStore(store);

setupListeners(store.dispatch);

// Types for the root state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
