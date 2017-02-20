import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  };

  handleSearch (searchFor) {
    console.log('searchFor:');
    console.log(searchFor);
  };

  render() {
    return (
      <div className="app">
        <Search onSearch={(searchTerm) => this.handleSearch(searchTerm)} />
        <Results />
      </div>
    );
  }
}

export default App;
