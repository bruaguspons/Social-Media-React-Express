const routes = require('express').Router()
const getPost = require('./controllers/post.get')
const new_post = require('./controllers/post.post')
const getLikes = require('./controllers/post.put')
const deletePost = require('./controllers/post.delete')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

routes.get('/', getPost)

routes.post('/', upload.single('file'), new_post)

routes.delete('/', deletePost)

routes.put('/likes', getLikes)

module.exports = routes