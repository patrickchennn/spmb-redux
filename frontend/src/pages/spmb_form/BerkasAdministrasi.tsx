import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Button,Form,Table,Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BsChevronDoubleLeft} from "react-icons/bs"
import {MdOutlineSaveAlt} from 'react-icons/md'
import {useState} from "react"
import ShowBerkas from '../../components/ShowBerkas'
import FormBerkas from '../../components/FormBerkas'
import axios from 'axios'
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import { getStudentData, reset as resetStudentDataState } from '../../features/student-data/studentDataSlice'
import {useEffect} from "react"
import { toast } from 'react-toastify'
import { Buffer } from 'buffer';

interface BerkasAdmDatabaseVer{
  name: string,
  mimetype: string,
  data: Buffer
}
interface FormDataType{
  lastModified: number,
  lastModifiedData:Date,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
}
interface BerkasAdm {
  fotoCopyKartuKeluarga: FormDataType | BerkasAdmDatabaseVer | String,
  fotoCopyIjazah: FormDataType | BerkasAdmDatabaseVer | String,
  fotoCopyPrestasi: FormDataType | BerkasAdmDatabaseVer | String,
  fotoCopyUAN: FormDataType | BerkasAdmDatabaseVer | String,
  pasFoto: FormDataType | BerkasAdmDatabaseVer | String,
}
interface PreviewBerkas{
  fotoCopyKartuKeluarga: string,
  fotoCopyIjazah: string,
  fotoCopyPrestasi: string,
  fotoCopyUAN: string,
  pasFoto: string,
}

export default function BerkasAdministrasi(){
  const [berkasAdm,setBerkasAdm] = useState<BerkasAdm>({
    fotoCopyKartuKeluarga:"",
    fotoCopyIjazah:"",
    fotoCopyPrestasi:"",
    fotoCopyUAN:"",
    pasFoto:"",
  })

  const [previewBerkas,setPreviewBerkas] = useState<PreviewBerkas>({
    fotoCopyKartuKeluarga:"",
    fotoCopyIjazah:"",
    fotoCopyPrestasi:"",
    fotoCopyUAN:"",
    pasFoto:"",
  })
  const dispatch = useAppDispatch()
  const {isError,isLoading,isSuccess,message} = useAppSelector(state => state.studentData)











  async function fetchStudentData(){
    const response = await dispatch(getStudentData())
    console.log("server resposne: ",response)
    const berkasAdmDatabase = response.payload.berkasAdministrasi
    setBerkasAdm({
      ...berkasAdmDatabase
    })
    // console.log(berkasAdm)

    // show images
    for(const key in berkasAdmDatabase){
      // console.log(berkasAdmDatabase[key].data.data)
      if(berkasAdmDatabase[key]){
        const {mimetype} = berkasAdmDatabase[key]
        // console.log(berkasAdmDatabase[key])

        const imageArrayBuffer = berkasAdmDatabase[key].data.data
        // console.log("imageArrayBuffer: ",imageArrayBuffer)

        const toBuffer = new (Buffer as any).from(imageArrayBuffer)
        // console.log("toBuffer: ",toBuffer)

        // if we want to use base64 to represent the image
        // https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html
        // `data:${mimetype};base64,${toB64}`
        const toB64 = toBuffer.toString('base64')
        // console.log("toB64",toB64)

        // if we want to use blob
        const toBlob = new Blob([toBuffer], {type:mimetype})
        // console.log("to Blob: ", toBlob)
        // console.log(URL.createObjectURL())

        setPreviewBerkas(prev => ({
          ...prev,
          [key]: URL.createObjectURL(toBlob)
        }))
      }
    }
  }

  async function handleSubmit(e: React.SyntheticEvent){
    // we will need a jwt token to update the data(Authorization)
    const {token} = JSON.parse(localStorage.getItem("user")!)
    e.preventDefault()
    console.log("berkas administrasi to be submitted: ", berkasAdm)
    console.log("preview berkas: ", previewBerkas)
    const fd = new FormData()
    type KeyBerkasAdm = keyof typeof berkasAdm;
    for(const key in berkasAdm){
      // if the user did not fill the form
      if(!berkasAdm[key as KeyBerkasAdm]){
        // then we just set empty string(default value)
        fd.set(key,"")
        continue
      }

      // this is for dynamic image file type. I.E. the image is not only an jpg. It can be a png also
      let fileType;

      //  if berkasAdm is from the database(old)
      if(berkasAdm[key as KeyBerkasAdm].type === undefined){
        fileType = berkasAdm[key as KeyBerkasAdm].mimetype
        
        const imageArrayBuffer = berkasAdm[key as KeyBerkasAdm].data.data
        const toBuffer = new (Buffer as any).from(imageArrayBuffer)
        const toBlob = new Blob([toBuffer], {type: fileType})
        // console.log(toBlob)
        fd.append(key,toBlob,berkasAdm[key as KeyBerkasAdm].name)

        // console.log(fileType)
      }
      // if it's not(new)
      else{
        fileType = berkasAdm[key as KeyBerkasAdm].type
        fd.append(key,berkasAdm[key as KeyBerkasAdm],berkasAdm[key as KeyBerkasAdm].name)
        // console.log(fileType)
      }
    }

    // console.table([...fd])
    const config = {
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
    const res = await axios.post("/api/berkas-adm",fd,config)
    if(res.status===200) toast.success("Data have been saved!")
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
      console.log("CLEARN UP 2!");
      
      dispatch(resetStudentDataState())
    }
  }, [message,isError,isLoading,isSuccess])
  


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
                      <ShowBerkas 
                        imgSrc={previewBerkas.fotoCopyKartuKeluarga} 
                        imgName={berkasAdm.fotoCopyKartuKeluarga.name}
                      />
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
                      <ShowBerkas 
                        imgSrc={previewBerkas.fotoCopyIjazah} 
                        imgName={berkasAdm.fotoCopyIjazah.name}
                      />
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
                      <ShowBerkas 
                        imgSrc={previewBerkas.fotoCopyPrestasi} 
                        imgName={berkasAdm.fotoCopyPrestasi.name}
                      />
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
                      <ShowBerkas 
                        imgSrc={previewBerkas.fotoCopyUAN} 
                        imgName={berkasAdm.fotoCopyUAN.name}
                      />
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
              <ShowBerkas 
                imgSrc={previewBerkas.pasFoto} 
                imgName={berkasAdm.pasFoto.name}
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