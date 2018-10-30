import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createHistory from "history/createBrowserHistory";

import Master from './components/Master';
import CreateItem from './components/CreateItem';
import ListItem from './components/ListItem';
// import EditItem from './components/EditItem';


const history = createHistory();
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Master} />
          <Route exact path="/activitylist" component={ListItem} />
          <Route exact path="/add-task" component={CreateItem} />
          {/*<Route exact path="/edit-item/:id" component={EditItem} /> */}
        </div>
      </Router>
    )
  }
}

export default App;
