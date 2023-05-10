import React from "react";
import { TextField, Box, Grid, MenuItem } from "@mui/material";

type ToolBarType = {
  searchText?: string;
  onFilterChange?: any;
  onSortChange?: any;
  listLength?: number;
};

function ToolBar({ searchText, onFilterChange, onSortChange, listLength }: ToolBarType) {
  return (
    <Box
      component="form"
      display={"flex"}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <Grid
        container
        item={true}
        xs={8}
      >
        <TextField
          label="Filter"
          variant="outlined"
          placeholder={"Filter"}
          value={searchText}
          onChange={onFilterChange}
        />
      </Grid>
      <Grid
        container
        item={true}
        xs={8}
      >
        <Grid
          container
          item={true}
          xs={4}
        >
          <TextField
            disabled={listLength === 0}
            select
            fullWidth
            label="Sort by population"
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSortChange(e, "population")}
          >
            <MenuItem
              disabled
              value={""}
            >
              Sort by population
            </MenuItem>
            <MenuItem value={"asc"}>asc</MenuItem>
            <MenuItem value={"desc"}>desc</MenuItem>
          </TextField>
        </Grid>
        <Grid
          container
          item={true}
          xs={4}
        >
          <TextField
            disabled={listLength === 0}
            select
            fullWidth
            label="Sort by area"
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSortChange(e, "area")}
          >
            <MenuItem
              disabled
              value={""}
            >
              Sort by area
            </MenuItem>
            <MenuItem value={"asc"}>asc</MenuItem>
            <MenuItem value={"desc"}>desc</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ToolBar;
