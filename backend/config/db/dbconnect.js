const mongoose = require("mongoose");
require("dotenv/config");

const dbconnect = () => {
  const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose
    .connect(process.env.MONGO_URL, dbOptions)
    .then(() => console.log("mongoDB Connected!"))
    .catch((err) => console.log(err));
};

module.exports = dbconnect;
