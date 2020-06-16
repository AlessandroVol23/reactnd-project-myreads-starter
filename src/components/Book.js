import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import Dropdown from "./Dropdown";
function Book({
  authors,
  description,
  id,
  shelf,
  subtitle,
  title,
  imageLinks,
  handleShelfChange,
}) {
  return (
    <Grid item style={{ margin: 10 }}>
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 192,
          backgroundImage: `url(${imageLinks.smallThumbnail})`,
        }}
      />
      <Dropdown id={id} shelf={shelf} handleShelfChange={handleShelfChange} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1">{authors}</Typography>
    </Grid>
  );
}

Book.propTypes = {
  authors: PropTypes.array,
  description: PropTypes.string,
  id: PropTypes.string,
  shelf: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  imageLinks: PropTypes.object,
};

export default Book;
