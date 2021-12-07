const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const middleware = require("../middlewares/middleware");
const profileController = require("../controllers/profileController");  

router.route("/addProfile").post(middleware.checkToken, profileController.profile)
router.route("/getProfile").get(middleware.checkToken, profileController.getProfle);
router.route("/deleteProfile").delete(middleware.checkToken, profileController.deleteProfile);
router.route("/updateProfile").patch(middleware.checkToken, profileController.updateProfile);
    router.route("/getAllProfiles").get(profileController.getAllProfiles);


module.exports = router;