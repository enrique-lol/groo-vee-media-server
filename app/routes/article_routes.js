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
// GET /articles
router.get('/articles', requireToken, (req, res, next) => {
  Article.find()
    .then(articles => {
      return articles.map(article => article.toObject())
    })
    // 200 status B)
    .then(articles => res.status(200).json({ articles: articles }))
    .catch(next)
})

// SHOW, or GET one by uhhhhhhhhhhh id
router.get('/articles/:id', requireToken, (req, res, next) => {
  Article.findById(req.params.id)
    .then(handle404)
    // return as json or whateva
    .then(article => res.status(200).json({ article: article.toObject() }))
    .catch(next)
})

// POST to /articles
router.post('/articles', requireToken, (req, res, next) => {
  // owner = user.id
  req.body.article.owner = req.user.id

  // model method
  Article.create(req.body.article)
    .then(article => {
      res.status(201).json({ article: article.toObject() })
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
