import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Hero/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App
