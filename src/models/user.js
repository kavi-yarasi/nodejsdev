const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: 'String', //String or 'String' are same
        required: true,
        minLength: 2,
        maxLength: 5
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        loweracase: true, 
        trim: true
    },
    password:{
        type: String
    },
    age:{
        type: Number,
        min: 18
    },
    gender:{
        type: String,
        validate: {
      validator: function(v) {
        return ["male", "female", "other"].includes(v);
      },
      message: props => `${props.value} is not a gender`
    },
    },
    about:{
        type: String, 
        default: "THIS IS A SAMPLE ABOUT"
    },
    skills:{
       type: [String]
    }
}, { 
  timestamps: true 
})

const User = mongoose.model("User", userSchema);

module.exports = User;