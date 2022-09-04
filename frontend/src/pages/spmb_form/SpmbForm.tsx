import { Container,Row,Col } from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom"
import biodataBg from "../../assets/spmb-form/bio-data.png"
import administrasiBg from "../../assets/spmb-form/berkas.png"
import infoSeleksiBg from "../../assets/spmb-form/info.png"
import daftarUlangBg from "../../assets/spmb-form/daftar-ulang.png"
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import { reset as resetAuthState,logout } from '../../features/auth/authSlice'
import {IoLogOutOutline} from "react-icons/io5"
import {AiOutlineDelete} from "react-icons/ai"
import { deleteAccount } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import {useEffect} from "react"

export default function SpmbForm(){
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {user,message} = useAppSelector(state =>  state.auth)
  useEffect(() => {
    console.log('USE EFFECT!')
    if(message) {
      toast.success(message)
    }
  },[message])

  function handleLogout(){
    if(!window.confirm(`Logout: ${user!.email}?`)) return
    dispatch(logout())
    dispatch(resetAuthState())
    navigate("/login",{replace:true})
  }

  async function handleDeleteAccount(){
    if(!window.confirm(`Delete: ${user!.email}?`)) return
    console.log("delete account");
    const {token} = JSON.parse(localStorage.getItem("user")!)
    await dispatch(deleteAccount(token))
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
    )
  }
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
