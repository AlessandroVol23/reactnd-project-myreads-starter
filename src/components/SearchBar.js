import { Grid } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
function SearchBar({ handleSearchQuery, handleChange }) {
  return (
    <Grid>
      <TextField name="search" placeholder="Search" onChange={handleChange} />
      <Button label="Submit" onClick={handleSearchQuery}>
        SEARCH
      </Button>
    </Grid>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
