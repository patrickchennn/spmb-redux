import { Container,Row,Col,Button } from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom"
import biodataBg from "../../assets/spmb-form/bio-data.png"
import administrasiBg from "../../assets/spmb-form/berkas.png"
import infoSeleksiBg from "../../assets/spmb-form/info.png"
import daftarUlangBg from "../../assets/spmb-form/daftar-ulang.png"
import {IoLogOutOutline} from "react-icons/io5"
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import { reset,logout } from '../../features/auth/authSlice'
import {AiOutlineDelete} from "react-icons/ai"

const SpmbForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state =>  state.auth.user);


  function handleLogout(){
    dispatch(logout());
    dispatch(reset());
    navigate("/login",{replace:true});
  }

  function handleDeleteAccount(){
    console.log("delete account");
    // dispatch(deleteAccount())
    handleLogout()
  }

  // views
  // if not yet login or register(specifically the user has no record on the local storage)
  if(!user){
    return (
      <>
        <h1>LOGIN FIRST!</h1>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </>
    );
  }
  else{

    return (
      <div style={{
        height:"600px",
        backgroundColor: "#F0EBE3",
      }}>

        <Container className="pt-5">
          <Row>
            <Col>
              <h1 className="text-center mb-5">Welcome {user!.name}.</h1>
            </Col>
          </Row>
          <Row className="row-cols-md-4 gx-3 gy-5">
            <Col>
              <h5>DATA DIRI</h5>
              <i className="bi bi-1-circle fs-2"></i>
              <Link to="/spmb-form/biodata">
                <img src={biodataBg} alt="biodata illustration" className=''/>
              </Link>
            </Col>

            <Col>
              <h5>BERKAS ADMINISTRASI</h5>
              <i className="bi bi-2-circle fs-2"></i>
              <Link to="/spmb-form/berkas-administrasi">
                <img src={administrasiBg} alt="berkas-administrasi illustration" className='2'/>
              </Link>
            </Col>

            <Col>
              <h5>INFO & HASIL SELEKSI</h5>
              <i className="bi bi-3-circle fs-2"></i>
              <Link to="/spmb-form/info-seleksi">
                <img src={infoSeleksiBg} alt="info-seleksi illustration" className='3'/>
              </Link>
            </Col>

            <Col>
              <h5>DAFTAR ULANG</h5>
              <i className="bi bi-4-circle fs-2"></i>
              <Link to="/spmb-form/daftar-ulang">
                <img src={daftarUlangBg} alt="daftar-ulang illustration" className='4'/>
              </Link>
            </Col>
            <Col>
              <h5>LOGOUT</h5>
              <i className="bi bi-5-circle fs-2"></i>
              <IoLogOutOutline onClick={handleLogout} style={{width:"150px",height:"150px",cursor:"pointer"}}/>
            </Col>
            <Col>
              <h5>DELETE ACCOUNT</h5>
              <i className="bi bi-6-circle fs-2"></i>
              <AiOutlineDelete onClick={handleDeleteAccount} style={{width:"150px",height:"150px",cursor:"pointer"}}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

export default SpmbForm;