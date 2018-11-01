import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', status: '', id: '' };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {id} = this.props.location.state
    this.setState({ id: id })
    axios.get(config.apiUrl + `/items/` + id)
      .then(response => {
        this.setState({ text: response.data.item, status: response.data.status });
      })
      .catch(function (error) {
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
  handleSubmit(event) {
    event.preventDefault();
    const products = {
      text: this.state.text,
      status: this.state.status
    }
    let uri = config.apiUrl + 'items/' + this.state.id;
    axios.put(uri, products).then((response) => {
      this.props.history.push('/activitylist');
    });
  }
  render() {
    return (
      <div>
        <h1>Update Task</h1>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <Link to="/activitylist" className="btn btn-success">Return to List</Link>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-body">
            <input type="hidden" id="id" />
            <p><input type="text" id="addItem" placeholder="Please enter to do tasks" value={this.state.text} className="form-control" onChange={this.handleChange1} /></p>
            <p><input type="checkbox" id="setItem" className="form-control" checked={this.state.status} onChange={this.handleChange2} /><br /></p>
          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-default" id="update" value="Update" />
          </div>
        </form>
      </div>
    )
  }
}
export default EditItem;
