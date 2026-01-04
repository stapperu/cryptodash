import { useEffect, useState, useRef } from "react";
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
	const [coins, setCoins] = useState([]);
	const [filteredCoins, setFilteredCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
	const [limit, setLimit] = useState(12);

	const showMore = () => {
		setLimit((prevLimit) => prevLimit + 12);
	};

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	const displayAmount = (e) => {
		setLimit(e.target.value);
	};

	const openDetails = (e) => {
		const targetName = e.currentTarget.querySelector("h2");
		return (
			<>
				<h1>{targetName}</h1>
			</>
		);
	};

	const filterCoins = (e) => {
		const formattedSearch = e.target.value.toLowerCase();
		if (formattedSearch === "") {
			setFilteredCoins(coins);
		} else {
			setFilteredCoins(
				coins.filter(
					(coin) =>
						coin.name.toLowerCase().includes(formattedSearch) ||
						coin.symbol.toLowerCase().includes(formattedSearch)
				)
			);
		}
	};

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
				const res = await fetch(`${API_URL}
	&order=market_cap_desc&per_page=${parseInt(limit)}&page=1&sparkline=false`);
				if (!res.ok)
					throw new Error(
						"failed to fetch data ( possibly exceeding API calls per minute"
					);
				const data = await res.json();
				setCoins(data);
				setFilteredCoins(data);
			} catch (error) {
				setErr(error.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCoins();
	}, [limit]);

	return (
		<>
			<p className=" text-gray-300 p-2 m-2 text-sm font-extralight text-end">
				Powered by <span className="font-bold p-0.5 text-white">coingecko</span>
				<span className="bg-green-500 rounded-md pl-1 pr-1 text-white font-bold">
					API
				</span>
			</p>
			<h1 className="scale-200 m-10 text-2xl italic text- text-green-400 text-center">
				Crypto
				<span className="p-1 pr-3 m-1 text-white font-semibold bg-linear-to-r from-green-400 to-green-900 rounded-lg text-shadow-lg">
					-DASH
				</span>
			</h1>
			<div className="flex justify-center">
				<input
					className=" bg-green-400/20 hover:bg-green-400 text-gray-500"
					type="text"
					id="search"
					name="search"
					placeholder="Search..."
					size="30"
					onChange={filterCoins}
				/>
			</div>
			{isLoading && <p className="text-center m-auto">Loading...</p>}
			{err && <p>{err}</p>}
			{!isLoading && !err && (
				<main className="mt-20 mb-20 grid w-5/6 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 xl:grid-rows-2 lg:grid-rows-2 sm:grid-rows-2 gap-6 m-auto">
					{filteredCoins.map((coin) => (
						<div
							className="content-center h-50 w-full text-center bg-gray-800/40 inset-shadow-sm border-t-3 border-green-900 inset-shadow-green-200 rounded-2xl"
							key={coin.id}
							onClick={openDetails}
						>
							<h2 className="inline-block text-2xl">{coin.name}</h2>
							<img
								className="m-2 h-8 w-8 inline-block mt-auto"
								src={coin.image}
								alt={coin.name}
							/>
							<p className="uppercase text-sm text-green-400">{coin.symbol}</p>
							<p className="m-3 uppercase text-2xl text-white">
								<span className="m-2inline-block text-green-800 lowercase text-sm">
									Price:{" "}
								</span>
								{coin.price_change_percentage_24h > 0 ? (
									<>
										{coin.current_price.toLocaleString()} USD
										<svg
											className="inline-block ml-2 w-5 h-5"
											viewBox="0 0 100 100"
											xmlns="http://www.w3.org/2000/svg"
										>
											<marker
												id="arrowhead"
												markerWidth="10"
												markerHeight="10"
												refX="8"
												refY="3"
												orient="auto"
											>
												<path d="M0,0 L0,6 L9,3 z" fill="#22c55e" />
											</marker>
											<line
												x1="20"
												y1="80"
												x2="80"
												y2="20"
												stroke="#22c55e"
												strokeWidth="10"
												markerEnd="url(#arrowhead)"
											/>
										</svg>
										<span className="ml-1 text-green-500 text-base">
											+{coin.price_change_percentage_24h}%
										</span>
									</>
								) : (
									<>
										{coin.current_price.toLocaleString()} USD
										<svg
											className="inline-block ml-2 w-5 h-5"
											viewBox="0 0 100 100"
											xmlns="http://www.w3.org/2000/svg"
										>
											<marker
												id="arrowhead-down"
												markerWidth="10"
												markerHeight="10"
												refX="8"
												refY="3"
												orient="auto"
											>
												<path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
											</marker>
											<line
												x1="20"
												y1="20"
												x2="80"
												y2="80"
												stroke="#ef4444"
												strokeWidth="10"
												markerEnd="url(#arrowhead-down)"
											/>
										</svg>
										<span className="ml-1 text-red-500 text-base">
											{coin.price_change_percentage_24h}%
										</span>
									</>
								)}
							</p>
							<p className="uppercase text-xs font-extralight text-gray-400">
								<span className="m-2 text-green-800 lowercase">Market:</span>
								{coin.market_cap.toLocaleString("de-DE")} USD
							</p>
						</div>
					))}
					<div>
						{" "}
						<div
							className="m-4 p-2  h-12 w-40 text-center sticky text-lg text-white inset-shadow-sm border-t-3 bg-green-700/20 border-green-900 inset-shadow-green-200 rounded-4xl cursor-pointer"
							onClick={showMore}
						>
							Load more...
						</div>
						<div className="m-2 p-1 fixed right-0 bottom-35 content-center h-10 w-auto text-center text-xs text-white inset-shadow-sm bg-green-800/20 inset-shadow-green-200 rounded-xl cursor-pointer">
							<label htmlFor="limit">Show:</label>
							<select
								className="bg-gray-800"
								name="limit"
								id="limit"
								onChange={displayAmount}
							>
								<option value="12">Default</option>
								<option value="20">+20</option>
								<option value="40">+40</option>
								<option value="50">+50</option>
							</select>
						</div>
						<div
							className="m-2 p-2 fixed right-0 bottom-20 content-center h-10 w-auto text-center text-xs text-white inset-shadow-sm bg-green-800/20 inset-shadow-green-200 rounded-2xl cursor-pointer"
							onClick={scrollToTop}
						>
							Scroll to top ^
						</div>
					</div>
				</main>
			)}
		</>
	);
};

export default App;
