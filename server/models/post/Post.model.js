const { Schema, model } = require('mongoose')

const PostSchema = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        // require: true
    },
    url: String,
    userId: {
        type: 'ObjectId',
        require: true
    },
    userInfo: [String]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Post', PostSchema)