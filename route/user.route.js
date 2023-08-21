const express = require("express");
const {User} = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/signup",async(req,res)=>{
    try {
        const {email,password} = req.body
        // if(password !== confirm_password){
        //    return res.status(400).send({msg:"Invalid Credentials please check Onces"})
        // }

        const isUserPresent = await User.findOne({email})
        if(isUserPresent){
            return res.status(400).send({msg:"User already present, Please Login"})
        }

        const hash = await bcrypt.hash(password,5);

        const newUser = new User({...req.body,password:hash});
        await newUser.save()

        res.status(200).send({msg:"Signup Successful",user:newUser});
    } catch (error) {
        res.status(400).send({msg:"Invalid Credentials" , error: error.message})
    }
})


userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;

        const isUserPresent = await User.findOne({email})
        if(!isUserPresent){
            return res.status(400).send({msg:"User Not Found, Please Signup"})
        }

        const isPassCorrect = await bcrypt.compare(password,isUserPresent.password)

        if(!isPassCorrect){
            return res.status(400).send({msg:"Invalid Credentials"})
        }

        const token = jwt.sign({email:email,userID:isUserPresent._id},process.env.secret);

        res.status(200).send({msg:"Login Successful",token:token})

    } catch (error) {
        res.status(400).send({msg:"Invalid Credentials" , error: error.message})
    }
})

module.exports = {
    userRoute
}