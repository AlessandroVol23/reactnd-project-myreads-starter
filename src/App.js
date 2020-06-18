import React from "react";
import "./App.css";
import MyReads from "./components/MyReads";
import SearchPage from "./components/SearchPage";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    page: "search",
  };
  render() {
    return (
      <div>
        <Route exact path="/" component={MyReads} />
        <Route exact path="/search" component={SearchPage} />
      </div>
    );
  }
}
//TODO: How to pass function from myreads to searchpage? Handle Shelf Change

export default BooksApp;
