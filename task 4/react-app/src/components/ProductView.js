import { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function ProductView() {

	const {user} = useContext(UserContext);
	const navigate = useNavigate();
	const {productId} = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);

	const order = (productId) => {
		fetch( `${process.env.REACT_APP_API_URL}/users/order`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				productId:productId
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data) {
				Swal.fire({
					title: "Successfully ordered",
					icon: "success",
					text: "You have successfully ordered for this product."
				})

				navigate("/products")

			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}

		})
	};

	useEffect(() => {
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [productId]);

	return (
		<Container>
			<Row>
				<Col lg={{span: 6, offset:3}} >
					<Card>
					      <Card.Body className="text-center">
					        <Card.Title>{name}</Card.Title>
					        <Card.Subtitle>Product Description:</Card.Subtitle>
					        <Card.Text>{description}</Card.Text>
					        <Card.Subtitle>Price:</Card.Subtitle>
					        <Card.Text>PhP {price}</Card.Text>
					        
					        {
					        	(user.id !== null) ?
					        		<Button variant="primary" onClick={() => order(productId)} >Order</Button>
					        		:
					        		<Button className="btn btn-danger" as={Link} to="/login">Log in to order</Button>
					        }

					      </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>

	)
}
