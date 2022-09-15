import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Form,Table } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import ShowBerkas from '../../components/ShowBerkas'
import FormBerkas from '../../components/FormBerkas'
import axios from 'axios'
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import { getStudentData, reset as resetStudentDataState } from '../../features/student-data/studentDataSlice'
import { toast } from 'react-toastify'
import { Buffer } from 'buffer';
import SubmitNBackBtn from '../../components/SubmitNBackBtn'
import StatusAcceptance from "../../components/StatusAcceptance"


type BerkasAdmDatabaseVer = {
  name: string,
  mimetype: string,
  data: {
    type: string,
    data: Buffer
  }
  isAccepted: string
}
interface BerkasAdmChild {
  previewImg:{
    name:string,
    url:string
  },
  file: string | File | BerkasAdmDatabaseVer,
  isAccepted: string
}
interface BerkasAdm {
  fotoCopyKartuKeluarga: BerkasAdmChild,
  fotoCopyIjazah: BerkasAdmChild,
  fotoCopyPrestasi: BerkasAdmChild,
  fotoCopyUAN: BerkasAdmChild,
  pasFoto: BerkasAdmChild,
}




export default function BerkasAdministrasi(){
  const dispatch = useAppDispatch()
  const {isError,isLoading,isSuccess,message} = useAppSelector(state => state.studentData)
  const mainState = {
    previewImg:{
      name:"",url:""
    },
    file:"",
    isAccepted:"",
  }
  const [berkasAdm,setBerkasAdm] = useState<BerkasAdm>({
    fotoCopyKartuKeluarga:mainState,
    fotoCopyIjazah:mainState,
    fotoCopyPrestasi:mainState,
    fotoCopyUAN:mainState,
    pasFoto:mainState,
  })
  const {fotoCopyKartuKeluarga,fotoCopyIjazah,fotoCopyPrestasi,fotoCopyUAN,pasFoto} = berkasAdm
  type KeyBerkasAdm = keyof typeof berkasAdm;




  async function fetchStudentData(){
    const response = await dispatch(getStudentData())
    console.log("server resposne: ",response)
    const berkasAdmDatabase = response.payload.berkasAdministrasi

    let b: Blob | null;
    for(const key in berkasAdmDatabase){
      if(!berkasAdmDatabase[key]) continue
      b = toBlob(berkasAdmDatabase[key])
      setBerkasAdm(prev => ({
        ...prev,
        [key]:{
          previewImg:{
            name:berkasAdmDatabase[key].name,
            url: URL.createObjectURL(b!)
          },
          file: b,
          isAccepted: berkasAdmDatabase[key].isAccepted
        }
      }))
    }
    console.log(berkasAdm)
  }

  function toBlob(file: any){
    if(!file) return null
    const {mimetype} = file
    const imageArrayBuffer = file.data.data
    const toBuffer = new (Buffer as any).from(imageArrayBuffer)
    const blob = new Blob([toBuffer], {type:mimetype})
    return blob
  }

  async function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    // we will need a jwt token to update the data(Authorization)
    const {token} = JSON.parse(localStorage.getItem("user")!)
    console.log("berkas administrasi to be submitted: ", berkasAdm)
    const fd = new FormData()
    for(const key in berkasAdm){
      if(!berkasAdm[key as KeyBerkasAdm].file) {
        fd.append(key,"")
        continue
      }
      fd.append(key,berkasAdm[key as KeyBerkasAdm].isAccepted)
      fd.append(
        key,
        (berkasAdm[key as KeyBerkasAdm] as any).file,
        berkasAdm[key as KeyBerkasAdm].previewImg.name
      )
    }

    // console.table([...fd])
    const config = {
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      await axios.post("/api/berkas-adm",fd,config)
      toast.success("Data have been saved!")
    } catch (err: any){
      // console.log(err)
      toast.error(err.response.data)
    }
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

    return () => {
      console.log("CLEAN UP 2!");
      
      dispatch(resetStudentDataState())
    }
  }, [message,isError,isLoading,isSuccess])





  if(isLoading){
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <div style={{backgroundColor:"rgb(251, 248, 241)"}}>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav/>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit} method="POST" action="/api/berkas-adm" encType="multipart/form-data">
          <Row>
            <Col className="col-8">
              <Table className="border border-2 border-secondary" striped bordered hover style={{backgroundColor: "white"}}>
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
                      />
                      <ShowBerkas 
                        imgSrc={fotoCopyKartuKeluarga.previewImg.url} 
                        imgName={fotoCopyKartuKeluarga.previewImg.name}
                      />
                    </td>
                    <td>
                      <StatusAcceptance status={fotoCopyKartuKeluarga.isAccepted} />
                    </td>
                  </tr>
                  <tr>
                    <td>Fotocopy Ijazah<span className='text-danger'>*</span></td>
                    <td>
                      <FormBerkas 
                        selectedProperty='fotoCopyIjazah' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                      />
                      <ShowBerkas 
                        imgSrc={fotoCopyIjazah.previewImg.url} 
                        imgName={fotoCopyIjazah.previewImg.name}
                      />
                    </td>
                    <td >
                      <StatusAcceptance status={fotoCopyIjazah.isAccepted} />
                    </td>
                  </tr>
                  <tr>
                    <td>Fotocopy Prestasi<sup className="text-secondary">opt</sup></td>
                    <td>
                      <FormBerkas 
                        selectedProperty='fotoCopyPrestasi' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                      />
                      <ShowBerkas 
                        imgSrc={fotoCopyPrestasi.previewImg.url} 
                        imgName={fotoCopyPrestasi.previewImg.name}
                      />
                    </td>
                    <td>
                      <StatusAcceptance status={fotoCopyPrestasi.isAccepted} />
                    </td>
                  </tr>
                  <tr>
                    <td>Fotocopy Nilai Ujian Akhir Nasional<sup className="text-secondary">opt</sup></td>
                    <td>
                      <FormBerkas 
                        selectedProperty='fotoCopyUAN' 
                        berkasAdm={berkasAdm} 
                        setBerkasAdm={setBerkasAdm} 
                      />
                      <ShowBerkas 
                        imgSrc={fotoCopyUAN.previewImg.url} 
                        imgName={fotoCopyUAN.previewImg.name}
                      />
                    </td>
                    <td>
                      <StatusAcceptance status={fotoCopyUAN.isAccepted} />
                    </td>
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

                <SubmitNBackBtn />
              </div>
            </Col>

            <Col>
              <h4 className="fw-bold">Pas foto<span className='text-danger'>*</span></h4>
              <StatusAcceptance status={pasFoto.isAccepted} />
              <FormBerkas 
                  selectedProperty='pasFoto'
                  berkasAdm={berkasAdm}
                  setBerkasAdm={setBerkasAdm}
                />
              <ShowBerkas 
                imgSrc={pasFoto.previewImg.url} 
                imgName={pasFoto.previewImg.name}
              />
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





                      jjjjjjj
*/