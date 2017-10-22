import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import UsersList from './components/UsersList';


class App extends Component {
      constructor(){
        super()
        this.state = {
            users: []
        }
      }

      componentDidMount() {
        this.getUsers();
      }

      getUsers() {
        fetch('http://localhost:8080/users')
        .then(r => r.json())
        .then(data => { this.setState({ users: data.data.users }) });
      }

      render(){
          return (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
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
