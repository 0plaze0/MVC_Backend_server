const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get("/status(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "status.html"));
});

module.exports = router;
