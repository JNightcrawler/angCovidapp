const express =require('express');
var app = express();
const path = require('path');

console.log(__dirname);
app.get('/',function(req,res){
    res.sendFile('index.html',{root:path.join(__dirname,'./')});

});



app.listen(process.env.PORT || 3000,function(){
//console.log(port);
});