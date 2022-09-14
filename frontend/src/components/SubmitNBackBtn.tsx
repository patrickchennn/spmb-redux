import { Link } from 'react-router-dom'
import {BsChevronDoubleLeft} from "react-icons/bs"
import {MdOutlineSaveAlt} from 'react-icons/md'
import { Button } from 'react-bootstrap'

export default function SubmitNBackBtn(){
  return (
    <div className="mb-3 d-flex gap-3" style={{height:"fit-content"}}>
      <Link to="/spmb-form" className="btn btn-secondary">
        <BsChevronDoubleLeft /> BACK
      </Link>
      <Button variant="success" type="submit">
        <MdOutlineSaveAlt /> SAVE
      </Button>
    </div>
  )
}