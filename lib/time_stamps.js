const User = require('../app/models/user')
const bcrypt = require('bcrypt')

const seedUser = function () {
  User.deleteOne({ email: '9e41c@f53D' })
    .then(() => bcrypt.hash('K"~#Y9F<Dx&$dceb', 10))
    .then((hash) => User.create([{ email: '9e41c@f53D', hashedPassword: hash, admin: true }]))
    .catch(err => console.log(err))
}

seedUser()
