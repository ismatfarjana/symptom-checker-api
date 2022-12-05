const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const mongo = require("./database/mongo")
const bodyParser = require('body-parser');

const healthApi = require('./controllers/routes/healthApi');

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

app.route("/apimedic/symptoms")
  .get(healthApi.getSymptoms)
app.route("/apimedic/issues")
  .get(healthApi.getIssues)
app.route("/apimedic/issues/:id") // required: issue id
  .get(healthApi.getOneIssue)
app.route("/apimedic/diagnosis") // required: symptoms ids, gender, year of birth
  .get(healthApi.getDiagnosis)
app.route("/apimedic/diagnosis/specialisations") // required: symptoms ids, gender, year of birth
  .get(healthApi.getSpecialisations)
app.route("/apimedic/symptoms/proposed") // required: symptoms ids, gender, year of birth
  .get(healthApi.getProposedSymptoms)
app.route("/apimedic/locations")
  .get(healthApi.getBodyLocations)
app.route("/apimedic/locations/:id") // required: id
  .get(healthApi.getOneLocation)
app.route("/apimedic/body/symptoms") // required: location id, gender
  .get(healthApi.getBodySymptoms)


// Handle undefined and other routes
app.get('*', (req, res) => {
  res.send('Route not defined!!');
});


app.listen(PORT, () => console.log(`API listening at http://localhost:${PORT}!`))

module.exports = app;