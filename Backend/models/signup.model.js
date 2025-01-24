import mongoose from "mongoose";

const signupSchema = new mongoose.Schema ({
    email : {
        type : String ,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phonenumber :{
        type :Number  ,
        required : true,
    }
},{timestamps:true},
);

const Signup = mongoose.model('Sign',signupSchema);
export default Signup;