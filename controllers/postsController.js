const express = require("express");
const router = express.Router();
const Post = require("../model/postModel");
const User  = require("../model/userModel");
const multer = require("multer");
const path = require("path");

exports.createPost =async(req,res,next) => {
    const post = new Post({
        username: req.decoded.username,
        title: req.body.title,
        body: req.body.body,
    });
     await post.save()
     .then(() =>{   
        console.log("Post Added Succesfully");
        res.json({msg:"Posted Successful"})
   })
     .catch(err => console.error(err))
}


exports.getPosts = async(req,res,next) => {
    const post = await Post.find();
    if(!post){
        res.status(404).json({
            msg:"No Posts"
        })
    }
    res.status(200).json({
        body:{
            post
        }
    })
}

//get all posts of parrtcular username
exports.getAll = (req,res,next) => {
        Post.find({username: req.decoded.username},(err,result) => {
        if(err) res.json({msg:err})
        if(result == null) res.json({data:[]})
        else {
            res.json({
                status:"Success",
                body:{
                    result
                }
            })
        }
    })
}

//Get Others Blog POsts
exports.getOthersPosts = (req, res,next) => {
    Post.find({username: {$ne :req.decoded.username}},(err,result) => {
        if(err) res.json({msg:err})
        if(result == null) res.json({data:[]})
        else {
            res.json({
                status:"Success",
                body:{
                    result
                }
            })
        }
    }
    )
}
// exports. =(req,res,next) => {
//      Post.find({},(err,users) => {
//         if(err){
//             res.send("Something went wrong!!");
//         }
//         res.json(users);
//     });
// }

//  =(req,res,next) => {
//     try {
//         Post.findOne({title: req.params.title}, (err,post) => {
//             if(!post) res.send("There is no post with that title yet!!")
//             res.status(200).json(post);
//         });
        
//     } catch (error) {
//         console.log(error);
//     }
// }

//Delete post
exports.deletePost =(req,res,next) => {
    Post.findOneAndDelete(
    {
        $and:[{username: req.decoded.username}, {_id: req.params.id}],
    },
    (err,result) => {
        if(err) res.json({msg:err});
        else if(result){
        console.log(result);
        return res.json({msg:"POst Deleted!!"})
        }
        return res.json({msg:"Post Not Deleted"})
    })
}

//Update post
exports.updatePost =(req,res,next) => {

    Post.findOneAndUpdate({username:req.decoded.username, _id: req.params.id},{
        $set: {
            title: req.body.title,
            body: req.body.body
        }
    },
    {new: true},
    (err, result) => {
        if(err) res.json({msg:err})
        return res.status(200).json({msg:"Post Updated Succcessfullt"})
    }
    )
        
}



