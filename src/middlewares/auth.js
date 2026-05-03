const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next)=>{
    try{
    const {token} = req.cookies;

    const decodedObj = await jwt.verify(token, "DEV@TINDER");

    const {_id} = decodedObj;
    console.log(_id, 'id')

    const user = await User.findById({_id});
    
    console.log(user, 'user');

    if(!user)
    {
        throw new Error("User NOT FOUND");
    }

    req.user = user;

    next();
}
catch(ERROR)
{
    res.status(400).send("ERROR" + ERROR.message);
}
}

module.exports = { userAuth };