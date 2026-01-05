import { useEffect, useState } from "react";

const ControlNav = ({
	coins,
	filterCoins,
	filteredCoins,
	showMore,
	scrollToTop,
	displayAmount,
}) => {
	const [isTop, setIsTop] = useState(true);

	const handleScroll = () => {
		if (window.scrollY < 200) { 
			setIsTop(true);      
		} else { 
			setIsTop(false);      
		}};

	window.addEventListener("scroll", handleScroll);

	return (
		<div className={`${isTop ? 'opacity-100' : 'opacity-20'} w-full hover:opacity-100 bg-gray-700/20 p-1 sticky l-0 top-0`}>
			<div className="flex justify-evenlysm:flex-row"><div className="w-full flex align-middle">
				<input
					className={`text-sm lg:ml-40 md:ml-20 sm:ml-2 w-full ml-2 bg-gray-200 rounded-sm p-1 hover:bg-white text-black`}
					type="text"
					id="search"
					name="search"
					placeholder="Search..."
					size="20"
					onChange={filterCoins}
				/>
			</div>

			<div className=" w-30 ml-2 text-sm text-white cursor-pointer content-center text-center">
				<label htmlFor="limit">Show:</label>
				<select
					className="text-xs bg-gray-700 border-0 p-0.5 rounded-md focus:border-green-500"
					name="limit"
					id="limit"
					onChange={displayAmount}
				>
					<option value="12">12</option>
					<option value="20">20</option>
					<option value="40">40</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
			<div
				className=" text-sm w-40 mr-1 content-center text-center bg-gray-700 rounded-md text-white cursor-pointer"
				onClick={scrollToTop}
			>
				Scroll to top ^
			</div></div>
		</div>
	);
};

export default ControlNav;
