const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/db/dbconnect");

const { notFound, errorHandler } = require("./middlewares/ErrHandler");

const cannafieldRouter = require("./routes/cannafieldRouter");

require("dotenv/config");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//mongoDB connect
dbconnect();

app.use("/api/cannafield/", cannafieldRouter);

app.get("/", (req, res) => {
  res.status(202).json({ msg: "Hello world" });
});

// Handling Error
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
