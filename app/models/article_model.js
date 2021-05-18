
const mongoose = require('mongoose')

// define an article
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  img2: {
    type: String,
    required: false
  },
  heading2: {
    type: String,
    required: false
  },
  paragraph2: {
    type: String,
    required: false
  },
  img3: {
    type: String,
    required: false
  },
  heading3: {
    type: String,
    required: false
  },
  paragraph3: {
    type: String,
    required: false
  },
  img4: {
    type: String,
    required: false
  },
  heading4: {
    type: String,
    required: false
  },
  paragraph4: {
    type: String,
    required: false
  },
  authorName: {
    type: String,
    required: true
  },
  mainImageUrl: {
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
        intro: article.intro,
        img2: article.img2,
        heading2: article.heading2,
        paragraph2: article.paragraph2,
        img3: article.img3,
        heading3: article.heading3,
        paragraph3: article.paragraph3,
        img4: article.img4,
        heading4: article.heading4,
        paragraph4: article.paragraph4,
        authorName: article.authorName,
        mainImageUrl: article.mainImageUrl
      }
    }
  }
})

// export that thang
module.exports = mongoose.model('Article', articleSchema)
