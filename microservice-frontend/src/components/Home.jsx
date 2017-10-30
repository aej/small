import React, { Component } from 'react'
import constantsClass from './../config/Constants';

class Home extends Component {
  componentDidMount() {
    this.getPosts();
  }
  getPosts() {
    fetch(constantsClass.postsAPIUrl + '/posts')
      .then(r => r.json())
      .then(data => { this.setState({ posts: data.data })});
  }
  render() {
    return (
      <div>
        {
          this.state.posts.map((post) => {
            return (
              <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <small>{post.created_at}</small>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Home
