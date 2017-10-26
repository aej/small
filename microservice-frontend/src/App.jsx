import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import About from './components/About';

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
            email: this.state.email,
            password: this.state.password
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
            this.setState({ username: '', email: '', password: '' })

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
                        <Switch>
                            <Route exact path='/' render={() => (
                                <div>
                                    <h1>All Users</h1>
                                    <hr/><br/>
                                    <AddUser
                                        username={this.state.username}
                                        email={this.state.email}
                                        password={this.state.password}
                                        addUser={this.addUser.bind(this)}
                                        handleChange={this.handleChange.bind(this)}
                                     />
                                    <br />
                                    <UsersList users={this.state.users} />
                                </div>
                            )} />
                            <Route exact path='/about' component={About} />
                        </Switch>
                      </div>
                    </div>
                  </div>
                )
      }
}

export default App
