import React, { useEffect, useState } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
const Event = () => {
  const [p_types, setP_types] = useState([]);

  const fetchTypeData = () => {
    fetch("http://localhost:8000/api/getdata_Type")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setP_types(data);
      });
  };

  useEffect(() => {
    fetchTypeData();
  }, []);
  return (
    <>
      <Card>
        <Card body>
          <Card.Title>เพิ่มรายการอาหาร</Card.Title>
          <InputGroup sm={2} mb={2} lg={2}>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="ชื่อรายการ"
              aria-label="Product_Name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <br />
          <InputGroup sm={2} mb={2} lg={2}>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="รายละเอียด"
              aria-label="Product_Detail"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <br />
          <InputGroup sm={2} mb={2} lg={2}>
            <Form.Select aria-label="Default select example">
              <option>เลือกประเภท</option>
              {p_types &&
                p_types.length > 0 &&
                p_types.map((p_type) => (
                  <option key={p_type.T_id} value={p_type.T_id}>
                    {p_type.P_type}
                  </option>
                ))}
            </Form.Select>
          </InputGroup>
          <br />
          <InputGroup sm={2} mb={2} lg={2}>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="ราคา"
              aria-label="Product_Price"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <br/>
          <Button variant="success">เพิ่มรายการ</Button>{" "}
          <Button variant="secondary">เคลียร์</Button>{" "}
        </Card>
      </Card>
    </>
  );
};

export default Event;
