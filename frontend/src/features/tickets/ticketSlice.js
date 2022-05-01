import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ticketService } from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all tickets for the user
export const getTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get SINGLE ticket
export const getTicket = createAsyncThunk(
  'tickets/getSingle',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Close ticket
export const closeTicket = createAsyncThunk(
  'tickets/close',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = payload
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = payload
      })
      .addCase(getTicket.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
      // .addCase(closeTicket.pending, (state) => {
      //   state.isLoading = true
      // })
      .addCase(closeTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.tickets.map((ticket) => {
          return ticket._id === payload._id
            ? (ticket.status = 'closed')
            : ticket
        })
      })
    // .addCase(closeTicket.rejected, (state, { payload }) => {
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = payload
    // })
  },
})

export const { reset } = ticketSlice.actions

export default ticketSlice.reducer
