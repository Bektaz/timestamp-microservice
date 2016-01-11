var http = require('http');
var url = require('url');
var fs = require('fs');

var port = process.env.PORT || 8080;

var server = http.createServer(function(req, res){
    /*
    var obj = url.parse(req.url, true), data;
    if(obj.pathname==='/api/parsetime'){  
        var date = new Date(obj.query.iso); 
        data = {
            hour: date.getUTCHours(),
            minute: date.getUTCMinutes(),
            second: date.getUTCSeconds()
        }
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(data));
    }else if(obj.pathname==='/api/unixtime'){
        data = {
            unixtime: Date.parse(obj.query.iso)
        }
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(data));
    }else if(obj.pathname==='/'){
        res.end('Hello this is my first app in Heroku!!!');
    }
    */
    res.writeHead(200, {'content-type': 'text/html'});
    var html = fs.readFileSync(__dirname+'/index.htm');
    res.end(html);
});
server.listen(port, function(){
	console.log('Our app is running on http://localhost:'+port);
});



