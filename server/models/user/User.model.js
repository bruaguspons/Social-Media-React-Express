const { Schema, model } = require('mongoose')
const userSchema = Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    versionKey: false
})

// userSchema.pre('save', async function save(next) {
//     // if (!this.isModified('password')) return next();
//     try {

//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = model('User', userSchema)