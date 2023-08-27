const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    }
})

UserSchema.pre('save',async function (next){
    const saltRound=10;
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(saltRound);
        // console.log(this.password, salt)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})
const UserModel=mongoose.model('Users',UserSchema);

module.exports=UserModel