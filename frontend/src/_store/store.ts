import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, PURGE, persistReducer, persistStore } from "redux-persist";

import checkIdSlice from "./slices/checkIdSlice";
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage: storage,
};
// 리듀서
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
  checkId: checkIdSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
  devTools: true,
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
