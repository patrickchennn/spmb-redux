import { Container,Row,Col,Button,Form,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import {BsChevronDoubleLeft} from "react-icons/bs"
import {AiOutlineSend} from "react-icons/ai"
import {useState,useEffect,useRef} from "react"
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import myIsAlpha from '../../features/myIsAlpha'
import { toast } from 'react-toastify'

export default function Biodata(){
  const namaRef = useRef<HTMLInputElement | null>(null)
  const kewarganegaraanRef = useRef<HTMLInputElement | null>(null)
  const tempatKotaLahirRef = useRef<HTMLInputElement | null>(null)

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
  }

  function handleChange(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    const id = target.id
    console.log(typeof target.value,id)
    setBioData(prev => ({
      dataDiri:{
        ...prev.dataDiri,
        [id]: target.value
      }
    }))
  }

  return (
    <div className="mb-5" style={{backgroundColor:"#FBF8F1"}}>
      <style dangerouslySetInnerHTML={{
        __html: [
          '.my-if-form-has-value:valid {',
          '  background-color: whitesmoke',
          '}'
          ].join('\n')
        }}>
      </style>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav />
          </Col>
        </Row>

        <Row>
          <Col className="py-4 px-5 border border-2 border-secondary rounded" style={{backgroundColor:"#F7ECDE"}}>
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
                  <option defaultValue={jenisKelamin}></option>
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
                <Col className="d-flex gap-2">
                  <Link to="/spmb-form" className='btn btn-secondary'>
                    <BsChevronDoubleLeft /> BACK
                  </Link>
                  <Button variant="success" type="submit">
                    <AiOutlineSend /> SAVE
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>


          <Col className="d-flex justify-content-center">
            <div className="mt-5 mt-sm-0 p-4 border border-2 border-secondary rounded" style={{
                boxShadow:"#d9d9d9 0px 0px 10px 0px",
                height:"fit-content",
                backgroundColor:"#F7ECDE",
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
  )
}
