import React,{useEffect} from "react";
import CardComponent from "../components/CardComponent";
import { Container } from "react-bootstrap";
import NavBar from "../components/navBar";
import AddProduct from "../components/AddProduct";
function Home() {
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
        <br />
      <div style={{marginLeft:"10px"}}>
        <AddProduct />
        </div>
        <br />
        <CardComponent />
      </Container>
    </>
  );
}

export default Home;
