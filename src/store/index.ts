import { configureStore, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { persistStore, REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";
import logger from "redux-logger";

// ROOT REDUCER
import rootReducer, { RootState } from "store/root-reducers";

// OTHER MIDDLEWARES
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [REGISTER, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
    },
  }),
  logger,
];

// CONFIGURE STORE
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export const persistor = persistStore(store);

// CONFIGURED DISPATCH
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();

export default store;
