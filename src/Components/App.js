import React, { Component } from "react";
import Header from "Components/Header";
import Router from "Components/Router";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
