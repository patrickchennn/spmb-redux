import { Form,Button } from "react-bootstrap"
import {BsUpload,BsTrash} from "react-icons/bs";
import {useRef} from "react"

type BerkasAdmDatabaseVer = {
  name: string,
  mimetype: string,
  data: {
    type: string,
    data: Buffer
  }
  isAccepted: string,
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





interface FormBerkasProps{
  selectedProperty: string,
  berkasAdm: BerkasAdm,
  setBerkasAdm: React.Dispatch<React.SetStateAction<BerkasAdm>>,
}
export default function FormBerkas({selectedProperty,berkasAdm,setBerkasAdm}: FormBerkasProps){
  type KeyBerkasAdm = keyof typeof berkasAdm;
  const berkasInputRef = useRef<HTMLInputElement|null>(null)

  const handleUploadBerkas = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const file: File = target.files![0]
    console.log(file)

    setBerkasAdm(prev => ({
      ...prev,
      [target.name]: {
        previewImg:{
          name: file.name,
          url: URL.createObjectURL(file)
        },
        file,
        isAccepted:"diproses",
      }
    }))
  }

  function handleChangeBerkas(propertyToBeChanged: string){
    berkasInputRef.current!.value = ""
    setBerkasAdm(prev => ({
      ...prev,
      [propertyToBeChanged]:{
        previewImg:{
          name:"",url:""
        },
        file:"",
      }
    }))
  }


  return (
    <Form.Group className="d-flex justify-content-center" controlId={selectedProperty}>
      <Form.Label className="btn btn-light rounded-0 rounded-start" style={{backgroundColor:"#e3e3e3"}}>
        <BsUpload />
      </Form.Label>
      <Form.Label className="w-50 btn btn-light rounded-0">
        {
          berkasAdm[selectedProperty as KeyBerkasAdm].file ? 
            berkasAdm[selectedProperty as KeyBerkasAdm].previewImg.name :
            "No file chosen"
        }
      </Form.Label>
      <Button onClick={()=>handleChangeBerkas(selectedProperty)} className="mb-2 rounded-0 rounded-end" variant='danger'><BsTrash /></Button>
      {
          <Form.Control
            ref={berkasInputRef}
            className="d-none" 
            name={selectedProperty}
            onChange={handleUploadBerkas}
            type="file"
          />
      }
    </Form.Group>
  )
}