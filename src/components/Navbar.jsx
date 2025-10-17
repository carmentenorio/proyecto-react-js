import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import userService from '../services/userService';

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/tasks">My React App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/tasks">Task</Nav.Link>
                        <Nav.Link href="/categories">Categories</Nav.Link>
                        <Nav.Link href="/tags">Tags</Nav.Link>
                        <Button variant="outline-light" onClick={userService.logout}>Sign out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavigationBar;

