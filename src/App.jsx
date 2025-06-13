import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PortfolioMain from "./components/PortfolioMain";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioMain />
  </StrictMode>,
)
