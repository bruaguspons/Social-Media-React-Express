const Post = require('./../../../models/post/Post.model')

const getLikes = async (req, res) => {
    const { arrLikes, postId } = req.body
    console.log(arrLikes, postId)
    const post = await Post.findByIdAndUpdate(postId, { likes: arrLikes })
    return res.json(post.likes)

}

module.exports = getLikes