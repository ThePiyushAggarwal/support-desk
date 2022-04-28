const asyncHandler = require('express-async-handler')

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body

  // Validation
  if (!name || !email || !password) {
    response.status(400)
    throw new Error('Please include all the fields')
  }

  response.send('Register route')
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (request, response) => {
  response.send('Login route')
})

module.exports = {
  registerUser,
  loginUser,
}
