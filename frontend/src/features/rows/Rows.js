import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFiles, getStatus, getError, fetchData } from './fileSlice'
import './rows.css'

export function Rows () {
  const dispatch = useDispatch()
  const files = useSelector(getAllFiles)
  const status = useSelector(getStatus)
  const error = useSelector(getError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData())
    }
  })

  let content
  switch (status) {
    case 'loading':
      content = <tr className='loader'>Loading...</tr>
      break
    case 'succeeded':
      let rowNo = 0
      content = files.map((file, fileindex) => {
        return file.map((item, index) => {
          rowNo++
          return (
            <tr key={index}>
              <th scope='row'>{rowNo}</th>
              <td>{item.file}</td>
              <td>{item.text}</td>
              <td>{item.number}</td>
              <td>{item.hex}</td>
            </tr>
          )
        })
      })
      break
    case 'failed':
      content = <tr>{error}</tr>
      break
    default:
      content = <tr className='loader'>Default...</tr>
      break
  }

  return (
    <div>
      <table className='table table-bordered table-striped mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>File</th>
            <th scope='col'>Text</th>
            <th scope='col'>Number</th>
            <th scope='col'>Hex</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  )
}
