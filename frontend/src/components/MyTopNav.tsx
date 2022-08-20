import { Container,Navbar,Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/">Home</Link>
        <Nav className="me-auto">
          <Link className="nav-link active" to="/login">Login</Link>
          <Link className="nav-link active" to="/about">About</Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar