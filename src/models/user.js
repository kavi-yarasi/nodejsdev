const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: 'String', //String or 'String' are same
        required: true,
        minLength: [2, 'Must be at least 2'],
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
        trim: true,
        validate: {
            validator: function(v)
            {
               return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: "{VALUE} is not a valid email ID"
        }
    },
    password:{
        type: String,
        validate: {
      validator: function(v) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
      },
      message: props => `${props.value} is not a valid password`
    },
    },
    age:{
        type: Number,
        min: [18, 'Must be at least 18, got {VALUE}']
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
        default: "THIS IS A SAMPLE ABOUT",
        minLength: 5,
        maxLength: 1000
    },
    skills:{
       type: [String]
    }
}, { 
  timestamps: true 
})

const User = mongoose.model("User", userSchema);

module.exports = User;