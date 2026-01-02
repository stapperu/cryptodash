import { useEffect, useState } from "react";
import "./index.css";
const API_URL =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);

	useEffect(() => {
		fetch(API_URL).then((res) => {
			if (!res.ok) {
				throw new Error("Failed fetching the data");
			}
			return res.json().then((data) => {
				setCoins(data);
				setIsLoading(false);
			}).catch((err)=>{setErr(err.message); setIsLoading(false);});
		});
	}, []);

	return (
		<>
			<h1 className=" m-4 text-2xl italic text- text-green-400 text-center">
				Crypto
				<span className="p-1 pb-2 pr-2 m-1 text-white font-semibold bg-linear-to-r from-green-400 to-green-900 rounded-lg text-shadow-lg">
					-DASH
				</span>
			</h1>
		</>
	);
};

export default App;
