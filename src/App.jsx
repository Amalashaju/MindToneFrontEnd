
import { MdDelete } from 'react-icons/md'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path="/register" element={<Auth register />}/>
      <Route path='/login' element={<Auth/>} />
      <Route path='/home-page' element={<HomePage/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
