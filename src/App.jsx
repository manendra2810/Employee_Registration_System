import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='Employee_Registration_System' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
