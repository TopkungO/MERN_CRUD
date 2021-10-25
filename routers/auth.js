const express =require("express");
const router =express.Router();
const User =require("../models/user");

const { createRegister,login,currentUser} = require("../controllers/auth")
const { auth ,adminCheck} = require("../middleware/auth");

// POST http://localhost:8000/api/register
//@desc route register
//@access public
router.post("/register",createRegister);

// POST http://localhost:8000/api/login
//@desc route login
//@access public
router.post("/login",login);

// POST http://localhost:8000/api/current-user
//@desc route login
//@access public
router.post("/current-user",auth,currentUser);

// POST http://localhost:8000/api/current-admin
//@desc route login
//@access public
router.post("/current-admin",auth,adminCheck,currentUser);

module.exports = router;