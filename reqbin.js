var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
   res.sendfile('index.html')
})

app.get('/redirect/local',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: local")
    res.redirect('http://127.0.0.1')
})


app.get('/redirect/:loc',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    res.redirect(req.params.loc)
})

app.get('/redirect307/:loc',function(req,res){
    console.log("Redirect GET (307) Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    res.redirect(307,req.params.loc)
})
app.post('/redirect307/:loc',function(req,res){
    console.log("Redirect POST (307) Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    res.redirect(307,req.params.loc)
})

app.listen(3000)
