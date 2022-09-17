import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Accordion,Form,Button,Card } from 'react-bootstrap'
import {BsUpload,BsTrash} from 'react-icons/bs';
import {AiOutlineDownload} from 'react-icons/ai'
import React, {useState,useRef, useEffect} from 'react'
import VisiMisi from '../../components/VisiMisi';
import ShowBerkas from '../../components/ShowBerkas'
import SubmitNBackBtn from '../../components/SubmitNBackBtn';
import axios from 'axios'
import { useAppDispatch,useAppSelector } from '../../app/hooks'
import { getStudentData, reset as resetStudentDataState } from '../../features/student-data/studentDataSlice'
import StatusAcceptance from "../../components/StatusAcceptance"
import {toast} from 'react-toastify'
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';


interface BuktiPembayaranSeleksi{
  previewImg:{
    name:string,
    url:string
  },
  file: string|File,
  isAccepted: string
}
interface InfoSeleksiData{
  prodi: string,
  tanggalUjian: string,
  statusPenerimaanSeleksi: string,
}




export default function InfoSeleksi(){
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useAppSelector(state => console.log(state))
  const {isError,isLoading,isSuccess,message} = useAppSelector(state => state.studentData)


  const buktiPembayaranSeleksiRef = useRef<HTMLInputElement|null>(null)
  const [cardInfo,setCardInfo] = useState({
    namaLengkap:"",
    pasFoto:"",
    id: "",
  })

  const [infoSeleksiData,setInfoSeleksiData] = useState<InfoSeleksiData>({
    prodi:"",
    tanggalUjian:"",
    statusPenerimaanSeleksi:"",
  })
  const [buktiPembayaranSeleksi,setBuktiPembayaranSeleksi] = useState<BuktiPembayaranSeleksi>({
    previewImg:{name:"", url:""},
    file:"",
    isAccepted:"",
  })


  async function handleSubmit(e: React.SyntheticEvent){
    e.preventDefault()
    const {token} = JSON.parse(localStorage.getItem("user")!)
    console.log("infoSeleksiData to be submitted: ", infoSeleksiData, buktiPembayaranSeleksi)

    const fd = new FormData()
    fd.append("infoSeleksi",JSON.stringify(infoSeleksiData))

    // if the user did upload any image
    if(
      buktiPembayaranSeleksi.file
    ){
      fd.append("buktiPembayaranSeleksi",buktiPembayaranSeleksi.isAccepted)
      fd.append(
        "buktiPembayaranSeleksi",
        buktiPembayaranSeleksi.file,
        (buktiPembayaranSeleksi.file as File).name
      )
    }else{
      fd.append("buktiPembayaranSeleksi","")
    }

    // console.table([...fd])
    const config = {
      headers:{
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }
    try {
      await axios.post("/api/info-seleksi",fd,config)
      toast.success("Data have been saved!")
    } catch (err: any) {
      // console.log(err)
      toast.error(err.response.data)
    }
  }

  function handleChangeBuktiPembayaran(selectedProperty: string){
    console.log(selectedProperty)
    buktiPembayaranSeleksiRef.current!.value = ""
    setBuktiPembayaranSeleksi({
      file:"",
      previewImg:{name:"",url:""},
      isAccepted:""
    })
  }

  function handleChange(e: React.SyntheticEvent){
    const target = e.target as HTMLInputElement
    const id: string = target.id
    console.log(id,target.value)
    if(id==="buktiPembayaranSeleksi"){
      setBuktiPembayaranSeleksi({
        file: target.files![0],
        previewImg: {
          name:target.files![0].name,
          url: URL.createObjectURL(target.files![0])
        },
        isAccepted: "diproses"
      })
      return
    }

    setInfoSeleksiData(prev => ({
      ...prev,
      [id]: target.value
    }))
  }

  async function fetchStudentData(){
    const response = await dispatch(getStudentData())
    console.log("fetchStudentData(): ", response)

    const {infoSeleksi} = response.payload
    for(const key in infoSeleksi){
      if(key==="buktiPembayaranSeleksi" && infoSeleksi[key]){
        console.log(infoSeleksi[key],typeof infoSeleksi[key])
        const {mimetype} = infoSeleksi[key]
        const imageArrayBuffer = infoSeleksi[key].data.data
        const toBuffer = new (Buffer as any).from(imageArrayBuffer)
        const toBlob = new Blob([toBuffer], {type:mimetype})
        console.log(toBlob)
        setBuktiPembayaranSeleksi({
          file: "",
          previewImg: {
            name:infoSeleksi[key].name,
            url:URL.createObjectURL(toBlob)
          },
          isAccepted: infoSeleksi[key].isAccepted
        })
        continue
      }

      setInfoSeleksiData(prev => ({
        ...prev,
        [key]: infoSeleksi[key]
      }))
    }
    const blob = toBlob(response.payload.berkasAdministrasi.pasFoto)
    setCardInfo(prev => ({
      ...prev,
      namaLengkap: response.payload.dataDiri.namaLengkap,
      pasFoto: blob!==null ? URL.createObjectURL(blob) : "",
      id: response.payload.infoSeleksi.idUjian
    }))
    
  }

  function toBlob(file: any){
    console.log(file)
    if(!file) return null
    const {mimetype} = file
    const imageArrayBuffer = file.data.data
    const toBuffer = new (Buffer as any).from(imageArrayBuffer)
    const blob = new Blob([toBuffer], {type:mimetype})
    return blob
  }

  useEffect(() => {
    console.log("USE EFFECT 1!")
    fetchStudentData()
    return ()=>{
      console.log("CLEAN UP 1!")
      resetStudentDataState()
    }
  },[])

  useEffect(() => {
    console.log("USE EFFECT 2!")
    if(isError){
      toast.error(message)
      if(message==="jwt expired"){
        navigate("/login")
      }
    }
    if(isSuccess) toast.success(message,{autoClose: 2000})

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
    <div className="pb-5" style={{backgroundColor:"rgb(251, 248, 241)"}}>
      <Container>
        <Row>
          <LangkahPendaftaranNav />
        </Row>

        <Row>
          <Col className="col-8">
            <Accordion defaultActiveKey={['0','1']} alwaysOpen className="border border-2 border-secondary rounded">

              <Form onSubmit={handleSubmit} method="POST" action="/api/berkas-adm" encType="multipart/form-data">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Langkah 1</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="prodi">
                      <Form.Label><h5>Pilihan prodi:</h5></Form.Label>
                      <Form.Select onChange={handleChange} name="prodi">
                        <option value="" selected disabled hidden>{infoSeleksiData.prodi}</option>
                        <option value="Ilmu Teologi">Ilmu Teologi</option>
                        <option value="Teknik Informatika">Teknik Informatika</option>
                        <option value="Ilmu Filsafat">Ilmu Filsafat</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="tanggalUjian" className="mb-3" >
                      <Form.Label><h5>Tanggal ujian:</h5></Form.Label>
                      <Form.Control onChange={handleChange} min={new Date().toLocaleDateString('en-ca')} value={infoSeleksiData.tanggalUjian} type="date" />
                    </Form.Group>

                    <VisiMisi pilihanProdi={infoSeleksiData.prodi}/>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Langkah 2: Pembayaran</Accordion.Header>
                  <Accordion.Body>
                    <h5>Bukti pembayaran</h5>
                    <Form.Group controlId="buktiPembayaranSeleksi" className="mb-3">
                      <Form.Label className="btn btn-light rounded-0 rounded-start" style={{backgroundColor:"#e3e3e3"}}>
                        <BsUpload />
                      </Form.Label>

                      <Form.Label className="w-50 btn btn-light rounded-0">
                        {
                        buktiPembayaranSeleksi.previewImg.name ?
                          buktiPembayaranSeleksi.previewImg.name 
                          : 
                          "-"
                        }
                      </Form.Label>

                      <Button onClick={()=>handleChangeBuktiPembayaran("buktiPembayaranSeleksi")} className="me-3 mb-2 rounded-0 rounded-end" variant='danger'><BsTrash /></Button>

                      <StatusAcceptance status={buktiPembayaranSeleksi.isAccepted}/>

                      <Form.Control ref={buktiPembayaranSeleksiRef} onChange={handleChange} className="d-none" name="buktiPembayaranSeleksi" type="file" />
                      <Form.Text className="m-0 text-muted d-block">Rp.300000,00</Form.Text>
                    </Form.Group>
                    <ShowBerkas 
                      imgSrc={buktiPembayaranSeleksi.previewImg.url} 
                      imgName={buktiPembayaranSeleksi.previewImg.name}
                    />
                    <SubmitNBackBtn />
                    <h5>Status Kelulusan: <StatusAcceptance status={infoSeleksiData.statusPenerimaanSeleksi}/></h5>
                  </Accordion.Body>
                </Accordion.Item>
              </Form>

              <Accordion.Item eventKey="2">
                <Accordion.Header>FAQ</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col>
            <h4>Kartu Ujian</h4>
                <Card className="border border-2 border-secondary rounded" style={{ width: '18rem' }}>
                  {
                    cardInfo.pasFoto ?  
                      <Card.Img variant="top" src={cardInfo.pasFoto} alt="foto peserta ujian"/>
                      :
                      <h5 className="text-danger">Foto belum diupload</h5>
                  }
                  <Card.Body>
                    <Card.Title className="mb-1">{cardInfo.namaLengkap}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Id: {cardInfo.id}</Card.Subtitle>
                    <div className="mb-3">
                      <div>
                        Prodi: {infoSeleksiData.prodi}
                      </div>
                      <div>
                        Tanggal ujian: {infoSeleksiData.tanggalUjian}
                      </div>
                    </div>
                    <Button variant="primary"><AiOutlineDownload/> Cetak Kartu Ujian</Button>
                  </Card.Body>
                </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
