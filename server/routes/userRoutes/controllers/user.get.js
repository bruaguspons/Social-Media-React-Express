const User = require('./../../../models/user/User.model')

const getUser = async (req, res) => {
    const user = await User.findById(req.body.id)
    // const user = await User.find()
    res.json(user)
}

module.exports = getUser