const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//todo: -----------------------register--------------------
exports.createRegister = async (req, res) => {
  const { name, password } = req.body;
  try {
    //check user
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }
    //สร้างuser
    user = new User({
      name,
      password,
    });
    //endcryt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //payload return jsonwebtoken
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.json({ token });
      }
    });

    //res.send("user register complete");
  } catch (err) {
    //check error
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//todo:---------------------login-----------------------------
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    //check user
    let user = await User.findOneAndUpdate({ name },{new:true});
    if (!user) {
      return res.status(400).json({ msg: "user Invalid Credentials" });
    }

    //endcryt password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "password Invalid Credentials" });
    }

    //payload return jsonwebtoken
    const payload = {
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.json({ token,payload });
      }
    });

    //res.send("user register complete");
  } catch (err) {
    //check error
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
//todo:---------------------CurrentUser-----------------------------
//POST http://localhost:8000/api/current-user
//@desc route login
//@access public
exports.currentUser = async (req,res) => {
  User.findOne({name:req.user.name}).select('-password').exec((err,user)=>{
    if(err){
      throw new Error(err);
    }else{
      res.json(user);
    }

  })
}