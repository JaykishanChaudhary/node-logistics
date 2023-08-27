const UserModel=require('../model/UserSchema');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.CreateUser = (async(req,res) => {
    try{
        const {name,password} = req.body;
        const NewUser = await UserModel.create({
            name,
            password
        })
        if(NewUser){
            res.status(200).json({
                status:'success',
                result:NewUser
            })
        }else {
            res.status(500).json({
                status:'failure',
                result:'unable to create new user'
            })
        }
    }catch (err){
        console.error('Error creating new user:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while creating a new user',
            error: err.message
        });
    }
})

exports.UserLogin = (async(req,res) => {
    try{
        const {name,password} = req.body;
        console.log(name, password)
        const user = await UserModel.findOne({name});
        console.log(user);
        if(user){
            const ComparePassword = await bcrypt.compare(password,user.password);
            if(ComparePassword){
                const id = user._id;
                const JsonWebToken=jwt.sign({id},process.env.SECRET_KEY);
                res.status(200).json({
                    status:'success',
                    result:JsonWebToken
                })
            }else{
                res.status(401).json({
                    status:"failure",
                    result:"wrong password"
                })
            }
        }else {
            res.status(404).json({
                status:'failure',
                result:'user does not exist'
            })
        }
    }catch (err){
        console.error('Error in user login:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while login an user',
            error: err.message
        });
    }
})