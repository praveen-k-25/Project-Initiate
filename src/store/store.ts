import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth_slice";
import liveReducer from "./live_data_slice";
import persistStore from "redux-persist/es/persistStore";

// Persist storage : only persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine All slices in rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  live: liveReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // avoid persist-redux warning
    }),
});

export const persistor = persistStore(store);

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
