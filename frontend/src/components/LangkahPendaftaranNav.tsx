import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useState } from "react";

const LangkahPendaftaranNav = () => {
  const [fillOrNone, setFillOrNone] = useState<Array<String>>(new Array(4).fill(""));
  // const [startingIdx,setStartingIdx] = useState<number>(0);


  // console.log(SpmbFormContext);
  
  // interface SpmbFormContextInterface {
  //   startingIdx: Number
  // };
  // const {startingIdx} = useContext(SpmbFormContext) as SpmbFormContextInterface;
  // console.log(startingIdx);

  const handleClick = (e: React.SyntheticEvent) => {
    // const target = e.target as HTMLInputElement;
    // console.log(target);
    // console.log(target.classList);
    // console.log(`curr shit ${target.classList[0]}`);
  }
  return (
    <Nav onClick={handleClick} className="mt-5 mb-4 justify-content-center gap-3">
      
      <Link to="/spmb-form/biodata" className="1 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-1-circle${fillOrNone[0]}`}></i>
        <span>Biodata</span>
      </Link>

      <Link to="/spmb-form/berkas-administrasi" className="2 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-2-circle${fillOrNone[1]}`}></i> 
        <span>Berkas Administrasi</span>
      </Link>

      <Link to="/spmb-form/info-seleksi" className="3 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-3-circle${fillOrNone[2]}`}></i>
        <span>Info & Hasil Seleksi</span>
      </Link>

      <Link to="/spmb-form/daftar-ulang" className="4 d-flex flex-column justify-content-center text-dark text-decoration-none">
        <i className={`text-center fs-1 bi bi-4-circle${fillOrNone[3]}`}></i> 
        <span>Daftar Ulang</span>
      </Link>

    </Nav>
  )
}

export default LangkahPendaftaranNav