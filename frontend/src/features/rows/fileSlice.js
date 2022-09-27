import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await axios.get('http://localhost:4040/files/data')
    console.log('fired')
    console.log(response.data)
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
        state.files = state.files.concat(action.payload)
        console.log('this is the state');
        console.log(state.files)
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
