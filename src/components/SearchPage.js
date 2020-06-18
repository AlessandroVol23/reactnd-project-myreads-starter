import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import * as BooksApi from "../BooksAPI";
import BookShelve from "./BookShelve";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";

class SearchPage extends React.Component {
  state = {
    query: "",
    searchResults: [],
    showShelve: false,
    booklist: [],
  };

  componentDidMount() {
    this.fillStateWithBooks();
  }

  handleShelfChange = (event) => {
    const shelve = event.target.value;
    const selectedIndex = event.target.options.selectedIndex;
    const idOfBook = event.target.options[selectedIndex].getAttribute("id");

    BooksApi.update(idOfBook, shelve).then(() => {});

    this.props.history.push("/");
  };

  fillStateWithBooks = () => {
    BooksApi.getAll().then((elem) => {
      this.setState({
        ...this.state,
        booklist: [...elem],
      });
    });
  };

  fetchQueryResults = (query) => {};

  handleSearchQuery = () => {
    BooksApi.search(this.state.query)
      .then((elem) => this.setState({ searchResults: elem }))
      .then(() => this.mergeSearchResultsAndBooklist());
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  mergeSearchResultsAndBooklist = () => {
    this.setState({
      ...this.state,
      searchResults: this.state.searchResults.filter(
        (elem) => elem.imageLinks !== undefined
      ),
    });

    const lookupBooks = this.state.booklist.reduce((acc, currVal) => {
      return {
        ...acc,
        [currVal.id]: {
          ...currVal,
        },
      };
    }, {});

    const alteredSearchResults = [];

    this.state.searchResults.forEach((elem) => {
      if (lookupBooks[elem.id]) {
        let book = elem;
        book.shelf = lookupBooks[elem.id].shelf;
        alteredSearchResults.push(book);
      } else {
        alteredSearchResults.push(elem);
      }
    });

    this.setState({
      ...this.state,
      searchResults: alteredSearchResults,
      showShelve: true,
    });
  };

  render() {
    return (
      <Grid>
        <Grid item className="list-books-title">
          <Link to="/">
            <h1>MyReads</h1>
          </Link>
        </Grid>
        <Grid style={{ padding: 20 }}>
          <SearchBar
            handleSearchQuery={this.handleSearchQuery}
            handleChange={this.handleChange}
          />
          {this.state.showShelve && (
            <BookShelve
              all
              booklist={this.state.searchResults}
              handleShelfChange={this.handleShelfChange}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

SearchPage.propTypes = {};

export default withRouter(SearchPage);
