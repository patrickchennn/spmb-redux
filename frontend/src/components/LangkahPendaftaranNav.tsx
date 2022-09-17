import { NavLink as BaseNavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
// import "../styles/LangkahPendaftaranNav.css"
import styled from "styled-components";

const NavLink = styled(BaseNavLink)`
&.active > span:after {
  width: 100%;
  background: rgb(139, 139, 255);
}
`;

const StyledSpan = styled.span`
  &:after{
    content: "";
    display: block;
    margin: auto;
    height: 3px;
    width: 0px;
    transition: width .5s ease,background-color .5s ease;
  }
  ${NavLink}:hover &:after{
    width: 100%;
    background: rgb(139, 139, 255);
  }
`

export default function LangkahPendaftaranNav(){
  

  return (
    <Nav className="py-3 mt-5 mb-4 justify-content-center gap-3">
      <NavLink to="/spmb-form/biodata" className="my-hover-link d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className='text-center fs-1 bi bi-1-circle'></i>
        <StyledSpan >Biodata</StyledSpan>
      </NavLink>

      <NavLink to="/spmb-form/berkas-administrasi" className="my-hover-link d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className='text-center fs-1 bi bi-2-circle'></i> 
        <StyledSpan >Berkas Administrasi</StyledSpan>
      </NavLink>

      <NavLink to="/spmb-form/info-seleksi" className="my-hover-link d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className='text-center fs-1 bi bi-3-circle'></i>
        <StyledSpan >Info Seleksi</StyledSpan>
      </NavLink>
    </Nav>
  )
}
