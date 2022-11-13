const routes = require('express').Router()
const Post = require('./../../models/post/Post.model')
const jwt = require('jsonwebtoken')

routes.get('/', async (req, res) => {
    const allpost = await Post.find()
    res.json(allpost)
})
routes.post('/', async (req, res) => {
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
        const newPost = await Post(req.body)
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

module.exports = routes