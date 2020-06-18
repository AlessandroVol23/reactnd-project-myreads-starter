import React from "react";
import { Grid } from "@material-ui/core";

function Dropdown({ id, shelf, handleShelfChange }) {
  return (
    <Grid style={{ padding: 10 }}>
      <select
        onChange={(event) => handleShelfChange(event)}
        value={shelf}
        key={id}
      >
        <option id={id} value="wantToRead">
          wantToRead
        </option>
        <option id={id} value="read">
          read
        </option>
        <option id={id} value="currentlyReading">
          currentlyReading
        </option>
        <option id={id} value="notSelected" disabled={true}>
          None
        </option>
      </select>
    </Grid>
  );
}

Dropdown.propTypes = {};

export default Dropdown;
