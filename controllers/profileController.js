const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const Profile = require("../model/profileModel");

exports.profile = async(req,res) => {
            const profile = new Profile({
                username: req.decoded.username,
                name:req.body.name,
                profession: req.body.profession,
                bio: req.body.bio 
            });
            await profile.save({ordered: false})
            .then(() => {
                console.log(`Profile Added to username: ${req.decoded.username}`);
                res.status(200).json({
                    msg:`Profile Added to username: ${req.decoded.username}`
                })
            })
            .catch(err => console.error(err));
}

exports.getProfle = (req,res) => {
    Profile.findOne({username: req.decoded.username},(err,result) => {
        if(err) {
            res.json({
                msg:err
            })
        } 
        if(result == null){
            res.json({
                data:[]
            })
        }
        else {
            console.log(req.decoded.username);
            res.json({
                msg:"Success",
                data: result
            })
        }
    })
}

exports.deleteProfile = async(req,res) => {
    const profile = await Profile.findOne({username: req.decoded.username});
    const user = await User.findOne({username: req.decoded.username});
    // console.log(profile);
    try{
          Profile.remove(profile,user,(err,result) => {
            if(err) res.json({msg:err})
            res.status(200).json({msg: `Profile ${req.decoded.username} deleted succesffuly!!`})
        })

          User.remove(user,(err ,result) => {
            if(err) req.json({msg:err})
            return res.status(200).json({msg:`User ${req.decoded.username} deleted`})
        })
    }
    catch(err) {
        res.json({msg:err});
        console.log(err);
    };

}

exports.updateProfile = async(req,res) => {
    const user_profile =  await Profile.findOne({username: req.decoded.username})
        
    try{
        Profile.updateOne(user_profile,{
        $set:{
            name: req.body.name,
            bio: req.body.bio,
            profession: req.body.profession
        }
    },
    // {new: true},
    (err,result) => {
        if(err) return res.json({msg:err})
        if(result == null) return res.json({data:[]}); 
        else  res.status(200).json({msg:"Profile updated successfully",data:{
            result
        }})
    }
    )
}
catch(err) {
    res.json({msg:err});
}
}

exports.getAllProfiles = async(req,res,next) => {
    const profile = await Profile.find();
    if(!profile){
        res.status(404).json({
            msg:"No Posts"
        })
    }
    res.status(200).json({
        body:{
            data: profile
        }
    })
}