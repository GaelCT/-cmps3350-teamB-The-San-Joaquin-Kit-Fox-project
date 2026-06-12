import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/-cmps3350-teamB-The-San-Joaquin-Kit-Fox-project/lab-d-gael">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)