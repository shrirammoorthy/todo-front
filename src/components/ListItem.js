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
  handleResponse(response) {
    const data = response.data;
    let completed = 0;
    let pending = 0;
    data.forEach(function (object, key) {
      if (object.status == true) {
        completed++;
      }
      else {
        pending++;
      }
    })
    this.setState({ items: data, completed: completed, pending: pending });

  }
  componentDidMount() {
    axios.get(config.apiUrl + 'items')
      .then(this.handleResponse).catch(function (error) {
        console.log(error);
      })
  }
  handleChangeChk(id, event) {
    event.preventDefault();
    const data = [...this.state.items];
    const item = data.filter(function(item){
      return item.id === id;
    })

    //item[0].status = !item[0].status;
    console.log(item);
    this.setState({ items: data });

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
                  {/* {this.tabRow()} */}
                  {this.state.items.map((object, i) => (
                    <div key={i}>
                      <p>
                        <input type="checkbox" className="form-control"
                         defaultChecked={!object.status} onChange={(e) => this.handleChangeChk(object.id, e)} />
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
