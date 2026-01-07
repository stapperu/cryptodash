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
                    const res = await fetch(`${API_COINS_URL}/${coin.id}/market_chart?vs_currency=usd&days=7`);
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
        
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: `${coin?.name || params.id.toUpperCase()} 7-Day Price (USD)` },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      ticks: { callback: (value) => '$' + Number(value).toLocaleString() },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
  },
};

const chartDataConfig = {
  labels: chartData?.prices?.map(([timestamp]) =>
    new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  ) || [],
  datasets: [
    {
      label: 'Price',
      data: chartData?.prices?.map(([, price]) => price) || [],
      borderColor: '#00ff88',
      backgroundColor: 'rgba(0, 255, 136, 0.2)',
      fill: true,
      tension: 0.4, // smooth curves
      pointRadius: 0, // cleaner look
    },
  ],
};

return (
  <div style={{ height: '400px', padding: '20px' }}>
    {chartData ? <Line options={chartOptions} data={chartDataConfig} /> : <p>Loading chart...</p>}
  </div>
);}

export default CoinChartComponent;