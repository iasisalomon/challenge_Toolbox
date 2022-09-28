import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStatus, getError, getAllFiles, fetchData } from './fileSlice'
import LoadingOverlay from 'react-loading-overlay'
import DarkBackground from '../tableContainer/DarkBackground'
import './loading.css'
import './rows.css'

LoadingOverlay.propTypes = undefined

export function TableContainer () {
  const dispatch = useDispatch()
  const files = useSelector(getAllFiles)
  const status = useSelector(getStatus)
  const error = useSelector(getError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData())
    }
  })

  if (status === 'failed') {
    return (
      <div>
        <div className='alert alert-danger mt-2' role='alert'>
          <h4 className='alert-heading'>Something went wrong</h4>
          <p>{error}</p>
          <hr />
          <p className='mb-0'>
            Be sure to check everything is running correctly and try again
          </p>
        </div>
      </div>
    )
  }

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
      <DarkBackground disappear={status === 'loading'}>
        <LoadingOverlay
          className='loading-overlay'
          active={status === 'loading'}
          spinner
          text='LOADING...'
        ></LoadingOverlay>
      </DarkBackground>
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
    </div>
  )
}
