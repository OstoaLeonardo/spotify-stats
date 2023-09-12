import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { CurrentUserProvider } from './context/currentUser'
import App from './App.jsx'
import './styles/index.css'
import './styles/font.css'
import './styles/scroll.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <BrowserRouter>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </BrowserRouter>
  </NextUIProvider>
)
