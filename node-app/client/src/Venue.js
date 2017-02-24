import React, { Component, PropTypes as T } from 'react';
import AuthService from './utils/AuthService';

import { getUsersGoingCount, toggleUserGoing } from './models/venue.js';
import { Button, Media, Image } from 'react-bootstrap';

import './Venue.css';

class Venue extends Component {

  static propTypes = {
    auth: T.instanceOf(AuthService)
  };

  constructor(props) {
     super(props);

     // This binding is necessary to make `this` work in the callback
     this.handleClick = this.handleClick.bind(this);
     this.state = {
       users_going_count: this.props.data.users_going_count
     };
   };

  handleClick () {
    if ( ! this.props.auth.loggedIn()) {
      this.props.auth.login();
    } else {
      // Toggle if the user is going or not.
      toggleUserGoing(this.props.data.id)
      .then(() => {
        // Get the updated count of users going.
        getUsersGoingCount(this.props.data.id)
        .then(data => {
          this.setState({
            users_going_count: data.users_going_count
          });
        })
      })
    }
  };

  render() {
    return (
      <Media id={'venue-' + this.props.index} className="Venue">
        <Media.Left>
          <Image alt={this.props.data.name} src={this.props.data.image_url} rounded />
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <p>{this.props.data.name}</p>
          </Media.Heading>
          <p>{this.props.data.snippet_text}</p>
          <Button
            bsStyle="success"
            onClick={this.handleClick}>
            {this.state.users_going_count} Going
          </Button>
        </Media.Body>
      </Media>
    );
  }
};

export default Venue;
