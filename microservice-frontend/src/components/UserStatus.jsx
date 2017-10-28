import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
    const url = 'http://localhost:8080/auth/status'
    fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${window.localStorage.authToken}`
      }
    })
    .then((res) => res.json() )
    .then((res) => {
        this.setState({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          created_at: res.data.created_at,
          })
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