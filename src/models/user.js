const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    about:{
        type: String, 
        default: "THIS IS A SAMPLE ABOUT"
    },
    skills:{
       type: [String]
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;