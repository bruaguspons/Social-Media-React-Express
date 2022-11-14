const { faker } = require('@faker-js/faker');
const { connect, connection } = require('mongoose')

const User = require('./models/user/User.model');
const Post = require('./models/post/Post.model');

// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SocialMedia'


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SocialMedia'

const makeData = async () => {
    await connect(MONGODB_URL)

    for (let i = 0; i < 10; i++) {
        const name = faker.name.firstName(i % 2 == 0 ? 'female' : 'male')
        const user = await User({ name: name, email: faker.internet.email(name), password: faker.internet.password(20), url: faker.image.avatar() })
        await user.save()
        console.log(user)
        const post = await Post({ userId: user._id, title: faker.lorem.words(5), content: faker.lorem.text(), url: faker.image.nature(640, 480, true), userInfo: [user.name, user.email, user.url] })
        await post.save()
        console.log(post)
    }
    // await connection.close()
}
makeData()