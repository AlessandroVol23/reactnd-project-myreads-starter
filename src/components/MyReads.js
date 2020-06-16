import React from "react";
import BookShelve from "./BookShelve";
import * as BooksApi from "../BooksAPI";

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
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
              </div>
              <div>
                <BookShelve
                  booklist={this.state.booklist}
                  shelfType="currentlyReading"
                  handleShelfChange={this.handleShelfChange}
                />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
              </div>
              <div>
                <BookShelve
                  booklist={this.state.booklist}
                  shelfType="read"
                  handleShelfChange={this.handleShelfChange}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
            </div>
            <div>
              <BookShelve
                booklist={this.state.booklist}
                shelfType="wantToRead"
                handleShelfChange={this.handleShelfChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyReads;
