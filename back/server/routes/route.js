// import dependencies and initialize the express router
const express = require("express");
const router = express.Router();

//Activities
const {
  registerActivity,
  getAllActivities,
  getActivityDetails,
} = require("../useCases/postsController/posts");

router.post("/registerActivity", registerActivity);
router.get("/getAllActivities", getAllActivities);
router.post("/getActivityDetails", getActivityDetails);

//Accounts
const {
  registerAccount,
  getAccount,
  getAccounts,
} = require("../useCases/accountsController/accounts");

router.post("/registerAccount", registerAccount);
router.post("/getAccount", getAccount);
router.get("/getAccounts", getAccounts);

module.exports = router;
