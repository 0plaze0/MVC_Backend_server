const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

const { logger } = require("./middleware/logger");

//middleware
app.use(logger);
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3500, () => {
  console.log(`Server is running in ${PORT}`);
});
