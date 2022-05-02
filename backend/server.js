const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require('path')

// Connect to database
connectDB()

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, response) => {
    response.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      // path.join(__dirname, '../frontend/build/index.html')
    )
  })
} else {
  app.get('/', (_, response) => {
    response.json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on ${PORT}`))
