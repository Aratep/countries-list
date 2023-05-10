import axios from "axios";

const countriesApi = {
  // GET COUNTRIES LIST
  getCountriesList: () => axios.get("https://restcountries.com/v3.1/all"),
};

export default countriesApi;
