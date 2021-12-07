const express = require("express");
const User = require("../model/userModel");
const router = express.Router();
const jwt  = require("jsonwebtoken");
const authController = require("../controllers/authController");
const middleware = require("../middlewares/middleware");

router.route("/register").post(authController.registerUser);

router.route("/login").post(authController.loginUser);

router.route("/update").patch(middleware.checkToken,authController.updateUser);

router.route("/delete").delete(middleware.checkToken,authController.deleteUser);

router.get("/",async(req,res) => {
    const users = await User.find();
    if(!users){
        res.status(500).json({
            msg:"Not found"
        })
    } else {
        res.status(200).json({
            msg:"Success",
            data:{
                users
            }
        })
    }
})
//jwt token authentication
// router.post("/log",async(req,res) => {
//     const user = {
//         username: "abd@360.com",
//         email:"dere@k.com",
//         password: "1234567"
//     };

//     jwt.sign({user: user}, "secretkey",(err,token) => {
//         console.log(user);
//         res.json({
//             token
//         })
//     })
// })

// router.post("/add",verifyToken,(req,res) => {
//     jwt.verify(req.token, "secretkey",(err, authData) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 msg: "POst created",
//                 authData
//             })
//         }
//     })
// })




// function verifyToken(req,res,next) {
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== "undefined"){
//         const bearerToken = bearerHeader.split(' ')[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }


module.exports = router;