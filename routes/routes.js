const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");
const middleware = require("../middlewares/middleware");
const Post = require("../model/postModel");

router.route("/add").post(middleware.checkToken, postController.createPost);
router.route("/delete/:id").delete(middleware.checkToken,postController.deletePost);
router.route("/update/:id").patch(middleware.checkToken,postController.updatePost);
router.route("/getPosts").get(middleware.checkToken, postController.getAll);
router.route("/getOtherPosts").get(middleware.checkToken, postController.getOthersPosts);
router.route("/get").get(postController.getPosts);


module.exports = router;