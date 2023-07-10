import React, { useEffect, useState } from "react";
import { Card, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
const AddProduct = () => {
  //========================= drag drop =======================//
  const [file, setFile] = useState(null);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (file) => {
    setFile(file);
  };
  //=================================== Clear data ========================//
  const handleCancel = () => {
    setProductName(""); // เคลียร์ค่าใน input ชื่อรายการ
    setProductDetail(""); // เคลียร์ค่าใน input รายละเอียด
    setProductType(""); // เคลียร์ค่าใน input เลือกประเภท
    setProductPrice(""); // เคลียร์ค่าใน input ราคา
    setFile(null); // เคลียร์ค่ารูปภาพ
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
  //================================= Add Product ============================//
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productType, setProductType] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = () => {
    console.log("Product Name:", productName);
    console.log("Product Detail:", productDetail);
    console.log("Product Type:", productType);
    console.log("Product Price:", productPrice);
    console.log("Product file:", file);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDetail", productDetail);
    formData.append("productType", productType);
    formData.append("productPrice", productPrice);
    formData.append("file", file);

    fetch("http://localhost:3000/api/addProduct", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("บันทึกข้อมูลสำเร็จ"); // แสดงแจ้งเตือน
        handleCancel();
      })
      .catch((error) => {
        console.error(error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล"); // แสดงแจ้งเตือน
        handleCancel();
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(setTypeProducts);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        เพิ่มรายการ
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มรายการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>เพิ่มรายการอาหาร</Card.Title>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  placeholder="ชื่อรายการ"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  placeholder="รายละเอียด"
                  value={productDetail}
                  onChange={(e) => setProductDetail(e.target.value)}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <Form.Select
                  aria-label="Default select example"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  <option>เลือกประเภท</option>
                  {Producttypes &&
                    Producttypes.length > 0 &&
                    Producttypes.map((Producttype) => (
                      <option
                        key={Producttype.idType}
                        value={Producttype.idType}
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
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </InputGroup>
              <br />
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              {file && (
                <div>
                  <h4>ตัวอย่างรูปที่อัปโหลด:</h4>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    style={{ width: "300px", height: "auto" }}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddProduct}>
            เพิ่มรายการ
          </Button>{" "}
          <Button variant="secondary" onClick={handleCancel}>
            เคลียร์
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
