import { useState,  useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminProductView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleArchive = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: 'PATCH',  // Use PATCH method for archiving
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          title: "Product Archived",
          icon: "success",
          text: "Product has been archived."
        });

        // Update the isActive status in the products array
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, isActive: false } : product
          )
        );
      } else {
        Swal.fire({
          title: "Archive Failed",
          icon: "error",
          text: "Failed to archive the product."
        });
      }
    } catch (error) {
      console.error('Error archiving product:', error);
    }
  };

  const handleActivate = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
        method: 'PATCH',  // Use PATCH method for activation
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          title: "Product Activated",
          icon: "success",
          text: "Product has been activated."
        });

        // Update the isActive status in the products array
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, isActive: true } : product
          )
        );
      } else {
        Swal.fire({
          title: "Activation Failed",
          icon: "error",
          text: "Failed to activate the product."
        });
      }
    } catch (error) {
      console.error('Error activating product:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-3">View All Products</h2>
      {products.map((product) => (
        <Card key={product._id} className="mt-3 mb-2">
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>Product Description:</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PhP {product.price}</Card.Text>
                <Card.Subtitle>Active Status:</Card.Subtitle>
                <Card.Text>{product.isActive ? 'Active' : 'Archived'}</Card.Text>
              </Col>
              <Col className="d-flex flex-column align-items-end">
                <Button variant="primary mb-2" onClick={() => handleArchive(product._id)}>Archive</Button>
                <Button variant="success mb-2" onClick={() => handleActivate(product._id)}>Activate</Button>
                <Button variant="info mb-2" as={Link} to={`/products/${product._id}/update`}>Update Product</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );

}
