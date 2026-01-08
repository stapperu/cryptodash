import { useEffect, useState, useRef } from "react";
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL;
import ControlNav from "./components/ControlNav";
import { NavLink } from "react-router";
import Footer from "./components/Footer";
import CoinCard from "./components/CoinCard";

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
		return <coinPage />;
	};

	const filterCoins = (e) => {
		const formattedSearch = e.target.value.toLowerCase();
		if (formattedSearch === "") {
			setFilteredCoins(coins);
		} else {
			setLimit(100);
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
			<h1 className="scale-150 m-6 text-2xl italic text- text-green-400 text-center">
				Crypto
				<span className="p-1 pr-3 m-1 text-white font-semibold bg-linear-to-r from-green-400 to-green-900 rounded-lg text-shadow-lg">
					-TOP
				</span>
			</h1>
			<h2 className=" text-sm text-center text-white mb-2 font-extralight">
				Look up up to 100 most popular crypto coins!{" "}
			</h2>
			<ControlNav
				coins={coins}
				filterCoins={filterCoins}
				filteredCoins={filteredCoins}
				displayAmount={displayAmount}
				scrollToTop={scrollToTop}
			/>
			{isLoading && <p className="text-center m-auto">Loading...</p>}
			{err && <p>{err}</p>}
			{!isLoading && !err && (
				<main className="mt-10 mb-10 grid w-5/6 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 xl:grid-rows-2 lg:grid-rows-2 sm:grid-rows-2 gap-6 m-auto">
					{filteredCoins.map((coin) => (
						<CoinCard key={coin.id} coin={coin} />
					))}
					<div>
						<div
							className={`${
								filteredCoins.length != coins.length ? "hidden" : "block"
							} m-4 p-2  h-12 w-40 text-center sticky text-lg text-white inset-shadow-sm border-t-3 bg-green-700/20 border-green-900 inset-shadow-green-200 rounded-2xl cursor-pointer`}
							onClick={showMore}
						>
							Load more...
						</div>
					</div>
				</main>
			)}
			<Footer />
		</>
	);
};

export default App;
