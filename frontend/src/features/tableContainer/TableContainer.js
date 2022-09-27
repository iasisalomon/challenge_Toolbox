import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStatus, getError } from './fileSlice'

import { Table } from '../table/Table'

export function TableContainer () {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const error = useSelector(getError)

  return (
    <div>
      <Table />
    </div>
  )
}
