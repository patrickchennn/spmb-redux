import { Container,Row,Col,Form,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import {useState,useEffect,useRef} from "react"
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import myIsAlpha from '../../features/myIsAlpha'
import { toast } from 'react-toastify'
import { updateStudentData,getStudentData,reset as resetStudentDataState } from '../../features/student-data/studentDataSlice'
import SubmitNBackBtn from '../../components/SubmitNBackBtn'

export default function Biodata(){
  const dispatch = useAppDispatch()

  const namaRef = useRef<HTMLInputElement | null>(null)
  const kewarganegaraanRef = useRef<HTMLInputElement | null>(null)
  const tempatKotaLahirRef = useRef<HTMLInputElement | null>(null)
  // useAppSelector(state => {
  //   console.log(state)
  // })
  const {isError,isLoading,isSuccess,message} = useAppSelector(state => state.studentData)


  const [bioData,setBioData] = useState({
    dataDiri: {
      namaLengkap: "",
      jenisKelamin: "",
      kewarganegaraan: "",
      tempatKotaLahir: "",
      tanggalLahir: "",
      alamatEmail: "",
      noHp: "",
    },
  })
  const {namaLengkap,jenisKelamin,kewarganegaraan,tempatKotaLahir,tanggalLahir,alamatEmail,noHp} = bioData.dataDiri
  
  
  
  const fetchStudentData = async () => {
    const response = await dispatch(getStudentData())
    setBioData({dataDiri: {
      ...response.payload.dataDiri
    }})
    console.log(response);
  }

  useEffect(() => {
    console.log("USE EFFECT 1!");
    
    fetchStudentData()
    return () => {
      console.log("CLEAN UP 1!");
      dispatch(resetStudentDataState())
    }
  },[])
  
  useEffect(() => {
    console.log("USE EFFECT 2!")
    if(isError) toast.error(message)
    if(isSuccess) toast.success(message)
    // fetchStudentData()

    
    return () => {
      console.log("CLEARN UP 2!");
      
      dispatch(resetStudentDataState())
    }
  }, [message,isError,isLoading,isSuccess])

  function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    if(!myIsAlpha(namaLengkap)){
      toast.error("nama haruslah berupa sebuah alphabet(a-z atau A-Z)")
      console.log(namaRef.current)
      namaRef.current!.focus()
    }
    else if(!myIsAlpha(kewarganegaraan)){
      toast.error("nama negara haruslah berupa sebuah alphabet(a-z atau A-Z)")
      kewarganegaraanRef.current!.focus()
    }
    else if(!myIsAlpha(tempatKotaLahir)){
      toast.error("tempat kota lahir haruslah berupa sebuah alphabet(a-z atau A-Z)")
      tempatKotaLahirRef.current!.focus()
    }
    console.log("biodata to be submitted(pass validation): ",bioData)
    dispatch(updateStudentData(bioData))
  }

  function handleChange(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    const id = target.id
    setBioData(prev => ({
      dataDiri:{
        ...prev.dataDiri,
        [id]: target.value
      }
    }))
  }

  if(isLoading){
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: [
          '.my-if-form-has-value:valid {',
          '  background-color: whitesmoke',
          '}'
          ].join('\n')
        }}>
      </style>
    
      <div className="pb-5" style={{backgroundColor:"#FBF8F1"}}>
        <Container>
          <Row>
            <Col>
              <LangkahPendaftaranNav />
            </Col>
          </Row>

          <Row>
            <Col className="py-4 px-5 border border-2 border-secondary rounded" style={{backgroundColor:"white"}}>
              <Form onSubmit={handleSubmit}>
                <h5>
                  Umum
                  <hr className="m-0 rounded-pill" style={{borderTop:"3px solid #424874"}}/>
                </h5>
                <Form.Group controlId="namaLengkap" className="mb-3" >
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control required ref={namaRef} className="my-if-form-has-value" onChange={handleChange} value={namaLengkap} type="text" />
                </Form.Group>

                <Form.Group controlId="jenisKelamin" className="mb-3" >
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select required className="my-if-form-has-value" onChange={handleChange}>
                    <option>{jenisKelamin}</option>
                    <option value="pria">pria</option>
                    <option value="perempuan">perempuan</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="kewarganegaraan"className="mb-3" >
                  <Form.Label>Kewarganegaraan</Form.Label>
                  <Form.Control required ref={kewarganegaraanRef} className="my-if-form-has-value" onChange={handleChange} value={kewarganegaraan} type="text"/>
                </Form.Group>


                <Form.Group controlId="tempatKotaLahir" className="mb-3" >
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control required ref={tempatKotaLahirRef} className="my-if-form-has-value" onChange={handleChange} value={tempatKotaLahir} type="text" />
                </Form.Group>

                <Form.Group controlId="tanggalLahir" className="mb-3" >
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control required className="my-if-form-has-value" onChange={handleChange} value={tanggalLahir} type="date" />
                </Form.Group>

                <h5>
                  KONTAK
                  <hr className="m-0 rounded-pill" style={{borderTop:"3px solid #424874"}} />
                </h5>
                <Form.Group controlId="alamatEmail" className="mb-3" >
                  <Form.Label>Alamat Email</Form.Label>
                  <Form.Control required className="my-if-form-has-value" onChange={handleChange} value={alamatEmail} type="email" />
                </Form.Group>

                <Form.Group controlId="noHp" className="mb-3" >
                  <Form.Label>No Hp</Form.Label>
                  <Form.Control required className="my-if-form-has-value" onChange={handleChange} value={noHp} type="number" />
                </Form.Group>

                <Row>
                  <Col>
                    <SubmitNBackBtn />
                  </Col>
                </Row>
              </Form>
            </Col>


            <Col className="d-flex justify-content-center">
              <div className="mt-5 mt-sm-0 p-4 border border-2 border-secondary rounded" style={{
                  boxShadow:"#d9d9d9 0px 0px 10px 0px",
                  height:"fit-content",
                  backgroundColor:"white",
                }}>
                <Nav className="flex-column gap-2">
                  <Link to="#" className="text-start btn text-dark text-decoration-none">
                    <i className="bi bi-1-circle"></i> Datadiri
                  </Link>

                  <Link to="#" className="text-start btn text-dark text-decoration-none">
                    <i className="bi bi-2-circle"></i> Data Orangtua
                  </Link>
                </Nav>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
