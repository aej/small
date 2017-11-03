import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

const formatDate = dateString =>
    moment(dateString).format('MMMM Do YYYY, h:mm:ss a');

let andy;

const Home = (props) => {
    const getUser = (users, id) => 
        users.filter(function(user) {
            return user.id === id
        })

    return (
      <div>
        {
            props.posts.map((post) => {
                return (
                    <Panel key={post.id} 
                            header={post.title} 
                            footer={'Posted by ' + getUser(props.users, post.author_id).email + ' on ' + formatDate(post.created_at)}
                            bsStyle="primary">
                        {post.content}                            
                    </Panel>
                )
            })
        }
      </div>
    )
};

export default Home;
