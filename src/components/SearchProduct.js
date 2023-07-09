// import React, { useEffect, useState } from 'react';
// import { Form, Button } from "react-bootstrap";
// function SearchProduct() {
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
  
//     const handleSearch = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/searchProducts', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ keyword: searchKeyword }),
//         });
  
//         if (response.ok) {
//           const data = await response.json();
//           setSearchResults(data);
//         } else {
//           console.error('เกิดข้อผิดพลาดในการค้นหาสินค้า');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//   return (
//     <>
// <Form className="d-flex">
//   <Form.Control
//     type="search"
//     placeholder="Search"
//     className="me-2"
//     aria-label="Search"
//     value={searchKeyword}
//     onChange={(e) => setSearchKeyword(e.target.value)}
//   />
//   <Button variant="primary" onClick={handleSearch}>
//     ค้นหา
//   </Button>
// </Form>
// {searchResults.map((product) => (
//   <div key={product.id}>{product.Pname}</div>
// ))}
//     </>
//   );
// }

// export default SearchProduct;
