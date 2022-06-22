// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

const {
  registerActivity,
  getAllActivities,
} = require("../useCases/postsController/posts");

// define routes
router.post("/registerActivity", registerActivity);
router.get("/getAllActivities", getAllActivities);

module.exports = router;
