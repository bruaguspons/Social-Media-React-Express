const routes = require('express').Router()
const getUser = require('./controllers/user.get')
const { postUser, postLogin } = require('./controllers/user.post')

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

routes.get('/', getUser)

routes.post('/login', postLogin)
routes.post('/', upload.single('file'), postUser)


module.exports = routes