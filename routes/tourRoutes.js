const express = require('express');
const tourControllers = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouts = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourControllers.checkID);

// nested routs for review
// POST tours/nc983ndej/reviews
// GET tours/nc983ndej/reviews

router.use('/:tourId/reviews', reviewRouts);

router
  .route('/top-5-cheaps')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTour);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restricTo('admin', 'lead-guide', 'guide'),
    tourControllers.getMonthlyPlan
  );

router.route('/tour-stats').get(tourControllers.getTourStats);

router
  .route('/')
  .get(tourControllers.getAllTour)
  .post(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourControllers.creatTour
  );

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourControllers.uploadTourImages,
    tourControllers.resizeTourImages,
    tourControllers.updateTour
  )
  .delete(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourControllers.deleteTour
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourControllers.getTourWithin);

router.route('/distances/:latlng/unit/:unit').get(tourControllers.getDistances);

module.exports = router;
