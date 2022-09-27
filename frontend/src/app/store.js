import { configureStore } from '@reduxjs/toolkit'
import filesReducer from '../features/rows/fileSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer
  }
})
