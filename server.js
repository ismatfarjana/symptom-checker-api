const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const url = process.env.MONGO_URL
const PORT = process.env.PORT



//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}!`))

module.exports = app;