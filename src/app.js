const express = require('express');

const app = express();


//wHENEVER the express server gets a request, it will go through alll this , will send the response of first matching one, then it won't execute.

//ROUTE HANDLERS - MIDDLEWARES
app.get('/user', (_req, res)=>{
  res.send ({
    'firstName': 'kavi'
  })
})
//the routes can be an array, but it should be with next(), and also only one should return the response
app.get("/a", [(_req, res, next)=> {
  res.send('hey kavi')
   next();
}, (_req, res)=>{
  res.send('im here kavi');
}]);

//the same routes can be independent, but it should also be with next()

app.get("/routing", (_req, res, next)=> {
  // res.send('hey kavi')
   next(); //if the same routes don't have the next, the second route hanlder won't be handled, comment it out and check
});

app.get("/routing", (_req, res, next)=>{
  console.log('second route handler with the same routing url');
  // next(); // here if the filext routing wasn't there, it should throw the error as the cannot get the URL, but in this case it will return the response of the file extension, the thing about this is routing url is not the problem, we are still getting the response
})

// app.get('/:file{.:ext}', async (req, res) => {
//   res.send('ok')
// })

app.listen(7777, ()=>{
  console.log('server is listening on port 7777')
})