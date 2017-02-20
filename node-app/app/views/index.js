class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} type="text" id="search" name="search" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
};

class Venue extends React.Component {
  render() {
    return (
      <div className="venue">
        <p>This is a venue</p>
      </div>
    );
  }
};

class Results extends React.Component {
  render() {
    return (
      <div className="results">
        <Venue />
      </div>
    );
  }
};

class App extends React.Component {
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
