const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/corsOptions");

const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

const { logger } = require("./middleware/logger");

//middleware
app.use(logger);
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

//serve file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

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
app.listen(3500, () => {
  console.log(`Server is running in ${PORT}`);
});
