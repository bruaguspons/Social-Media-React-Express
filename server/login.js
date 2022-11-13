const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logingRouter = require('express').Router()
const User = require('./models/user/User.model')

logingRouter.post('/', (req, res) => {
    const { body } = req
    const { name, password } = body
    const user = User.findOne({ name })

    const passwoedCorrect = user === null ? false : bcrypt.compare(password, user.password)

    if (!(user && passwoedCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForTOken = {
        id: user._id,
        email: user.email
    }

    const token = jwt.sign(userForTOken, process.env.SECRET_KEY ?? '123')

    res.json({
        name: user.name,
        email: user.email,
        token
    })
})