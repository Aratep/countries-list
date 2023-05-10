import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

// SLICES
import { countriesSlice } from "store/countries/countries.slice";

// PERSIST CONFIG
import { persistConfig } from "./persist-config";

const rootReducers = combineReducers({
  countries: countriesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

export default persistReducer(persistConfig, rootReducers);
