import { Card, Button, Col, Row } from 'react-bootstrap';
//import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {

const { name, description, price, _id } = product;

	return (
		<Row className="mt-3 mb-3">
			<Col xs={12}>
				<Card className="cardHighlight p-0">
					<Card.Body>
						<Card.Title><h4>{name}</h4></Card.Title>
						<Card.Subtitle>Product Description:</Card.Subtitle>
						<Card.Text>{description}</Card.Text>
						<Card.Subtitle>Price:</Card.Subtitle>
						<Card.Text>{price}</Card.Text>
						<Button className="bg-primary" as={Link} to={`/products/${_id}`}>Details</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}