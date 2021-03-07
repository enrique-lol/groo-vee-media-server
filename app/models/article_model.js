
const mongoose = require('mongoose')

// define an article
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    transform: (_doc, article) => {
      return {
        id: article._id,
        title: article.title,
        content: article.content
      }
    }
  }
})

// export that thang
module.exports = mongoose.model('Article', articleSchema)
