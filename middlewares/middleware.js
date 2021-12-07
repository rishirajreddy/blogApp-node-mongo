const jwt = require("jsonwebtoken");
const config = require("../config");

let checkToken = (req,res,next) => {
    let token = req.headers["authorization"];
    console.log(token.slice(7, token.length));
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, config.key,(err,decoded) => {
            if(err){
                res.json({
                    msg: "Invalid Token",
                    status: false
                })
            }
            else {
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    }
    else {
        res.json({
            msg:"Token is not provided"
        })
    }
}


module.exports = {checkToken: checkToken};