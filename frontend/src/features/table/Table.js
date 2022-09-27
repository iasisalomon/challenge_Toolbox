import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFiles, getStatus, fetchData } from '../tableContainer/fileSlice'
import './rows.css'

export function Table () {
  const dispatch = useDispatch()
  const files = useSelector(getAllFiles)
  const status = useSelector(getStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData())
    }
  })

  let content = []
  if (status === 'succeeded') {
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
