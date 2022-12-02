const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const mongo = require("./database/mongo")
const bodyParser = require('body-parser');

const symptom = require('./controllers/routes/symptoms');

const PORT = process.env.PORT
const uri = process.env.MONGO_URL

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// connect to database
// try {
//   console.log("Connecting to mongodb...")
//   mongo.connect();
//   console.log("Connected to MongoDb!!")
// } catch (error) {
//   console.log("Failed to connect to mongo db!!!", error)
//   process.exit();
// }

//db connection      
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`API listening at http://localhost: ${PORT}!`)))
  .catch((error) => console.log(error.message));



// routes
app.get('/', (req, res) => {
  console.log('default route');
  res.send('App works!!!');
});

app.route("/apimedic/symptoms")
  .get(symptom.getSymptoms)
app.route("/apimedic/issues")
  .get(symptom.getIssues)
app.route("/apimedic/issues/:id")
  .get(symptom.getOneIssue)

module.exports = app;