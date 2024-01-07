import { Form, Button } from 'react-bootstrap';
import React from 'react';
import { useState,  } from 'react';

import Swal from 'sweetalert2';

export default function ProductCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, description, price };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        Swal.fire({
          title: "Successful created",
          icon: "success",
          text: "New product successfully added!"
        })

      } else {
        Swal.fire({
          title: "Request failed",
          icon: "error",
          text: "Enter all details!"
        })
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <h1>Create Product</h1>
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
        <Button variant="primary mt-2" type="submit">Create</Button>
      </Form>
      </div>
    </div>
  );
}


