import { Form,Button } from "react-bootstrap"
import {BsUpload,BsTrash} from "react-icons/bs";
import {useRef} from "react"

interface PreviewBerkas{
  fotoCopyKartuKeluarga: Blob|null,
  fotoCopyIjazah: Blob|null,
  fotoCopyPrestasi: Blob|null,
  fotoCopyUAN: Blob|null,
  pasFoto: Blob|null,
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
  fotoCopyKartuKeluarga: null | FormDataType,
  fotoCopyIjazah: null | FormDataType,
  fotoCopyPrestasi: null | FormDataType,
  fotoCopyUAN: null | FormDataType,
  pasFoto: null | FormDataType,
}
interface FormBerkasProps{
  selectedProperty: string,
  berkasAdm: BerkasAdm,
  setBerkasAdm: React.Dispatch<React.SetStateAction<BerkasAdm>>,
  setPreviewBerkas:React.Dispatch<React.SetStateAction<PreviewBerkas>>,
  isRequired: boolean
}
export default function FormBerkas({selectedProperty,berkasAdm,setBerkasAdm,setPreviewBerkas,isRequired}: FormBerkasProps){
  const berkasInputRef = useRef<HTMLInputElement|null>(null)

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    // berkasInputRef.current!.name = target.files![0].name

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
      [propertyToBeChanged]:null
    }))
    setPreviewBerkas(prev => ({
      ...prev,
      [propertyToBeChanged]:null
    }))
  }


  return (
    <Form.Group className="d-flex justify-content-center" controlId={selectedProperty}>
      <Form.Label className="btn btn-light rounded-0 rounded-start" style={{backgroundColor:"#e3e3e3"}}>
        <BsUpload />
      </Form.Label>
      <Form.Label className="w-50 btn btn-light rounded-0">
        {
          berkasAdm[selectedProperty as keyof typeof berkasAdm] ? 
            berkasAdm[selectedProperty as keyof typeof berkasAdm]!.name : 
            "No file chosen"
        }
      </Form.Label>
      <Button onClick={()=>handleChangeBerkas(selectedProperty)} className="mb-2 rounded-0 rounded-end" variant='danger'><BsTrash /></Button>
      {
        isRequired ? 
          <Form.Control required ref={berkasInputRef} className="d-none" name={selectedProperty} onChange={handleChange} type="file"/> :
          <Form.Control ref={berkasInputRef} className="d-none" name={selectedProperty} onChange={handleChange} type="file"/>
      }
    </Form.Group>
  )
}