import React from "react";
import BookShelve from "./BookShelve";
import * as BooksApi from "../BooksAPI";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

class MyReads extends React.Component {
  state = {
    booklist: [],
  };

  componentDidMount() {
    this.fillStateWithBooks();
  }

  fillStateWithBooks = () => {
    BooksApi.getAll().then((elem) => {
      this.setState({
        ...this.state,
        booklist: [...elem],
      });
    });
  };

  handleShelfChange = (event) => {
    const shelve = event.target.value;
    const selectedIndex = event.target.options.selectedIndex;
    const idOfBook = event.target.options[selectedIndex].getAttribute("id");
    this.setState({ booklist: [] });

    BooksApi.update(idOfBook, shelve).then(() => this.fillStateWithBooks());
  };

  render() {
    return (
      <Grid container>
        <Grid xs={12} container item>
          <Grid
            className="list-books-title"
            direction="row"
            xs={12}
            item
            container
          >
            <Grid xs={8} item>
              <h1>MyReads</h1>
            </Grid>
            <Grid
              xs={4}
              alignItems="flex-end"
              container
              item
              justify="flex-end"
            >
              <Link
                to={{
                  pathname: "/search",
                }}
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  style={{ marginRight: 20 }}
                >
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
          </Grid>
          <Grid className="list-books-content">
            <Grid>
              <Grid className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <BookShelve
                  booklist={this.state.booklist}
                  shelfType="currentlyReading"
                  handleShelfChange={this.handleShelfChange}
                />
              </Grid>
              <Grid className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookShelve
                  booklist={this.state.booklist}
                  shelfType="read"
                  handleShelfChange={this.handleShelfChange}
                />
              </Grid>
            </Grid>
            <Grid className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
              <BookShelve
                booklist={this.state.booklist}
                shelfType="wantToRead"
                handleShelfChange={this.handleShelfChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MyReads;
