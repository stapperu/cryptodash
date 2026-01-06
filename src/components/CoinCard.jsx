import { Link,useParams } from "react-router";
const CoinCard = ({coin}) => {


    return ( 
<>
<Link to={`../coins/${coin.id}`}>
     <div
							className="content-center h-50 w-full text-center bg-gray-800/40 inset-shadow-sm border-t-3 border-green-900 inset-shadow-green-200 rounded-2xl"
							
						
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
								{coin.current_price.toLocaleString()} USD
								{coin.price_change_percentage_24h != null ? (
									<>
										<svg
											className="inline-block ml-2 w-5 h-5"
											viewBox="0 0 100 100"
											xmlns="http://www.w3.org/2000/svg"
										>
											<marker
												id={
													coin.price_change_percentage_24h > 0
														? "arrowhead-up"
														: "arrowhead-down"
												}
												markerWidth="10"
												markerHeight="10"
												refX="8"
												refY="3"
												orient="auto"
											>
												<path
													d="M0,0 L0,6 L9,3 z"
													fill={
														coin.price_change_percentage_24h > 0
															? "#22c55e"
															: "#ef4444"
													}
												/>
											</marker>
											<line
												x1="20"
												y1={coin.price_change_percentage_24h > 0 ? "80" : "20"}
												x2="80"
												y2={coin.price_change_percentage_24h > 0 ? "20" : "80"}
												stroke={
													coin.price_change_percentage_24h > 0
														? "#22c55e"
														: "#ef4444"
												}
												strokeWidth="10"
												markerEnd={
													coin.price_change_percentage_24h > 0
														? "url(#arrowhead-up)"
														: "url(#arrowhead-down)"
												}
											/>
										</svg>

										<span
											className={`ml-1 text-base ${
												coin.price_change_percentage_24h > 0
													? "text-green-500"
													: "text-red-500"
											}`}
										>
											{coin.price_change_percentage_24h > 0 ? "+" : ""}
											{coin.price_change_percentage_24h.toFixed(2)}%
										</span>
									</>
								) : (
									<span className="ml-2 text-gray-500 text-base">
										{" "}
										(No 24h data)
									</span>
								)}
							</p>
							<p className="uppercase text-xs font-extralight text-gray-400">
								<span className="m-2 text-green-800 lowercase">Market:</span>
								{coin.market_cap.toLocaleString("de-DE")} USD
							</p>
						</div>
                        </Link>
        </>

     );
}
 
export default CoinCard;