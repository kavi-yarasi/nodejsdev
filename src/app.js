const express = require('express');

const app = express();

app.get('/user', (_req, res)=>{
  res.send ({
    'firstName': 'kavi'
  })
})
app.get("/a", (_req, res)=> {
  console.log(_req.query);
  res.send("helllooooo kaviii");
});

app.get('/:file{.:ext}', async (req, res) => {
  res.send('ok')
})

app.listen(7777, ()=>{
  console.log('server is listening on port 7777')
})