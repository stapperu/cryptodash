import { useParams } from "react-router";
import { useEffect,useState } from "react";
const API_COINS_URL = import.meta.env.VITE_API_COINS_URL;

const CoinPage = () => {
  
  const params= useParams();
  const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
  const [coin,setCoin]=useState(null);


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
    }, [params.id]);

    return (
        <> 
        {coin && !isLoading && !err && ( <div>
        <h3>{coin.name}</h3>
        <p>Rank: #{coin.market_cap_rank}</p>
       </div> )}
      </>
      );
}
 
export default CoinPage;