const validator = require("validator");
const validateSignUpdata = (req) => {
    const {firstName, LastName, email, password}  = req;

    if(!firstName)
    {
        return new Error("first name is not valid");
    }

    else if(!validator.isEmail(email))
    {
        return  new Error("Email is not valid");
    }

    else if(!validator.isStrongPassword(password))
    {
        return  new Error("password is not strong");
    }
}

module.exports = {validateSignUpdata};