import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Master extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="activitylist">Activity List</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Master;
