import React, { Component } from 'react';
import AuthService from './utils/AuthService';

const auth = new AuthService('7iR3YcDoRL33tQ8OBI4HGlAJwMcXwYWw', 'tchaffee.auth0.com');

import Search from './Search';
import Results from './Results';
// import logo from './logo.svg';
import './App.css';
import { Jumbotron, Glyphicon } from 'react-bootstrap';


class App extends Component {
  constructor () {
    super();
    this.state = {
      data: { businesses: [] }
    };
  };

  handleSearch (searchFor) {
    // TODO: Put this in its own module.

    fetch('/api/searchbars/' + encodeURI(searchFor), {
      method: 'GET',
    })
    .then(response => {
      // TODO: Handle error.
      return response.json();
    })
    .then(data => {
      this.setState({ data: data });
    });

  };

  render() {
    return (
      <Jumbotron className="App">
        <h1 className="App">Plans Tonight?</h1>
        <h1>
          <Glyphicon glyph="music" />&nbsp;
          <Glyphicon glyph="glass" />
          <Glyphicon glyph="cutlery" />
        </h1>
        <Search onSearch={(searchTerm) => this.handleSearch(searchTerm)} />
        <Results data={this.state.data} auth={auth} />
      </Jumbotron>
    );
  }
}

export default App;
