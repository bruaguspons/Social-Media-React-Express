const Post = require('./../../../models/post/Post.model')

const getPost = async (req, res) => {
    if (!req.query.word) {
        const allpost = await Post.find().sort([['updatedAt', -1]])
        return res.json(allpost)
    }
    const postWord = await Post.find({ "userInfo.0": { $regex: '\w*' + req.query.word + '\w*', $options: 'i' } }).sort([['updatedAt', -1]])
    return res.json(postWord)
}

module.exports = getPost