import { useEffect, useState } from "react";
import "./index.css";
const API_URL =
	"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=11&page=1&sparkline=false";

const App = () => {
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);

	// .THEN SYNTAX :  useEffect(() => {
	// 	fetch(API_URL)
	// 		.then((res) => {
	// 			if (!res.ok) throw new Error("Failed fetching the data");
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			setCoins(data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			setErr(err.message);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	// ASYNC AWAIT SYNTAX:
	useEffect(() => {
		const fetchCoins = async () => {
			try {
				const res = await fetch(API_URL);
				if (!res.ok) throw new Error("failed to fetch data");
				const data = await res.json();
				setCoins(data);
			} catch (error) {
				setErr(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCoins();
	}, []);

	return (
		<>
    <p className=" text-gray-300 p-2 m-2 text-sm font-extralight text-end">Powered by <span className="font-bold p-0.5 text-white">coingecko</span><span className="bg-green-500 rounded-md pl-1 pr-1 text-white font-bold">API</span></p>
			<h1 className=" m-10 text-3xl italic text- text-green-400 text-center">
				Crypto
				<span className="p-1 pr-3 m-1 text-white font-semibold bg-linear-to-r from-green-400 to-green-900 rounded-lg text-shadow-lg">
					-DASH
				</span>
			</h1>
			{isLoading && <p>Loading...</p>}
			{err && <p>{err}</p>}
			{!isLoading && !err && (
				<main className="mt-20 mb-20 grid w-5/6 grid-cols-3 grid-rows-2 gap-8 m-auto">
					{coins.map((coin) =>(
						<div className="h-50 w-full text-center shadow-md shadow-gray-700 rounded-2xl">
							<h3 className="text-2xl">{coin.name}</h3>
<p className="uppercase text-sm text-green-400">{coin.symbol}</p>
<p className="uppercase text-2xl text-white"><span className="m-2inline-block text-green-800 lowercase text-sm">Price: </span>{coin.current_price} USD</p>
<p className="uppercase text-sm font-extralight text-white"><span className="m-2 text-green-800 lowercase text-sm">Market:</span>{coin.market_cap}</p>

						</div>
					))}
          <div className="h-50 w-full text-center shadow-md shadow-gray-700 rounded-2xl">Load more...</div>
				</main>
			)}
		</>
	);
};

export default App;
