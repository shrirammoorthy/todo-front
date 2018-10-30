import React, { Component } from 'react';
import axios from 'axios';
import createHistory from "history/createBrowserHistory";
import config from '../config';

const history = createHistory();
class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', status: false };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange1(e) {
    this.setState({
      text: e.target.value
    })
  }
  handleChange2(e) {
    this.setState({
      status: !this.state.status
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    const items = {
      text: this.state.text,
      status: this.state.status
    }
    let uri = config.apiUrl + 'items';
    axios.post(uri, items).then((response) => {
      this.props.history.push('/activitylist');
    });
  }

  render() {
    return (

      <div>
        <form className="App" onSubmit={this.handleSubmit}>
          <p><input type="text" id="addItem" placeholder="Please enter to do tasks" className="form-control" onChange={this.handleChange1} /></p>
          <p>Please check the list if tasks completed.<input type="checkbox" id="setItem" className="form-control" checked={this.state.status} onChange={this.handleChange2} /></p>
          <input type="submit" className="btn btn-info" id="add" value="Add" />
        </form>
      </div>

    )
  }
}
export default CreateItem;
