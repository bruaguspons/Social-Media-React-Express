const routes = require('express').Router()
const Post = require('./../../models/post/Post.model')
const User = require('./../../models/user/User.model')
const jwt = require('jsonwebtoken')

const multer = require('multer')
const { request } = require('express')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })
// const storageBuff = multer.memoryStorage()
routes.get('/', async (req, res) => {
    if (!req.query.word) {
        const allpost = await Post.find().sort([['updatedAt', -1]])
        return res.json(allpost)
    }
    const postWord = await Post.find({ "userInfo.0": { $regex: '\w*' + req.query.word + '\w*', $options: 'i' } }).sort([['updatedAt', -1]])
    return res.json(postWord)
})


routes.post('/', upload.single('file'), async (req, res) => {
    try {
        const data = JSON.parse(req.body.content)

        let authorization = req.get('Autherization')
        authorization &&= authorization.split(' ')
        let token = null
        let decodedToken = null
        if (authorization?.length && authorization[0].toLowerCase() === 'bearer') {
            token = authorization[1]
            decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? '123')
        }

        if (!token || !decodedToken.id || decodedToken.id != data.userId) {
            return res.status(401).json({ 'error': 'token missing or invalid' })
        }
        const user = await User.findById(data.userId)
        console.log(data.userId)
        console.log(user.name)
        const urlUser = user.url ?? ''
        const newPost = await Post({ ...data, userInfo: [user.name, user.email, urlUser], url: `http://localhost:8000/${req.file.path}` })
        await newPost.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})
routes.delete('/', async (req, res) => {
    try {
        let authorization = req.get('Autherization')
        authorization &&= authorization.split(' ')
        let token = null
        let decodedToken = null
        if (authorization?.length && authorization[0].toLowerCase() === 'bearer') {
            token = authorization[1]
            decodedToken = jwt.verify(token, process.env.SECRET_KEY ?? '123')
        }

        if (!token || !decodedToken.id || decodedToken.id != req.body.userId) {
            return res.status(401).json({ 'error': 'token missing or invalid' })
        }
        const post = await Post.findByIdAndDelete(req.body.id)
        return res.status(204)

    } catch (error) {
        return res.status(400).json(error.message)
    }
})

routes.put('/likes', async (req, res) => {
    const { arrLikes, postId } = req.body
    console.log(arrLikes, postId)
    const post = await Post.findByIdAndUpdate(postId, { likes: arrLikes })
    return res.json(post.likes)

})

module.exports = routes