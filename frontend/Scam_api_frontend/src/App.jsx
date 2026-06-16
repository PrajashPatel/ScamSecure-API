
import {NavLink, Route, Routes} from 'react-router-dom'
import './App.css'
import UrlChecker from './UrlChecker'


function App() {
  return (
    <>
    <div className='nav-bar'>
      <ul className='nav-links'>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/check/url">URL Checker</NavLink></li>
      </ul>
    </div>
    <Routes>
      <Route path = '/' element={<h1>Welcome to the Scam Protection API</h1>} />
      <Route path = '/check/url' element={<UrlChecker />} />
    </Routes>
    
    </>
  )
}

export default App;
