import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";

// COMPONENTS
import LoaderWrapper from "components/loader-wrapper/LoaderWrapper.component";
import CTable from "components/table/Table.component";
// SLICES
import {
  selectCountries,
  // updateCountriesListReducer
} from "store/countries/countries.slice";
// ACTIONS
import {
  getCountriesListAsync,
  removeCountry,
  filterCountriesList,
  sortByField,
} from "store/countries/countries.actions";
// STORE
import { useAppDispatch } from "store";

function CountriesList() {
  const [filterText, setFilterText] = useState<string>("");
  const dispatch = useAppDispatch();
  const countriesStore = useSelector(selectCountries);

  const { countriesList, filteredCountriesList, isLoading } = countriesStore;

  useEffect(() => {
    dispatch(getCountriesListAsync());
    // eslint-disable-next-line
  }, []);

  const headItems: any = [
    { displayName: "country", label: "country" },
    { displayName: "region", label: "region" },
    { displayName: "population", label: "formattedPopulation" },
    { displayName: "area", label: "formattedArea" },
    { displayName: "flag", label: "flag", isIcon: true },
  ];

  function removeCountryFromList(e: React.FormEvent<HTMLFormElement>, uuid: string) {
    e.preventDefault();
    dispatch(removeCountry(uuid, filteredCountriesList));
  }

  function filterCountries(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFilterText(e.target.value);

    dispatch(filterCountriesList(e.target.value, countriesList));
  }

  function onSortChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    dispatch(sortByField(e.target.value, field, filteredCountriesList));
  }

  // function updateCountriesList(list: any) {
  //   dispatch(updateCountriesListReducer(list));
  // }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Countries</h1>
      <LoaderWrapper isLoading={isLoading || false}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Grid
            container
            item={true}
            xs={8}
          >
            <CTable
              headItems={headItems}
              bodyItems={filteredCountriesList}
              hasRemoveBtn={true}
              onRemoveClick={removeCountryFromList}
              text={filterText}
              onSearchChange={filterCountries}
              onSortChange={onSortChange}
              // updateList={updateCountriesList}  // for pagination
            />
          </Grid>
        </Box>
      </LoaderWrapper>
    </div>
  );
}

export default CountriesList;
