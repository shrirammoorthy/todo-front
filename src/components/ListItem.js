import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      items: null,
      completed: null,
      pending: null,
      text: '',
      status: ''
    }
  }
  componentDidMount() {
    axios.get(config.apiUrl + 'items')
      .then(this.handleResponse).catch(function (error) {
        console.log(error);
      })
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
  handleClick(e) {
    const id = e.target.dataset.id;
    const data = [...this.state.items];
    let uri = config.apiUrl + `/items/` + id;
    axios.delete(uri);
    const item = data.filter(object => object.id != id)
    const count = this.handleCount(item);
    this.setState({ ...count });
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
  handleUpdate(e) {
    const id = e.target.dataset.id;
    this.props.history.push('/edit-item/' + id);
  }
  handleSubmit(event) {
    const items = {
      text: this.state.text,
      status: this.state.status
    }
    const vals = {
      id: '',
      item: this.state.text,
      status: this.state.status,
      created_at: '',
      updated_at: ''
    }
    let uri = config.apiUrl + 'items';
    axios.post(uri, items);
    // axios.get(uri)
    //   .then(this.handleResponse).catch(function (error) {
    //     console.log(error);
    //   });
    console.log(...this.state.items)
    this.setState({ items: [...this.state.items, vals] })
    console.log(...this.state.items)
    const data = [ ...this.state.items ];
    const count = this.handleCount(data);
    this.setState({ ...count, text: '', status: '' });
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
              <p><input type="text" id="addItem" placeholder="Please enter to do tasks" className="form-control" onChange={this.handleChange1} value={this.state.text} /></p>
              <p>Please check the list if tasks completed.<input type="checkbox" id="setItem" checked={this.state.status} className="form-control" onChange={this.handleChange2} /></p>
              <input type="submit" className="btn btn-info" id="add" value="Add" onClick={this.handleSubmit} />
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
                      <p>  <Link to={{ pathname: "/edit-item", state: { id: object.id } }} className="btn btn-success">Edit</Link>
                        {/* <button data-id={object.id} className="btn btn-edit" id="edit" onClick={this.handleUpdate}>Edit</button> */}
                        <button data-id={object.id} className="btn btn-Danger" id="delete" onClick={this.handleClick}>Delete</button></p>
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
