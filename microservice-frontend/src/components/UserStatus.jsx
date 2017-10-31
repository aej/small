import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import constantsClass from './../config/Constants';

class UserStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      created_at: '',
      email: '',
      id: '',
      username: '',
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.getUserStatus();
    }
  }

  getUserStatus(event) {
    const url = constantsClass.usersAPIUrl + '/status'
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${window.localStorage.authToken}`
      }
    })
    .then((res) => res.json() )
    .then((response_json) => {
        console.log(response_json);
        this.setState({
          id: response_json.data.id,
          username: response_json.data.username,
          email: response_json.data.email,
          created_at: response_json.data.created_at,
        });
    })
    .catch((err) => { console.log(err); })
  }

  render() {
    if (!this.props.isAuthenticated) {
        return <p> You Must be logged in to access this page. Please Login <Link to='/login'>here</Link></p>
    }
    return (
      <div>
        <ul>
          <li><strong>User ID:</strong> {this.state.id}</li>
          <li><strong>Email:</strong> {this.state.email}</li>
          <li><strong>Username:</strong> {this.state.username}</li>
          <li><strong>Created at:</strong> {this.state.created_at}</li>
        </ul>
      </div>
    )
  }
}

export default UserStatus
