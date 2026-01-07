import { useParams } from "react-router";
import { useEffect, useState } from "react";
const API_COINS_URL = import.meta.env.VITE_API_COINS_URL;

const CoinPage = () => {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
	const [coin, setCoin] = useState(null);


  

	useEffect(() => {
		const fetchCoin = async () => {
			try {
				const res = await fetch(`${API_COINS_URL}/${params.id}`);
				if (!res.ok)
					throw new Error(
						"failed to fetch data ( possibly exceeding API calls per minute"
					);
				const data = await res.json();
				setCoin(data);
			} catch (error) {
				setErr(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCoin();
	}, []);

	return (
		<>
			<div className="bg-gray-800 w-7/8 m-auto h-auto mt-12 p-4 flex flex-col text-center align-middle rounded-3xl">
				{!isLoading && (
					<>
						<h1 className="text-4xl">
							{coin.name}
							<img
								className="m-2 h-10 w-10 inline-block mt-auto"
								src={coin.image.small}
							></img>
						</h1>
						<h2 className="text-2xl text-green-500 uppercase mb-4">
							{coin.symbol}
						</h2>
						<div className="sm:flex sm:flex-row sm:justify-center w-full text-xs text-yellow-100 grid grid-cols3">
							{" "}
							<span className="mr-4 text-green-500 ">Categories:</span>
							{coin.categories.slice(0,5).map((category, index) => {
								return (
									<div key={index} className=" inline-block mr-2 ml-2">
										{" "}
										{index === coin.categories.length - 1
											? category
											: `${category} *`}
									</div>
								);
							})}{" "}
						</div>
              <div className="m-2 text-blue-200 h-8 sm:flex sm:flex-row sm:justify-center w-full text-sm grid grid-cols3"><a href={coin.links.homepage} className="mr-5">Coin's Homepage</a><a href={coin.links.whitepaper} className="mr-5">Coin's Whitepaper PDF</a><a href={coin.links.blockchain_site[1]} className="mr-5">One of Coin's Blockchain Site</a> </div>
              <h3 className={`mt-16 mb-7 text-4xl scale-400 ${coin.market_cap_rank===1 ? 'text-yellow-300':'text-white' }`}>#{coin.market_cap_rank}<span className="lowercase text-xs">{coin.market_cap_rank===1 ? "st" : coin.market_cap_rank===2 ? "nd" : coin.market_cap_rank===3 ? "rd" : "th"}</span></h3>
              <span className=" p-2 border border-yellow-300 inline-block w-50 m-auto text-base">highest market cap </span>
            <h3 className="mt-12 text-4xl scale-140 ">{coin.market_data.current_price.usd.toLocaleString()} USD</h3>
			<span className="text-yellow-300 uppercase text-base">Current Value</span>
					</>
				)}
			</div>
		</>
	);
};

export default CoinPage;
