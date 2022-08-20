import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Button,Form,Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {BsChevronDoubleLeft} from "react-icons/bs";
import {MdOutlineSaveAlt} from 'react-icons/md';

const BerkasAdministrasi = () => {
  return (
    <div style={{backgroundColor:"#FBF8F1"}}>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav/>
          </Col>
        </Row>

        <Row>
          <Col className="col-8">
            <Form>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Syarat</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Fotocopy Kartu Keluarga<span className='text-danger'>*</span></td>
                    <td>
                      <Form.Control type="file"/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Ijazah<span className='text-danger'>*</span></td>
                    <td>
                      <Form.Control type="file"/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Prestasi<sup className="text-secondary">opt</sup></td>
                    <td>
                      <Form.Control type="file"/>
                    </td>
                    <td>status</td>
                  </tr>
                  <tr>
                    <td>Fotocopy Nilai Ujian Akhir Nasional<sup className="text-secondary">opt</sup></td>
                    <td>
                      <Form.Control type="file"/>
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
            </Form>
          </Col>

          <Col>
            pas foto
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BerkasAdministrasi