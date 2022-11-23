const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ServerApiVersion = mongo.ServerApiVersion;

const uri = process.env.MONGO_URL



const client = new MongoClient(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  });
const database = client.db();

module.exports = client, database;