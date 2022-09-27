import React from 'react'
import { Rows } from './features/rows/Rows'
import { Header } from './features/header/Header'

function App () {
  return (
    <div className='App'>
      <div className='container-fluid'>
        <Header />
      </div>
      <div className='container'>
        <Rows />
      </div>
    </div>
  )
}

export default App
