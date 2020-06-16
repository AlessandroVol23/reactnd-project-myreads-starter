import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import MyReads from "./components/MyReads";
import SearchPage from "./components/SearchPage";

class BooksApp extends React.Component {
  state = {
    page: "search",
  };
  render() {
    return (
      this.state.page === "reads" && <MyReads />,
      this.state.page === "search" && <SearchPage />
    );
  }
}

export default BooksApp;
