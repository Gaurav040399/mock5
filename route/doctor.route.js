const express = require("express");
const { Doctor } = require("../model/doctor.model");

const doctorRoute = express.Router();

doctorRoute.post("/appointments",async(req,res)=>{
    try {
        const appointments = new Doctor({...req.body})
        await appointments.save()
        res.status(200).send({msg:"Appointment Book", appointment:appointments})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})


doctorRoute.get("/",async(req,res)=>{
    try {
        const data = await Doctor.find()
        res.status(200).send({msg:"Data Fetch seccussful", data : data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// Filter speciallization
doctorRoute.get("/filter/:criteria",async(req,res)=>{
    try {
        const {criteria} = req.params
        const data = await Doctor.where({specialization:criteria})

        res.status(200).send({msg:"Data Fetch seccussful", data : data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// Sort by date
doctorRoute.get("/sort/:criteria",async(req,res)=>{
    try {
        const {criteria} = req.params
        if(criteria == "asc"){
            const data = await Doctor.find().sort({"date": 1})
           return res.status(200).send({msg:"Data Fetch seccussful", data : data})
        }else{
            const data = await Doctor.find().sort({"date": -1})
           return res.status(200).send({msg:"Data Fetch seccussful", data : data})
        }
        
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// search by name
doctorRoute.get("/search/:name",async(req,res)=>{
    try {
        const {name} = req.params;
        const data = await Doctor.find({ name : { "$regex" : name , "$options" : "i"}})
        res.status(200).send({msg:"Data Fetch successful", data : data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

doctorRoute.patch("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params
         const data = await Doctor.findByIdAndUpdate({_id:id},{...req.body})
         res.status(200).send({msg:"Update successful", data : data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

doctorRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params
         const data = await Doctor.findByIdAndDelete({_id:id})
         res.status(200).send({msg:"Delete successful", data : data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})


module.exports = {
    doctorRoute
}