const express =require("express");
const mongoose =require("mongoose");
const morgan =require("morgan");
const bodyParser =require("body-parser");
const cors =require("cors");
require('dotenv').config();
const {readdirSync} =require("fs")


//app
const app= express();
app.use(express.static(__dirname + "/public"));

//connect DB
mongoose.connect(process.env.DATABASE)
    .then(()=>console.log("Connect DB"))
    .catch((err)=>console.log("DB Connect error",err))
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());

//router
// app.use("/api/",authRoutes);

//auto load
readdirSync("./routers").map( (r) => app.use("/api",require("./routers/"+r)) )

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("Server is run ",port))