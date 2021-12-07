const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const config = require("../config");
const jwt  = require("jsonwebtoken");

//Registering User
exports.registerUser =  async(req,res) => {
    const {username,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const user = await User.create({
            username,
            email,
            password: hashPassword
        });
        let token = jwt.sign({username:req.body.username},config.key,{
            expiresIn: "1h"
        })
        res.status(200).json({
            msg:"User SignedUp",
            data:{
                user:{
                    username,
                    token
                }
            }
        })
    } catch (error) {
        res.status(400).json({
            msg:"SigneUp Failed!!"
        })
        console.log(error);
    }
    
}

//Loging USer
exports.loginUser = async(req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    try {
        if(!user){
            return res.status(404).json(
                {
                    status:"Login Failed!!",    
                    msg: "User not found"
                }
            )
        }
    
        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect){
            let token  = jwt.sign({username:req.body.username}, config.key, {
                expiresIn: "1h"
            })
            res.status(200).json({
                token: token,
                msg:"Login Success"
            })
        } else {
            res.status(400).json({
                status: "Failed",
                msg: "Incorrect username or password"
            })
        }

       
    }
    catch{
        res.status(500).send();
    }
   
}

//Updating User
exports.updateUser = async(req,res) => {
    const user = await User.findOne({username: req.decoded.username});
    try{
             User.updateOne(
                 user,
                {$set: {email: req.body.email}}
                ,(err,result) => {
                if(err) res.status(500).json({msg:err})
                return res.status(200).json({msg:"Data updated succesfully"})
            })
    }
    catch(err){
        res.status(500).json({msg:err});
        console.error(err);
    }
}

//Deletig USer
exports.deleteUser = async(req,res) => {
    const user = await User.findOne({username: req.decoded.username});

    try{
        User.deleteOne(user,(err,result) => {
        if(err) res.json({msg:err})
        else res.status(200).json({msg:"Record Deleted!!"})
    })

    }

catch(error){
    res.json({
        msg:error
    })
    console.error(error);
}
}