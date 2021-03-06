import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchBar from "./SearchBar";
import * as BooksApi from "../BooksAPI";
import BookShelve from "./BookShelve";
import MyReadsHeader from "./MyReadsHeader";

import { withRouter } from "react-router-dom";

class SearchPage extends React.Component {
  state = {
    query: "",
    searchResults: [],
    searchResultLookup: {},
    showShelve: false,
    booklist: [],
    lookupBooks: {},
  };

  componentDidMount() {
    this.fillStateWithBooks();
  }

  fillStateWithBooks = () => {
    BooksApi.getAll()
      .then((elem) => {
        this.setState({
          ...this.state,
          booklist: [...elem],
        });
      })
      .then(() =>
        this.setState({
          ...this.state,
          lookupBooks: this.state.booklist.reduce((acc, currVal) => {
            return {
              ...acc,
              [currVal.id]: {
                ...currVal,
              },
            };
          }, {}),
        })
      );
  };

  handleShelfChange = (event) => {
    const shelf = event.target.value;
    const selectedIndex = event.target.options.selectedIndex;
    const idOfBook = event.target.options[selectedIndex].getAttribute("id");

    this.setState({
      ...this.state,
      searchResults: this.state.searchResults.map((elem) => {
        if (elem.id === idOfBook) {
          return {
            ...elem,
            shelf,
          };
        } else {
          return elem;
        }
      }),
    });

    BooksApi.update(idOfBook, shelf).then(() => { });
  };

  handleChange = (event) => {
    if (event.target.value === "") {
      this.setState({
        ...this.state,
        query: "",
        showShelve: false,
      });
    } else {
      this.setState({ query: event.target.value });
      this.handleSearchQuery(event.target.value);
    }
  };

  sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleSearchQuery = (query) => {
    this.sleep(2000)

    BooksApi.search(query)
      .then((elem) => this.mergeSearchResultsAndBooklist(elem, query))
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          searchResults: []
        })
      });
  };



  mergeSearchResultsAndBooklist = (searchResults = [], query) => {
    const filteredBooks = searchResults.filter(
      (elem) =>
        elem.imageLinks !== undefined &&
        elem.authors !== undefined &&
        elem.title !== undefined
    );

    const lookupBooks = this.state.booklist.reduce((acc, currVal) => {
      return {
        ...acc,
        [currVal.id]: {
          ...currVal,
        },
      };
    }, {});

    const alteredSearchResults = [];

    filteredBooks.forEach((elem) => {
      if (lookupBooks[elem.id]) {
        let book = elem;
        book.shelf = lookupBooks[elem.id].shelf;
        alteredSearchResults.push(book);
      } else {
        alteredSearchResults.push(elem);
      }
    });

    if (query === this.state.query) {

      this.setState({
        ...this.state,
        searchResults: alteredSearchResults,
        showShelve: true,
      });
    }

  };

  render() {
    return (
      <Grid>
        <MyReadsHeader />
        <Grid style={{ padding: 20 }}>
          <SearchBar
            handleChange={this.handleChange}
            value={this.state.query}
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
