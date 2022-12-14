import { Badge } from 'react-bootstrap'

export default function StatusAcceptance({status}:{status: string}){
  let theChoosenOne: JSX.Element

  switch(status){
    case "diterima":
      theChoosenOne = <Badge bg='success'>Diterima</Badge>
      break
    case "ditolak":
      theChoosenOne = <Badge bg='danger'>Ditolak</Badge>
      break
    case "diproses":
      theChoosenOne = <Badge bg='warning'>Diproses</Badge>
      break
    default:
      theChoosenOne = <Badge bg='secondary'>?</Badge>
      break
  }

  return theChoosenOne
}