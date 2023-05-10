import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ROOT REDUCER
import { RootState } from "store/root-reducers";

// FLAG
interface IFlag {
  alt: string;
  png: string;
}
// DEFINE SINGLE COUNTRY TYPE
export interface ICountry {
  id: string;
  name: { common: string };
  region: string;
  population: number;
  area: number;
  flags: IFlag;
}

// DEFINE COUNTRY STATE
interface CountriesState {
  countriesList?: ICountry[];
  filteredCountriesList?: ICountry[];
  isLoading?: boolean;
  error?: string;
}

// INITIAL STATE
const initialState: CountriesState = {
  isLoading: false,
  error: "",
  countriesList: [],
  filteredCountriesList: [],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountriesStartReducer: state => {
      state.isLoading = true;
    },
    getCountriesSuccessReducer: (state, { payload }: PayloadAction<CountriesState>) => {
      state.countriesList = payload.countriesList;
      state.isLoading = false;
    },
    getCountriesFailedReducer: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.isLoading = false;
    },
    updateCountriesListReducer: (state, { payload }: PayloadAction<CountriesState>) => {
      state.filteredCountriesList = payload.countriesList;
    },
    // filterCountriesListReducer: (state, { payload }: PayloadAction<any>) => {
    //   console.log(payload);
    //
    //   const filteredUsers = state.countriesList!.filter((c: any) =>
    //     c.country.toLowerCase().includes(payload.text.toLowerCase())
    //   );
    //   return { ...state, filteredCountriesList: filteredUsers };
    //   // state.countriesList = payload.countriesList;
    // },
  },
});

export const {
  getCountriesStartReducer,
  getCountriesSuccessReducer,
  getCountriesFailedReducer,
  updateCountriesListReducer,
} = countriesSlice.actions;

export const selectCountries = (state: RootState) => state.countries;
