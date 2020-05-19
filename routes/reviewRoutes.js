const express = require('express');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

//Merge Params : for access params of their specific routes
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restricTo('user'),
    reviewController.setUserTourId,
    reviewController.createReview
  )
  .get(reviewController.getAllReview);

router
  .route('/:id')
  .get(reviewController.getOneReview)
  .patch(
    authController.restricTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restricTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
