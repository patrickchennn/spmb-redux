import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Button,Form,Table,Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsChevronDoubleLeft} from "react-icons/bs";
import {MdOutlineSaveAlt} from 'react-icons/md';
import {useState} from "react"
import ShowBerkas from '../../components/ShowBerkas';

export default function BerkasAdministrasi(){
  const [previewBerkas,setPreviewBerkas] = useState({
    fotoCopyKartuKeluarga:null,
    fotoCopyIjazah:null,
    fotoCopyPrestasi:null,
    fotoCopyUAN:null,
    pasFoto:null,
  })
  const [berkasAdm,setBerkasAdm] = useState({
    berkasAdministrasi:{
      fotoCopyKartuKeluarga:null,
      fotoCopyIjazah:null,
      fotoCopyPrestasi:null,
      fotoCopyUAN:null,
      pasFoto:null,
    }
  })


  function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    console.log("berkas administrasi to be submitted: ", berkasAdm)
    console.log(previewBerkas)
    const fd = new FormData()
  }

  function handleChange(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    setBerkasAdm(prev => ({
      berkasAdministrasi: {
        ...prev.berkasAdministrasi,
        [target.name]: target.files![0]
      }
    }))
    setPreviewBerkas(prev => ({
      ...prev,
      [target.name]: URL.createObjectURL(target.files![0])
    }))
  }


  return (
    <div style={{backgroundColor:"#FBF8F1"}}>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav/>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-8">
              <Table striped bordered hover style={{backgroundColor: "rgb(247, 236, 222)"}}>
                <thead>
                  <tr>
                    <th className='fs-5'>Syarat</th>
                    <th className='fs-5'>Dokumen</th>
                    <th className='fs-5'>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Fotocopy Kartu Keluarga<span className='text-danger'>*</span></td>
                    <td>
                      <Form.Control required name="fotoCopyKartuKeluarga" onChange={handleChange} type="file"/>
                      <ShowBerkas selectedImage={previewBerkas.fotoCopyKartuKeluarga}/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Ijazah<span className='text-danger'>*</span></td>
                    <td>
                      <Form.Control required name="fotoCopyIjazah" onChange={handleChange} type="file"/>
                      <ShowBerkas selectedImage={previewBerkas.fotoCopyIjazah}/>
                    </td>
                    <td >
                      <Badge pill bg="success">
                        Diterima
                      </Badge>
                      <Badge pill bg="warning">
                        Diproses
                      </Badge>
                      <Badge pill bg="danger">
                        Ditolak
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Fotocopy Prestasi<sup className="text-secondary">opt</sup></td>
                    <td>
                      <Form.Control name="fotoCopyPrestasi" onChange={handleChange} type="file"/>
                      <ShowBerkas selectedImage={previewBerkas.fotoCopyPrestasi}/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Nilai Ujian Akhir Nasional<sup className="text-secondary">opt</sup></td>
                    <td>
                      <Form.Control name="fotoCopyUAN" onChange={handleChange} type="file" />
                      <ShowBerkas selectedImage={previewBerkas.fotoCopyUAN}/>
                    </td>
                    <td>status</td>
                  </tr>
                </tbody>
              </Table>

              <div className='d-flex justify-content-between'>
                <div>
                  <h6>keterangan pengisian</h6>
                  <div>
                    <span className='text-danger'>*</span> = wajib
                  </div>
                  <div>
                    <span className='text-secondary'>opt</span> = optional
                  </div>
                </div>

                <div className="d-flex gap-3" style={{height:"fit-content"}}>
                  <Link to="/spmb-form" className="btn btn-secondary">
                    <BsChevronDoubleLeft /> BACK
                  </Link>
                  
                  <Button variant="success" type="submit">
                    <MdOutlineSaveAlt /> SAVE
                  </Button>
                </div>
              </div>
            </Col>

            <Col>
              <h4 className="fw-bold">Pas foto<span className='text-danger'>*</span></h4>
              <Form.Control required name="pasFoto" onChange={handleChange} type="file"/>
              <ShowBerkas selectedImage={previewBerkas.pasFoto}/>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}
