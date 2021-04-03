const router = require('express').Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('historyArticle', function (req, res, next, slug) {
  historyArticle.findOne({ slug: slug })
    .populate('author')
    .then(function (historyArticle) {
      if (!historyArticle) { return res.sendStatus(404); }

      req.historyArticle = historyArticle;

      return next();
    }).catch(next);
});

router.param('comment', function (req, res, next, id) {
  Comment.findById(id).then(function (comment) {
    if (!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});

router.get('/', auth.optional, function (req, res, next) {
  let query = {};
  let limit = 20;
  let offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(function (results) {
    let author = results[0];
    let favoriter = results[1];

    if (author) {
      query.author = author._id;
    }

    if (favoriter) {
      query._id = { $in: favoriter.favorites };
    } else if (req.query.favorited) {
      query._id = { $in: [] };
    }

    return Promise.all([
      historyArticle.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      historyArticle.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      let historyArticle = results[0];
      let historyArticlesCount = results[1];
      let user = results[2];

      return res.json({
        historyArticlesCount: historyArticlesCount.map(function (historyArticle) {
          return historyArticle.toJSONFor(user);
        }),
        historyArticlesCount: historyArticlesCount
      });
    });
  }).catch(next);
});

router.get('/feed', auth.required, function (req, res, next) {
  let limit = 20;
  let offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      historyArticle.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      historyArticle.count({ author: { $in: user.following } })
    ]).then(function (results) {
      let historyArticle = results[0];
      let historyArticlesCount = results[1];

      return res.json({
        historyArticle: historyArticle.map(function (article) {
          return historyArticle.toJSONFor(user);
        }),
        historyArticlesCount: historyArticlesCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    let historyArticles = new Article(req.body.historyArticles);

    historyArticles.author = user;

    return historyArticles.save().then(function () {
      console.log(historyArticles.author);
      return res.json({ historyArticle: historyArticle.toJSONFor(user) });
    });
  }).catch(next);
});

// return a historyArticles
router.get('/:historyArticle', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.historyArticle.populate('author').execPopulate()
  ]).then(function (results) {
    let user = results[0];

    return res.json({ historyArticle: req.historyArticle.toJSONFor(user) });
  }).catch(next);
});

// update historyArticle
router.put('/:historyArticle', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.historyArticle.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.article.title !== 'undefined') {
        req.historyArticle.title = req.body.historyArticle.title;
      }

      if (typeof req.body.historyArticle.description !== 'undefined') {
        req.historyArticle.description = req.body.historyArticle.description;
      }

      if (typeof req.body.historyArticle.body !== 'undefined') {
        req.article.body = req.body.historyArticle.body;
      }

      req.historyArticle.save()
        .then(function (historyArticle) {
          return res.json({ article: historyArticle.toJSONFor(user) });
        }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete historyArticle
router.delete('/:historyArticle', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.historyArticle.author._id.toString() === req.payload.id.toString()) {
      return req.historyArticle.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an historyArticle
router.post('/:historyArticle/favorite', auth.required, function (req, res, next) {
  let historyArticleId = req.historyArticleId._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.favorite(historyArticleId).then(function () {
      return req.historyArticle.updateFavoriteCount().then(function (article) {
        return res.json({ historyArticle: historyArticle.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// Unfavorite an historyArticleId
router.delete('/:historyArticle/favorite', auth.required, function (req, res, next) {
  let historyArticleId = req.historyArticle._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(historyArticleId).then(function () {
      return req.historyArticle.updateFavoriteCount().then(function (article) {
        return res.json({ historyArticle: historyArticle.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// return an historyArticle's comments
router.get('/:historyArticle/comments', auth.optional, function (req, res, next) {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
    return req.historyArticle.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function (historyArticle) {
      return res.json({
        comments: req.historyArticle.comments.map(function (comment) {
          return comment.toJSONFor(user);
        })
      });
    });
  }).catch(next);
});

// create a new comment
router.post('/:historyArticle/comments', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    let comment = new Comment(req.body.comment);
    comment.historyArticle = req.historyArticle;
    comment.author = user;

    return comment.save().then(function () {
      req.historyArticle.comments.push(comment);

      return req.historyArticle.save().then(function (historyArticle) {
        res.json({ comment: comment.toJSONFor(user) });
      });
    });
  }).catch(next);
});

router.delete('/:historyArticle/comments/:comment', auth.required, function (req, res, next) {
  if (req.comment.author.toString() === req.payload.id.toString()) {
    req.historyArticle.comments.remove(req.comment._id);
    req.historyArticle.save()
      .then(Comment.find({ _id: req.comment._id }).remove().exec())
      .then(function () {
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
