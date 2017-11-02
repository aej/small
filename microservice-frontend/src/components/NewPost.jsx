import React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
         {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


const NewPost = (props) => {
       if (!props.isAuthenticated) {
          return <p> You Must be logged in to access this page. Please Login <Link to='/login'>here</Link></p>
       }
       return (
           <div>
              <h1>Create New Post</h1>
              <hr/><br/>
              <form onSubmit={(event) => props.handleNewPostFormSubmit(event)}>

                <FieldGroup 
                   name="post_title"
                   id="PostTitle"
                   type="text"
                   label="Title"
                   placeholder="Enter a post title"
                   required
                   onChange={props.handleFormChange}
                />

                <FieldGroup
                   name="post_content"
                   id="formcontrolsTextarea"
                   type="textarea"
                   placeholder="textarea"
                   required
                   onChange={props.handleFormChange}
                />
                
                <Button type="submit">
                   Submit
                </Button>
     
              </form>
           </div>
        )
}

export default NewPost;
