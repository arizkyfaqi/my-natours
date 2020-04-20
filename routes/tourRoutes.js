const express = require('express');
const tourControllers = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourControllers.checkID);

router
  .route('/top-5-cheaps')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTour);
router.route('/monthly-plan/:year').get(tourControllers.getMonthlyPlan);

router.route('/tour-stats').get(tourControllers.getTourStats);

router
  .route('/')
  .get(authController.protect, tourControllers.getAllTour)
  .post(tourControllers.creatTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(
    authController.protect,
    authController.restricTo('admin', 'lead-guide'),
    tourControllers.deleteTour
  );

module.exports = router;
