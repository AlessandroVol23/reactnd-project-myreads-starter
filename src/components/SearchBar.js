import { Grid, Typography } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
function SearchBar({ handleSearchQuery, handleChange }) {
  const handleSubmit = (event) => {
    console.log("cliekd handle submit");
    console.log(event.target.value);
    event.preventDefault();
  };
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
