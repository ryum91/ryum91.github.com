const express = require('express');

const app = express();
const port = 3000;
const index = '/index.html';

app.get('*', (req, res) => {
  if( '/' === req.path ) {
    res.sendFile(__dirname + index);
  } else {
    res.sendFile(__dirname + req.path);
  }
});

app.listen(port, () => {
  console.log('The Test Server is running...');
});
