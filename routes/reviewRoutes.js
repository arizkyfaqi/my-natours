const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

//Merge Params : for access params of their specific routes
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restricTo('user'),
    reviewController.addReview
  )
  .get(reviewController.getAllReview);

module.exports = router;
