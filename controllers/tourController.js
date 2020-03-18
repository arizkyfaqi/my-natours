const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid!'
    });
  }
};

exports.getTour = (req, res) => {
  //change data type id to int
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  // // if (id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     massage: 'Invalid ID'
  //   });
  // }

  res.status(200).json({
    // status: 'success',
    // data: {
    //   tour
    // }
  });
};

exports.creatTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
