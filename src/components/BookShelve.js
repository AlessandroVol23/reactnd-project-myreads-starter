import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import Grid from "@material-ui/core/Grid";

function BookShelve({ booklist, shelfType, handleShelfChange, all }) {
  return (
    <Grid container spacing={4} style={{ margin: 10, marginLeft: 20 }}>
      {all
        ? booklist.map(
            ({
              authors,
              description,
              id,
              shelf = "",
              subtitle,
              title,
              imageLinks,
            }) => (
              <Book
                key={id}
                authors={authors}
                description={description}
                id={id}
                shelf={shelf}
                subtitle={subtitle}
                title={title}
                imageLinks={imageLinks}
                handleShelfChange={handleShelfChange}
              />
            )
          )
        : booklist
            .filter(({ shelf }) => shelfType === shelf)
            .map(
              ({
                authors,
                description,
                id,
                shelf = "",
                subtitle,
                title,
                imageLinks,
              }) => (
                <Book
                  key={id}
                  authors={authors}
                  description={description}
                  id={id}
                  shelf={shelf}
                  subtitle={subtitle}
                  title={title}
                  imageLinks={imageLinks}
                  handleShelfChange={handleShelfChange}
                />
              )
            )}
    </Grid>
  );
}

BookShelve.propTypes = {
  booklist: PropTypes.array,
  shelfType: PropTypes.oneOf(["currentlyReading", "read", "wantToRead"]),
};

export default BookShelve;
