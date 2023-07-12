import React,{useEffect} from "react";
import TableProduct from "../components/TableProduct";
import { Container, Row, Card } from "react-bootstrap";
import NavBar from "../components/navBar";
function ManageProduct() {
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
      <NavBar />
      <Container>
        <Row>
          <Card>
            <Card.Body>

              <TableProduct />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default ManageProduct;
