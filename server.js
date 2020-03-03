const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

//environment variable
//1. express
// console.log(app.get('env'));
//2. Node JS
// console.log(process.env);

// 4) Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is Running on ${port}..`);
});
