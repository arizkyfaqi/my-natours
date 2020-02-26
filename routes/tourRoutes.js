const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
  //change data type id to int
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      massage: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
};

const postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  //combain new data with newId
  const newTour = Object.assign({ id: newId }, req.body);

  //put newTour into tours
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    //parse tours to string
    JSON.stringify(tours),
    err => {
      //201 for creating newId
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour
        }
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      massage: "Invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Update tour here...>"
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      massage: "Invalid ID"
    });
  }

  res.status(204).json({
    status: "success",
    data: null
  });
};

const router = express.Router();

router
  .route("/")
  .get(getAllTour)
  .post(postTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
