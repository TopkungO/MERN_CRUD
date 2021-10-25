const person = require("../models/person");
const fs = require("fs");


exports.create = async(req,res)=>{
   try{
    const { data } =req.body;
    const newData={
        name:data,
        pic:req.file.filename
    }
    res.json( await new Person(newData).save());
   }
   catch(err){
    console.log(err);
    res.status(400).send("create person failed");
   }

}
exports.list = async(req,res)=>{
    res.json(await person.find({}).sort({createAt:-1}).exec());
}
exports.read = async(req,res)=>{
    const persons=await person.findOne({_id:req.params.id}).exec();
    res.json(persons);
}
exports.update = async(req,res)=>{
    const {name} =req.body;
    try{
        const updated = await person.findOneAndUpdate(
            {_id:req.params.id},
            {name:name},
            {new:true}
        );
        res.json(updated);
       
       }
       catch(err){
        console.log(err);
        res.status(400).send("Update person failed");
       }
}
exports.remove = async(req,res)=>{
    try{
        const deleted = await person.findOneAndDelete({_id:req.params.id});
        await fs.unlink(`./pubilc/uploads/${deleted.pic}`,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("remove success");
            }
        })
        res.json(deleted);
       
       }
       catch(err){
        console.log(err);
        res.status(400).send("Delete person failed");
       }
}