import { useState } from 'react'

import './App.css'
import Footer from './components/Footer'
import Library from './components/Library'

function App() {
  

  return (
    <div className='app-container'>
      <div className="title-container">
        <h1>Silkamo Library</h1>
      </div>
      
      <button className='add-btn'>Add Book</button>
      <Library />
      <Footer />
    </div>
  )
}

export default App
