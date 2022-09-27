import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStatus, getError } from './fileSlice'

export function Loading () {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const error = useSelector(getError)

  return <div></div>
}
