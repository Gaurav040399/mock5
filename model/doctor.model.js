const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {type:String, require:true},
    image : {type:String, require:true},
    specialization : {type:String, require:true,enum:[ "Cardiologist", "Dermatologist", "Pediatrician", "Psychiatris"]},
    experience : {type:Number, require:true},
    location : {type:String, require:true},
    date : {type:Date, default:Date.now(), require:true},
    slots : {type:Number, require:true},
    fee : {type:Number, require:true}
})

const Doctor = mongoose.model("doctor",doctorSchema)

module.exports = {Doctor}
