const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const mongo = require("./database/mongo")
const bodyParser = require('body-parser');

const PORT = process.env.PORT



//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));


(async () => {
  try {
    console.log("Connecting to mongodb...")
    await mongo.connect();
  } catch (error) {
    console.log("Failed to connect to mongo db!!!", error)
    process.exit();
  }
  console.log("Connected to MongoDb!!")
  // Init global 404
  app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Not Found' });
  });

  app.listen(PORT, () => console.log(`API listening at http://localhost: ${PORT}!`))
})();



module.exports = app;