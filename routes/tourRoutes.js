const express = require('express');
const tourControllers = require('./../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  next();
});

router
  .route('/')
  .get(tourControllers.getAllTour)
  .post(tourControllers.postTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
