const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const connect = require('./config/db')
const cors = require('cors')
require('dotenv').config()
const passport = require('passport')
require('./config/passport')

const authRoutes = require('./routes/auth.routes')
const menuRoutes = require('./routes/menu.routes')
const bookingRoutes = require('./routes/booking.routes')
const commentRoutes = require('./routes/comment.routes')
const blogRoutes = require('./routes/blog.routes')
const google = require('./routes/google.routes')
const adminRoutes = require('./routes/admin.routes')

connect()

const path = require('path')
const fs = require('fs')

// Ensure uploads directory exists on host (e.g. Render)
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(passport.initialize())
app.use('/uploads', express.static(uploadsDir))

// Root health check route for hosting / monitoring
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Coffee Shop Backend API is running' })
})

app.use('/auth', authRoutes)
app.use('/menu', menuRoutes)
app.use('/booking', bookingRoutes)
app.use('/comment', commentRoutes)
app.use('/blog', blogRoutes)
app.use('/admin', adminRoutes)
app.use('/', google)

const PORT = process.env.PORT || 1000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
