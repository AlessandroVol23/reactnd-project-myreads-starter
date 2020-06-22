import React from "react";
import BookShelve from "./BookShelve";
import * as BooksApi from "../BooksAPI";
import Grid from "@material-ui/core/Grid";
import MyReadsHeader from "./MyReadsHeader";
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
    const shelf = event.target.value;
    const selectedIndex = event.target.options.selectedIndex;
    const idOfBook = event.target.options[selectedIndex].getAttribute("id");
    this.setState({ booklist: [] });

    this.setState({
      ...this.state,
      booklist: this.state.booklist.map((elem) => {
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

    BooksApi.update(idOfBook, shelf).then(() => {});
  };

  render() {
    return (
      <Grid container>
        <Grid xs={12} container item>
          <MyReadsHeader search />
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
    );
  }
}

export default MyReads;
