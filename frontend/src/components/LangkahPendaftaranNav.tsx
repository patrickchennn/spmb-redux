import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function LangkahPendaftaranNav(){
  return (
    <Nav className="mt-5 mb-4 justify-content-center gap-3">
      <Link to="/spmb-form/biodata" className="1 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-1-circle`}></i>
        <span>Biodata</span>
      </Link>

      <Link to="/spmb-form/berkas-administrasi" className="2 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-2-circle`}></i> 
        <span>Berkas Administrasi</span>
      </Link>

      <Link to="/spmb-form/info-seleksi" className="3 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-3-circle`}></i>
        <span>Info Seleksi</span>
      </Link>
    </Nav>
  )
}
