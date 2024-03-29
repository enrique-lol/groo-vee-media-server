// technoloogy imports
const express = require('express')
const passport = require('passport')

// import model
const Article = require('../models/article_model.js')

const customErrors = require('../../lib/custom_errors')

// define errors
const handle404 = customErrors.handle404

// define ownership
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// router
const router = express.Router()

// INDEX
// All articles
router.get('/articles', (req, res, next) => {
  Article.find()
    .then(articles => {
      const array = articles.map(article => article.toObject())
      return array.reverse()
    })
    // 200 status B)
    .then(articles => res.status(200).json({ articles: articles }))
    .catch(next)
})

// Get 14 for home

router.get('/first14', (req, res, next) => {
  Article.find()
    .then(articles => {
      const array = articles.map(article => article.toObject())
      const newArray = array.reverse()
      const response = newArray.slice(0, 14)
      console.log(response)

      return response
    })
    // 200 status B)
    .then(articles => res.status(200).json({ articles: articles }))
    .catch(next)
})
router.get('/second14', (req, res, next) => {
  Article.find()
    .then(articles => {
      const array = articles.map(article => article.toObject())
      const newArray = array.reverse()
      const response = newArray.slice(14, 25)
      console.log('================== 2nd batch ==============')
      console.log(response)

      return response
    })
    // 200 status B)
    .then(articles => res.status(200).json({ articles: articles }))
    .catch(next)
})
// Get 14 articles at a time

router.get('/next14', (req, res, next) => {
  Article.find()
    .then(articles => {
      const array = articles.map(article => article.toObject())
      const newArray = array.reverse()

      const loadCount = req.body.loadCount
      return newArray.slice((14 * (loadCount - 1)), (14 * loadCount))
    })
    // 200 status B)
    .then(articles => res.status(200).json({ articles: articles }))
    .catch(next)
})

// SHOW, or GET one by uhhhhhhhhhhh id
router.get('/articles/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then(handle404)
    // return as json or whateva
    .then(article => res.status(200).json({ article: article.toObject() }))
    .catch(next)
})
// Get many
router.get('/select-articles', (req, res, next) => {
  console.log(req.body)
  const dataArray = req.params.array
  // console.log(`reqbodyarray === ${req}`)
  dataArray.forEach(() => {
    console.log(Article.findById(req.params.id))
  })
    // .then(handle404)
    .then(() => res.sendStatus(204))
    .catch(next)
})
// Get many
// router.get('/articles', (req, res, next) => {
//   Article.find()
//     .then(articles => {
//       const array = articles.map(article => article.toObject())
//       return array.reverse()
//     })
//     // 200 status B)
//     .then(articles => res.status(200).json({ articles: articles }))
//     .catch(next)
// })

// POST to /articles
router.post('/articles', requireToken, (req, res, next) => {
  // owner = user.id
  req.body.article.owner = req.user._id

  // model method
  Article.create(req.body.article)
    .then(savedArticle => {
      res.status(201).json({ savedArticle: savedArticle.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /articles/5a7db6c74d55bc51bdf39793
router.patch('/articles/:id', requireToken, removeBlanks, (req, res, next) => {
// removeBlanks prevents updating with empty strings or params, one of the 2, probably params
  Article.findById(req.params.id)
    .then(handle404)
    .then(article => {
      requireOwnership(req, article)

      // update actual
      return article.updateOne(req.body.article)
    })
    // 204 is no content
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Delete by id, will be passed as a prop in react or something
router.delete('/articles/:id', requireToken, (req, res, next) => {
  Article.findById(req.params.id)
    .then(handle404)
    .then(article => {
      // must be owner of articel to update
      requireOwnership(req, article)
      article.deleteOne()
    })
    // no content for deleting either
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
