import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const NavBar = (props) => (


    <Navbar collapseOnSelect>

        <Navbar.Header>
            <Navbar.Brand>
                <span>{props.title}</span>
            <Navbar.Toggle />
            </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/">
                  <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>

                <LinkContainer to="/about">
                  <NavItem eventKey={2}>About</NavItem>
                </LinkContainer>

                <LinkContainer to="/users">
                  <NavItem eventKey={3}>Users</NavItem>
                </LinkContainer>

                {props.isAuthenticated &&
                    <LinkContainer to="/new">
                      <NavItem eventKey={4}>New Post</NavItem>
                    </LinkContainer>
                }
            </Nav>

            <Nav pullRight>
                {!props.isAuthenticated &&
                    <LinkContainer to="/register">
                      <NavItem eventKey={1}>Register</NavItem>
                    </LinkContainer>
                }

                {!props.isAuthenticated &&
                    <LinkContainer to="/login">
                      <NavItem eventKey={2}>Log In</NavItem>
                    </LinkContainer>
                }

                {props.isAuthenticated &&
                    <LinkContainer to="/logout">
                      <NavItem eventKey={3}>Log Out</NavItem>
                    </LinkContainer>
                }

            </Nav>

        </Navbar.Collapse>

    </Navbar>

)

export default NavBar
