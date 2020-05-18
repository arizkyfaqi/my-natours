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
    reviewController.setUserTourId,
    reviewController.createReview
  )
  .get(reviewController.getAllReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
