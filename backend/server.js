const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

app.use(cors())

// Connect to database
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to the Support Desk API' })
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on ${PORT}`))
