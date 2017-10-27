import React, { Component } from 'react';


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
    this.getUserStatus();
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
     .then( console.log(window.localStorage.authToken ))
     .then((res) => { console.log(res) })
     .catch((err) => { console.log(err); })
  }

  render() {
    return (
      <div>
       <p>test</p>
      </div>
    )
  }
}

export default UserStatus