const fs = require('fs');

fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');
fs.copyFileSync('custom-control.js', 'dist/custom-control.js');
fs.writeFileSync('dist/_headers', `/custom-control.js
  Access-Control-Allow-Origin: https://create.netlify.com
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: no-store
  Vary: Origin
`);
