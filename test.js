const express = require('express');

const app = express();
const port = 3000;
const index = '/index.html';

app.get('*', (req, res) => {
  if( '/' === req.path ) {
    res.sendFile(__dirname + index);
  } else if ( -1 !== req.path.indexOf('dist') || -1 !== req.path.indexOf('data') || -1 !== req.path.indexOf('favicon') ) {
    res.sendFile(__dirname + req.path);
  } else {
    res.sendFile(__dirname + req.path + '.html');
  }
});

app.listen(port, () => {
  console.log('The Test Server is running...');
});
