const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const healthApi = require('./controllers/routes/healthApiRoutes');
const userApi = require("./controllers/routes/userRoutes")

const PORT = process.env.PORT
const uri = process.env.MONGO_URL

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


//db connection      
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Connected to mongoDb!')
  }
})
  .catch((error) => console.log(error.message));



// routes
app.get('/', (req, res) => {
  console.log('default route');
  res.send('App works!!!');
});

app.use('/healthapi', healthApi);
app.use('/userapi', userApi);

// Handle undefined and other routes
app.get('*', (req, res) => {
  res.send('Route not defined!!');
});
app.listen(PORT, () => console.log(`API listening at http://localhost:${PORT}!`))

module.exports = app;