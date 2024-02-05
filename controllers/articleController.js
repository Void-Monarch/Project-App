const Article = require('../models/articleModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const fs = require('fs');

exports.findAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const articles = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      data: articles,
    },
  });
});

exports.insertData = catchAsync(async (req, res) => {
  const articleNew = await Article.create({
    author: req.user._id,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    number_of_likes: req.body.likes || 0,
    number_of_comments: req.body.comments || 0,
  });
  //   Send response
  res.status(201).json({
    status: 'success',
    data: {
      data: articleNew,
    },
  });
});