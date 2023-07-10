import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

const Register = () => {
  useEffect(() => {
    fetchRankData();
  }, []);

  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNO, setPhoneNO] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rank, setRank] = useState("");
  //=================================== Clear data ========================//
  const handleCancel = () => {
      setPrefix("");
      setFirstName("");
      setLastName("");
      setPhoneNO("");
      setUsername("");
      setPassword("");
      setRank("");
    };

  //======================== Regis ==============================//
  const handleRegister = (e) => {
    e.preventDefault();

    const employeeData = {
      perName: prefix,
      firstName: firstName,
      lastName: lastName,
      phoneNO: phoneNO,
      username: username,
      password: password,
      rank: rank,
    };
    console.log(employeeData);
    fetch("http://localhost:3000/addEmploye", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ไม่สามารถบันทึกข้อมูลได้");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        alert("บันทึกข้อมูลสำเร็จ");
         handleCancel();
      })
      .catch((error) => {
        console.error(error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.message);
         handleCancel();
      });
  };

  //================================ select Rank ===================================//
  const [rankEmployee, setRankEmployee] = useState([]);
  const fetchRankData = () => {
    fetch("http://localhost:3000/readRank")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRankEmployee(data);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Register</Card.Title>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="prefixSelect">
                  <Form.Label>คำนำหน้า</Form.Label>
                  <Form.Control
                    as="select"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="firstNameInput">
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="lastNameInput">
                  <Form.Label>นามสกุล</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="phoneNoInput">
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNO}
                    onChange={(e) => setPhoneNO(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="usernameInput">
                  <Form.Label>ชื่อผู้ใช้</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="passwordInput">
                  <Form.Label>รหัสผ่าน</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Label>ตำแหน่ง</Form.Label>
                <InputGroup>
                  <Form.Select
                    aria-label="Default select example"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  >
                    <option>เลือกประเภท</option>
                    {rankEmployee &&
                      rankEmployee.length > 0 &&
                      rankEmployee.map((rankEmployees) => (
                        <option
                          key={rankEmployees.idrank}
                          value={rankEmployees.rank}
                        >
                          {rankEmployees.rank}
                        </option>
                      ))}
                  </Form.Select>
                </InputGroup>
                <br />
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
