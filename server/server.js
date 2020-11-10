const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("../server/config/config");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user");
const app = express();
const db = config.MONGODBURI;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

/// routes

app.use("/user", userRoutes);

app.get("/", function (req, res) {
  res.send("helooo from server");
});

app.listen(PORT, function () {
  console.log(" server running on local host" + PORT);
});

mongoose.connect(
  db,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log(" connected to mongo db");
    }
  }
);
