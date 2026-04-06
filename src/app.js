const express = require('express');

const app = express();

app.get('/user', (_req, res)=>{
  res.send ({
    'firstName': 'kavi'
  })
})
app.get('/hello', (_req, res)=> {
  res.send("helllooooo kaviii");
});

app.post('/postuser', (_req, res)=>{
  res.send('posting user');
});

app.delete('/deletinguser', (_req, res)=>{
  res.send('deleting user');
})

app.patch('/patchinguser', (_req, res) => {
  res.send('patching user');
})

app.listen(7777, () => {
  console.log('server listening on the port number 7777')
});