const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  savedArtIds: [String],
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
