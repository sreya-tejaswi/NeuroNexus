import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';


export default function Products(){

	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		//fetch('http://localhost:4000/products/active-courses')
		fetch(`${process.env.REACT_APP_API_URL}/products/active-products`)
			.then(res => res.json())
			.then(data => {
				console.log(data);

				setProducts(data.map(product => {
					return (
						<ProductCard key={product._id} product={product} />
					)
				}))
			})
		}, [])

	return (
		<>
		{products}
		</>
	)
};