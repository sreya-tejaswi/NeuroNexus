import React from 'react';
import { Form, Button , Container} from 'react-bootstrap';
import { useState, useEffect } from 'react';
//import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function ProductUpdate() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = { name, description, price };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
        method: 'PUT',  // Use PUT method for updating
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        Swal.fire({
          title: "Successful",
          icon: "success",
          text: "New product successfully updated!"
        })
      } else {
        Swal.fire({
          title: "Request failed",
          icon: "error",
          text: "Enter all details!"
        })
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }

    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <h2>Update Product</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '300px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Button variant="primary mt-2" type="submit">Update</Button>
        </Form>
      </div>
    </Container>
  );
}
