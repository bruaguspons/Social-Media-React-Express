const { faker } = require('@faker-js/faker');
const { connect, connection } = require('mongoose')

const User = require('./models/user/User.model');
const Post = require('./models/post/Post.model');

// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SocialMedia'


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SocialMedia'

const makeData = async () => {
    await connect(MONGODB_URL)
    const users = []
    for (let i = 0; i < 10; i++) {
        const name = faker.name.firstName(i % 2 == 0 ? 'female' : 'male')
        const user = await User({ name: name, email: faker.internet.email(name), password: faker.internet.password(20), url: faker.image.avatar() })
        await user.save()
        users.push(user)
        console.log(user)
    }
    for (let i = 0; i < 10; i++) {
        const likes = []
        for (let j = 0; j < 5; j++) {
            const index = Math.round(Math.random())
            if (index) {
                likes.push(users[j])
            }
        }
        const post = await Post({ userId: users[i]._id, title: faker.lorem.words(5), content: faker.lorem.text(), url: faker.image.nature(640, 480, true), userInfo: [users[i].name, users[i].email, users[i].url], likes: likes })
        await post.save()
        console.log(post)
    }
    await connection.close()
}
makeData()