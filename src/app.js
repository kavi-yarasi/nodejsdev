const expreses = require('express');

const app = expreses();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/test', (req, res, next) => {
  res.send('Hello kavi'); //request handler
});