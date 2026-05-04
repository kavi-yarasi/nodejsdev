const express = require('express');
const validator = require('validator');
const {validateSignUpdata} = require("./utlis/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth.js")
const jwt = require("jsonwebtoken");

const app = express();

const db = require("./config/database.js");

app.use(express.json()); //for the reqbody to be converted to the actual JSON
app.use(cookieParser());

const User = require("./models/user.js");

db().then(()=> {
  app.listen(7777, ()=>{
  console.log('server is listening on port 7777')
})
    console.log('database connection is done');
    
}).catch((err)=>{
    console.log(err);
    
    console.log("datatabase couldn't be connected");
    
})

//login api

app.post("/login", async (req, res)=> {

  const {emailId, password} = req.body;

  const user = await User.findOne({emailId: emailId});

  if(!user)
  {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.validatePassword(password);

  if(isPasswordValid)
  {
    const token = await user.getJwt();
    console.log(token);
    res.cookie("token", token, {expires: new Date(Date.now() + 3600000), httpOnly: true});
    res.send("User logged in successfully");
  }
  else{

    throw new Error("Invalid credentials");
  }
})

//profile api
app.get("/profile", userAuth, async (req, res)=> {
  console.log("Logged in user" + req.user);
  res.send(req.user);
})

app.post("sendConnectionRequest", userAuth, async(req, res)=>{
  res.send(req.user.firstName + " sent the connection request");
})

app.post("/signup", async (req, res)=>{
  const {firstName, lastName, emailId, password} = req.body;
  console.log(password, 'password')
  const passwordHash = await bcrypt.hash(password, 10); //10 rounds of salt

  const user = new User({
  firstName,
  lastName,
  emailId,
  password: passwordHash
}); //creating a new INSTANCE OF THE USER MODEL

  try {
    validateSignUpdata(req);
    await user.save(); //saving the model, THIS SHOULD BE AWAITED BECAUSE IT WILL ALWAYS RETURN A PROMISE

  res.send("User added successfully");
    
  } catch (error) {
    res.status(400).send(error.message || "Error saving the response");
  }
  
})

//getUserByanyTHING

app.get("/user", async (req, res)=>{
  const userFirstName = req.body.firstName;
  try{
    const user = await User.findOne({firstName: userFirstName});
    console.log(user, 'founduser');
    
     if(user)
  {
    console.log("user found successfully");
    res.send(user);
    
  }
  else{
    console.log('USER NOT FOUND');
    res.status(404).send("USER NOT FOUND")
    
  }
  }
  catch{
   res.status(400).send("SOMETHING WENG WRONG");
    

  }


})

//deleteApi
app.delete("/user", async (req, res)=>{
  console.log(req.body);
  
  try {
    const userId = req.body.userId;
    console.log(userId);
    
    const userDeleted = await User.findByIdAndDelete(userId);
    if(userDeleted)
    {
      res.send("user deleted successfully")
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
})

//feedapi

app.get("/feed", async (req, res) =>{
  try{
    const users = await User.find({});
    console.log(users);
    console.log("Feed loaded");
    
  //    if(users.length)
  // {
    res.send(users);
    
  // }
  }
  catch{
   res.status(400).send("SOMETHING WENG WRONG");
    

  }
})

//patchUser

app.patch("/user/:userId", async(req, res)=> {
  console.log(req.body);

  const ALLOWED_UPDATE_FIELDS = ["gender", "age", "skills", "password"]

  
  const id = req.params?.userId;
  try {
    if(req.body)
  {
    const isAllowed = Object.keys(req.body).every(v => ALLOWED_UPDATE_FIELDS.includes(v));
    if(!isAllowed)
    {
      throw new Error("updating these fields are not allowed");
    }
  }

  if(req.body.skills?.length > 10)
  {
    throw new Error("skills cannot be more than 10");
  }
  
     const user = await User.findByIdAndUpdate({_id: id}, req.body);
  if(user)
  {
    res.send("USER UPDATED")

  }
  } catch (error) {
    res.status(400).send("something went wrong" + error);
  }
})


// const {adminAuth, userAuth} = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.get("/user/login", (_req, res, next) =>
// {
//   throw new Error("this is wrong bro");
  
//   res.send("user logged innn");
// })
// ///AUTHORIZATION ENABLED ONLY FOR DASHBOARD, NOT FOR LOGIN ABOVE
// app.get("/user/dashboard", userAuth, (_req, res, next)=> {
//   res.send("USER DASHBOARD ACCESSED");
// })
// app.get("/admin/dashboard", (_req, res, next)=> {
//   res.send('ADMIN DASHBOARD ACCESSED');
// })
// //wHENEVER the express server gets a request, it will go through alll this , will send the response of first matching one, then it won't execute.

// //ROUTE HANDLERS that are only WITH THE NEXT KEYWORD WITHOUT SENDING ANY RESPONSE ARE - MIDDLEWARES
// app.get('/user', (_req, res)=>{
//   res.send ({
//     'firstName': 'kavi'
//   })
// })
// //the routes can be an array, but it should be with next(), and also only one should return the response
// app.get("/a", [(_req, res, next)=> {
//   res.send('hey kavi')
//    next();
// }, (_req, res)=>{
//   res.send('im here kavi');
// }]);

// //the same routes can be independent, but it should also be with next()

// app.get("/routing", (_req, res, next)=> {
//   // res.send('hey kavi')
//    next(); //if the same routes don't have the next, the second route hanlder won't be handled, comment it out and check
// });

// app.get("/routing", (_req, res, next)=>{
//   console.log('second route handler with the same routing url');
//   // next(); // here if the filext routing wasn't there, it should throw the error as the cannot get the URL, but in this case it will return the response of the file extension, the thing about this is routing url is not the problem, we are still getting the response
// })

// // app.get('/:file{.:ext}', async (req, res) => {
// //   res.send('ok')
// // })

// //ERROR HANDLER SHOULD BE DEFINED AFTER ALL ROUTES, AND IT SHOULD HAVE 4 PARAMS (err, req, res, next)
// app.use((err, req, res, next)=>{
//   console.log(err);
//   res.status(500).send("Something went wrong");
// })