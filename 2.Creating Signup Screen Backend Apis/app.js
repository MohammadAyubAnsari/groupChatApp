const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequalize = require("./util/database");
const errorController = require("./controllers/error");

const app = express();
app.use(
  cors({
    origin: " http://127.0.0.1:5500",
    credentials: true,
  })
);
//app.use(express.static('public'));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const signupRoutes = require("./routes/user");

app.use("/user", signupRoutes);

app.put("/data", (req, res) => {
  res.status(201).json({ name: "Ayub", email: "mdayubansari2014@gmail.com" });
});

app.use(errorController.get404);

// {force : true}

sequalize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
