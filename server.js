const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

const { logger } = require("./middleware/logger");

//middleware
app.use(logger);

app.listen(3500, () => {
  console.log(`Server is running in ${PORT}`);
});
