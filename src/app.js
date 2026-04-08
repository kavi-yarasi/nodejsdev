const express = require('express');

const app = express();

const db = require("./config/database.js");

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

app.post("/signup", async (req, res)=>{
  const userObj = {
    "firstName": "Kavi", 
    "lastName": "Arasi",
    "age": 25,
    "gender": "female"
  }
  const user = new User(userObj); //creating a new INSTANCE OF THE USER MODEL

  try {
    await user.save(); //saving the model, THIS SHOULD BE AWAITED BECAUSE IT WILL ALWAYS RETURN A PROMISE

  res.send("User added successfully");
    
  } catch (error) {
    res.status(400).send("Error saving the response");
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