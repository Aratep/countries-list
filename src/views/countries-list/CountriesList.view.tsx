import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";

// COMPONENTS
import LoaderWrapper from "components/loader-wrapper/LoaderWrapper.component";
import CTable from "components/table/Table.component";
// SLICES
import { selectCountries } from "store/countries/countries.slice";
// ACTIONS
import {
  getCountriesListAsync,
  removeCountry,
  filterCountriesList,
  sortByField,
} from "store/countries/countries.actions";
// STORE
import { useAppDispatch } from "store";
// UTILS
import { headItems } from "views/countries-list/countries-list.utils";

function CountriesList() {
  const [filterText, setFilterText] = useState<string>("");
  const dispatch = useAppDispatch();
  const countriesStore = useSelector(selectCountries);

  const { countriesList, filteredCountriesList, isLoading } = countriesStore;

  useEffect(() => {
    dispatch(getCountriesListAsync());
    // eslint-disable-next-line
  }, []);

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

  return (
    <div className="countries-list">
      <h1>Countries</h1>
      <LoaderWrapper isLoading={isLoading!}>
        <Box className="countries-list__box">
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
            />
          </Grid>
        </Box>
      </LoaderWrapper>
    </div>
  );
}

export default CountriesList;
