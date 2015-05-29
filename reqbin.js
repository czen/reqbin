var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
   res.sendfile('index.html')
})

app.get('/redirect/local',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: local")
    res.redirect('http://127.0.0.1')
})

app.get('/redirect/file',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: file")
    res.redirect('file:///etc/passwd')
})


app.get('/redirect/:loc',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    //split on first '-' this will get the protocol but still allow domain names with '-' in them
    var proto = req.params.loc.split('-',1)
    var addr  = req.params.loc.substring(req.params.loc.indexOf('-')+1)
    res.redirect(proto+"://"+addr)
})

app.get('/redirect307/:loc',function(req,res){
    console.log("Redirect GET (307) Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    var proto = req.params.loc.split('-',1)
    var addr  = req.params.loc.substring(req.params.loc.indexOf('-')+1)
    res.redirect(307,proto+"://"+addr)
})
app.post('/redirect307/:loc',function(req,res){
    console.log("Redirect POST (307) Request from: "+ req.connection.remoteAddress+" To: "+req.params.loc)
    var proto = req.params.loc.split('-',1)
    var addr  = req.params.loc.substring(req.params.loc.indexOf('-')+1)
    res.redirect(307,proto+"://"+addr)
})

app.listen(3000)
