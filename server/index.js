const express = require('express')
const { connect } = require('mongoose')
require('dotenv').config()
const routesUser = require('./routes/userRoutes/user.routes')
const routesPost = require('./routes/post/post.routes')
const routesComment = require('./routes/comments/comments.routes')
var cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
// app.use(express.bodyParser());


app.use('/user', routesUser)
app.use('/post', routesPost)
app.use('/comment', routesComment)

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SocialMedia'
connect(MONGODB_URL)
    .then(() => app.listen(PORT, () => console.log(`server on port: ${PORT}`)))
    .catch(err => console.log(err))