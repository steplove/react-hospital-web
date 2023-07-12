import React, { useEffect, useState,useRef } from "react";
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
  Modal,
  InputGroup,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "../App.css";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import AddProduct from '../components/AddProduct'

function TableProduct() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);

  const checkbox = useRef();
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [isCheckedMap, setIsCheckedMap] = useState({});
  const handleClose = () => {
    setShow(false);
    setAlertType("");
  };
  const handleShow = (type) => {
    setShow(true);
    setAlertType(type);
    // กำหนดเวลาให้ Modal หายไปเมื่อเวลาผ่านไป 3 วินาที
    setTimeout(() => {
      handleClose();
    }, 3000);
  };
  const getIcon = () => {
    if (alertType === "error") {
      return <BsFillExclamationCircleFill color="red" size={54} />;
    } else if (alertType === "success") {
      return <BsCheckCircleFill color="green" size={64} />;
    } else {
      return null;
    }
  };

  const showAlert = (type) => {
    handleShow(type);
  };



  useEffect(() => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // ดึงสถานะจาก MySQL และอัปเดต isCheckedMap
        const initialCheckedMap = data.reduce((acc, product) => {
          const status = product.status === "closed" ? false : true;
          return { ...acc, [product.id]: status };
        }, {});
        setIsCheckedMap(initialCheckedMap);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleClick = (e) => {
    const { value, checked,id } = e.target;
    console.log(`${value} is ${checked} id as ${id}`);
    const productId = id
    fetch(`http://localhost:3000/api/products/${productId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        status: checked ? "open" : "closed",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSearch()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleSwitchChange = (productId,statusText) => {
    if (checkbox.current.checked) {
      console.log('check done');
    }
    // const updatedCheckedMap = {
    //   ...isCheckedMap,
    //   [productId]: isCheckedMap[productId],
    // };
    console.log(statusText);
   // setIsCheckedMap(updatedCheckedMap);
    fetch(`http://localhost:3000/api/products/${productId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        status: statusText ? "closed" : "open",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleSearch()
        console.log(statusText);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);
  //============================================ ดึงข้อมูล ===============================//
  const fetchProducts = () => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error(error));
  };
  //========================= select Type Product =======================//
  const [Producttypes, setTypeProducts] = useState([]);
  const fetchTypeData = () => {
    fetch("http://localhost:3000/read")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTypeProducts(data);
      });
  };
  useEffect(() => {
    fetchTypeData();
  }, []);
  //======================================== edite ==============================================//
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    handleShowModal();
  };
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);

    fetch(`http://localhost:3000/api/editProduct/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSaving(false);
        showAlert("success");
        fetchProducts();
        handleCloseModal();
      })
      .catch((error) => {
        setIsSaving(false);
        showAlert("error");
        console.error("Error saving product:", error);
      });
  };

  //=================================== delete ====================================//
  const handleDelete = (productId) => {
    fetch(`http://localhost:3000/api/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };



  //========================================= search ==========================================//
  const [searchText, setSearchText] = useState(""); // เพิ่ม state สำหรับเก็บค่าการค้นหา
  const handleSearch = () => {
    fetch("http://localhost:3000/searchProduct?keyword=" + encodeURIComponent(searchText), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
    //===================== Check Token ========================//
    useEffect(() => {
      const token = localStorage.getItem('token')
      fetch('http://localhost:3000/authen',{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
          "Authorization": 'Bearer '+token
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "ok"){
          console.log(data.status);
        }else{
          console.log(data.status);
          alert('Token หมดอายุ')
          localStorage.removeItem('token')
          window.location = '/login'
        }
      })
      .catch((error) =>{
        console.log('Error' ,error);
      })
      }, [])
  return (
    <>
      <Container className="font">
        <Row xs="auto" sm="auto" ms="auto" lg="auto" xl="auto">
          <Col>
            <Form.Group>
              <Form.Label>ค้นหา</Form.Label>
              <Form.Control
                type="text"
                placeholder="ค้นหา"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form.Group>
            {" "}
              <AddProduct />
          </Col>
          <Col>
            <Form.Group>
              <br />
              <Button variant="primary" type="button" onClick={handleSearch}>
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
                        <th>เปิด-ปิด</th>
                        <th>เครื่องมือ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData &&
                        currentPageData.length > 0 &&
                        currentPageData.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td></td>
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
                            <td>
                              {" "}
                              <Form>
                                <Form.Check
                                  type="switch"
                                  id={`${product.id}`}
                                  name="js"
                                  value={`${product.id}`}
                                  ref={checkbox}
                                  checked={product.status==="open" ? true : false}
                                  onChange={handleClick}
                                />
                              </Form>
                            </td>
                            <td>
                              <Button
                                variant="warning"
                                onClick={() => handleEditModal(product.id)}
                              >
                                แก้ไข
                              </Button>{" "}
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(product.id)}
                              >
                                ลบ
                              </Button>
                            </td>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขรายการสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Card>
              <Card.Body>
                <Card.Title>แก้ไขรายการสินค้า</Card.Title>
                <InputGroup>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control
                    placeholder="ชื่อรายการ"
                    value={selectedProduct.Pname}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        Pname: e.target.value,
                      })
                    }
                  />
                </InputGroup>
                <br />
                <InputGroup>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control
                    placeholder="รายละเอียด"
                    value={selectedProduct.Pdetail}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        Pdetail: e.target.value,
                      })
                    }
                  />
                </InputGroup>
                <br />
                <InputGroup>
                  <Form.Select
                    aria-label="Default select example"
                    value={selectedProduct.Ptype}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        Ptype: e.target.value,
                      })
                    }
                  >
                    <option>เลือกประเภท</option>
                    {Producttypes.map((Producttype) => (
                      <option
                        key={Producttype.idType}
                        value={Producttype.Ptype}
                      >
                        {Producttype.Ptype}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <br />
                <InputGroup>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control
                    placeholder="ราคา"
                    value={selectedProduct.Pprice}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        Pprice: e.target.value,
                      })
                    }
                  />
                </InputGroup>
                <br />
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
          <Button variant="success" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p>Save {alertType}</p>
          {getIcon()}{" "}
          {alertType === "error"
            ? "Error"
            : alertType === "success"
            ? "Success"
            : ""}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableProduct;
