import axios from 'axios'

const API_URL = 'http://localhost:8000/api/tickets/'

// Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + ticketId + '/notes', config)
  return response.data
}

// create ticket note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + ticketId + '/notes',
    {
      text: noteText,
    },
    config
  )
  return response.data
}

export const noteService = {
  getNotes,
  createNote,
}
