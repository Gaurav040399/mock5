const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./route/user.route");
const { doctorRoute } = require("./route/doctor.route");
const app = express();
const cors = require("cors")
require("dotenv").config();
app.use(express.json())
app.use(cors())

app.use("/user",userRoute);
app.use("/doctor",doctorRoute)

app.listen(process.env.PORT || 4000, async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Your server is running on PORT ${process.env.PORT}`)
    } catch (error) {
        console.log("Cannot connected to DB");
        console.log(error.message);
    }
})