import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



import { useState, useEffect,useRef} from 'react';
import { useParams } from "react-router";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const API_COINS_URL=import.meta.env.VITE_API_COINS_URL

const CoinChartComponent = ({coin}) => {
const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [chartData,setChartData]=useState(null)
   
    useEffect(() => {
            const fetchChartData = async () => {
                try {
                    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7d`);
                    if (!res.ok)
                        throw new Error(
                            "failed to fetch data ( possibly exceeding API calls per minute"
                        );
                    const data = await res.json();
                    setChartData(data);
                } catch (error) {
                    setErr(error.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchChartData();
        }, []);
        
const chartDataConfig = {
  labels: chartData?.prices?.map(([timestamp]) =>
    new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  ) || [],
 

  datasets: [
    {
      label: 'Price (USD)',
      data: chartData?.prices?.map(([, price]) => price) || [],
      borderColor: '#00ff88',
      backgroundColor: 'rgba(0, 255, 136, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: `${coin?.name || params.id.toUpperCase()} 7-Day Price (USD)`,
      font: { size: 18 },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `Price: $${Number(context.parsed.y).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false }, 
      ticks: {
        maxTicksLimit: 15,   
        autoSkip: true,    
        font: { size: 11 },
      },
    },
    y: {
      ticks: {
        callback: (value) => '$' + Number(value).toLocaleString(),
      },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
  },
};

return (
  <div style={{ height: '400px', padding: '20px' }}>
    {chartData ? <Line options={chartOptions} data={chartDataConfig} /> : <p>Loading chart...</p>}
  </div>
);}

export default CoinChartComponent;