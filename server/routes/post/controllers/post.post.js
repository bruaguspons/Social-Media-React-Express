const Post = require('./../../../models/post/Post.model')
const User = require('./../../../models/user/User.model')
const jwt = require('jsonwebtoken')
const new_post = async (req, res) => {
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
}

module.exports = new_post