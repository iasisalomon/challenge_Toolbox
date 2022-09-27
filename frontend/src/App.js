import React from 'react'
import { TableContainer } from './features/tableContainer/TableContainer'
import { Header } from './features/header/Header'

function App () {
  return (
    <div className='App'>
      <div className='container-fluid'>
        <Header />
      </div>
      <div className='container'>
        <TableContainer />
      </div>
    </div>
  )
}

export default App
