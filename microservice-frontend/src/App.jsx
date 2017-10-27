import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import UsersList from './components/UsersList';
import About from './components/About';
import Form from './components/Form';
import NavBar from './components/Navbar';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

const usersAPIUrl = process.env.REACT_APP_USERS_SERVICE_BASE_URL;

class App extends Component {

  constructor(){
    super()
    this.state = {
        users: [],
        username: '',
        email: '',
        title: 'Small',
        formData: {
            username: '',
            email: '',
            password: ''
        },
        isAuthenticated: false
    }
  }

  handleUserFormSubmit(event){
    event.preventDefault();
    const formType = window.location.href.split('/').reverse()[0];
    let data;
    if (formType === 'login') {
      data = {
        email: this.state.formData.email,
        password: this.state.formData.password
      }
    }
    if (formType === 'register') {
      data = {
        username: this.state.formData.username,
        email: this.state.formData.email,
        password: this.state.formData.password
      }
    }
     const url = 'http://localhost:8080/auth/' + formType
     fetch(url, {
       method: 'post',
       body: JSON.stringify(data),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
      })
      .then((res) => res.json() )
      .then((res) => {
        this.setState({
          formData: {username: '', email: '', password: ''},
          username: '',
          email: '',
          isAuthenticated: true,
        });
        window.localStorage.setItem('authToken', res.token.toString());
        this.getUsers();
      })
      .catch((err) => { console.log(err); })
  }

  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  componentDidMount() {
    this.getUsers();
  }

  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
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
        <div>
          <NavBar
            title={this.state.title}
            isAuthenticated={this.state.isAuthenticated}
          />
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <br/>
                    <Switch>
                        <Route exact path='/' render={() => (
                            <div>
                                <UsersList users={this.state.users} />
                            </div>
                        )} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/register' render={() => (
                            <Form
                                formType={'Register'}
                                formData={this.state.formData}
                                handleUserFormSubmit={this.handleUserFormSubmit.bind(this)}
                                handleFormChange={this.handleFormChange.bind(this)}
                                isAuthenticated={this.state.isAuthenticated}
                            />
                        )} />

                        <Route exact path='/login' render={() => (
                            <Form
                                formType={'Login'}
                                formData={this.state.formData}
                                handleUserFormSubmit={this.handleUserFormSubmit.bind(this)}
                                handleFormChange={this.handleFormChange.bind(this)}
                                isAuthenticated={this.state.isAuthenticated}
                            />
                        )} />

                        <Route exact path='/logout' render={() => (
                                <Logout
                                    logoutUser={this.logoutUser.bind(this)}
                                    isAuthenticated={this.state.isAuthenticated}
                                />
                        )}/>

                        <Route exact path='/status' component={UserStatus} />

                    </Switch>
                  </div>
                </div>
              </div>
        </div>
      )
  }
}

export default App