import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.state = {
      items: null,
      completed: null,
      pending: null
    }
  }
  componentDidMount() {
    axios.get(config.apiUrl + 'items')
      .then(this.handleResponse).catch(function (error) {
        console.log(error);
      })
  }
  handleResponse(response) {
    const data = response.data;
    const count = this.handleCount(data);
    this.setState({ ...count });
  }
  handleCount(data) {
    let completed = 0;
    let pending = 0;
    const set = data.forEach(object => {
      if (object.status === 1) completed++;
      else pending++;
    })
    return { items: data, completed, pending }
  }
  handleChangeChk(e) {
    const products = {
      text: e.target.value,
      status: e.target.checked
    }
    const id = e.target.dataset.id;
    const data = [...this.state.items];
    const item = data.filter(object => {
      if (object.id == id) object.status = object.status === 0 ? 1 : 0
    })
    const count = this.handleCount(data);
    let uri = config.apiUrl + 'items/' + id;
    axios.put(uri, products).then((response) => {
    })
    this.setState({ ...count });
  }
  render() {
    if (this.state.items == null) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-lg-offset-3 col-lg-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-success">Activity List</h3>
              <Link to="add-task" className="btn btn-default">Add</Link>
            </div>

            <div className="panel-body" id="items">
              <ul className="list-group">
                <li className="list-group-item ourItem">
                  {this.state.items.map((object, i) => (
                    <div key={i}>
                      <p>
                        <input type="checkbox" className="form-control" data-id={object.id}
                          defaultChecked={!!object.status} onChange={this.handleChangeChk} value={object.item} />
                        {object.item}<br />
                      </p>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
            <div>
              Completed Items: {this.state.completed}<br />
              Pending Items: {this.state.pending}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ListItem;
