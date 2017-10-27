import React from 'react'
import { Redirect } from 'react-router-dom';

const Form = (props) => {

    if (props.isAuthenticated) {
        return <Redirect to='/'  />;
    }
    return (
        <div>
            <h1>{props.formType}</h1>
            <hr/><br/>
            <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
               {props.formType === 'Register' &&
                    <div className="form-group">
                        <input
                            name="username"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Enter a username"
                            required
                            onChange={props.handleFormChange}
                        />
                    </div>
               }
                <div className="form-group">
                    <input
                        name="email"
                        className="form-control input-lg"
                        type="email"
                        placeholder="Enter an email address"
                        required
                        onChange={props.handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="password"
                        className="form-control input-lg"
                        type="password"
                        placeholder="Please enter a Password"
                        required
                        onChange={props.handleFormChange}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    value="Submit"
                />
            </form>
        </div>
    )
}

export default Form
