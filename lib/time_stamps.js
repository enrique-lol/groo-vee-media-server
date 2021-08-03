const User = require('../app/models/user')
const bcrypt = require('bcrypt')

const seedUser = function () {
  User.deleteOne({ email: '9e41c@f53E' })
    .then(() => bcrypt.hash('1902flof', 10))
    .then((hash) => User.create([{ email: '9e41c@f53E', hashedPassword: hash, admin: true }]))
    .catch(err => console.log(err))
}

seedUser()
