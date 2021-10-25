const express =require("express");
const router =express.Router();

router.get("/create-org",(req,res)=>{

    res.send("create-org");
});

router.get("/update-org",(req,res)=>{

    res.send("update-org");
});

module.exports = router;