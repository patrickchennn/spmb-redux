import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Button,Form,Table,Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsChevronDoubleLeft} from "react-icons/bs"
import {MdOutlineSaveAlt} from 'react-icons/md'
import {useState} from "react"
import ShowBerkas from '../../components/ShowBerkas'
import FormBerkas from '../../components/FormBerkas'
import axios from 'axios'

export default function BerkasAdministrasi(){
  interface FormDataType{
    lastModified: number,
    lastModifiedData:Date,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string,
  }
  interface BerkasAdm {
    fotoCopyKartuKeluarga: null | FormDataType,
    fotoCopyIjazah: null | FormDataType,
    fotoCopyPrestasi: null | FormDataType,
    fotoCopyUAN: null | FormDataType,
    pasFoto: null | FormDataType,
  }
  const [berkasAdm,setBerkasAdm] = useState<BerkasAdm>({
    fotoCopyKartuKeluarga:null,
    fotoCopyIjazah:null,
    fotoCopyPrestasi:null,
    fotoCopyUAN:null,
    pasFoto:null,
  })

  interface PreviewBerkas{
    fotoCopyKartuKeluarga: Blob|null,
    fotoCopyIjazah: Blob|null,
    fotoCopyPrestasi: Blob|null,
    fotoCopyUAN: Blob|null,
    pasFoto: Blob|null,
  }
  const [previewBerkas,setPreviewBerkas] = useState<PreviewBerkas>({
    fotoCopyKartuKeluarga:null,
    fotoCopyIjazah:null,
    fotoCopyPrestasi:null,
    fotoCopyUAN:null,
    pasFoto:null,
  })




  async function handleSubmit(e: React.SyntheticEvent){
    const {token} = JSON.parse(localStorage.getItem("user")!)
    e.preventDefault()
    console.log("berkas administrasi to be submitted: ", berkasAdm)
    console.log("preview berkas: ", previewBerkas)
    const fd = new FormData()
    for(const key in berkasAdm){
      // console.log(key, berkasAdm[key as keyof typeof berkasAdm])
      fd.append(key,berkasAdm[key as keyof typeof berkasAdm] as unknown as Blob)
    }

    // console.table([...fd])
    const config = {
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
    const res = await axios.post("/api/berkas-adm",fd,config)
    console.log(res)
  }

  // view
  return (
    <div style={{backgroundColor:"#FBF8F1"}}>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav/>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit} method="POST" action="/api/berkas-adm" encType="multipart/form-data">
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
                    <td className="">Fotocopy Kartu Keluarga<span className='text-danger'>*</span></td>
                    <td>
                      <FormBerkas 
                        selectedProperty='fotoCopyKartuKeluarga' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                        setPreviewBerkas={setPreviewBerkas}
                        isRequired={true}
                      />
                      <ShowBerkas selectedProperty={previewBerkas.fotoCopyKartuKeluarga}/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Ijazah<span className='text-danger'>*</span></td>
                    <td>
                    <FormBerkas 
                        selectedProperty='fotoCopyIjazah' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                        setPreviewBerkas={setPreviewBerkas} 
                        isRequired={true}
                      />
                      <ShowBerkas selectedProperty={previewBerkas.fotoCopyIjazah}/>
                    </td>
                    <td >
                      <Badge pill bg="warning">
                        Diproses
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Fotocopy Prestasi<sup className="text-secondary">opt</sup></td>
                    <td>
                    <FormBerkas 
                        selectedProperty='fotoCopyPrestasi' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                        setPreviewBerkas={setPreviewBerkas}
                        isRequired={false}
                      />
                      <ShowBerkas selectedProperty={previewBerkas.fotoCopyPrestasi}/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Nilai Ujian Akhir Nasional<sup className="text-secondary">opt</sup></td>
                    <td>
                    <FormBerkas 
                        selectedProperty='fotoCopyUAN' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                        setPreviewBerkas={setPreviewBerkas} 
                        isRequired={false}
                      />
                      <ShowBerkas selectedProperty={previewBerkas.fotoCopyUAN}/>
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
              <FormBerkas 
                  selectedProperty='pasFoto'
                  berkasAdm={berkasAdm}
                  setBerkasAdm={setBerkasAdm}
                  setPreviewBerkas={setPreviewBerkas}
                  isRequired={true}
                />
                <ShowBerkas selectedProperty={previewBerkas.pasFoto}/>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

/*
                      <Badge pill bg="success">
                        Diterima
                      </Badge>
                      <Badge pill bg="danger">
                        Ditolak
                      </Badge>
*/