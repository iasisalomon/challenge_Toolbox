import { configureStore } from '@reduxjs/toolkit'
import filesReducer from '../features/tableContainer/fileSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer
  }
})
