import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';

const usersAPIUrl = process.env.REACT_APP_USERS_SERVICE_BASE_URL;


class App extends Component {
      constructor(){
        super()
        this.state = {
            users: [],
            username: '',
            email: ''
        }
      }

      componentDidMount() {
        this.getUsers();
      }

      getUsers() {
        fetch(usersAPIUrl + '/users')
        .then(r => r.json())
        .then(data => { this.setState({ users: data.data.users }) });
      }

      addUser(event) {
        event.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email
        }

        fetch('http://localhost:8080/users', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            this.getUsers();
            this.setState({ username: '', email: '' })

        })
        .catch((err) => { console.log(err); })
      }

      handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
      }

      render(){
          return (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
                        <AddUser
                            username={this.state.username}
                            email={this.state.email}
                            addUser={this.addUser.bind(this)}
                            handleChange={this.handleChange.bind(this)}
                         />
                        <br />
                        <UsersList users={this.state.users} />
                      </div>
                    </div>
                  </div>
                )
      }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
