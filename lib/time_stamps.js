const User = require('../app/models/user')
const bcrypt = require('bcrypt')

const seedUser = function () {
  User.deleteOne({ email: 'lol@lol' })
    .then(() => bcrypt.hash('theBigUh', 10))
    .then((hash) => User.create([{ email: 'lol@lol', hashedPassword: hash, admin: true }]))
    .catch(err => console.log(err))
}

seedUser()
