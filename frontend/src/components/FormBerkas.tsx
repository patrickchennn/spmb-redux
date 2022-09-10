import { Form,Button } from "react-bootstrap"
import {BsUpload,BsTrash} from "react-icons/bs";
import {useRef} from "react"

interface PreviewBerkas{
  fotoCopyKartuKeluarga: string,
  fotoCopyIjazah: string,
  fotoCopyPrestasi: string,
  fotoCopyUAN: string,
  pasFoto: string,
}
interface FormDataType{
  lastModified: number,
  lastModifiedData:Date,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
}
interface BerkasAdmDatabaseVer{
  name: string,
  mimetype: string,
  data: {
    type: string,
    data:Buffer
  }
}
interface BerkasAdm {
  fotoCopyKartuKeluarga: string | FormDataType | BerkasAdmDatabaseVer,
  fotoCopyIjazah: string | FormDataType | BerkasAdmDatabaseVer,
  fotoCopyPrestasi: string | FormDataType | BerkasAdmDatabaseVer,
  fotoCopyUAN: string | FormDataType | BerkasAdmDatabaseVer,
  pasFoto: string | FormDataType | BerkasAdmDatabaseVer,
}
interface FormBerkasProps{
  selectedProperty: string,
  berkasAdm: BerkasAdm,
  setBerkasAdm: React.Dispatch<React.SetStateAction<BerkasAdm>>,
  setPreviewBerkas:React.Dispatch<React.SetStateAction<PreviewBerkas>>,
  isRequired: boolean
}





export default function FormBerkas({selectedProperty,berkasAdm,setBerkasAdm,setPreviewBerkas,isRequired}: FormBerkasProps){
  type KeyBerkasAdm = keyof typeof berkasAdm;
  const berkasInputRef = useRef<HTMLInputElement|null>(null)

  const handleUpload = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    // berkasInputRef.current!.name = target.files![0].name
    console.log(target.files![0])

    setBerkasAdm(prev => ({
      ...prev,
      [target.name]: target.files![0]
    }))
    setPreviewBerkas(prev => ({
      ...prev,
      [target.name]: URL.createObjectURL(target.files![0])
    }))
  }

  function handleChangeBerkas(propertyToBeChanged: string){
    berkasInputRef.current!.value = ""
    setBerkasAdm(prev => ({
      ...prev,
      [propertyToBeChanged]:''
    }))
    setPreviewBerkas(prev => ({
      ...prev,
      [propertyToBeChanged]:''
    }))
  }


  return (
    <Form.Group className="d-flex justify-content-center" controlId={selectedProperty}>
      <Form.Label className="btn btn-light rounded-0 rounded-start" style={{backgroundColor:"#e3e3e3"}}>
        <BsUpload />
      </Form.Label>
      <Form.Label className="w-50 btn btn-light rounded-0">
        {
          berkasAdm[selectedProperty as KeyBerkasAdm] ? 
            (berkasAdm[selectedProperty as KeyBerkasAdm] as BerkasAdmDatabaseVer | FormDataType).name :
            "No file chosen"
        }
      </Form.Label>
      <Button onClick={()=>handleChangeBerkas(selectedProperty)} className="mb-2 rounded-0 rounded-end" variant='danger'><BsTrash /></Button>
      {
          <Form.Control
            ref={berkasInputRef}
            className="d-none" 
            name={selectedProperty}
            onChange={handleUpload}
            type="file"
          />
      }
    </Form.Group>
  )
}