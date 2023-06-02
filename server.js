const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.listen(3500, () => {
  console.log(`Server is running in ${PORT}`);
});
