const {userModel} = require('../model/user')
const userPostController = async(req, res)=>{
    try{
        const body = req.body;
        console.log(body);
        if(!body){
         return  res.status(400).json({message:'all field is required'})
        }

        const newUser = new userModel(body);
        await newUser.save();
        res.status(200).json({message:'data save successfully!',userData:newUser});
    }
catch(err){
    res.status(500).json({message:'Internal error'});
}
}

const userGetController = async(req,res)=>{
    try{
        const userData = await userModel.find();
        if(!userData){
            return res.status(400).json({message:'data fetch error!'});
        }
        res.status(200).json({message:'data fetch successfully', users:userData});
    }
    catch(err){
        res.status(500).json({message:'data not fetch successfully'});
    }
}
const userLogInController = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const userData = await userModel.find({email});
        if(!userData){
            return res.status(400).json({message:'User not ragister yet!'});
        }
        if(!userData.password == password){
         return  res.status(400).json({message:'password is incurrect'});
        }
        res.status(200).json({message:'logIn successfully', user:userData});
    }
    catch(err){
        res.status(500).json({message:'Internal error',Error:err});
    }
}
module.exports = {userPostController,userGetController,userLogInController}