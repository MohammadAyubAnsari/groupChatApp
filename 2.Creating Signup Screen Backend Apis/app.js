const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequalize = require("./util/database");
const errorController = require("./controllers/error");
const app = express();
const User = require("./models/user");
const ForgotPassword = require("./models/forgotPassword");

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
const forgotPasswordRoutes = require("./routes/forgotPassword");

app.use("/user", signupRoutes);
app.use("/password", forgotPasswordRoutes);

// app.put("/data", (req, res) => {
//   res.status(201).json({ name: "Ayub", email: "mdayubansari2014@gmail.com" });
// });

app.use(errorController.get404);

// {force : true}
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

sequalize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
