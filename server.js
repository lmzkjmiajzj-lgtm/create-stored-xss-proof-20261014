const http=require('http');
http.createServer((req,res)=>{res.writeHead(200,{'content-type':'text/html'});res.end('<!doctype html><html><body><div data-sb-object-id="content/index.json"><h1 data-sb-field-path="title">Stored XSS Proof</h1></div></body></html>')}).listen(3000);
