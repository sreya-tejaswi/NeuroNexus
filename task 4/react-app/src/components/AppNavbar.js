import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserContext from '../UserContext';
import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/" className="mx-5">
        Tech 2 U
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          {user.isAdmin ? (
            <Nav.Link as={NavLink} to="/admin-dashboard">
              Admin Dashboard
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/products">
                Products
              </Nav.Link>
            </>
          )}
          {user.id !== null ? (
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
