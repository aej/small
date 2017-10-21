import React, { Component } from 'react';
import ReactDOM from 'react-dom';


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
        fetch(`${process.env.USERS_SERVICE_BASE_URL}/users`)
        .then(r => r.json())
        .then(data => { this.setState({ users: data.data }) })

        console.log(this.state)
      }

      render(){
          return (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
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
