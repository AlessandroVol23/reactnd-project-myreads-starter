import { Grid } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

function SearchBar({ handleChange, value }) {
  return (
    <Grid>
      <TextField
        fullWidth
        name="search"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />
    </Grid>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
