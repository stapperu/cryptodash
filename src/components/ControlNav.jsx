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
            console.log("under 200");
			setIsTop(true);      
		} else { 
            console.log("over200");
			setIsTop(false);      
		}
        console.log(window.scrollY);
 
	};
    console.log(isTop);

	window.addEventListener("scroll", handleScroll);

	return (
		<div className={`${isTop ? 'opacity-100' : 'opacity-20'} w-full h-7 hover:opacity-100 bg-gray-800/80 flex sticky l-0 top-0`}>
			<div className="w-full flex align-middle">
				<input
					className={`text-sm ml-80 w-full bg-green-100 hover:bg-green-300 text-black`}
					type="text"
					id="search"
					name="search"
					placeholder="Search..."
					size="20"
					onChange={filterCoins}
				/>
			</div>

			<div className=" w-50 mr-4 text-sm text-white cursor-pointer content-center text-center">
				<label htmlFor="limit">Show:</label>
				<select
					className="text-sm bg-gray-800 border-0 p-0.5 rounded-md focus:border-green-500"
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
				className=" text-sm w-50 content-center text-center text-white cursor-pointer"
				onClick={scrollToTop}
			>
				Scroll to top ^
			</div>
		</div>
	);
};

export default ControlNav;
