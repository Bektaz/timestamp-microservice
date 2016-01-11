var http = require('http');
var url = require('url');
var fs = require('fs');

var port = process.env.PORT || 8080;
var re = new RegExp('[^a-zA-Z0-9\\s]'), k=0, data;
var months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var server = http.createServer(function(req, res){  
    var obj = url.parse(req.url, true), resar=[];
    var str = obj.path.toString().slice(1,obj.path.length);
    if(str.length===0){
        res.writeHead(200, {'content-type': 'text/html'}); 
        var html = fs.readFileSync(__dirname+'/index.htm');
        res.end(html);
    }
    if(Number(str)>0 && str.length===13){
        data = {unix: str, natural: new Date(Number(str)).toGMTString()}
        res.writeHead(200, {'content-type': 'application/json'}); 
        res.end(JSON.stringify(data));
    }else{
        var ar = str.split(re), i;
        for(i=0; i<ar.length; i++){
                for(var j=0; j<months.length; j++){
                    if(ar[i].toLowerCase() === months[j].toLowerCase().slice(0,ar[i].length)){
                    resar.push(ar[i]);
                    k++;
                    break;
                    }
                }
                break;
            }
        if(k===1){
            for(i=0; i<ar.length; i++){
                if(Number(ar[i])>0 && Number(ar[i])<=31){
                    resar.push(' '+ar[i]);
                    k++;
                    break;
                }
            }   
            if(k===2){
                for(i=0; i<ar.length; i++){
                    if(Number(ar[i])>=1000){
                        resar.push(', '+ar[i]);
                        k++;
                        break;
                    }
                }
                data = {unix: Date.parse(resar.join('')), natural: resar.join('')}                
            }else{data = nullData();}
        }else{data = nullData();}
        res.writeHead(200, {'content-type': 'application/json'}); 
        res.end(JSON.stringify(data));
    }
    function nullData(){
        return {unix: null, natural: null};
    }
    k=0;
});
server.listen(port, function(){
	console.log('Our app is running on http://localhost:'+port);
});



