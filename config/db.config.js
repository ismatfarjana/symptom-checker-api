const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;
const dbname = process.env.NODE_ENV === 'dev' ? 'dev' : 'test'

const connect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbname,
    // useFindAndModify: true,  // not supported
    // useCreateIndex: true,  // not supported
  });

  mongoose.connection.once('open', async () => {
    console.log("Connected to MONGO DB!!")
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to database  ", err);
  });
}

const disconnect = () => {
  if (!mongoose.connection) return;
  mongoose.disconnect();
  mongoose.once("close", async () => {
    console.log("Disconnected to MONGO DB!!")
  })
}

module.exports = {
  connect, disconnect
}