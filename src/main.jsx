import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Route,Routes} from "react-router";
import CoinPage from './pages/coinPage.jsx'
import NotFound from './pages/notFound.jsx'


createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Routes>
      <Route path="/" element={<App />} />
      <Route path={`/coins/:id`} element={<CoinPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
</BrowserRouter>,
);
