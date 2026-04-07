
const adminAuth = (_req, res, next)=>{
    console.log("AUTHORIZATION INITIATED")
    const token = "xyx";
    const isAuthorizationTokenValid = token === "xyz";

    if(isAuthorizationTokenValid)
    {
        next();
    }
    else{
        res.status(401).send("Authorization failed");
    }
}

const userAuth = (_req, res, next)=>{
    console.log("USER AUTHORIZATION INITIATED")
    const token = "xyz";
    const isAuthorizationTokenValid = token === "xyz";

    if(isAuthorizationTokenValid)
    {
        next();
    }
    else{
        res.status(401).send("Authorization failed");
    }
}

module.exports = { adminAuth, userAuth };