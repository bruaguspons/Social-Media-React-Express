const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../../models/user/User.model')
const routes = Router()

routes.post('/login', async (req, res) => {
    try {
        // const user = await User.find()
        // return res.json(user)
        const { body } = req
        const { email, password } = body
        const user = await User.findOne({ email })
        const passwoedCorrect = user === null ? false : await bcrypt.compare(password, user.password)
        console.log(passwoedCorrect)
        if (!user || !passwoedCorrect) {
            return res.status(401).json({
                error: 'invalid user or password'
            })
        }

        const userForTOken = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(userForTOken, process.env.SECRET_KEY ?? '123')

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})
routes.post('/', async (req, res) => {
    try {
        let { password } = req.body
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const newUser = await User({ ...req.body, password })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


module.exports = routes