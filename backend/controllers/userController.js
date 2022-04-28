const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

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

  // Find if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    response.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    response.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    response.status(401)
    throw new Error('Invalid Credentials')
  }
})

module.exports = {
  registerUser,
  loginUser,
}
