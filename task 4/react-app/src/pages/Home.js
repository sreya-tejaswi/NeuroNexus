import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

export default function Home() {

	const data = {
		title: "Welcome to Tech 2 U!",
		content: "Get best quality devices at resonable prices.",
		destination: "/products",
		label: "Buy Now!"
	};

	return(
		<>
			<Banner data={data} />
			<Highlights />
		</>
	)
};