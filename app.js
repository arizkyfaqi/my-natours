const fs = require('fs');
const express = require('express');
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello From the middleware :)');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
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
      status: 'fail',
      massage: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
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
      //201 for creating new data
      res.status(201).json({
        status: 'success',
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
      status: 'fail',
      massage: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here...>'
    }
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      massage: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

app.get('/api/v1/tours', getAllTour);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', postTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

// app
//   .route('/api/v1/tours')
//   .get(getAllTour)
//   .post(postTour);

// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}..`);
});
