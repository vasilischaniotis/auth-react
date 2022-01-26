import React from 'react';
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";

function NavigationBar() {
    const {handleLogout, currentUser} = useAuth();

    return (
        currentUser ?
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Nav>
                        <Navbar.Brand>
                            <Link to="/" className="nav-link">Home</Link>
                        </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar"/>
                    <Navbar.Collapse id="responsive-navbar">
                        <Nav className="me-auto">
                            <Navbar.Brand>
                                <Link to="/update-profile" className="nav-link">Update Profile</Link>
                            </Navbar.Brand>
                        </Nav>
                        <Nav className="">
                            <Navbar.Brand className="nav-link nav-link-pointer" onClick={handleLogout}
                                          style={{cursor: "pointer"}}>Sign out
                            </Navbar.Brand>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            : <></>
    );
}

export default NavigationBar;
