import React, { Component } from 'react';
import { Form, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';

import './Search.css';

class Search extends Component {

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
      <div className="Search">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl
                id="search"
                name="search"
                type="text"
                value={this.state.value}
                placeholder="What Town?"
                onChange={this.handleChange}
              />
              <InputGroup.Button>
               <Button type="submit">Find Bars</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
    );
  };
};

export default Search;
