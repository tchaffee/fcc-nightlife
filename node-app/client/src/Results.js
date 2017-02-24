import React, { Component } from 'react';
import Venue from './Venue';
import './Results.css';

class Results extends Component {
  render() {
    const venues =
      this.props.data.businesses.map((item, index) => {
        return <Venue key={item.id} auth={this.props.auth} index={index} data={item} />
      });

    return (
      <div className="Results">
        { venues }
      </div>
    );
  }
};

export default Results;
