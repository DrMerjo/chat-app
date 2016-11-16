const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
// browser ports: server or local
const port = process.env.PORT || 3000;

var app = express();

//going to public folder
app.use(express.static(publicPath));

// to launch the localhost:3000
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
