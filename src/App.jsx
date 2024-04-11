
import './App.css';
import Gateway from './gateway';
import Register from './registerapi';
import { BrowserRouter as   Router ,Route, Routes } from 'react-router-dom'

function App() {
      
  return (
    <div>
             <Router>
                       <Routes>
                         <Route path='/' element={<Gateway></Gateway>} />
                         <Route path='/register' element={<Register></Register>} />
                       </Routes>
             </Router>
    </div>
  )

}

export default App;