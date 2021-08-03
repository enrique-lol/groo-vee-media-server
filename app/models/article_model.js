
const mongoose = require('mongoose')

// define an article
const articleSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  publishDate: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  intro2: {
    type: String,
    required: false
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
  img5: {
    type: String,
    required: false
  },
  heading5: {
    type: String,
    required: false
  },
  paragraph5: {
    type: String,
    required: false
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
        thumbnail: article.thumbnail,
        title: article.title,
        summary: article.summary,
        quote: article.quote,
        authorName: article.authorName,
        publishDate: article.publishDate,
        intro: article.intro,
        intro2: article.intro2,
        img2: article.img2,
        heading2: article.heading2,
        paragraph2: article.paragraph2,
        img3: article.img3,
        heading3: article.heading3,
        paragraph3: article.paragraph3,
        img4: article.img4,
        heading4: article.heading4,
        paragraph4: article.paragraph4,
        img5: article.img5,
        heading5: article.heading5,
        paragraph5: article.paragraph5
      }
    }
  }
})

// export that thang
module.exports = mongoose.model('Article', articleSchema)
