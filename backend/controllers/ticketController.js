const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get current user's Tickets
// @route /api/tickets
// @access Private
const getTickets = asyncHandler(async (request, response) => {
  // Get user using the id in the JWT
  const user = await User.findById(request.user.id)

  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: request.user.id })

  response.status(200).json(tickets)
})

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (request, response) => {
  const { product, description } = request.body

  if (!product || !description) {
    response.status(400)
    throw new Error('Please add a product and description')
  }

  // Get user using the id in the JWT
  const user = await User.findById(request.user.id)

  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: request.user.id,
  })

  response.status(201).json(ticket)
})

module.exports = {
  getTickets,
  createTicket,
}
