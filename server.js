require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/corsOptions");

const { errorHandler } = require("./middleware/errorHandler");

const { logger } = require("./middleware/logger");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

//connection
connectDB();
//middleware
app.use(logger);
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//serve file
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refreshToken"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT); //the jwt will be verified then it will be able to access employees
app.use("/employees", require("./routes/api/employees"));
app.use("/user", require("./routes/api/user"));

//404 page not found
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("text").send("404 not found");
  }
});

//error handling
app.use(errorHandler);

//listen in port
mongoose.connection.once("open", () => {
  console.log("connection to mongoDB");
  app.listen(3500, () => {
    console.log(`Server is running in ${PORT}`);
  });
});
