import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { endpoints } from '../../enums/apiEndpoints'
import axios from 'axios'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  let url = null
  endpoints.DOCKER_API_URL
    ? (url = endpoints.DOCKER_API_URL)
    : (url = endpoints.LOCAL_API_URL)
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    return error.message
  }
})

const initialState = {
  files: [],
  status: 'idle',
  error: null
}

export const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        if (typeof action.payload === 'string') {
          state.error = action.payload
          state.status = 'failed'
        } else {
          state.files = state.files.concat(action.payload)
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// export const { increment, decrement, incrementByAmount } = fileSlice.actions
export const getAllFiles = state => state.files.files
export const getStatus = state => state.files.status
export const getError = state => state.files.error

export default fileSlice.reducer
