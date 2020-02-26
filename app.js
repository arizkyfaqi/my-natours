const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// 1) Middleware
// 3rd-party Middleware
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello From the middleware :)");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//2) Routs Handler

//3) Routs
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// 4) Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}..`);
});
