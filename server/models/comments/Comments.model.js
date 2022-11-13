const { Schema, model } = require('mongoose')

const CommentSchema = Schema({
    content: {
        type: String,
        require: true
    },
    userId: {
        type: 'ObjectId',
        require: true
    },
    postid: {
        type: 'ObjectId',
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Comment', CommentSchema)