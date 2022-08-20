import { Link } from "react-router-dom";
import { Col,Row } from 'react-bootstrap';
import {FaUserPlus,FaSignInAlt} from 'react-icons/fa';

const RegisterLoginNav = () => {
  return (
    <Row className='mb-3'>
      <Col className="d-flex justify-content-center">
        <Link to="/login" className='text-decoration-none'>
          <FaSignInAlt /> Login
        </Link>
      </Col>
      <Col className="d-flex justify-content-center">
        <div className="vr"></div>
      </Col>
      <Col className="d-flex justify-content-center">
        <Link to="/register" className='text-decoration-none'>
          <FaUserPlus/> Register
        </Link>
      </Col>
    </Row>
  )
}

export default RegisterLoginNav