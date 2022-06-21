// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

// define routes
router.post("/", (req, res) => {
  res.send("Ok");
});

module.exports = router;
