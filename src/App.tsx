// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Compare from './pages/Compare';
import Verdict from './graphs/Verdict';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      
      {/* <Verdict /> */}
      <BrowserRouter>
        <Navbar />
        <Routes> 
          <Route index element={<Home />} />
          <Route path='/compare' element={<Compare />} />
          
        </Routes>
      </BrowserRouter>
      {/* <Verdict /> */}
    </div>
  )
}

export default App
