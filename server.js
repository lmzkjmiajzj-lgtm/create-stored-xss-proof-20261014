const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : fallback;
};

const port = Number(arg('port', process.env.PORT || 3000));
const hostname = arg('hostname', '0.0.0.0');

http.createServer((req, res) => {
  if (req.url === '/custom-control.js') {
    res.writeHead(200, { 'content-type': 'application/javascript; charset=utf-8' });
    res.end(fs.readFileSync(path.join(__dirname, 'custom-control.js')));
    return;
  }

  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
}).listen(port, hostname);
