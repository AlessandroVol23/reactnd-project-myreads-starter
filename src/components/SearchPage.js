import React from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import * as BooksApi from "../BooksAPI";
import BookShelve from "./BookShelve";

class SearchPage extends React.Component {
  state = {
    query: "",
    searchResults: [],
    showShelve: false,
  };

  fetchQueryResults = (query) => {
    console.log("Start query with param ", query);
    BooksApi.search(query).then((elem) => console.log(elem));
    BooksApi.search(query).then((elem) =>
      this.setState({ searchResults: elem, showShelve: true })
    );
  };

  handleSearchQuery = () => {
    console.log("Clicked on search query");
    console.log(this.state.query);
    this.fetchQueryResults(this.state.query);
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <Grid style={{ padding: 20 }}>
        <SearchBar
          handleSearchQuery={this.handleSearchQuery}
          handleChange={this.handleChange}
        />
        {this.state.showShelve && (
          <BookShelve all booklist={this.state.searchResults} />
        )}
      </Grid>
    );
  }
}

SearchPage.propTypes = {};

export default SearchPage;
