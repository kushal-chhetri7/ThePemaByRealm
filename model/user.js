// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     email: {
//         type: String,
//         required: [true, 'Please provide your email'],
//         unique: true, 
//         lowercase: true, 
//         validate: [validator.isEmail ,'Please provide a valid email'],
//     },
//     password:{
//         type:String,
//         required:[true,'Please provide a password'],
//         minlenght:8,
//         select:false,
      
//     },
//     passwordConfirm: {
//         type: String,
//         required:[true, 'Please confirm your password'],
//         validate: function (el) {
//             return el === this.password
//         },
//         message: 'Password are not same',
//     },
//     active:{
//         type:Boolean,
//         default:true,
//         select:false,
//     },

    
// },{timestamps:true});
// userSchema.pre("save",async function(next){
//     if(!this.isModified('password')) return next()

//     this.password = await bcrypt.hash(this.password,12)

//     this.passwordConfirm=undefined
//     next()
// })

// export default mongoose.model("user", user)

import mongoose, {Schema} from "mongoose";

const userCredentialSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    emailToken:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    date:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
      }
})

const userCredential = mongoose.model("UserCrendential", userCredentialSchema);
export default userCredential;