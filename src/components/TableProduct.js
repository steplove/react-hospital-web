import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Card,
  Image,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
function TableProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);
  return (
    <Container>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <Form.Group>
            <Form.Label>วันที่เริ่มต้น</Form.Label>
            <Form.Control type="date" id="startDate" />
          </Form.Group>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Form.Group>
            <Form.Label>วันที่สิ้นสุด</Form.Label>
            <Form.Control type="date" id="endDate" />
          </Form.Group>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Form.Group>
            <Form.Label>ค้นหา</Form.Label>
            <Form.Control type="text" placeholder="ค้นหา" />
          </Form.Group>
        </Col>
        <Col sm={3} md={3} lg={3} className="mt-2">
          <Form.Group>
            <br />
            <Button variant="primary" type="button">
              ค้นหา
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="success" show={false}>
            บันทึกข้อมูลสำเร็จ
          </Alert>
          <Alert variant="danger" show={false}>
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
          <div className="table-responsive">
            <Card>
              <Card.Body>
                <Table hover>
                  <thead>
                    <tr>
                      <th>รหัส</th>
                      <th>รูป</th>
                      <th>ชื่อ</th>
                      <th>ราคา</th>
                      <th>สถานะ</th>
                      <th>เครื่องมือ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData &&
                      currentPageData.length > 0 &&
                      currentPageData.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>
                            <Image
                              src={`http://localhost:3000/${product.filepath}`}
                              style={{ width: "80px", height: "80px" }}
                              rounded
                            />
                          </td>
                          <td>{product.Pname}</td>
                          <td>{product.Pprice}</td>
                          <td>{product.status}</td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <ReactPaginate
        previousLabel={"ก่อนหน้า"}
        nextLabel={"ถัดไป"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(products.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </Container>
  );
}

export default TableProduct;
