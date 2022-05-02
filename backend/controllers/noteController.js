const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

// @desc Get notes for user's Ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (request, response) => {
  // Get user using the id in the JWT
  const user = await User.findById(request.user.id)

  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(request.params.ticketId)

  if (ticket.user.toString() !== request.user.id) {
    response.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ ticket: request.params.ticketId })

  response.status(200).json(notes)
})

// @desc create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (request, response) => {
  // Get user using the id in the JWT
  const user = await User.findById(request.user.id)

  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(request.params.ticketId)

  if (ticket.user.toString() !== request.user.id) {
    response.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    ticket: request.params.ticketId,
    text: request.body.text,
    user: request.user.id,
  })

  response.status(200).json(note)
})

module.exports = { getNotes, addNote }
