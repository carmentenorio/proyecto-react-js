import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import userService from '../services/userService';
import { useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await userService.logout();
        } catch (error) {
            console.error('Error at sign out:', error);
        }
        navigate("/login");
    };
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
                        <Button variant="outline-light" onClick={handleLogout}>Sign out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavigationBar;

