import LangkahPendaftaranNav from '../../components/LangkahPendaftaranNav'
import { Container,Row,Col,Accordion,Form,Button,Badge,Card } from 'react-bootstrap'
import {BsUpload,BsTrash} from "react-icons/bs";
import {AiOutlineDownload} from "react-icons/ai"
export default function InfoSeleksi(){

  function handleChangeBerkas(){

  }
  
  return (
    <div style={{padding:"0 0 5rem 0",backgroundColor:"rgb(251, 248, 241)"}}>
      <Container>
        <Row>
          <LangkahPendaftaranNav />    
        </Row>

        <Row>
          <Col className="col-8">
            <Accordion defaultActiveKey={['0']} alwaysOpen>
              <Form>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Langkah 1</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <h5>
                          Pilihan prodi:
                        </h5>
                      </Form.Label>
                      <Form.Select>
                        <option>Default select</option>
                        <option value="ilmuTeologi">Ilmu Teologi</option>
                        <option value="teknikInformatika">Teknik Informatika</option>
                        <option value="ilmuFIlsafat">Ilmu FIlsafat</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>
                        <h5>
                          Tanggal ujian:
                        </h5>
                      </Form.Label>
                      <Form.Select>
                        <option>Default select</option>
                        <option value="Besok">Besok</option>
                        <option value="Lusa">Lusa</option>
                        <option value="Malam ini dah">Malam ini dah</option>
                      </Form.Select>
                    </Form.Group>
                    <div>
                      <h5>Visi & misi jurusan x</h5>
                      <div>
                        <h6 className="text-secondary">Visi</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam sequi autem est necessitatibus, illo non et, quibusdam excepturi atque enim officia sapiente id tenetur mollitia. Iusto minima quam a similique laborum fugiat repudiandae consequuntur vitae ad temporibus dicta tempore, dolorem dolore recusandae cupiditate id porro quasi facere cum doloremque?
                        </p>
                      </div>
                      <div>
                        <h6 className="text-secondary">Misi</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi totam sequi autem est necessitatibus, illo non et, quibusdam excepturi atque enim officia sapiente id tenetur mollitia. Iusto minima quam a similique laborum fugiat repudiandae consequuntur vitae ad temporibus dicta tempore, dolorem dolore recusandae cupiditate id porro quasi facere cum doloremque?
                        </p>
                      </div>
                    </div>

                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Langkah 2: Pembayaran</Accordion.Header>
                  <Accordion.Body>
                    <h5>Bukti pembayaran</h5>
                    <h6 className="text-mute"></h6>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="btn btn-light rounded-0 rounded-start" style={{backgroundColor:"#e3e3e3"}}>
                        <BsUpload />
                      </Form.Label>

                      <Form.Label className="w-50 btn btn-light rounded-0">
                        No file chosen
                      </Form.Label>
                      <Button onClick={handleChangeBerkas} className="mb-2 rounded-0 rounded-end" variant='danger'><BsTrash /></Button>
                      <Badge bg='warning' className="ms-2">Diproses</Badge>

                      <Form.Control className="d-none" type="file" />
                      <Form.Text className="m-0 text-muted d-block">
                        Rp.300000,00
                      </Form.Text>
                    </Form.Group>

                    <Button variant="success" type="submit">
                      Save
                    </Button>
                    <h5>Status Kelulusan: <Badge bg='secondary'>?</Badge></h5>
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
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://picsum.photos/200/200" />
              <Card.Body>
                <Card.Title className="mb-1">Kartu Ujian</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Id: 123123123</Card.Subtitle>
                <Card.Text>
                  <div>
                    Prodi:
                  </div>
                  <div>
                    Tanggal registrasi:
                  </div>
                  <div>
                    Tanggal ujian:
                  </div>
                </Card.Text>
                <Button variant="primary"><AiOutlineDownload/> Cetak</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
/*
Quod modus dissentias nam id. Est ut unum vulputate mediocritatem. Eu animal aliquam pro, vim te tacimates atomorum. Erat gubergren mea ne, ea tale purto impetus quo.Te nihil decore sea. Nemore cetero eum id, usu eu inermis fastidii instructior, ius ei diam mundi nostrum. Iudico dolore offendit ea nec, pro in ridens sensibus, vix maluisset aliquando in. Alienum splendide gloriatur duo at, tibique sapientem cu mel.

Id usu prima diceret consulatu. Ut esse albucius accusata mei. Eu est nostrum temporibus. Ei augue expetendis intellegebat mea, elaboraret persequeris ea sit, elaboraret voluptatibus vix ad. Illud harum audiam mel ea, ius ne ocurreret sententiae, brute commune qui at. Has ludus saepe neglegentur ne, eos cibo consul ut. Case apeirian constituam ne sea, ferri explicari et per.
*/