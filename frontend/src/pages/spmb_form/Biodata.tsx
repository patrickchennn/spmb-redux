import { Container,Row,Col,Button,Form,Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import {BsChevronDoubleLeft} from "react-icons/bs";
import {AiOutlineEdit} from "react-icons/ai";
import {AiOutlineSend} from "react-icons/ai";

const Biodata = () => {
  return (
    <div className="mb-5" style={{backgroundColor:"#FBF8F1"}}>
      <Container>
        <Row>
          <Col>
            <LangkahPendaftaranNav />
          </Col>
        </Row>

        <Row>
          <Col className="py-4 px-5 border border-2 border-secondary rounded" style={{backgroundColor:"#F7ECDE"}}>
            <Form>
              <h5>
                Umum
                <hr className="m-0 rounded-pill" style={{borderTop:"3px solid #424874"}}/>
              </h5>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor="namalengkap">Nama Lengkap</Form.Label>
                <Form.Control type="text" id="namalengkap"/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="jeniskelamin">Jenis Kelamin</Form.Label>
                <Form.Control type="text" id="jeniskelamin"/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="kewarnegaraan">Kewarganegaraan</Form.Label>
                <Form.Control type="text" id="kewarnegaraan"/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="tanggallahir">Tanggal Lahir</Form.Label>
                <Form.Control type="date" id="tanggallahir" />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="tempatlahir">Tempat Lahir</Form.Label>
                <Form.Control type="text" id="tempatlahir" />
              </Form.Group>


              <h5>
                KONTAK
                <hr className="m-0 rounded-pill" style={{borderTop:"3px solid #424874"}}/>
              </h5>
              <Form.Group className="mb-3" >
                <Form.Label htmlFor="alamatemail">Alamat Email</Form.Label>
                <Form.Control type="email" id="alamatemail" />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label htmlFor="nohp">No Hp</Form.Label>
                <Form.Control type="number" id="nohp"/>
              </Form.Group>

              <Row>
                <Col className="d-flex gap-2">
                  <Link to="/spmb-form" className='btn btn-secondary'>
                    <BsChevronDoubleLeft /> BACK
                  </Link>
                  <Button variant="success" type="submit">
                    <AiOutlineSend /> Submit
                  </Button>
                  <Button variant="warning" type="button">
                    <AiOutlineEdit /> Edit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>


          <Col className="d-flex justify-content-center">
            <div className="mt-5 mt-sm-0 p-4 border border-2 border-secondary rounded" style={{
                boxShadow:"#d9d9d9 0px 0px 10px 0px",
                height:"fit-content",
                backgroundColor:"#F7ECDE",
              }}>
              <Nav className="flex-column gap-2">
                <Link to="/spmb-form/biodata" className="text-start btn text-dark text-decoration-none">
                  <i className="bi bi-1-circle"></i> Datadiri
                </Link>

                <Link to="/spmb-form/berkas-administrasi" className="text-start btn text-dark text-decoration-none">
                  <i className="bi bi-2-circle"></i> Data Orangtua
                </Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Biodata

// [99,100,1,3,2,199,201,200,202,203]