// SLICES
import {
  getCountriesStartReducer,
  getCountriesSuccessReducer,
  getCountriesFailedReducer,
  updateCountriesListReducer,
} from "store/countries/countries.slice";
// STORE
import { AppThunk } from "store";
// API
import countriesApi from "api";
// UTILITIES
import { formatCountrliesList, sortAsc, sortDesc } from "utilities";

// GET COUNTRIES LIST
export const getCountriesListAsync = (): AppThunk => async dispatch => {
  try {
    dispatch(getCountriesStartReducer());

    const resp = await countriesApi.getCountriesList();
    const countries = resp.data || [];
    // GET FIRST 40 COUNTRIES (there is no way to get specific amount of countries from API)
    const first40Countries = countries.slice(0, 40);
    const formattedCountriesList = formatCountrliesList(first40Countries);

    dispatch(getCountriesSuccessReducer({ countriesList: formattedCountriesList || [] }));
  } catch (error: any) {
    dispatch(getCountriesFailedReducer(error));
  }
};

// REMOVE A COUNTRY FROM THE LIST
export const removeCountry =
  (uuid: string, countries: any): AppThunk =>
  dispatch => {
    const updatedCountries = countries.filter((c: any) => c.uuid !== uuid);
    dispatch(updateCountriesListReducer({ countriesList: updatedCountries }));
  };

// SORT BY SPECIFIC FIELDS
export const sortByField =
  (direction: string, field: string, countries: any): AppThunk =>
  dispatch => {
    let sortedArr = direction === "asc" ? sortAsc(countries, field) : sortDesc(countries, field);
    dispatch(updateCountriesListReducer({ countriesList: sortedArr }));
  };

// FILTER COUNTRIES
export const filterCountriesList =
  (text: string, countries: any): AppThunk =>
  dispatch => {
    const updatedCountries = countries.filter((c: any) => {
      return (
        c.country.toLowerCase().includes(text.toLowerCase()) ||
        c.region.toLowerCase().includes(text.toLowerCase())
      );
    });
    dispatch(updateCountriesListReducer({ countriesList: updatedCountries }));
  };
