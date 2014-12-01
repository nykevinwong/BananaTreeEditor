var express = require('express');
var app = express();

app.get('*',function(req, res){
  res.send('Express Response');
});

app.listen(3000);
console.log("App server running on port 3000");