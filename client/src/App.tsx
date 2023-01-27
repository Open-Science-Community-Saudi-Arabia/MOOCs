import React from 'react'
import LandingPage from './pages/landing-page'
import "./styles/GlobalStyles.scss"
import 'react-tooltip/dist/react-tooltip.css'
import './i18n/config';
function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  )
}

export default App
