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
    userId: {
        type: 'ObjectId',
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Post', PostSchema)