import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
const CardComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/readProduct")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Container>
        <Row xs="auto" sm="auto" ms="auto" lg="auto" xl="auto">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Card key={product.id} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/${product.filepath}`} // อัปเดตการเรียกใช้ URL รูปภาพ
                  style={{ width: "285px", height: "180px" }}
                />
                <Card.Body>
                  <Card.Title>ชื่อรายการ: {product.Pname}</Card.Title>{" "}
                  {/* แก้ไขการแสดงชื่อรายการ */}
                  <Card.Text>
                    ราคา: {product.Pprice} บาท {/* แก้ไขการแสดงราคา */}
                    <br />
                  </Card.Text>
                  <Button variant="primary">รายละเอียด</Button>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default CardComponent;
