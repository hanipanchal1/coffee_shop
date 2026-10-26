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

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:true,credentials:true}))
app.use(passport.initialize())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/auth',authRoutes)
app.use('/menu',menuRoutes)
app.use('/booking',bookingRoutes)
app.use('/comment',commentRoutes)
app.use('/blog',blogRoutes)
app.use('/admin',adminRoutes)
app.use('/',google)

app.listen(process.env.PORT,() => {
    console.log('running')
})