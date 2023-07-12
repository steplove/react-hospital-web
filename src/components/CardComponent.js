import React, { useEffect, useState } from "react";
import { Container, Card, Row, Form } from "react-bootstrap";
import "../App.css";
const CardComponent = () => {
  const [products, setProducts] = useState([]);
  const [isCheckedMap, setIsCheckedMap] = useState({});

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
  }, [isCheckedMap]);

  const handleSwitchChange = (productId) => {
    const updatedCheckedMap = {
      ...isCheckedMap,
      [productId]: isCheckedMap[productId],
    };
    setIsCheckedMap(updatedCheckedMap);
    fetch(`http://localhost:3000/api/products/${productId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        status: updatedCheckedMap[productId] ? "closed" : "open",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Container className="font">
        <Row xs="auto" sm="auto" ms="auto" lg="auto" xl="auto">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Card key={product.id} style={{ width: "18rem" , margin:"10px" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/${product.filepath}`}
                  style={{ width: "255px", height: "180px"}}
                />
                <Card.Body>
                  <Card.Title>ชื่อรายการ: {product.Pname}</Card.Title>
                  <Card.Text>
                    ราคา: {product.Pprice} บาท
                    <br />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Form>
                    <Form.Check
                      type="switch"
                      id={`custom-switch-${product.id}`}
                      label="เปิด-ปิด รายการ"
                      checked={isCheckedMap[product.id]}
                      onChange={() => handleSwitchChange(product.id)}
                    />
                  </Form>
                </Card.Footer>
              </Card>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default CardComponent;
