import React from 'react';
import { Panel } from 'react-bootstrap';


const Home = (props) => {
    return (
      <div>
        {
            props.posts.map((post) => {
                return (
                    <Panel key={post.id} 
                            header={post.title} 
                            footer={'Posted by ' + post.author_id + ' on ' + post.created_at}
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
