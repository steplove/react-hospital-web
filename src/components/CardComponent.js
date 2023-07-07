import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import imageCard from "../images/package1.jpg";
const CardComponent = () => {
  const [users, setUsers] = useState([]);

  const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Container>
        <Row xs="auto" sm="auto" ms="auto" lg="auto" xl="auto">
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <Card key={user.id} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={imageCard}
                  style={{ width: "285px", height: "180px" }}
                />
                <Card.Body>
                  <Card.Title>รหัสสินค้า: {user.id}</Card.Title>
                  <Card.Text>
                    ราคา: {user.total} บาท
                    <br />
                    ราคาที่ลด: {user.discountedPrice} บาท
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
