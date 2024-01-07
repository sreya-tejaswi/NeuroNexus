import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
    <h1> Welcome Admin!</h1>
    <h3>Choose any action</h3>
      <Link to="/admin/products-create">
        <Button variant="primary" style={{ margin: '10px', width: '200px' }}>Create Product</Button>
      </Link>
      <Link to="/admin/products-view">
        <Button variant="success" style={{ margin: '10px', width: '200px' }}>View All Products</Button>
      </Link>
    </div>
  );
}
