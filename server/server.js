const express = require('express');
//const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

console.log(publicPath);

var app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log('Server is up at port: '+port);
});
