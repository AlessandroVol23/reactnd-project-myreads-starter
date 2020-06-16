import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

function Book({ id, shelf, handleShelfChange }) {
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
      </select>
    </Grid>
  );
}

Book.propTypes = {
  booklist: PropTypes.array,
};

export default Book;
