const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../../models/user/User.model')
const routes = Router()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

routes.get('/', async (req, res) => {
    const user = await User.findById(req.body.id)
    res.json(user)
})

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
routes.post('/', upload.single('file'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data)
        let { password } = data
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const newUser = await User({ ...data, password, url: `http://localhost:8000/${req.file.path}` })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


module.exports = routes