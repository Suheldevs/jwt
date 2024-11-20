const {userModel} = require('../model/user');
const { errorHandler } = require('../utils/error');
const userPostController = async(req, res,next)=>{
    try{
        const body = req.body;
        console.log(body);
        if(!body.name || !body.email || !body.password){
         return next(errorHandler(400,'All field is Require'))
        }

        const newUser = new userModel(body);
        await newUser.save();
        res.status(200).json({message:'data save successfully!',userData:newUser});
    }
catch(err){
    next(err);
}
}

const userGetController = async(req,res,next)=>{
    try{
        const userData = await userModel.find();
        if(!userData){
            return next(errorHandler(400,'data fetch error!'));
        }
        res.status(200).json({message:'data fetch successfully', users:userData});
    }
    catch(err){
        next(err);
    }
}
const userLogInController = async(req,res,next)=>{
    try{
        const {email, password} = req.body;
        const userData = await userModel.find({email});
        if(!userData){
            return next(errorHandler(400,'User not ragister yet!'));
        }
        if(!userData.password == password){
         return   next(errorHandler(400,'Password is incurrect'));
        }
        res.status(200).json({message:'logIn successfully', user:userData});
    }
    catch(err){
        next(err);
    }
}
module.exports = {userPostController,userGetController,userLogInController}