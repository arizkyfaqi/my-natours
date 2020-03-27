const express = require('express');
const tourControllers = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourControllers.checkID);

router
  .route('/top-5-cheaps')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTour);

router
  .route('/')
  .get(tourControllers.getAllTour)
  .post(tourControllers.creatTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
