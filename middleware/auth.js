const jwt =require("jsonwebtoken");

exports.auth = (req,res,next)=>{
    const token = req.headers['authtoken'];
    
    if(!token){
        return res.status(401)
            .json({msg:"No token ,authorization denied"});
    }

    //verify token
    try{
        const decoded = jwt.verify(token,'jwtSecret');
        req.user = decoded.user;
        next();
    }catch(err){
        return res.status(401)
            .json({msg:"Token is not valid"});
    
    }
}

exports.adminCheck = async(req,res,next) => {
    const {name} =req.user;
    const admintUser = await User.findOne({name}).exec();
    if(admintUser.role !== "admin"){
        res.status(403).json({err:"admin Access denued"})
    }else{
        next();
    }
}